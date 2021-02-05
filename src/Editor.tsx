import { h, Fragment } from 'preact';
import { useState, useEffect, useRef, Ref } from 'preact/hooks';
import { JSXInternal } from 'preact/src/jsx';
import { Editor as ToastUIEditor } from '@toast-ui/react-editor';
import { entrable } from './types';
import './css/codemirror.css';
import './css/toastui-editor-only.css';

export const Editor = ({ initEntry, uuid }: {
  initEntry: entrable,
  uuid: string,
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
      tags: tagcsv.split(','),
      uuid,
      starred: true,
    };
    fetch(`https://manuscripts.herokuapp.com/api/entries/${uuid}`, {
      method: 'PUT',
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
      <ToastUIEditor
        initialValue="hello react editor world!"
        previewStyle="tab"
        height="600px"
        initialEditType="markdown"
        useCommandShortcut={true}
        ref={editorRef}
        usageStatistics={false}
      />
      <input type="text" placeholder="タグ" onChange={handleTagsChange} value={tagcsv}></input>
      <button onClick={handleUpdate}>Update</button>
    </Fragment>
  );
};
