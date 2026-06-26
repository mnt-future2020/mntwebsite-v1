import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { prisma } from "@/lib/db";

// DigitalOcean Spaces (S3-compatible) storage for monitoring screenshots.
// Config is read from the OrgSetting row (set in HR settings) first, then falls
// back to SPACES_* env vars — so it can be configured dynamically in the admin
// panel without redeploying.
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
    row = await prisma.orgSetting.findUnique({
      where: { id: 1 },
      select: { spacesRegion: true, spacesBucket: true, spacesKey: true, spacesSecret: true, spacesEndpoint: true },
    });
  } catch {
    /* DB optional — fall back to env */
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

// Store a screenshot (private — only reachable via a presigned URL).
export async function putScreenshot(objectKey: string, body: Buffer, contentType = "image/jpeg") {
  await putObject(objectKey, body, contentType);
}

// Short-lived signed URL so the admin can view a private object.
export async function signedGetUrl(objectKey: string, expiresIn = 300): Promise<string> {
  const c = await loadConfig();
  return getSignedUrl(makeClient(c), new GetObjectCommand({ Bucket: c.bucket, Key: objectKey }), { expiresIn });
}
