import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { useSearchParam } from 'react-use';
import { Article } from './Article';
import { PageList } from './PageList';
import { articlable } from './types';

export const Manuscripts = () => {
//  const uuid = useSearchParam('uuid');
  const isEditMode = !!useSearchParam('edit');
  const [articles, setArticles] = useState<articlable[]>([]);

  const uuid = '7bd2954f3a5c41f09e440e1f9e373f13';

  useEffect(() => {
    const limitNum = 5;
    fetch(`https://manuscripts.herokuapp.com/api/entries?limit=${limitNum}`)
      .then(response => response.json())
      .then(articles => setArticles(articles));
  }, []);

  return (
    uuid
      ? <Article
        initArticle={articles.find(article => article.uuid === uuid) ?? null}
        uuid={uuid}
        isEditMode={isEditMode}
      />
     : <PageList articles={articles} />
  );
};
