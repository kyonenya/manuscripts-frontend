import { h, Fragment } from 'preact';
import { useState, useEffect, useRef, Ref } from 'preact/hooks';
import styled from 'styled-components';
import EasyMDEReact from 'react-simplemde-editor';
//import EasyMDE from 'easymde';
import "./css/easymde.css";
import "./css/codemirror.css";
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { HeaderMenu } from './HeaderMenu';
import { useSubmit } from './useSubmit';
import { articlable } from './types';

export const Editor = (props: {
  article: articlable,
  uuid: string,
  isNew: boolean,
}) => {
  const { submit, isSubmitting } = useSubmit();
  const editorRef: Ref<EasyMDE> = useRef();

  useEffect(() => {
    // @ts-ignore
    if (!props.isNew) editorRef.current.togglePreview();
  }, []);

  useEffect(() => {
    if (!props.isNew) editorRef.current.value(props.article.text);
  }, [props.article]);

  return (
    <Fragment>
      <HeaderMenu
        createdAt={
          props.isNew
            ? dayjs().format('YYYY-MM-DD HH:mm')
            : props.article.created_at
              ? dayjs(props.article.created_at).format('YYYY-MM-DD HH:mm')
              : '...'
          }
        handleSubmit={() => submit({
          article: {
            text: editorRef.current.value(),
            tags: ['dummyTag1', 'dummyTag2'],
            uuid: props.isNew ? uuidv4().replace(/-/g, '') : props.uuid,
            starred: false,
          },
          isNew: props.isNew,
        })}
        isSubmitting={isSubmitting}
      />
      <EditorWrapper>
        <EasyMDEReact
          getMdeInstance={(instance: EasyMDE) => editorRef.current = instance}
          options={props.isNew
            ? {
              autosave: {
                enabled: true,
                uniqueId: 'new',
                delay: 5000,
              },
            }
            : {}
          }
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
