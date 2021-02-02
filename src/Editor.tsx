import { h } from 'preact';
import { useState } from 'preact/hooks';
import SimpleMDE from 'react-simplemde-editor';

export const Editor = () => {
  const [text, setText] = useState('');
  // @ts-ignore
  return <SimpleMDE
    onChange={setText}
  />;
}
