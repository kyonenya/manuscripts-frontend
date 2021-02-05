import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import { Editor as ToastUIEditor } from '@toast-ui/react-editor';
import './css/codemirror.css';
import './css/toastui-editor-only.css';

export const Editor = ({ entry, uuid }: {
  entry: any,
  uuid: string,
}) => {
  const editorRef: any = useRef();
  useEffect(() => {
    editorRef.current.getInstance().setMarkdown(entry.text);
  }, [entry]);
  const handleUpdate = () => {
    const text = editorRef.current.getInstance().getMarkdown();
    const entry2 = {
      text,
      tags: ['更新されたタグ'],
      uuid,
      starred: true,
    };
    console.log(entry2);
    fetch(`https://manuscripts.herokuapp.com/api/entries/${uuid}`, {
      method: 'PUT',
      body: JSON.stringify(entry2),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err));
  };
  return (
    <div>
      <ToastUIEditor
        initialValue="hello react editor world!"
        previewStyle="tab"
        height="600px"
        initialEditType="markdown"
        useCommandShortcut={true}
        ref={editorRef}
        usageStatistics={false}
      />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};
