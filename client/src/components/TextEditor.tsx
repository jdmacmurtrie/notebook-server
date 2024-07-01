import { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import type { Editor as TinyMCEEditor } from 'tinymce';

const TextEditor = () => {
  const [title, setTitle] = useState('Title')
  const editorRef = useRef<TinyMCEEditor | null>(null);
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
          initialValue="<p>This is the initial content of the editor.</p>"
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
