import Link from "next/link";
import { PageHeader } from "@/components/admin/ui";
import ImportSubscribers from "@/components/admin/ImportSubscribers";
import Icon from "@/components/Icon";

export const dynamic = "force-dynamic";

export default function ImportPage() {
  return (
    <>
      <PageHeader
        title="Import contacts"
        subtitle="Add existing contacts and invite them to opt in to your newsletter."
        action={
          <Link href="/admin/subscribers" className="btn-ghost">
            <Icon name="arrow" className="h-4 w-4" /> Back to subscribers
          </Link>
        }
      />
      <ImportSubscribers />
    </>
  );
}
