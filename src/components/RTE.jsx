import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";

import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading1,
  Heading2,
  Image as ImageIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  Quote,
  Redo,
  Undo,
} from "lucide-react";

function ToolbarButton({ active, onClick, children, title }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-2 rounded-lg transition-all duration-200 hover:scale-105
        ${active
          ? "bg-blue-500 text-white shadow-md"
          : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
        }`}
    >
      {children}
    </button>
  );
}

function ToolbarDivider() {
  return <div className="w-px h-6 bg-gray-300 mx-1" />;
}

function LinkModal({ isOpen, onClose, onSubmit, initialUrl }) {
  const [url, setUrl] = useState(initialUrl || "");

  useEffect(() => {
    setUrl(initialUrl || "");
  }, [initialUrl]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit(url.trim());
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 shadow-2xl max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Insert Link</h3>

        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          autoFocus
        />

        <div className="flex gap-3 mt-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Insert
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function ImageModal({ isOpen, onClose, onSubmit }) {
  const [url, setUrl] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!url.trim()) return;
    onSubmit(url.trim());
    setUrl("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 shadow-2xl max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Insert Image</h3>

        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          autoFocus
        />

        <div className="flex gap-3 mt-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Insert
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function TipTapEditor({ value, onChange }) {
  const [linkModal, setLinkModal] = useState({ isOpen: false, url: "" });
  const [imageModal, setImageModal] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: true,
        autolink: true,
        linkOnPaste: true,
      }),
      Image,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML()); // ✅ HTML output
    },
  });

  // Keep editor synced when editing an existing post
  useEffect(() => {
    if (!editor) return;
    const html = editor.getHTML();
    if ((value || "") !== html) {
      editor.commands.setContent(value || "", false);
    }
  }, [value, editor]);

  if (!editor) return null;

  const openLinkModal = () => {
    const previousUrl = editor.getAttributes("link").href || "";
    setLinkModal({ isOpen: true, url: previousUrl });
  };

  const handleLinkSubmit = (url) => {
    if (!url) {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().setLink({ href: url }).run();
  };

  const handleImageSubmit = (url) => {
    editor.chain().focus().setImage({ src: url }).run();
  };

  return (
    <>
      <div className="w-full rounded-xl border-2 border-gray-200 bg-white overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-1 p-3 border-b-2 border-gray-200 bg-linear-to-r from-gray-50 to-white">
          <ToolbarButton
            active={editor.isActive("heading", { level: 1 })}
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            title="Heading 1"
          >
            <Heading1 size={18} />
          </ToolbarButton>

          <ToolbarButton
            active={editor.isActive("heading", { level: 2 })}
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            title="Heading 2"
          >
            <Heading2 size={18} />
          </ToolbarButton>

          <ToolbarDivider />

          <ToolbarButton
            active={editor.isActive("bold")}
            onClick={() => editor.chain().focus().toggleBold().run()}
            title="Bold"
          >
            <Bold size={18} />
          </ToolbarButton>

          <ToolbarButton
            active={editor.isActive("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            title="Italic"
          >
            <Italic size={18} />
          </ToolbarButton>

          <ToolbarDivider />

          <ToolbarButton
            active={editor.isActive("bulletList")}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            title="Bullet List"
          >
            <List size={18} />
          </ToolbarButton>

          <ToolbarButton
            active={editor.isActive("orderedList")}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            title="Numbered List"
          >
            <ListOrdered size={18} />
          </ToolbarButton>

          <ToolbarButton
            active={editor.isActive("blockquote")}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            title="Quote"
          >
            <Quote size={18} />
          </ToolbarButton>

          <ToolbarButton
            active={editor.isActive("codeBlock")}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            title="Code Block"
          >
            <Code size={18} />
          </ToolbarButton>

          <ToolbarDivider />

          <ToolbarButton active={editor.isActive("link")} onClick={openLinkModal} title="Insert Link">
            <Link2 size={18} />
          </ToolbarButton>

          <ToolbarButton active={false} onClick={() => setImageModal(true)} title="Insert Image">
            <ImageIcon size={18} />
          </ToolbarButton>

          <ToolbarDivider />

          <ToolbarButton
            active={editor.isActive({ textAlign: "left" })}
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            title="Align Left"
          >
            <AlignLeft size={18} />
          </ToolbarButton>

          <ToolbarButton
            active={editor.isActive({ textAlign: "center" })}
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            title="Align Center"
          >
            <AlignCenter size={18} />
          </ToolbarButton>

          <ToolbarButton
            active={editor.isActive({ textAlign: "right" })}
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            title="Align Right"
          >
            <AlignRight size={18} />
          </ToolbarButton>

          <ToolbarDivider />

          <ToolbarButton active={false} onClick={() => editor.chain().focus().undo().run()} title="Undo">
            <Undo size={18} />
          </ToolbarButton>

          <ToolbarButton active={false} onClick={() => editor.chain().focus().redo().run()} title="Redo">
            <Redo size={18} />
          </ToolbarButton>
        </div>

        {/* Editor Area */}
        <div
          className="p-6 min-h-100S outline-none focus:outline-none
            [&_.ProseMirror]:outline-none
            [&_.ProseMirror_h1]:text-3xl [&_.ProseMirror_h1]:font-bold [&_.ProseMirror_h1]:mt-4 [&_.ProseMirror_h1]:mb-2
            [&_.ProseMirror_h2]:text-2xl [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h2]:mt-3 [&_.ProseMirror_h2]:mb-2
            [&_.ProseMirror_p]:my-2
            [&_.ProseMirror_blockquote]:border-l-4 [&_.ProseMirror_blockquote]:border-gray-300 [&_.ProseMirror_blockquote]:pl-4 [&_.ProseMirror_blockquote]:italic [&_.ProseMirror_blockquote]:text-gray-600 [&_.ProseMirror_blockquote]:my-4
            [&_.ProseMirror_pre]:bg-gray-900 [&_.ProseMirror_pre]:text-gray-100 [&_.ProseMirror_pre]:p-4 [&_.ProseMirror_pre]:rounded-lg [&_.ProseMirror_pre]:overflow-x-auto [&_.ProseMirror_pre]:my-4
            [&_.ProseMirror_code]:bg-gray-100 [&_.ProseMirror_code]:px-1 [&_.ProseMirror_code]:rounded
            [&_.ProseMirror_img]:max-w-full [&_.ProseMirror_img]:rounded-lg [&_.ProseMirror_img]:my-2
            [&_.ProseMirror_a]:text-blue-500 [&_.ProseMirror_a]:underline
            [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-6 [&_.ProseMirror_ul]:my-2
            [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-6 [&_.ProseMirror_ol]:my-2"
        >
          <EditorContent editor={editor} />
        </div>
      </div>

      <LinkModal
        isOpen={linkModal.isOpen}
        onClose={() => setLinkModal({ isOpen: false, url: "" })}
        onSubmit={handleLinkSubmit}
        initialUrl={linkModal.url}
      />

      <ImageModal isOpen={imageModal} onClose={() => setImageModal(false)} onSubmit={handleImageSubmit} />
    </>
  );
}

export default function RTE({ name = "content", control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { value, onChange } }) => (
          <TipTapEditor value={value} onChange={onChange} />
        )}
      />
    </div>
  );
}
