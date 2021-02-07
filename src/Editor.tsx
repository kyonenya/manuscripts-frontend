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
  }, [initArticle]);

  const handleSubmit = () => {
    const text = editorRef.current.getInstance().getMarkdown();
    const article = {
      text,
      tags: ['dummyTag1', 'dummyTag2'],
      uuid,
      starred: false,
    };
    console.log(article);
    fetch(`https://manuscripts.herokuapp.com/api/entries/${uuid}`, {
      method: isNew ? 'POST' : 'PUT',
      body: JSON.stringify(article),
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
      <EditorMenu
        createdAt={dayjs(initArticle.created_at).format('YYYY-MM-DD HH:mm')}
        handleSubmit={handleSubmit}
      />
      <ToastUIEditor
        initialValue=""
        previewStyle="tab"
        height="90vh"
        initialEditType="markdown"
        useCommandShortcut={true}
        ref={editorRef}
        usageStatistics={false}
      />
    </Fragment>
  );
};
