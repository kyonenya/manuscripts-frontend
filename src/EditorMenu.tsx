import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { JSXInternal } from 'preact/src/jsx';
import { articlable } from './types';
import './css/EditorMenu.css';

export const EditorMenu = (props: {
  createdAt: string,
  handleSubmit: () => void,
}) => {
  return (
    <nav>
      <ul>
        <li class="bl_nav_date"><a href="">{props.createdAt}</a></li>
        <li class="bl_nav_button"><a href="">❤️</a></li>
        <li class="bl_nav_button"><a href="">🔖</a></li>
        <li class="bl_nav_button" onClick={props.handleSubmit}>✅</li>
      </ul>
    </nav>
  );
}