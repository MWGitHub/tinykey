import React from 'react';
import { hashHistory } from 'react-router';
import VaultUtil from '../util/vault-util';
import VaultStore from '../stores/vault';

class Unseal extends React.Component {
  constructor(props) {
    super(props);

    const status = VaultStore.getSealedStatus();

    this.state = {
      threshold: status.threshold,
      progress: status.progress,
      key: '',
    };

    this.handleKeyChange = this.handleKeyChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.vaultToken = VaultStore.addListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    this.vaultToken.remove();
  }

  _onChange() {
    const status = VaultStore.getSealedStatus();

    if (status.progress >= status.threshold) {
      hashHistory.push('/');
    } else {
      this.setState({
        threshold: status.threshold,
        progress: status.progress,
      });
    }
  }

  handleKeyChange(e) {
    this.setState({ key: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    VaultUtil.sendUnsealKey(this.state.key);

    e.target.reset();
    this.setState({ key: '' });
  }

  render() {
    return (
      <div>
        <p>Threshold: {this.state.threshold}</p>
        <p>Progress: {this.state.progress}</p>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="key">key
            <input
              type="password"
              value={this.state.key}
              onChange={this.handleKeyChange}
            />
          </label>
          <button>Unseal</button>
        </form>
      </div>
    );
  }
}

export default Unseal;
