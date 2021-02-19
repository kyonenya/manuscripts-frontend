import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import styled from 'styled-components';
import { articlable } from './types';

export const HeaderMenu = (props: {
  createdAt: string,
  handleSubmit: () => void,
  isSubmitting: boolean,
  handleDelete: () => void,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      <HorizontalList>
        <li style="margin-right: auto;">
          <Date>
            {props.createdAt}
          </Date>
        </li>
        <li><Button>❤️</Button></li>
        <li style="position: relative;">
          <ButtonDropDown onClick={() => setIsOpen(prev => !prev)} isOpen={isOpen}>
            🔖
          </ButtonDropDown>
          <DropDown isOpen={isOpen}>
            <div>メニュー1</div>
            <div>メニュー2</div>
            <div>メニュー3</div>
            <Button onClick={props.handleDelete}>❌</Button>
          </DropDown>
        </li>
        <li>
          <Button onClick={props.handleSubmit}>
            { props.isSubmitting ? '⏳' : '✅'}
          </Button>
        </li>
      </HorizontalList>
    </nav>
  );
};

export const TopHeaderMenu = () => {
  return (
    <nav>
      <HorizontalList>
        <li style="margin-right: auto;"><Button>⚙</Button></li>
        <li><Button>✏️</Button></li>
      </HorizontalList>
    </nav>
  );
};

const HorizontalList = styled.ul`
  display: flex;
  justify-content: flex-end;
  align-items: center /* vertical */;
  list-style-type: none;
  background: #4d9abf;
  padding: 1em 0;
  /* reset */
  margin-block-start: 0;
  margin-block-end: 0;
`;
const DropDown = styled.div`
  display: ${props => props.isOpen ? 'flex' : 'none'};
  position: absolute;
  top: 32px;
  right: 8px;
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
const ButtonDropDown = styled(Button)`
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
`;
