import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import styled from 'styled-components';
import { WideContainer } from './styled/Container';
import { PlainLink } from './styled/PlainLink';
import { articlable } from './types';

export const HeaderMenu = (props: {
  createdAt: string,
  handleSubmit: () => void,
  isSubmitting: boolean,
  handleDelete: () => void,
  toggleStarred: () => void,
  isStarred: boolean,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StyledHeaderMenu>
      <WideContainer>
        <HorizontalList>
          <li>
            <Button><PlainLink href="?">↩️</PlainLink></Button>
          </li>
          <li><Button>　</Button></li>
          <li style={{margin: "0 auto"}}>
            <DropDownSwitch onClick={() => setIsOpen(prev => !prev)} isOpen={isOpen}>
              <Date>{props.createdAt}</Date>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" style={isOpen ? "transform: scale(1, -1);" : ""}><path d="M0 0h24v24H0z" fill="none"/><path fill="var(--monochrome-weighty)" d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>
            </DropDownSwitch>
            <DropDownBody isOpen={isOpen}>
              <input type="text" id="tags" placeholder="tag1,tag2,..." />
              <Button onClick={props.handleDelete}>❌</Button>
            </DropDownBody>
          </li>
          <li>
            <Button onClick={props.toggleStarred}>
              {props.isStarred ? '❤️' : '❤︎'}
            </Button></li>
          <li>
            <Button onClick={props.handleSubmit}>
              { props.isSubmitting ? '⏳' : '✅'}
            </Button>
          </li>
        </HorizontalList>
      </WideContainer>
    </StyledHeaderMenu>
  );
};

export const TopHeaderMenu = () => {
  return (
    <StyledHeaderMenu>
      <WideContainer>
        <HorizontalList>
          <li><Button>⚙</Button></li>
          <li style={{margin: '0 auto'}}>
            <form method="get" action="">
              <SearchBox type="search" placeholder="search..." />
              <input type="submit" style={{display: 'none'}} />
            </form>
          </li>
          <li>
              <Button><PlainLink href="?new=1">✏️</PlainLink></Button>
          </li>
        </HorizontalList>
      </WideContainer>
    </StyledHeaderMenu>
  );
};

const StyledHeaderMenu = styled.nav`
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 99;
  background: var(--monochrome-exlight);
  box-shadow: 0px 0px 4px 0px rgba(60, 64, 67, 0.2);
  margin-bottom: 1em;
`;
const HorizontalList = styled.ul`
  display: flex;
  justify-content: flex-end;
  align-items: center /* vertical */;
  list-style-type: none;
  padding: 0.8em 0;
  /* reset */
  margin-block-start: 0;
  margin-block-end: 0;
`;
const DropDownBody = styled.div`
  display: ${props => props.isOpen ? 'flex' : 'none'};
  position: absolute;
  top: 3em;
  /* center */
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 99;
  width: 50vw;
  max-width: 300px;
  background: var(--background-color);
  border-radius: 4px;
  box-shadow: 0 2px 6px 2px rgba(60, 64, 67, 0.15), 0 1px 2px 0 rgba(60, 64, 67, 0.3);
  overflow: hidden;
  flex-direction: column;
  align-items: center;
  padding: 0.5em;
`;
const Button = styled.div`
  display: block;
  width: 12vw;
  max-width: 3em;
  text-align: center;
  cursor: pointer;
`;
const DropDownSwitch = styled.div`
  display: flex;
  justify-content: center;
  width: 50vw;
  cursor: pointer;
  &::after {
    ${props => props.isOpen ? `
      /* click anywhere to close */
      content: "";
      position: fixed;
      top: 0;
      left: 0;
      z-index: 10;
      width: 100%;
      height: 100%;
      cursor: default;
    ` : ''
    }
  }
`;
const Date = styled.div`
  color: var(--monochrome-weighty);
  text-align: center;
  /* ellipsis */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const SearchBox = styled.input`
  background: var(--monochrome-light);
  border: none;
  height: 2.5em;
  width: 50vw;
  -webkit-appearance: none /* reset safari */;
`;