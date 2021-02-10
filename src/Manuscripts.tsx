import { h, Fragment } from 'preact';
import { Router, Route, Link } from 'preact-router';
import { Article } from './Article';
import { PageList } from './PageList';

export const Manuscripts = () => {
  return (
    <Fragment>
      <Link href="/article">Article</Link>
      <span> / </span>
      <Link href="/pagelist">PageList</Link>
      <Router>
        <Route path="/article" component={Article}></Route>
        <Route path="/pagelist" component={PageList}></Route>
      </Router>
    </Fragment>
  );
};
