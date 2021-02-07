import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { JSXInternal } from 'preact/src/jsx';
import { entrable } from './types';
import './css/EditorMenu.css';

export const EditorMenu = (props: {
  createdAt: string,
}) => {
  return (
    <nav>
      <ul>
        <li class="bl_nav_date"><a href="">{props.createdAt}</a></li>
        <li class="bl_nav_button"><a href="">❤️</a></li>
        <li class="bl_nav_button"><a href="">🏷</a></li>
        <li class="bl_nav_button"><a href="">✅</a></li>
      </ul>
    </nav>
  );
}