import { h, Fragment } from 'preact';
import { useState, useEffect, useRef, Ref } from 'preact/hooks';
import styled from 'styled-components';
import EasyMDEReact from 'react-simplemde-editor';
import "./css/easymde.css";
import "./css/codemirror.css";
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { useSubmit } from './useSubmit';
import { HeaderMenu } from './HeaderMenu';
import { articlable } from './types';

export const NewEditor = () => {
  const { submit, isLoading } = useSubmit();
  const editorRef: Ref<EasyMDE> = useRef();

  return (
    <Fragment>
      <HeaderMenu
        createdAt={
            dayjs().format('YYYY-MM-DD HH:mm')
          }
        handleSubmit={() => submit({
          article: {
            text: editorRef.current.value(),
            tags: ['dummyTag1', 'dummyTag2'],
            uuid: uuidv4().replace(/-/g, ''),
            starred: false,
          },
          isNew: true,
        })}
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
