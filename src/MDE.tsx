import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import EasyMDEReact from 'react-simplemde-editor';
import "easymde/dist/easymde.min.css";
import { articlable } from './types';

export const MDE = (props: {
  article: articlable,
  uuid: string,
}) => {
  const [text, setText] = useState('');
  useEffect(() => {
    setText(props.article.text);
  }, [props.article]);
  console.log(text);
  return (
    <EasyMDEReact
      value={text}
      onChange={setText}
    />
  );
};
