import { h, Fragment } from 'preact';
import { useState, useEffect, useRef, Ref } from 'preact/hooks';
import EasyMDEReact from 'react-simplemde-editor';
import "easymde/dist/easymde.min.css";
import { articlable } from './types';

export const MDE = (props: {
  article: articlable,
  uuid: string,
}) => {
  const editorRef: Ref<any> = useRef();

  const [text, setText] = useState('');

  useEffect(() => {
    setText(props.article.text);
    editorRef.current.togglePreview();
  }, [props.article]);

  return (
    <Fragment>
      <EasyMDEReact
        value={text}
        getMdeInstance={(instance) => editorRef.current = instance}
        onChange={setText}
      />
      <button onClick={() => console.log(editorRef.current.value())}>Value</button>
    </Fragment>
  );
};
