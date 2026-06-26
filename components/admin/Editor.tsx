"use client";

import { useEditor, EditorContent, type Editor as TiptapEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExt from "@tiptap/extension-link";
import ImageExt from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { useRef } from "react";
import Icon, { IconName } from "@/components/Icon";
import { toast } from "@/components/admin/Toast";
import { uploadImage } from "@/components/admin/uploadImage";

function Btn({
  active,
  onClick,
  icon,
  label,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  icon?: IconName;
  label: string;
  children?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      title={label}
      aria-label={label}
      className={`flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-sm font-semibold transition-colors ${
        active ? "bg-brand text-white" : "text-slatey hover:bg-slate-100 hover:text-ink"
      }`}
    >
      {icon ? <Icon name={icon} className="h-4 w-4" /> : children}
    </button>
  );
}

function Toolbar({ editor, onImage }: { editor: TiptapEditor; onImage: () => void }) {
  const addLink = () => {
    const url = window.prompt("Link URL");
    if (url === null) return;
    if (url === "") editor.chain().focus().unsetLink().run();
    else editor.chain().focus().setLink({ href: url }).run();
  };
  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 p-2">
      <Btn label="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>B</Btn>
      <Btn label="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><span className="italic">I</span></Btn>
      <span className="mx-1 h-5 w-px bg-slate-200" />
      <Btn label="Heading 2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</Btn>
      <Btn label="Heading 3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</Btn>
      <span className="mx-1 h-5 w-px bg-slate-200" />
      <Btn label="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>•</Btn>
      <Btn label="Numbered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>1.</Btn>
      <Btn label="Quote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>&ldquo;</Btn>
      <Btn label="Code block" active={editor.isActive("codeBlock")} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>{"</>"}</Btn>
      <span className="mx-1 h-5 w-px bg-slate-200" />
      <Btn label="Link" active={editor.isActive("link")} onClick={addLink} icon="link" />
      <Btn label="Upload image" onClick={onImage} icon="image" />
      <span className="mx-1 h-5 w-px bg-slate-200" />
      <Btn label="Undo" onClick={() => editor.chain().focus().undo().run()}>↶</Btn>
      <Btn label="Redo" onClick={() => editor.chain().focus().redo().run()}>↷</Btn>
    </div>
  );
}

export default function Editor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3, 4] } }),
      LinkExt.configure({ openOnClick: false, HTMLAttributes: { rel: "noopener noreferrer" } }),
      ImageExt,
      Placeholder.configure({ placeholder: "Write your post…" }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class: "prose prose-slate max-w-none min-h-[340px] px-4 py-4 focus:outline-none",
      },
    },
    onUpdate: ({ editor: e }) => onChange(e.getHTML()),
  });
  const fileRef = useRef<HTMLInputElement>(null);

  const onImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !editor) return;
    const { url, error } = await uploadImage(file);
    if (url) editor.chain().focus().setImage({ src: url }).run();
    else toast(error || "Couldn't upload image", "err");
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onImageFile} />
      {editor ? (
        <>
          <Toolbar editor={editor} onImage={() => fileRef.current?.click()} />
          <EditorContent editor={editor} />
        </>
      ) : (
        <div className="min-h-[340px] px-4 py-4 text-sm text-slate-400">Loading editor…</div>
      )}
    </div>
  );
}
