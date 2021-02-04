import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import { Viewer as ToastUIViewer } from '@toast-ui/react-editor';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

export const Viewer = ({ entry }: { entry: any }) => {
  const viewerRef: any = useRef();
  useEffect(() => {
    viewerRef.current.getInstance().setMarkdown(entry.text);
  }, [entry]);
  return (
    <ToastUIViewer
      ref={viewerRef}
    />
  );
};
