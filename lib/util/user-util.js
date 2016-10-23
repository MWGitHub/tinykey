import request from 'reqwest';
import UserActions from '../actions/user-actions';

const TOKEN_KEY = 'token';
const USERNAME_KEY = 'user';
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
    const name = result.auth.metadata.username;

    UserActions.receiveLogin(result);
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem(USERNAME_KEY, name);

    return result;
  });
}

function loginLocal() {
  const storage = window.localStorage;
  const token = storage.getItem(TOKEN_KEY);
  const username = storage.getItem(USERNAME_KEY);

  if (token) {
    UserActions.receiveLogin({
      auth: {
        client_token: token,
        metadata: {
          username,
        },
      },
    });
  }
}

function logout() {
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(USERNAME_KEY);
  UserActions.reset();
}

export default {
  login,
  loginLocal,
  logout,
};
