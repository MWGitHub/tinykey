import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import Root from './pages/root';
import Home from './pages/home';
import VaultUtil from './util/vault-util';
import config from '../config';
import UserUtil from './util/user-util';
import Unseal from './pages/unseal';
import VaultStore from './stores/vault';
import UserStore from './stores/user';
import Login from './login';

function notFound() {
  return <h1>404 - Page not found</h1>;
}

function requireReady(nextState, replace) {
  const status = VaultStore.getSealedStatus();
  const token = UserStore.getToken();

  if (status.sealed) {
    replace({
      pathname: '/unseal',
      state: { nextPathname: nextState.location.pathname },
    });
  } else if (!token) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
}

function requireSealed(nextState, replace) {
  const status = VaultStore.getSealedStatus();

  if (!status.sealed) {
    replace({
      pathname: '/',
    });
  }
}

function requireLoggedOut(nextState, replace) {
  const token = UserStore.getToken();

  if (token) {
    replace({
      pathname: '/',
    });
  }
}

const router = (
  <Router history={hashHistory}>
    <Route path="/" component={Root}>
      <Route onEnter={requireReady}>
        <IndexRoute component={Home} />
      </Route>
      <Route path="unseal" component={Unseal} onEnter={requireSealed} />
      <Route path="login" component={Login} onEnter={requireLoggedOut} />
      <Route path="*" component={notFound} />
    </Route>
  </Router>
);

function start(element) {
  UserUtil.loginLocal();
  VaultUtil.fetchSealedStatus(config.VAULT_ADDR)
  .then(() => {
    ReactDOM.render(router, element);
  });
}

export default start;
