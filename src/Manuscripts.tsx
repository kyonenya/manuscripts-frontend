import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { useSearchParam } from 'react-use';
import { Article } from './Article';
import { PageList } from './PageList';
import { articlable } from './types';

export const Manuscripts = () => {
  const uuid = useSearchParam('uuid');
  const isEdit = !!useSearchParam('edit');
  const isNew = !!useSearchParam('new');
  const [articles, setArticles] = useState<articlable[]>([]);

  useEffect(() => {
    const limitNum = 5;
    fetch(`https://manuscripts.herokuapp.com/api/entries?limit=${limitNum}`)
      .then(response => response.json())
      .then(articles => setArticles(articles));
  }, []);

  return (
    uuid || isNew
      ? <Article
        initArticle={articles.find(article => article.uuid === uuid) ?? null}
        uuid={uuid ?? ''}
        isEdit={isEdit}
        isNew={isNew}
      />
     : <PageList articles={articles} />
  );
};
