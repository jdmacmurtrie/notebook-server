import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';
import type { Editor as TinyMCEEditor } from 'tinymce';
import './TextEditor.scss'

import { AppDispatch, RootState } from '../store';
import { addNewPage, updatePage } from '../pageSlice';

const TextEditor = () => {
  const currentPage = useSelector((state: RootState) => state.page.currentPage)
  const dispatch = useDispatch<AppDispatch>()

  const [title, setTitle] = useState('')
  const editorRef = useRef<TinyMCEEditor | null>(null);

  useEffect(() => {
    if (currentPage) {
      setTitle(currentPage?.title)
    }
  })

  const handleSave = () => {
    if (currentPage) {
      dispatch(updatePage({
        title,
        // handleSave is only enabled if !!editorRef.current.getContent()
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
      <input
        className='title'
        value={title}
        placeholder='Title'
        aria-label='Title'
        onChange={(e) => setTitle(e.target.value)}
      />
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
      <div className='submit-button'>
        <button
          disabled={!title || !editorRef.current?.getContent()}
          onClick={handleSave}>
          Save
        </button>
      </div>
    </>
  );
};

export default TextEditor;
