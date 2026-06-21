import { PageHeader } from "@/components/admin/ui";
import PostForm from "@/components/admin/PostForm";

export const dynamic = "force-dynamic";

export default function NewPostPage() {
  return (
    <>
      <PageHeader title="New post" subtitle="Write and publish a new blog post." />
      <PostForm />
    </>
  );
}
