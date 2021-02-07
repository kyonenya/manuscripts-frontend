import { h, Fragment } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import { Viewer as ToastUIViewer } from '@toast-ui/react-editor';
import './css/toastui-editor-viewer.css';
import dayjs from 'dayjs';

export const Viewer = ({ initArticle, uuid }: {
  initArticle: any,
  uuid: string,
}) => {
  const viewerRef: any = useRef();
  useEffect(() => {
    viewerRef.current.getInstance().setMarkdown(initArticle.text);
  }, [initArticle]);
  return (
    <Fragment>
      <header class="bl_text_header">
        <time class="bl_text_date">
          {dayjs(initArticle.created_at).format('YYYY-MM-DD HH:mm')}
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
