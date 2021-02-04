import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import { Viewer as ToastUIViewer } from '@toast-ui/react-editor';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

export const Viewer = () => {
  const uuid = '7bd2954f3a5c41f09e440e1f9e373f13';
  const viewerRef: any = useRef();
  useEffect(() => {
    fetch(`https://manuscripts.herokuapp.com/api/entries/${uuid}`)
      .then(response => response.json())
      .then(entry => {
        viewerRef.current.getInstance().setMarkdown(entry.text);
        console.log(entry);
      });
  }, []);

  return (
    <div>
      <ToastUIViewer
        ref={viewerRef}
        initialValue=''
      />
    </div>
  );
};
