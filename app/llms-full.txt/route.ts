import { buildLlmsFullTxt } from "@/lib/llms";

// Revalidate hourly (like the sitemap) so newly published posts appear without a
// redeploy.
export const revalidate = 3600;

export async function GET() {
  const body = await buildLlmsFullTxt();
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
