import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks'; 
import { Editor } from './Editor';
import { Viewer } from './Viewer';

export const Entry = () => {
  const uuid = '7bd2954f3a5c41f09e440e1f9e373f13';
  const isEditMode = true;

  const [entry, setEntry] = useState({});
  useEffect(() => {
    fetch(`https://manuscripts.herokuapp.com/api/entries/${uuid}`)
      .then(response => response.json())
      .then(entry => setEntry(entry));
  }, []);
  return (
    isEditMode
      ? <Editor entry={entry} uuid={uuid} />
      : <Viewer entry={entry} uuid={uuid} />
  );
};
