import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import Root from './pages/root';
import Home from './pages/home';

class NotFound extends React.Component {
  render() {
    return <h1>404 - Page not found</h1>;
  }
}

const router = (
  <Router history={hashHistory}>
    <Route path="/" component={Root}>
      <IndexRoute component={Home} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);

function start() {
  ReactDOM.render(router, document.getElementById('entry'))
}

export default start;
