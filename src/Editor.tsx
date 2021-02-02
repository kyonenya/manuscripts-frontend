import { h } from 'preact';
import { useState, useRef } from 'preact/hooks';
import { Editor as ToastUIEditor } from '@toast-ui/react-editor';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

export const Editor = () => {
  const editorRef: any = useRef();
  const handleBold = () => {
    editorRef.current.getInstance().exec('Italic');
  };
  const handleGetText = () => {
    const md = editorRef.current.getInstance().getMarkdown();
    alert(md);
  };
  const handleGetHtml = () => {
    const html = editorRef.current.getInstance().getHtml();
    alert(html);
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
      <button onClick={handleGetHtml}>get html</button>
    </div>
  );
};
