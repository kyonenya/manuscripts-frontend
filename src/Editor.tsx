import { h, Fragment } from 'preact';
import { useState, useEffect, useRef, Ref } from 'preact/hooks';
import { Editor as ToastUIEditor } from '@toast-ui/react-editor';
import './css/codemirror.css';
import './css/toastui-editor-only.css';

export const Editor = ({ entry, uuid }: {
  entry: any,
  uuid: string,
}) => {
  const editorRef: any = useRef();
  const tagsRef: Ref<HTMLInputElement> = useRef();

  useEffect(() => {
    editorRef.current.getInstance().setMarkdown(entry.text);
    tagsRef.current.value = entry.tags;
  }, [entry]);

  const handleUpdate = () => {
    const text = editorRef.current.getInstance().getMarkdown();
    const tags = tagsRef.current.value.split(',');
    const entry2 = {
      text,
      tags,
      uuid,
      starred: true,
    };
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
    <Fragment>
      <ToastUIEditor
        initialValue="hello react editor world!"
        previewStyle="tab"
        height="600px"
        initialEditType="markdown"
        useCommandShortcut={true}
        ref={editorRef}
        usageStatistics={false}
      />
      <input type="text" ref={tagsRef} placeholder="タグ"></input>
      <button onClick={handleUpdate}>Update</button>
    </Fragment>
  );
};
