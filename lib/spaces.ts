import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { prisma } from "@/lib/db";

// DigitalOcean Spaces (S3-compatible) storage for screenshots, employee docs and
// blog images. Config is read from the SiteSetting row (set in Site settings)
// first, then falls back to SPACES_* env vars: configurable without redeploying.
type SpacesCfg = { region: string; bucket: string; key: string; secret: string; endpoint: string };

async function loadConfig(): Promise<SpacesCfg> {
  let row: {
    spacesRegion: string | null;
    spacesBucket: string | null;
    spacesKey: string | null;
    spacesSecret: string | null;
    spacesEndpoint: string | null;
  } | null = null;
  try {
    row = await prisma.siteSetting.findUnique({
      where: { id: 1 },
      select: { spacesRegion: true, spacesBucket: true, spacesKey: true, spacesSecret: true, spacesEndpoint: true },
    });
  } catch {
    /* DB optional: fall back to env */
  }
  const region = row?.spacesRegion || process.env.SPACES_REGION || "";
  const bucket = row?.spacesBucket || process.env.SPACES_BUCKET || "";
  const key = row?.spacesKey || process.env.SPACES_KEY || "";
  const secret = row?.spacesSecret || process.env.SPACES_SECRET || "";
  const endpoint =
    row?.spacesEndpoint ||
    process.env.SPACES_ENDPOINT ||
    (region ? `https://${region}.digitaloceanspaces.com` : "");
  return { region, bucket, key, secret, endpoint };
}

export async function isSpacesConfigured(): Promise<boolean> {
  const c = await loadConfig();
  return Boolean(c.region && c.bucket && c.key && c.secret);
}

function makeClient(c: SpacesCfg): S3Client {
  return new S3Client({
    region: c.region || "us-east-1",
    endpoint: c.endpoint,
    credentials: { accessKeyId: c.key, secretAccessKey: c.secret },
    forcePathStyle: false,
  });
}

// Store any private object (screenshots, employee docs, …).
export async function putObject(objectKey: string, body: Buffer, contentType = "application/octet-stream") {
  const c = await loadConfig();
  await makeClient(c).send(
    new PutObjectCommand({ Bucket: c.bucket, Key: objectKey, Body: body, ContentType: contentType, ACL: "private" })
  );
}

// Store a screenshot (private: only reachable via a presigned URL).
export async function putScreenshot(objectKey: string, body: Buffer, contentType = "image/jpeg") {
  await putObject(objectKey, body, contentType);
}

function publicUrl(c: SpacesCfg, key: string): string {
  try {
    const u = new URL(c.endpoint);
    return `${u.protocol}//${c.bucket}.${u.host}/${key}`;
  } catch {
    return `https://${c.bucket}.${c.region}.digitaloceanspaces.com/${key}`;
  }
}

// CDN URL for a public object: DO Spaces edge cache, much faster for large
// downloads than the origin. Requires the Space's CDN to be enabled.
export async function cdnUrl(key: string): Promise<string> {
  const c = await loadConfig();
  if (c.region && c.bucket) return `https://${c.bucket}.${c.region}.cdn.digitaloceanspaces.com/${key}`;
  return c.bucket ? publicUrl(c, key) : "";
}

// Store a PUBLIC object (e.g. blog images shown to all site visitors) and return
// its direct public URL.
export async function putPublicObject(key: string, body: Buffer, contentType: string): Promise<string> {
  const c = await loadConfig();
  await makeClient(c).send(
    new PutObjectCommand({ Bucket: c.bucket, Key: key, Body: body, ContentType: contentType, ACL: "public-read" })
  );
  return publicUrl(c, key);
}

// Short-lived signed URL so the admin can view a private object.
export async function signedGetUrl(objectKey: string, expiresIn = 300): Promise<string> {
  const c = await loadConfig();
  return getSignedUrl(makeClient(c), new GetObjectCommand({ Bucket: c.bucket, Key: objectKey }), { expiresIn });
}
