import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const AllEntries = () => {
  const entry = {
    text: '本文',
    tags: ['tag1'],
    starred: false,
    created_at: '2021-02-06T12:58:03.479Z',
    modified_at: '2021-02-06T12:58:03.479Z',
  };
  return (
    <ul>
      <li>
        <a href="">
          <header class="bl_posts_header">
            <time class="bl_posts_date">
              {dayjs(entry.created_at).format('YYYY-MM-DD')}
            </time>
          </header>
          <div class="bl_posts_summary">
            <p>
              {entry.text.substr(0, 125)}
            </p>
          </div>
        </a>
        <footer class="bl_posts_footer">
          <span class="bl_posts_dateago">{dayjs(entry.created_at).fromNow()}</span>
        </footer>
      </li>
    </ul>
  );
}
