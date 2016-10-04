import React from 'react';
import LoginForm from '../login/form';
import UserUtil from '../util/user-util';
import config from '../../config';

function handleSubmit(username, password) {
  UserUtil.login(config.VAULT_ADDR, username, password);
}

class Home extends React.Component {
  render() {
    return (
      <div>
        <LoginForm onSubmit={handleSubmit} />
      </div>
    );
  }
}

export default Home;
