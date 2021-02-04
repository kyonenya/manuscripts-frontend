import { h, render } from 'preact'; 
import { Editor } from './Editor';
import { Viewer } from './Viewer';

render(
//  <Editor />,
  <Viewer />,
  document.querySelector('#root')!
);
