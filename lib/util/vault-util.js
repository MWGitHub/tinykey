import request from 'reqwest';
import co from 'co';
import VaultActions from '../actions/vault-actions';
import config from '../../config';

const address = config.VAULT_ADDR;
const STATUS_ENDPOINT = `${address}sys/seal-status`;
const UNSEAL_ENDPOINT = `${address}sys/unseal`;

/**
 * Fetch the sealed status of Vault.
 *
 * @return {Promise} the promise with the result.
 */
function fetchSealedStatus() {
  return request({
    url: STATUS_ENDPOINT,
    method: 'get',
  })
  .then(result => {
    VaultActions.receiveSealedStatus(result);

    return result;
  });
}

/**
 * Send an unseal key to Vault.
 *
 * @param  {string} key - an unseal key.
 * @return {Promise} the promise with the unseal result.
 */
function sendUnsealKey(key) {
  return request({
    url: UNSEAL_ENDPOINT,
    method: 'put',
    contentType: 'text/plain',
    headers: {
      'Content-Type': 'text/plain',
    },
    data: JSON.stringify({ key }),
  })
  .then(result => {
    VaultActions.receiveSealedStatus(result);
  });
}

/**
 * Fetches a list of paths from Vault.
 *
 * @param  {string} token - token to use for authentication.
 * @param  {string} root - root path to start retrieving from.
 * @return {Promise} the promise with the paths.
 */
function fetchList(token, root) {
  function fetchDirectory(current) {
    return co(function* fetchDirectoryPromise() {
      const result = yield request({
        url: `${address}secret/${current}`,
        method: 'get',
        headers: {
          'X-Vault-Token': token,
        },
        data: {
          list: true,
        },
      });

      const keys = [];

      for (let i = 0; i < result.data.keys.length; i++) {
        const key = result.data.keys[i];

        if (key[key.length - 1] === '/') {
          const path = `${current}/${key.substring(0, key.length - 1)}`;
          const childResult = yield fetchDirectory(path);

          keys.push(childResult);
        } else {
          keys.push(key);
        }
      }

      return keys;
    });
  }

  return fetchDirectory(root)
  .then((result) => {
    VaultActions.receivePaths(result);
  });
}

export default {
  fetchSealedStatus,
  sendUnsealKey,
  fetchList,
};
