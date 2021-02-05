import { h, Fragment } from 'preact';
import { useState, useEffect, useRef, Ref } from 'preact/hooks';
import { Editor as ToastUIEditor } from '@toast-ui/react-editor';
import './css/codemirror.css';
import './css/toastui-editor-only.css';

type entrable = {
  text: string,
  tags: string[],
  starred: boolean,
  created_at: string,
  modified_at: string,
}

export const Editor = ({ initEntry, uuid }: {
  initEntry: entrable,
  uuid: string,
}) => {
  const editorRef: any = useRef();

  const [entry, setEntry] = useState({
    text: '',
    tags: [''],
    starred: false,
    created_at: '',
    modified_at: '',
  });

  useEffect(() => {
    editorRef.current.getInstance().setMarkdown(initEntry.text);
    setEntry({
      text: initEntry.text,
      tags: initEntry.tags,
      starred: initEntry.starred,
      created_at: initEntry.created_at,
      modified_at: initEntry.modified_at,
    });
  }, [initEntry]);

  console.log(entry);

  const handleUpdate = () => {
    const text = editorRef.current.getInstance().getMarkdown();
    const entry2 = {
      text,
//      tags,
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
      <input type="text" placeholder="タグ"></input>
      <button onClick={handleUpdate}>Update</button>
    </Fragment>
  );
};
