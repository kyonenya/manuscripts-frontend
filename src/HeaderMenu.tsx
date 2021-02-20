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
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StyledHeaderMenu>
      <WideContainer>
        <HorizontalList>
          <li>
            <Button><PlainLink href="?">↩️</PlainLink></Button>
          </li>
          <li><Button>－</Button></li>
          <li style="margin: 0 auto">
            <DropDownSwitch onClick={() => setIsOpen(prev => !prev)} isOpen={isOpen}>
              <Date>{props.createdAt}</Date>
            </DropDownSwitch>
            <DropDownBody isOpen={isOpen}>
              <div>メニュー1</div>
              <div>メニュー2</div>
              <div>メニュー3</div>
              <Button onClick={props.handleDelete}>❌</Button>
            </DropDownBody>
          </li>
          <li><Button>❤️</Button></li>
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
          <li style="margin: 0 auto;">
            <SearchBox type="text" />
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
  margin-bottom: 1em;
`;
const HorizontalList = styled.ul`
  display: flex;
  justify-content: flex-end;
  align-items: center /* vertical */;
  list-style-type: none;
  padding: 1em 0;
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
  width: 2.5em;
  text-align: center;
`;
const DropDownSwitch = styled.div`
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
  width: 10em;
  text-align: center;
`;
const SearchBox = styled.input`
`;