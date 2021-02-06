import { h, Fragment } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import { Viewer as ToastUIViewer } from '@toast-ui/react-editor';
import './css/toastui-editor-viewer.css';
import dayjs from 'dayjs';

export const Viewer = ({ initEntry, uuid }: {
  initEntry: any,
  uuid: string,
}) => {
  const viewerRef: any = useRef();
  useEffect(() => {
    viewerRef.current.getInstance().setMarkdown(initEntry.text);
  }, [initEntry]);
  return (
    <Fragment>
      <header class="bl_text_header">
        <time class="bl_text_date">
          {dayjs(initEntry.created_at).format('YYYY-MM-DD HH:mm')}
        </time>
      </header>
      {/* <div class="bl_text"> */}
        <ToastUIViewer
          ref={viewerRef}
        />
      {/* </div> */}
    </Fragment>
  );
};
