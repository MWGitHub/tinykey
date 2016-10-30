import React from 'react';
import VaultUtil from '../util/vault-util';
import UserStore from '../stores/user';
import VaultStore from '../stores/vault';
import Directory from '../components/directory';

class Home extends React.Component {
  constructor(props) {
    super(props);

    const paths = VaultStore.getPaths();

    this.state = {
      paths,
    };
  }

  componentDidMount() {
    this.vaultToken = VaultStore.addListener(this._onChange.bind(this));

    const user = UserStore.getUser();

    VaultUtil.fetchList(user.token, user.name);
  }

  componentWillUnmount() {
    this.vaultToken.remove();
  }

  _onChange() {
    const paths = VaultStore.getPaths();

    this.setState({
      paths,
    });
  }

  render() {
    console.log(this.state.paths);

    return (
      <div>
        <div className="sidebar">
          <Directory root={this.state.paths} />
        </div>
        <div>
          <p>Unsealed and logged in!</p>
        </div>
      </div>
    );
  }
}

export default Home;
