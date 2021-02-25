import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { useSearchParam } from 'react-use';
import { Article } from './Article';
import { PageList } from './PageList';
import { articlable } from './types';

export const Manuscripts = () => {
  const [articles, setArticles] = useState<articlable[]>([]);
  const [isModified, setIsModified] = useState(false);

  const uuid = useSearchParam('uuid');
  const isNew = !!useSearchParam('new');

  useEffect(() => {
    const limitNum = 7;
    fetch(`https://manuscripts.herokuapp.com/api/entries?limit=${limitNum}`)
      .then(response => response.json())
      .then(articles => setArticles(articles))
      .then(_ => setIsModified(false));
  }, [isModified]);

  return (
    uuid || isNew
      ? <Article
        initArticle={articles.find(article => article.uuid === uuid) ?? null}
        uuid={uuid ?? ''}
        isNew={isNew}
        setModified={() => setIsModified(true)}
      />
     : <PageList articles={articles} />
  );
};
