import { useState, useEffect } from 'preact/hooks';
import { articlable } from './types';

export const useSubmit = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (params: {
    article: articlable,
    isNew: boolean,
  }) => {
    setIsLoading(true);
    fetch(`https://manuscripts.herokuapp.com/api/entries/${params.article.uuid}`, {
      method: params.isNew ? 'POST' : 'PUT',
      body: JSON.stringify(params.article),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setIsLoading(false);
      })
      .catch(err => console.error(err));
  };
  
  return { handleSubmit, isLoading };
};
