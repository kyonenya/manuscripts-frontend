import { h, Fragment } from 'preact';
import { useState, useEffect, useRef, Ref } from 'preact/hooks';
import { JSXInternal } from 'preact/src/jsx';
import dayjs from 'dayjs';
import { Editor as ToastUIEditor } from '@toast-ui/react-editor';
import { entrable } from './types';
import './css/codemirror.css';
import './css/toastui-editor-only.css';

export const Editor = ({ initEntry, uuid, isNew }: {
  initEntry: entrable,
  uuid: string,
  isNew: boolean,
}) => {
  const [tagcsv, setTagCsv] = useState('');

  const editorRef: Ref<ToastUIEditor> = useRef();

  useEffect(() => {
    editorRef.current.getInstance().setMarkdown(initEntry.text);
    setTagCsv(initEntry.tags.join(','));
  }, [initEntry]);

  const handleTagsChange = (e: JSXInternal.TargetedEvent) => {
    const inputElement = e.target as HTMLInputElement;
    setTagCsv(inputElement.value);
  };

  const handleUpdate = () => {
    const text = editorRef.current.getInstance().getMarkdown();
    const entry2 = {
      text,
//      tags: tagcsv.split(','),
      tags: ['dummyTag1', 'dummyTag2'],
      uuid,
      starred: false,
    };
    console.log(entry2);
    fetch(`https://manuscripts.herokuapp.com/api/entries/${uuid}`, {
      method: isNew ? 'POST' : 'PUT',
      body: JSON.stringify(entry2),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err));
  };
  return (
    <Fragment>
      <header class="bl_text_header">
        <time class="bl_text_date">
          {dayjs(initEntry.created_at).format('YYYY-MM-DD HH:mm')}
        </time>
      </header>
      <ToastUIEditor
        initialValue=""
        previewStyle="tab"
        height="600px"
        initialEditType="markdown"
        useCommandShortcut={true}
        ref={editorRef}
        usageStatistics={false}
      />
      <input type="text" class="bl_editor_title" placeholder="タグ" onChange={handleTagsChange} value={tagcsv}></input>
      <button onClick={handleUpdate}>Update</button>
    </Fragment>
  );
};
