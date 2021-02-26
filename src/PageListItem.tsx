import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import styled from 'styled-components';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import relativeTime from 'dayjs/plugin/relativeTime';
import { PlainLink } from './styled/PlainLink';
import { articlable } from './types';

dayjs.locale('ja');
dayjs.extend(relativeTime);

export const PageListItem = (props: {
  article: articlable,
}) => {
  return (
    <StyledListItem key={props.article.uuid}>
      <PlainLink href={'/?uuid=' + props.article.uuid}>
        <Header>
          <time>
            {dayjs(props.article.created_at).format('YYYY-MM-DD')}
          </time>
        </Header>
        <Summary>
          {
            props.article.text.length > 125
              ? props.article.text.substr(0, 125) + '…'
              : props.article.text
          }
        </Summary>
      </PlainLink>
      <Footer>
        <span>{dayjs(props.article.created_at).fromNow()}</span>
      </Footer>
    </StyledListItem>
  );
};

const StyledListItem = styled.li`
  border-bottom: 1px solid var(--monochrome-light);
  display: block;
  margin: 0 auto;
  padding: 0.5em 0;
`;
const Header = styled.header`
  color: var(--monochrome-weighty);
  margin-bottom: 0.4em;
`;
const Footer = styled.footer`
  color: var(--monochrome-weighty);
  margin-top: 0.4em;
`;
const Summary = styled.div`
  line-height: 1.5;
  text-align: justify;
`;
