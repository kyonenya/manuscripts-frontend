import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks'; 
import { v4 as uuidv4 } from 'uuid';
import { Editor } from './Editor';
import { Viewer } from './Viewer';
import { entrable } from './types';

export const Entry = () => {
  const isEditMode = true;
//  const isEditMode = false;
  const isNew = true;
//  const isNew = false;
  const uuid = isNew
    ? uuidv4().replace(/-/g, '')
    : '7bd2954f3a5c41f09e440e1f9e373f13';

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
        ? <Editor initEntry={initEntry} uuid={uuid} isNew={isNew}/>
        : <Viewer initEntry={initEntry} uuid={uuid} />
    }
    </section>
  );
};
