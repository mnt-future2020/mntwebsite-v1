"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Editor from "./Editor";
import Icon from "@/components/Icon";
import { toSlug } from "@/lib/posts";
import { uploadImage } from "@/components/admin/uploadImage";
import { toast } from "@/components/admin/Toast";

const field =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-ink placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-100";
const labelCls = "mb-1.5 block text-sm font-medium text-ink";
const card = "rounded-2xl border border-slate-200 bg-white p-5";

export type PostInput = {
  id?: string;
  slug?: string;
  title?: string;
  excerpt?: string;
  contentHtml?: string;
  coverImage?: string;
  status?: "DRAFT" | "PUBLISHED";
  category?: string;
  tags?: string[];
  author?: string;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  keywords?: string;
  noindex?: boolean;
};

export default function PostForm({ initial }: { initial?: PostInput }) {
  const router = useRouter();
  const editing = Boolean(initial?.id);

  const [f, setF] = useState({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    excerpt: initial?.excerpt ?? "",
    contentHtml: initial?.contentHtml ?? "",
    coverImage: initial?.coverImage ?? "",
    status: initial?.status ?? ("DRAFT" as "DRAFT" | "PUBLISHED"),
    category: initial?.category ?? "",
    tags: (initial?.tags ?? []).join(", "),
    author: initial?.author ?? "MnT Future Team",
    metaTitle: initial?.metaTitle ?? "",
    metaDescription: initial?.metaDescription ?? "",
    ogImage: initial?.ogImage ?? "",
    canonicalUrl: initial?.canonicalUrl ?? "",
    keywords: initial?.keywords ?? "",
    noindex: initial?.noindex ?? false,
  });
  const [slugTouched, setSlugTouched] = useState(Boolean(initial?.slug));
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const coverRef = useRef<HTMLInputElement>(null);
  const [coverBusy, setCoverBusy] = useState(false);

  const up = (k: string, v: unknown) => setF((s) => ({ ...s, [k]: v }));

  const onCoverFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setCoverBusy(true);
    const { url, error } = await uploadImage(file);
    setCoverBusy(false);
    if (url) up("coverImage", url);
    else toast(error || "Couldn't upload image", "err");
  };

  const onTitle = (v: string) => {
    up("title", v);
    if (!slugTouched) up("slug", toSlug(v));
  };

  const save = async (status?: "DRAFT" | "PUBLISHED") => {
    setSaving(true);
    setErr(null);
    const payload = {
      ...f,
      status: status ?? f.status,
      tags: f.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };
    try {
      const res = await fetch(editing ? `/api/admin/posts/${initial!.id}` : "/api/admin/posts", {
        method: editing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || "Couldn't save the post.");
      }
      router.push("/admin/posts");
      router.refresh();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Save failed.");
      setSaving(false);
    }
  };

  const del = async () => {
    if (!initial?.id || !confirm("Delete this post? This can't be undone.")) return;
    setSaving(true);
    const res = await fetch(`/api/admin/posts/${initial.id}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/admin/posts");
      router.refresh();
    } else {
      setErr("Couldn't delete the post.");
      setSaving(false);
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); save(); }} className="grid gap-6 lg:grid-cols-[1fr_320px]">
      {/* MAIN */}
      <div className="space-y-6">
        <div className={card}>
          <label className={labelCls} htmlFor="title">Title</label>
          <input id="title" value={f.title} onChange={(e) => onTitle(e.target.value)} className={`${field} text-base`} placeholder="Post title" required />

          <label className={`${labelCls} mt-4`} htmlFor="slug">Slug</label>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">/blog/</span>
            <input id="slug" value={f.slug} onChange={(e) => { setSlugTouched(true); up("slug", toSlug(e.target.value)); }} className={field} placeholder="post-url-slug" required />
          </div>

          <label className={`${labelCls} mt-4`} htmlFor="excerpt">Excerpt</label>
          <textarea id="excerpt" rows={2} value={f.excerpt} onChange={(e) => up("excerpt", e.target.value)} className={`${field} resize-none`} placeholder="Short summary shown on the blog index and in search results." />
        </div>

        <div>
          <label className={labelCls}>Content</label>
          <Editor value={f.contentHtml} onChange={(html) => up("contentHtml", html)} />
        </div>

        <details className={card}>
          <summary className="cursor-pointer text-sm font-semibold text-ink">SEO &amp; metadata</summary>
          <div className="mt-4 space-y-4">
            <div>
              <label className={labelCls} htmlFor="metaTitle">Meta title <span className="text-slate-400">(defaults to post title)</span></label>
              <input id="metaTitle" value={f.metaTitle} onChange={(e) => up("metaTitle", e.target.value)} className={field} maxLength={70} placeholder="≤ 60 chars" />
            </div>
            <div>
              <label className={labelCls} htmlFor="metaDescription">Meta description</label>
              <textarea id="metaDescription" rows={2} value={f.metaDescription} onChange={(e) => up("metaDescription", e.target.value)} className={`${field} resize-none`} maxLength={170} placeholder="≤ 155 chars — defaults to excerpt" />
              <p className="mt-1 text-xs text-slate-400">{(f.metaDescription || f.excerpt || "").length}/155</p>
            </div>
            <div>
              <label className={labelCls} htmlFor="keywords">Focus keywords</label>
              <input id="keywords" value={f.keywords} onChange={(e) => up("keywords", e.target.value)} className={field} placeholder="comma, separated, keywords" />
            </div>
            <div>
              <label className={labelCls} htmlFor="canonicalUrl">Canonical URL</label>
              <input id="canonicalUrl" value={f.canonicalUrl} onChange={(e) => up("canonicalUrl", e.target.value)} className={field} placeholder="Leave blank for default" />
            </div>
            <div>
              <label className={labelCls} htmlFor="ogImage">OG image URL</label>
              <input id="ogImage" value={f.ogImage} onChange={(e) => up("ogImage", e.target.value)} className={field} placeholder="Social share image (defaults to cover)" />
            </div>
            <label className="flex items-center gap-2 text-sm text-ink">
              <input type="checkbox" checked={f.noindex} onChange={(e) => up("noindex", e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-brand focus:ring-brand" />
              Hide from search engines (noindex)
            </label>
          </div>
        </details>
      </div>

      {/* SIDEBAR */}
      <div className="space-y-6">
        <div className={card}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-ink">Publish</span>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${f.status === "PUBLISHED" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slatey"}`}>
              {f.status === "PUBLISHED" ? "Published" : "Draft"}
            </span>
          </div>
          {err && <p className="mt-3 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-700">{err}</p>}
          <div className="mt-4 flex flex-col gap-2">
            <button type="button" disabled={saving} onClick={() => save("PUBLISHED")} className="btn-primary w-full disabled:opacity-70">
              <Icon name="check" className="h-4 w-4" /> {saving ? "Saving…" : "Publish"}
            </button>
            <button type="button" disabled={saving} onClick={() => save("DRAFT")} className="btn-ghost w-full disabled:opacity-70">
              <Icon name="save" className="h-4 w-4" /> Save draft
            </button>
            {editing && (
              <button type="button" disabled={saving} onClick={del} className="mt-1 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50">
                <Icon name="trash" className="h-4 w-4" /> Delete
              </button>
            )}
          </div>
        </div>

        <div className={card}>
          <label className={labelCls} htmlFor="coverImage">Cover image</label>
          <div className="flex gap-2">
            <input id="coverImage" value={f.coverImage} onChange={(e) => up("coverImage", e.target.value)} className={field} placeholder="Upload, or paste an image URL" />
            <input ref={coverRef} type="file" accept="image/*" className="hidden" onChange={onCoverFile} />
            <button type="button" onClick={() => coverRef.current?.click()} disabled={coverBusy} className="btn-ghost shrink-0 whitespace-nowrap disabled:opacity-70">
              <Icon name="image" className="h-4 w-4" /> {coverBusy ? "Uploading…" : "Upload"}
            </button>
          </div>
          {f.coverImage ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={f.coverImage} alt="" className="mt-3 h-28 w-full rounded-lg object-cover" />
          ) : null}

          <label className={`${labelCls} mt-4`} htmlFor="category">Category</label>
          <input id="category" value={f.category} onChange={(e) => up("category", e.target.value)} className={field} placeholder="e.g. Commerce, AI & Agents, Guides" />

          <label className={`${labelCls} mt-4`} htmlFor="tags">Tags</label>
          <input id="tags" value={f.tags} onChange={(e) => up("tags", e.target.value)} className={field} placeholder="comma, separated" />

          <label className={`${labelCls} mt-4`} htmlFor="author">Author</label>
          <input id="author" value={f.author} onChange={(e) => up("author", e.target.value)} className={field} />
        </div>
      </div>
    </form>
  );
}
