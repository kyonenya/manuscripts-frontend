import { h } from 'preact';
import { useState, useRef } from 'preact/hooks';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor as ToastUIEditor } from '@toast-ui/react-editor';

export const Editor = () => {
  const editorRef: any = useRef();
  const handleBold = () => {
    editorRef.current.getInstance().exec('Bold');
  };
    const handleGetText = () => {
    const md = editorRef.current.getInstance().getMarkdown();
    console.log(md);
  };
  return (
    <div>
      <ToastUIEditor
        initialValue="hello react editor world!"
        previewStyle="tab"
        height="600px"
        initialEditType="markdown"
        useCommandShortcut={true}
        ref={editorRef}
        usageStatistics={false}
      />
      <button onClick={handleBold}>make bold</button>
      <button onClick={handleGetText}>get text</button>
    </div>
  );
};
