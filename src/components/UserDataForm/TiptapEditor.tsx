import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Placeholder from "@tiptap/extension-placeholder"
import { useEffect } from "react"

interface TiptapEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const TiptapEditor = ({
  value,
  onChange,
  placeholder = "Start typing...",
}: TiptapEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder,
        emptyEditorClass: "is-editor-empty",
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value)
    }
  }, [value, editor])

  if (!editor) {
    return null
  }

  return (
    <div className="border rounded-md p-3">
      <div className="border-b p-2 flex gap-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 mx-0.5 rounded-lg font-semibold bg-gray-100 ${
            editor.isActive("bold")
              ? "bg-purple-500 text-white"
              : "hover:bg-gray-300"
          }`}
          type="button"
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 mx-0.5 rounded-lg font-semibold bg-gray-100 ${
            editor.isActive("italic")
              ? "bg-purple-500 text-white"
              : "hover:bg-gray-300"
          }`}
          type="button"
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`px-2 py-1 mx-0.5 rounded-lg font-semibold bg-gray-100 ${
            editor.isActive("underline")
              ? "bg-purple-500 text-white"
              : "hover:bg-gray-300"
          }`}
          type="button"
        >
          Underline
        </button>
        <button
          onClick={() => editor.chain().focus().setHardBreak().run()}
          className="px-2 py-1 mx-0.5 rounded-lg font-semibold bg-gray-100 hover:bg-gray-300"
          type="button"
        >
          New Line
        </button>
      </div>
      <style>{`
  .ProseMirror p.is-editor-empty:first-child::before {
    color: #adb5bd;
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
  }
  
  .ProseMirror {
    padding: 16px;
    line-height: 1.5;
    height: calc(1.5em * 5 + 32px);
    overflow-y: auto;
  }
`}</style>
      <EditorContent
        editor={editor}
        className="p-4 min-h-[200px] prose max-h-screen"
      />
    </div>
  )
}

export default TiptapEditor
