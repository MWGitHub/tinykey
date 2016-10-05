import request from 'reqwest';
import UserActions from '../actions/user-actions';

const KEY = 'token';
const ENDPOINT = 'auth/userpass/login/';

function login(address, username, password) {
  return request({
    url: `${address}${ENDPOINT}${username}`,
    method: 'post',
    contentType: 'text/plain',
    headers: {
      'Content-Type': 'text/plain',
    },
    data: JSON.stringify({ password }),
  })
  .then(result => {
    const token = result.auth.client_token;

    UserActions.receiveToken(token);
  });
}

function loginLocal() {
  const storage = window.localStorage;
  const token = storage.getItem(KEY);

  if (token) {
    UserActions.receiveToken(token);
  }
}

function logout() {
  window.localStorage.removeItem(KEY);
  UserActions.resetToken();
}

export default {
  login,
  loginLocal,
  logout,
};
