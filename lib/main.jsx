import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import Root from './pages/root';
import Home from './pages/home';
import UserUtil from './util/user-util';

function notFound() {
  return <h1>404 - Page not found</h1>;
}

const router = (
  <Router history={hashHistory}>
    <Route path="/" component={Root}>
      <IndexRoute component={Home} />
      <Route path="*" component={notFound} />
    </Route>
  </Router>
);

function start(element) {
  UserUtil.loginLocal();

  ReactDOM.render(router, element);
}

export default start;
