import { h } from 'preact';
import { useState, useRef } from 'preact/hooks';
import { Viewer as ToastUIViewer } from '@toast-ui/react-editor';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

export const Viewer = () => {
  return (
    <div>
      <ToastUIViewer
        initialValue="## hello react editor world!"
      />
    </div>
  );
};
