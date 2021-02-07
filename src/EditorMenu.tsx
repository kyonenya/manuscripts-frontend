import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { JSXInternal } from 'preact/src/jsx';
import { entrable } from './types';
import './css/EditorMenu.css';

export const EditorMenu = () => {
  return (
    <nav>
      <ul>
        <li><a href="">⬅️</a></li>
        <li><a href="">❤️</a></li>
        <li><a href="">🏷</a></li>
        <li><a href="">✅</a></li>
      </ul>
    </nav>
  );
}