import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';
import type { Editor as TinyMCEEditor } from 'tinymce';
import { AppDispatch, RootState } from '../store';
import { addNewPage, updatePage } from '../pageSlice';
import { useDispatch } from 'react-redux';

const TextEditor = () => {
  const currentPage = useSelector((state: RootState) => state.page.currentPage)
  const dispatch = useDispatch<AppDispatch>()

  const [title, setTitle] = useState('Title')
  const editorRef = useRef<TinyMCEEditor | null>(null);

  useEffect(() => {
    if (currentPage) {
      setTitle(currentPage?.title)
    }
  })

  const handleSubmit = () => {
    if (currentPage) {
      dispatch(updatePage({
        title,
        // handleSubmit is only enabled if !!editorRef.current
        // fallback is to satisfy TS
        body: editorRef.current?.getContent() || '',
        id: currentPage.id
      }))
    } else {
      dispatch(addNewPage({
        title,
        body: editorRef.current?.getContent() || '',
      }))
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
        <button disabled={!editorRef.current} onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
};

export default TextEditor;
