import { h, Fragment } from 'preact';
import { useState, useEffect, useRef, Ref } from 'preact/hooks';
import EasyMDEReact from 'react-simplemde-editor';
import "easymde/dist/easymde.min.css";
import { articlable } from './types';

export const Editor = (props: {
  article: articlable,
  uuid: string,
  isEdit: boolean,
}) => {
  const [text, setText] = useState('');
  const editorRef: Ref<any> = useRef();

  useEffect(() => {
    setText(props.article.text);
    if (!props.isEdit) editorRef.current.togglePreview();
  }, [props.article]);

  return (
    <Fragment>
      <EasyMDEReact
//        value={text}
        getMdeInstance={(instance) => editorRef.current = instance}
        onChange={setText}
      />
      <button onClick={() => console.log(editorRef.current.value())}>Value</button>
      <button onClick={() => console.log(editorRef.current.value('Setted Value'))}>SetValue</button>
    </Fragment>
  );
};
