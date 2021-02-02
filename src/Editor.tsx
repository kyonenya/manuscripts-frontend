import { h } from 'preact';
import { useState } from 'preact/hooks';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor as ToastUiEditor } from '@toast-ui/react-editor';
 
export const Editor = () => (
  <ToastUiEditor
    initialValue="hello react editor world!"
    previewStyle="vertical"
    height="600px"
    initialEditType="markdown"
    useCommandShortcut={true}
  />
);
