import { h } from 'preact';
import { useState, useRef } from 'preact/hooks';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor as ToastUiEditor } from '@toast-ui/react-editor';

export const Editor = () => {
  const editorRef: any = useRef();
  const handleClick = () => {
    editorRef.current.getInstance().exec('Bold');
  };
  return (
    <div>
      <ToastUiEditor
        initialValue="hello react editor world!"
        previewStyle="tab"
        height="600px"
        initialEditType="markdown"
        useCommandShortcut={true}
        ref={editorRef}
        usageStatistics={false}
      />
      <button onClick={handleClick}>make bold</button>
    </div>
  );
};
