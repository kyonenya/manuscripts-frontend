import { h, Fragment } from 'preact';
import { useSearchParam } from 'react-use';
import { Article } from './Article';
import { PageList } from './PageList';

export const Manuscripts = () => {
  const uuid = useSearchParam('uuid');

  return (
    uuid
      ? <Article />
      : <PageList />
  );
};
