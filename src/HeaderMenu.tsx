import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import styled from 'styled-components';
import { articlable } from './types';

export const HeaderMenu = (props: {
  createdAt: string,
  handleSubmit: () => void,
  isSubmitting: boolean,
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
        <li onClick={() => setIsOpen(prev => !prev)} style="position: relative;">
          <Button>🔖</Button>
          <DropDown isOpen={isOpen}>
            <div>メニュー1</div>
            <div>メニュー2</div>
            <div>メニュー3</div>
            <div>❌</div>
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

const HorizontalList = styled.ul`
  display: flex;
  justify-content: flex-end;
  align-items: center /* vertical */;
  list-style-type: none;
  padding: 0px;
`;
const DropDown = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
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
`;
const Button = styled.div`
  display: block;
  width: 2.5em;
  text-align: center;
`;
const Date = styled.div`
  color: var(--monochrome-weighty);
  width: 9em;
`;
