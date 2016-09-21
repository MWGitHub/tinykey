import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Home from './home/home';

class NotFound extends React.Component {
  render() {
    return <h1>404 - Page not found</h1>;
  }
}

const router = (
  <Router history={browserHistory}>
    <Route path="/" component={Home}>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
);

function start() {
  ReactDOM.render(router, document.getElementById('entry'))
}

export default start;
