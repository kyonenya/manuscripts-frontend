import { h, Fragment } from 'preact';
import { useState, useEffect, useRef, Ref } from 'preact/hooks';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { HeaderMenu } from './HeaderMenu';
import { Editor } from './Editor';
import { Container } from './styled/Container';
import { useSubmit } from './useSubmit';
import { articlable, emptyArticle } from './types';

export const Article = (props: {
  initArticle: articlable|null,
  uuid: string,
  isNew: boolean,
  setModified: () => void,
  idToken: string,
}) => {
  const [article, setArticle] = useState<articlable>(emptyArticle);
  const [isStarred, setIsStarred] = useState(false);
  const [tagCsv, setTagCsv] = useState('');
  const { submit, isSubmitting } = useSubmit();
  const editorRef: Ref<EasyMDE> = useRef();

  useEffect(() => {
    if (!props.uuid) return;
    if (!props.idToken) return;
    if (props.initArticle) {
      setArticle(props.initArticle);
      setIsStarred(props.initArticle.starred);
      if (props.initArticle.tags) {
        setTagCsv(props.initArticle.tags.join(','));
      }
      return;
    };
    fetch(`https://manuscripts.herokuapp.com/api/entries/${props.uuid}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer: ${props.idToken}`,
      },
    })
      .then(response => response.json())
      .then(article => {
        setArticle(article);
        setIsStarred(article.starred);
        if (article.tags) {
          setTagCsv(article.tags.join(','));
        }
      })
      .catch(err => console.error(err));
  }, [props.idToken]);

  const handleSubmit = () => {
    if (!props.idToken) return;
    submit({
      text: editorRef.current.value(),
      tags: tagCsv ? tagCsv.split(',') : [''],
      uuid: props.isNew ? uuidv4().replace(/-/g, '') : article.uuid,
      starred: isStarred,
    }, props.isNew, props.idToken);
    props.setModified();
    if (props.isNew) {
      localStorage.setItem('smde_new', '');
      history.pushState({}, '', location.pathname + '?');
    };
  };

  const handleDelete = () => {
    if (!props.uuid) return;
    if (!props.idToken) return;
    fetch(`https://manuscripts.herokuapp.com/api/entries/${props.uuid}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer: ${props.idToken}`,
      },
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .then(_ => props.setModified())
      // TODO リダイレクトの正しいやり方
      .then(_ => history.pushState({}, '', location.pathname + '?'))
      .catch(err => console.error(err));
  }

  return (
    <Fragment>
      <HeaderMenu
        createdAt={
          props.isNew
            ? dayjs().format('YYYY-MM-DD HH:mm')
            : article.created_at
              ? dayjs(article.created_at).format('YYYY-MM-DD HH:mm')
              : '...'
          }
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        handleDelete={handleDelete}
        toggleStarred={() => setIsStarred(prev => !prev)}
        isStarred={isStarred}
        tagCsv={tagCsv}
        setTagCsv={setTagCsv}
        idToken={props.idToken}
        isNew={props.isNew}
      />
      <Container>
        <Editor
          article={article}
          isNew={props.isNew}
          editorRef={editorRef}
        />
      </Container>
    </Fragment>
  );
};
