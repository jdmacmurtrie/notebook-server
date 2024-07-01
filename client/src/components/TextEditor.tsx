import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';
import type { Editor as TinyMCEEditor } from 'tinymce';
import { RootState } from '../store';

const TextEditor = () => {
  const currentPage = useSelector((state: RootState) => state.page.currentPage)

  const [title, setTitle] = useState('Title')
  const editorRef = useRef<TinyMCEEditor | null>(null);

  useEffect(() => {
    if (currentPage?.title !== title) {
      setTitle(currentPage?.title || "")
    }
  })

  const handleSubmit = () => {
    if (editorRef.current) {
      fetch('http://localhost:5000/add_page',
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: 'POST',
          body: JSON.stringify({
            title,
            body: editorRef.current.getContent()
          })
        })
    }
  };

  return (
    <>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <div className="editor-wrapper">
        <Editor
          apiKey={import.meta.env.VITE_TINYMCE_KEY}
          onInit={(_evt, editor) => (editorRef.current = editor)}
          initialValue={currentPage?.body || ""}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              'advlist',
              'autolink',
              'lists',
              'link',
              'image',
              'charmap',
              'preview',
              'anchor',
              'searchreplace',
              'visualblocks',
              'code',
              'fullscreen',
              'insertdatetime',
              'media',
              'table',
              'code',
              'help',
              'wordcount',
            ],
            toolbar:
              'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style:
              'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          }}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
};

export default TextEditor;
