import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Link } from 'wouter';
import styled from 'styled-components';
import { PageListItem } from './PageListItem';
import { articlable } from './types';

export const PageList = (props: {
  articles: articlable[],
}) => {
  return (
    <StyledList>
      {props.articles.map(article => 
        <PageListItem article={article} />
      )}
    </StyledList>
  );
};

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
`;
