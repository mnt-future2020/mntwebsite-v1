import { prisma } from "@/lib/db";
import NewsletterResult from "@/components/NewsletterResult";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const metadata = { title: "Unsubscribe", robots: { index: false, follow: false } };

export default async function UnsubscribePage(
  props: {
    searchParams: Promise<{ token?: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const token = searchParams.token;
  let ok = false;

  if (token) {
    const sub = await prisma.subscriber.findUnique({ where: { token } }).catch(() => null);
    if (sub) {
      if (sub.status !== "UNSUBSCRIBED") {
        await prisma.subscriber.update({
          where: { id: sub.id },
          data: { status: "UNSUBSCRIBED", unsubscribedAt: new Date() },
        });
      }
      ok = true;
    }
  }

  return ok ? (
    <NewsletterResult
      icon="check"
      title="You've been unsubscribed"
      body="You won't receive any more newsletters from us. Changed your mind? You can subscribe again anytime from our site."
    />
  ) : (
    <NewsletterResult
      ok={false}
      icon="x"
      title="Link invalid"
      body="We couldn't process this unsubscribe link. It may have already been used."
    />
  );
}
