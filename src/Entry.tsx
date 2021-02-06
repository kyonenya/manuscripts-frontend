import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks'; 
import { Editor } from './Editor';
import { Viewer } from './Viewer';
import { entrable } from './types';

export const Entry = () => {
  const uuid = '7bd2954f3a5c41f09e440e1f9e373f13';
  const isEditMode = true;

  const [initEntry, setInitEntry] = useState<entrable>({
    text: '',
    tags: [''],
    starred: false,
    created_at: '',
    modified_at: '',
  });

  useEffect(() => {
    fetch(`https://manuscripts.herokuapp.com/api/entries/${uuid}`)
      .then(response => response.json())
      .then(entry => setInitEntry(entry));
  }, []);
  return (    
  <section class="ly_cont">
    {
      isEditMode
        ? <Editor initEntry={initEntry} uuid={uuid} />
        : <Viewer initEntry={initEntry} uuid={uuid} />
    }
    </section>
  );
};
