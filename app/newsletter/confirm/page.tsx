import { prisma } from "@/lib/db";
import NewsletterResult from "@/components/NewsletterResult";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const metadata = { title: "Confirm subscription", robots: { index: false, follow: false } };

export default async function ConfirmPage(
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
      if (sub.status !== "SUBSCRIBED") {
        await prisma.subscriber.update({
          where: { id: sub.id },
          data: { status: "SUBSCRIBED", confirmedAt: new Date(), unsubscribedAt: null },
        });
      }
      ok = true;
    }
  }

  return ok ? (
    <NewsletterResult
      icon="check"
      title="You're subscribed! 🎉"
      body="Thanks for confirming. You'll get occasional, practical notes from MnT Future, and never spam."
    />
  ) : (
    <NewsletterResult
      ok={false}
      icon="x"
      title="Link expired or invalid"
      body="This confirmation link isn't valid anymore. Please subscribe again from our site."
    />
  );
}
