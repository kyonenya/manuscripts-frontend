import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Link } from 'wouter';
import styled from 'styled-components';
import { TopHeaderMenu } from './HeaderMenu';
import { PageListItem } from './PageListItem';
import { Container } from './styled/Container';
import { articlable } from './types';

export const PageList = (props: {
  articles: articlable[],
}) => {
  return (
    <Fragment>
      <TopHeaderMenu />
      <Container>
        <StyledList>
          {props.articles.map(article => 
            <PageListItem article={article} />
          )}
        </StyledList>
      </Container>
    </Fragment>
  );
};

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
