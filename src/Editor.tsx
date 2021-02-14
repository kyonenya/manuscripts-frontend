import { h, Fragment } from 'preact';
import { useState, useEffect, useRef, Ref } from 'preact/hooks';
import styled from 'styled-components';
import EasyMDEReact from 'react-simplemde-editor';
//import EasyMDE from 'easymde';
import "./css/easymde.css";
import "./css/codemirror.css";
import dayjs from 'dayjs';
import { HeaderMenu } from './HeaderMenu';
import { articlable } from './types';

export const Editor = (props: {
  article: articlable,
  uuid: string,
  isEdit: boolean,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const editorRef: Ref<EasyMDE> = useRef();

  useEffect(() => {
    // @ts-ignore
    if (!props.isEdit) editorRef.current.togglePreview();
  }, []);

  useEffect(() => {
    editorRef.current.value(props.article.text);
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
        createdAt={
          props.article.created_at
            ? dayjs(props.article.created_at).format('YYYY-MM-DD HH:mm')
            : '...'
          }
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
      <EditorWrapper>
        <EasyMDEReact
          getMdeInstance={(instance: EasyMDE) => editorRef.current = instance}
          options={{
            autosave: {
              enabled: true,
              uniqueId: props.uuid,
              delay: 5000,
            },
          }}
        />
      </EditorWrapper>
    </Fragment>
  );
};

const EditorWrapper = styled.div`
  font-family: sans-serif;
  font-size: 16px;
  line-height: 1.65;
  text-align: justify /* 均等割付 */;
`;
