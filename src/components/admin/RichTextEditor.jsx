import { useMemo, useRef } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { toast } from "sonner";
import { base44 } from "@/api/base44Client";

const TOOLBAR = [
  [{ header: [2, 3, false] }],
  ["bold", "italic", "underline"],
  [{ list: "ordered" }, { list: "bullet" }],
  ["blockquote", "link", "image"],
  ["clean"],
];

export default function RichTextEditor({ value, onChange }) {
  const quillRef = useRef(null);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: TOOLBAR,
        handlers: {
          image: () => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.onchange = async () => {
              const file = input.files?.[0];
              if (!file) return;
              try {
                const { file_url } = await base44.integrations.Core.UploadPublicFile({ file });
                const editor = quillRef.current?.getEditor();
                if (!editor) return;
                const range = editor.getSelection(true);
                const index = range ? range.index : editor.getLength();
                editor.insertEmbed(index, "image", file_url);
                editor.setSelection(index + 1, 0);
              } catch (err) {
                toast.error(err?.message ?? "Tải ảnh lên thất bại.");
              }
            };
            input.click();
          },
        },
      },
    }),
    []
  );

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-paper [&_.ql-container]:min-h-[280px] [&_.ql-editor]:min-h-[280px] [&_.ql-editor]:font-body [&_.ql-editor]:text-[15px] [&_.ql-toolbar]:border-line [&_.ql-toolbar]:bg-cream/50">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder="Soạn nội dung bài viết..."
      />
    </div>
  );
}