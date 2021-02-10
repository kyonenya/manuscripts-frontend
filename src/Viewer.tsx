import { h, Fragment } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import { Viewer as ToastUIViewer } from '@toast-ui/react-editor';
import './css/toastui-editor-viewer.css';
import dayjs from 'dayjs';
import { articlable } from './types';

export const Viewer = (props: {
  article: articlable,
  uuid: string,
}) => {
  const viewerRef: any = useRef();
  useEffect(() => {
    viewerRef.current.getInstance().setMarkdown(props.article.text);
  }, [props.article]);
  return (
    <Fragment>
      <header class="bl_text_header">
        <time class="bl_text_date">
          {dayjs(props.article.created_at).format('YYYY-MM-DD HH:mm')}
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
