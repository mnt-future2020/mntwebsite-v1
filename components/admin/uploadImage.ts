// Client helper: upload an image file to Spaces (via the blog upload route) and
// get back its public URL. Shared by the post editor and the cover-image field.
export async function uploadImage(file: File): Promise<{ url?: string; error?: string }> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/admin/posts/upload", { method: "POST", body: fd }).catch(() => null);
  if (res && res.ok) {
    const d = await res.json().catch(() => ({}));
    return { url: d.url };
  }
  const err = res ? (await res.json().catch(() => ({}))).error : "Upload failed";
  return { error: err || "Upload failed" };
}
