import { h } from 'preact';
import { useEffect, Ref } from 'preact/hooks';
import styled from 'styled-components';
import EasyMDEReact from 'react-simplemde-editor';
//import EasyMDE from 'easymde';
import "./css/easymde.css";
import "./css/codemirror.css";
import { articlable } from './types';

export const Editor = (props: {
  article: articlable,
  isNew: boolean,
  editorRef: Ref<EasyMDE>;
}) => {
  useEffect(() => {
    // @ts-ignore
//    if (!props.isNew) props.editorRef.current.togglePreview();
  }, []);

  useEffect(() => {
    if (!props.isNew) props.editorRef.current.value(props.article.text);
  }, [props.article]);

  return (
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
          }: {}
        }
      />
    </EditorWrapper>
  );
};

const EditorWrapper = styled.div`
  @media screen and (max-width: 559px) {
    text-align: justify;
  }

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
