import { h, Fragment } from 'preact';
import { useSearchParam } from 'react-use';
import { Manuscripts } from './Manuscripts';

export const App = () => {
  const uuid = useSearchParam('uuid');
  console.log(uuid);

  return (
    <Manuscripts />
  );
};
