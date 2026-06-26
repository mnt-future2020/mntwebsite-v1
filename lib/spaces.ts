import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// DigitalOcean Spaces (S3-compatible) storage for monitoring screenshots.
// Env: SPACES_REGION (e.g. blr1), SPACES_BUCKET, SPACES_KEY, SPACES_SECRET,
// and optionally SPACES_ENDPOINT (defaults to https://<region>.digitaloceanspaces.com).
const region = process.env.SPACES_REGION || "";
const bucket = process.env.SPACES_BUCKET || "";
const accessKeyId = process.env.SPACES_KEY || "";
const secretAccessKey = process.env.SPACES_SECRET || "";
const endpoint =
  process.env.SPACES_ENDPOINT || (region ? `https://${region}.digitaloceanspaces.com` : "");

export const spacesConfigured = Boolean(region && bucket && accessKeyId && secretAccessKey);

let client: S3Client | null = null;
function s3(): S3Client {
  if (!client) {
    client = new S3Client({
      region: region || "us-east-1",
      endpoint,
      credentials: { accessKeyId, secretAccessKey },
      forcePathStyle: false,
    });
  }
  return client;
}

// Store a screenshot (private — only reachable via a presigned URL).
export async function putScreenshot(objectKey: string, body: Buffer, contentType = "image/jpeg") {
  await s3().send(
    new PutObjectCommand({ Bucket: bucket, Key: objectKey, Body: body, ContentType: contentType, ACL: "private" })
  );
}

// Short-lived signed URL so the admin can view a private object.
export async function signedGetUrl(objectKey: string, expiresIn = 300): Promise<string> {
  return getSignedUrl(s3(), new GetObjectCommand({ Bucket: bucket, Key: objectKey }), { expiresIn });
}
