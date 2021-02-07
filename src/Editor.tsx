import { h, Fragment } from 'preact';
import { useState, useEffect, useRef, Ref } from 'preact/hooks';
import { JSXInternal } from 'preact/src/jsx';
import dayjs from 'dayjs';
import { Editor as ToastUIEditor } from '@toast-ui/react-editor';
import { EditorMenu } from './EditorMenu';
import { entrable } from './types';
import './css/codemirror.css';
import './css/toastui-editor-only.css';

export const Editor = ({ initArticle, uuid, isNew }: {
  initArticle: entrable,
  uuid: string,
  isNew: boolean,
}) => {
  const editorRef: Ref<ToastUIEditor> = useRef();

  useEffect(() => {
    editorRef.current.getInstance().setMarkdown(initArticle.text);
    setTagCsv(initArticle.tags.join(','));
  }, [initArticle]);

  const handleUpdate = () => {
    const text = editorRef.current.getInstance().getMarkdown();
    const article2 = {
      text,
      tags: ['dummyTag1', 'dummyTag2'],
      uuid,
      starred: false,
    };
    console.log(article2);
    fetch(`https://manuscripts.herokuapp.com/api/entries/${uuid}`, {
      method: isNew ? 'POST' : 'PUT',
      body: JSON.stringify(article2),
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
      <EditorMenu createdAt={dayjs(initArticle.created_at).format('YYYY-MM-DD HH:mm')} />
      <ToastUIEditor
        initialValue=""
        previewStyle="tab"
        height="600px"
        initialEditType="markdown"
        useCommandShortcut={true}
        ref={editorRef}
        usageStatistics={false}
      />
      <button onClick={handleUpdate}>Update</button>
    </Fragment>
  );
};
