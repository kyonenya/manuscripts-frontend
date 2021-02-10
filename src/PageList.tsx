import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Link } from 'wouter';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import relativeTime from 'dayjs/plugin/relativeTime';
import { articlable } from './types';

dayjs.locale('ja');
dayjs.extend(relativeTime);

const PageListItem = (props: {
  article: articlable,
}) => {
  return (
    <li class="bl_posts_item" key={props.article.uuid}>
      <Link href={'/?uuid=' + props.article.uuid}>
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
        <Link href={'/?uuid=' + props.article.uuid + '&edit=1'}>Edit</Link>
      </footer>
    </li>
  );
}

export const PageList = (props: {
  articles: articlable[],
}) => {
  return (
    <section class="ly_cont">
      <ul class="bl_posts">
        {props.articles.map(article => 
          <PageListItem article={article} />
        )}
      </ul>
    </section>
  );
}
