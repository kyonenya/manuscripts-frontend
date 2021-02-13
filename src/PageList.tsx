import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Link } from 'wouter';
import styled from 'styled-components';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import relativeTime from 'dayjs/plugin/relativeTime';
import { articlable } from './types';

dayjs.locale('ja');
dayjs.extend(relativeTime);

const StyledListItem = styled.li`
  padding: 0.5em 0;
  border-bottom: 1px solid hsl(0, 0%, 85%) /* var(monochrome-light) */;
  display: block;
  margin: 0 auto;
`;
const Header = styled.header`
  color: hsl(0, 0%, 38%) /* var(--monochrome-dark) */;
  margin-bottom: 0.4em;
`;
const Footer = styled.footer`
  color: hsl(0, 0%, 38%);
  margin-top: 0.4em;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
const Summary = styled.div`
  text-align: justify;
  line-height: 1.5;
`;

const PageListItem = (props: {
  article: articlable,
}) => {
  return (
    <StyledListItem key={props.article.uuid}>
      <StyledLink href={'/?uuid=' + props.article.uuid}>
        <Header>
          <time class="bl_posts_date">
            {dayjs(props.article.created_at).format('YYYY-MM-DD')}
          </time>
        </Header>
        <Summary>
          {props.article.text.substr(0, 125)}…
        </Summary>
      </StyledLink>
      <Footer>
        <span class="bl_posts_dateago">{dayjs(props.article.created_at).fromNow()}</span>
        <Link href={'/?uuid=' + props.article.uuid + '&edit=1'}>Edit</Link>
      </Footer>
    </StyledListItem>
  );
}

const ListContainer = styled.ul`
  list-style: none;
  padding: 0;
`;

export const PageList = (props: {
  articles: articlable[],
}) => {
  return (
    <ListContainer>
      {props.articles.map(article => 
        <PageListItem article={article} />
      )}
    </ListContainer>
  );
};
