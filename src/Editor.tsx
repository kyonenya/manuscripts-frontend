import { h, Fragment } from 'preact';
import { useState, useEffect, useRef, Ref } from 'preact/hooks';
import EasyMDEReact from 'react-simplemde-editor';
import EasyMDE from 'easymde';
import "easymde/dist/easymde.min.css";
import dayjs from 'dayjs';
import { HeaderMenu } from './HeaderMenu';
import { articlable } from './types';

export const Editor = (props: {
  article: articlable,
  uuid: string,
  isEdit: boolean,
}) => {
  const [isLoading, setIsLoading] = useState(false);
//  const editorRef: Ref<any> = useRef();
  const editorRef: Ref<EasyMDE> = useRef();
//  error TS2576: Property 'togglePreview' is a static member of type 'EasyMDE'.

  useEffect(() => {
    editorRef.current.value(props.article.text);
    if (!props.isEdit) editorRef.current.togglePreview();
  }, [props.article]);

  const handleSubmit = () => {
    setIsLoading(true);
    const text = editorRef.current.value();
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
      <EasyMDEReact
        getMdeInstance={(instance: EasyMDE) => editorRef.current = instance}
      />
    </Fragment>
  );
};
