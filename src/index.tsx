import { h, render } from 'preact'; 
import SimpleMDE from 'react-simplemde-editor';

export const MDE = () => {
  // @ts-ignore
  return <SimpleMDE />;
}

render(
  <MDE />,
  document.querySelector('#root')!
);
