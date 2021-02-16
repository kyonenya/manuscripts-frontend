import { h, Fragment } from 'preact';
import { useEffect, useRef, Ref } from 'preact/hooks';
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
  isNew: boolean,
  setModified: () => void,
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

  const handleSubmit = () => {
    submit({
      article: {
        text: editorRef.current.value(),
        tags: ['dummyTag1', 'dummyTag2'],
        uuid: props.isNew ? uuidv4().replace(/-/g, '') : props.article.uuid,
        starred: false,
      },
      isNew: props.isNew,
    });
    props.setModified();
  };

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
        handleSubmit={handleSubmit}
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
