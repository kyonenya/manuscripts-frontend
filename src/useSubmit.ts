import { useState } from 'preact/hooks';
import { articlable } from './types';

export const useSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = (article: articlable, isNew: boolean, idToken: string) => {
    setIsSubmitting(true);
    fetch(`https://manuscripts.herokuapp.com/api/entries/${article.uuid}`, {
      method: isNew ? 'POST' : 'PUT',
      body: JSON.stringify(article),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer: ${idToken}`,
      },
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .then(_ => setIsSubmitting(false))
      .catch(err => console.error(err));
  };

  return { submit, isSubmitting };
};
