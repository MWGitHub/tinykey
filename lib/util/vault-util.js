import request from 'reqwest';
import VaultActions from '../actions/vault-actions';

const STATUS_ENDPOINT = 'sys/seal-status';
const UNSEAL_ENDPOINT = 'sys/unseal';

function fetchSealedStatus(address) {
  return request({
    url: `${address}${STATUS_ENDPOINT}`,
    method: 'get',
  })
  .then(result => {
    const data = result;

    VaultActions.receiveSealedStatus(data);

    return result;
  });
}

function sendUnsealKey(address, key) {
  return request({
    url: `${address}${UNSEAL_ENDPOINT}`,
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

export default {
  fetchSealedStatus,
  sendUnsealKey,
};
