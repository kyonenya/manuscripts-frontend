import { h, Fragment } from 'preact';
import { useEffect, useRef, Ref } from 'preact/hooks';
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
  isNew: boolean,
  handleSubmit: () => void;
  submit: (article: articlable, isNew: boolean) => void,
  isSubmitting: boolean,
  setModified: () => void,
  editorRef: Ref<EasyMDE>;
}) => {
  useEffect(() => {
    // @ts-ignore
    if (!props.isNew) props.editorRef.current.togglePreview();
  }, []);

  useEffect(() => {
    if (!props.isNew) props.editorRef.current.value(props.article.text);
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
        handleSubmit={props.handleSubmit}
        isSubmitting={props.isSubmitting}
      />
      <EditorWrapper>
        <EasyMDEReact
          getMdeInstance={(instance: EasyMDE) => props.editorRef.current = instance}
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
  font-size: 16px;
  line-height: 1.65;
  text-align: justify /* 均等割付 */;

  /* override */
  .cm-s-easymde .cm-header-1,
  .editor-preview h1 {
    font-size: 160%;
    line-height: 160%;
  }
  .cm-s-easymde .cm-header-2,
  .editor-preview h2 {
    font-size: 130%;
    line-height: 130%;
  }
  .cm-s-easymde .cm-header-3,
  .editor-preview h3 {
    font-size: 115%;
    line-height: 115%;
  }
  .cm-s-easymde .cm-header-4,
  .editor-preview h4 {
    font-size: 105%;
    line-height: 105%;
  }
  .editor-preview ul {
    padding-inline-start: 1.5em;
  }
  .editor-preview {
    padding: 1em;
  }
`;
