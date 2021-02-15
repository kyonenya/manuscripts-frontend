import { h, Fragment } from 'preact';
import { useState, useEffect, useRef, Ref } from 'preact/hooks';
import styled from 'styled-components';
import EasyMDEReact from 'react-simplemde-editor';
import "./css/easymde.css";
import "./css/codemirror.css";
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { HeaderMenu } from './HeaderMenu';
import { articlable } from './types';

export const NewEditor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const editorRef: Ref<EasyMDE> = useRef();

  const handleSubmit = () => {
    setIsLoading(true);
    const text = editorRef.current.value();
    const uuid = uuidv4().replace(/-/g, '');
    const article = {
      text,
      tags: ['dummyTag1', 'dummyTag2'],
      uuid,
      starred: false,
    };
    fetch(`https://manuscripts.herokuapp.com/api/entries/${uuid}`, {
//      method: isNew ? 'POST' : 'PUT',
      method: 'POST',
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
            dayjs().format('YYYY-MM-DD HH:mm')
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
              uniqueId: 'new',
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
