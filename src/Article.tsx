import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { v4 as uuidv4 } from 'uuid';
import { Editor } from './Editor';
import { Viewer } from './Viewer';
import { articlable } from './types';

export const Article = (props: {
  initArticle: articlable|null,
  uuid: string,
}) => {
  const isEditMode = true;
//  const isEditMode = false;
//    const uuid = '7bd2954f3a5c41f09e440e1f9e373f13';

//  const isNew = true;
//  const isNew = false;
//  const uuid = isNew
//    ? uuidv4().replace(/-/g, '')
//    : '7bd2954f3a5c41f09e440e1f9e373f13';

//034392a0ef2f46e4842e249c9bf6dfc5

  const [initArticle, setInitArticle] = useState<articlable>({
    text: '',
    tags: [''],
    starred: false,
    uuid: '',
    created_at: '',
    modified_at: '',
  });

  useEffect(() => {
    if (props.initArticle) return setInitArticle(props.initArticle);
    fetch(`https://manuscripts.herokuapp.com/api/entries/${props.uuid}`)
      .then(response => response.json())
      .then(article => setInitArticle(article));
  }, []);

  const dummyArticle = {
    text: 'initArtcileが存在しません',
    tags: [''],
    starred: false,
    uuid: '',
    created_at: '',
    modified_at: '',
  };

  return (    
  <section class="ly_cont">
    {
      isEditMode
        ? <Editor initArticle={initArticle ?? dummyArticle} uuid={props.uuid} /* isNew={isNew} *//>
        : <Viewer initArticle={initArticle ?? dummyArticle} uuid={props.uuid} />
    }
    </section>
  );
};
