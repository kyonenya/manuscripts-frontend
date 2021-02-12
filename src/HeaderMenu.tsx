import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { JSXInternal } from 'preact/src/jsx';
import { articlable } from './types';
import './css/EditorMenu.css';

export const HeaderMenu = (props: {
  createdAt: string,
  handleSubmit: () => void,
  isLoading: boolean,
}) => {
  return (
    <nav>
      <ul>
        <li class="bl_nav_date"><a href="">{props.createdAt}</a></li>
        <li class="bl_nav_button"><a href="">❤️</a></li>
        <li class="bl_nav_button"><a href="">🔖</a></li>
        <li class="bl_nav_button" onClick={props.handleSubmit}>
          { props.isLoading ? '⏳' : '✅'}
        </li>
      </ul>
    </nav>
  );
}
