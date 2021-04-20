import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { useSearchParam } from 'react-use';
import { Article } from './Article';
import { PageList } from './PageList';
import { articlable } from './types';

export const Manuscripts = (props: {
  idToken: string;
}) => {
  const [articles, setArticles] = useState<articlable[]>([]);
  const [isModified, setIsModified] = useState(false);

  const uuid = useSearchParam('uuid');
  const isNew = !!useSearchParam('new');

  useEffect(() => {
    if (!props.idToken) return;
    const limitNum = 100;
    fetch(`https://manuscripts.herokuapp.com/api/entries?limit=${limitNum}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer: ${props.idToken}`,
      },
    })
      .then(response => response.json())
      .then(articles => setArticles(articles))
      .then(_ => setIsModified(false))
      .catch(err => console.error(err));
  }, [isModified, props.idToken]);

  return (
    uuid || isNew
      ? <Article
        initArticle={articles.find(article => article.uuid === uuid) ?? null}
        uuid={uuid ?? ''}
        isNew={isNew}
        setModified={() => setIsModified(true)}
        idToken={props.idToken}
      />
     : <PageList articles={articles} />
  );
};
