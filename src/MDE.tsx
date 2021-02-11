import { h } from 'preact';
import { useState } from 'preact/hooks';
import EasyMDEReact from 'react-simplemde-editor';
import "easymde/dist/easymde.min.css";

export const MDE = () => {
  const [text, setText] = useState('');
  console.log(text);

  return (
    <EasyMDEReact onChange={setText}/>
  );
};
