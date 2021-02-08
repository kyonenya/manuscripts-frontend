import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Link } from 'preact-router';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import relativeTime from 'dayjs/plugin/relativeTime';
import { articlable } from './types';

dayjs.extend(relativeTime);

const PageListItem = (props: {
  article: articlable,
}) => {
  return (
    <li>
      <Link href={'/articles/' + props.article.uuid}>
        <header class="bl_posts_header">
          <time class="bl_posts_date">
            {dayjs(props.article.created_at).format('YYYY-MM-DD')}
          </time>
        </header>
        <div class="bl_posts_summary">
          <p>
            {props.article.text.substr(0, 125)}
          </p>
        </div>
      </Link>
      <footer class="bl_posts_footer">
        <span class="bl_posts_dateago">{dayjs(props.article.created_at).fromNow()}</span>
      </footer>
    </li>
  );
}

export const PageList = () => {
  const limitNum = 5;

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(`https://manuscripts.herokuapp.com/api/entries?limit=${limitNum}`)
      .then(response => response.json())
      .then(articles => setArticles(articles));
  }, []);
  console.log(articles);

  return (
    <ul>
      {articles.map(article => <PageListItem article={article} />)}
    </ul>
  );
}
