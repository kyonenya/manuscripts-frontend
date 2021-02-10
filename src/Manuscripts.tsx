import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { useSearchParam } from 'react-use';
import { Article } from './Article';
import { PageList } from './PageList';

export const Manuscripts = () => {
  const uuid = useSearchParam('uuid');
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const limitNum = 5;
    fetch(`https://manuscripts.herokuapp.com/api/entries?limit=${limitNum}`)
      .then(response => response.json())
      .then(articles => setArticles(articles));
  }, []);

  return (
    uuid
      ? <Article />
      : <PageList articles={articles} />
  );
};
