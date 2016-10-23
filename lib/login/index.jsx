import React from 'react';
import { hashHistory } from 'react-router';
import LoginForm from './form';
import UserUtil from '../util/user-util';
import UserStore from '../stores/user';
import config from '../../config';

class Login extends React.Component {
  constructor(props) {
    super(props);

    const token = UserStore.getToken();

    this.state = {
      token,
      error: false,
    };

    this.handleSubmit = this._handleSubmit.bind(this);
  }

  componentDidMount() {
    this.userToken = UserStore.addListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    this.userToken.remove();
  }

  _onChange() {
    const token = UserStore.getToken();

    if (token) {
      hashHistory.push('/');
    }
  }

  _handleSubmit(username, password) {
    UserUtil.login(config.VAULT_ADDR, username, password)
    .catch(() => {
      this.setState({ error: true });
    });
  }

  render() {
    let error = '';

    if (this.state.error) {
      error = <p>Username or password does not match.</p>;
    }

    return (
      <div>
        {error}
        <LoginForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default Login;
