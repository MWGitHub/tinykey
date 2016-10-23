import Dispatcher from '../dispatcher';
import VaultConstants from '../constants/vault-constants';

function receiveSealedStatus(data) {
  Dispatcher.dispatch({
    actionType: VaultConstants.SET_SEALED_STATUS,
    data,
  });
}

function receivePaths(data) {
  Dispatcher.dispatch({
    actionType: VaultConstants.SET_PATHS,
    data,
  });
}

export default {
  receiveSealedStatus,
  receivePaths,
};
