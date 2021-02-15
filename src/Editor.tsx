import { h, Fragment } from 'preact';
import { useState, useEffect, useRef, Ref } from 'preact/hooks';
import styled from 'styled-components';
import EasyMDEReact from 'react-simplemde-editor';
//import EasyMDE from 'easymde';
import "./css/easymde.css";
import "./css/codemirror.css";
import dayjs from 'dayjs';
import { HeaderMenu } from './HeaderMenu';
import { useSubmit } from './useSubmit';
import { articlable } from './types';

export const Editor = (props: {
  article: articlable,
  uuid: string,
  isEdit: boolean,
}) => {
  const { submit, isLoading } = useSubmit();
  const editorRef: Ref<EasyMDE> = useRef();

  useEffect(() => {
    // @ts-ignore
    if (!props.isEdit) editorRef.current.togglePreview();
  }, []);

  useEffect(() => {
    editorRef.current.value(props.article.text);
  }, [props.article]);

  return (
    <Fragment>
      <HeaderMenu
        createdAt={
          props.article.created_at
            ? dayjs(props.article.created_at).format('YYYY-MM-DD HH:mm')
            : '...'
          }
        handleSubmit={() => submit({
          article: {
            text: editorRef.current.value(),
            tags: ['dummyTag1', 'dummyTag2'],
            uuid: props.uuid,
            starred: false,
          },
          isNew: false,
        })}
        isLoading={isLoading}
      />
      <EditorWrapper>
        <EasyMDEReact
          getMdeInstance={(instance: EasyMDE) => editorRef.current = instance}
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
