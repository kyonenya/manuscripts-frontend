import { h, Fragment } from 'preact';
import { useState, useEffect, useRef, Ref } from 'preact/hooks';
import { JSXInternal } from 'preact/src/jsx';
import dayjs from 'dayjs';
import { Editor as ToastUIEditor } from '@toast-ui/react-editor';
import { HeaderMenu } from './HeaderMenu';
import { articlable } from './types';
import './css/codemirror.css';
import './css/toastui-editor-only.css';

export const Editor = (props: {
  article: articlable,
  uuid: string,
  /* isNew: boolean, */
}) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const editorRef: Ref<ToastUIEditor> = useRef();

  useEffect(() => {
    editorRef.current.getInstance().setMarkdown(props.article.text);
  }, [props.article]);

  const handleSubmit = () => {
    setIsLoading(true);

    const text = editorRef.current.getInstance().getMarkdown();
    const article = {
      text,
      tags: ['dummyTag1', 'dummyTag2'],
      uuid: props.uuid,
      starred: false,
    };
    fetch(`https://manuscripts.herokuapp.com/api/entries/${props.uuid}`, {
//      method: isNew ? 'POST' : 'PUT',
      method: 'PUT',
      body: JSON.stringify(article),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setIsLoading(false);
      })
      .catch(err => console.error(err));
  };
  return (
    <Fragment>
      <HeaderMenu
        createdAt={dayjs(props.article.created_at).format('YYYY-MM-DD HH:mm')}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
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
