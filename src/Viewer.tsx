import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import { Viewer as ToastUIViewer } from '@toast-ui/react-editor';
import './css/toastui-editor-viewer.css';

export const Viewer = ({ initEntry, uuid }: {
  initEntry: any,
  uuid: string,
}) => {
  const viewerRef: any = useRef();
  useEffect(() => {
    viewerRef.current.getInstance().setMarkdown(initEntry.text);
  }, [initEntry]);
  return (
    <ToastUIViewer
      ref={viewerRef}
    />
  );
};
