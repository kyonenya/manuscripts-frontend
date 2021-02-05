import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import { Viewer as ToastUIViewer } from '@toast-ui/react-editor';
import './css/toastui-editor-viewer.css';

export const Viewer = ({ entry, uuid }: {
  entry: any,
  uuid: string,
}) => {
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
