// Upload the built monitoring-agent installer to Spaces (private) so the admin
// dashboard / portal can offer a presigned download.
// Run: node --env-file=.env scripts/upload-agent-dmg.mjs "<path-to.dmg>" [key]
import { PrismaClient } from "@prisma/client";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { readFileSync } from "fs";

const prisma = new PrismaClient();
const file = process.argv[2];
const key = process.argv[3] || "downloads/MnT-Monitor-mac-arm64.dmg";
if (!file) {
  console.error("Usage: node scripts/upload-agent-dmg.mjs <path-to.dmg> [key]");
  process.exit(1);
}

const s = await prisma.siteSetting.findUnique({
  where: { id: 1 },
  select: { spacesRegion: true, spacesBucket: true, spacesKey: true, spacesSecret: true, spacesEndpoint: true },
});
if (!s?.spacesRegion || !s?.spacesBucket || !s?.spacesKey || !s?.spacesSecret) {
  console.error("Spaces is not configured in Site settings.");
  process.exit(1);
}
const endpoint = s.spacesEndpoint || `https://${s.spacesRegion}.digitaloceanspaces.com`;
const client = new S3Client({
  region: s.spacesRegion,
  endpoint,
  credentials: { accessKeyId: s.spacesKey, secretAccessKey: s.spacesSecret },
  forcePathStyle: false,
});

await client.send(
  new PutObjectCommand({
    Bucket: s.spacesBucket,
    Key: key,
    Body: readFileSync(file),
    ContentType: "application/x-apple-diskimage",
    ACL: "public-read",
  })
);
console.log(`✓ Uploaded ${file} → ${s.spacesBucket}/${key} (public — served via CDN)`);
await prisma.$disconnect();
