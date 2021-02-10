import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { v4 as uuidv4 } from 'uuid';
import { Editor } from './Editor';
import { Viewer } from './Viewer';
import { articlable, emptyArticle } from './types';

export const Article = (props: {
  initArticle: articlable|null,
  uuid: string,
  isEditMode: boolean,
}) => {
//  const isNew = true;
  const [article, setArticle] = useState<articlable>(emptyArticle);

  useEffect(() => {
    if (props.initArticle) return setArticle(props.initArticle);
    fetch(`https://manuscripts.herokuapp.com/api/entries/${props.uuid}`)
      .then(response => response.json())
      .then(article => setArticle(article));
  }, []);

  return (    
  <section class="ly_cont">
    {
      props.isEditMode
        ? <Editor article={article} uuid={props.uuid} /* isNew={isNew} *//>
        : <Viewer article={article} uuid={props.uuid} />
    }
    </section>
  );
};

//uuidv4().replace(/-/g, '')
//7bd2954f3a5c41f09e440e1f9e373f13
//034392a0ef2f46e4842e249c9bf6dfc5
