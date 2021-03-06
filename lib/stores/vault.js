import { Store } from 'flux/utils';
import dispatcher from '../dispatcher';
import VaultConstants from '../constants/vault-constants';

let sealedStatus = {};
let paths = [];

class VaultStore extends Store {
  getSealedStatus() {
    return {
      sealed: sealedStatus.sealed,
      threshold: sealedStatus.threshold,
      progress: sealedStatus.progress,
    };
  }

  getPaths() {
    return paths;
  }

  __onDispatch(payload) {
    switch (payload.actionType) {
      case VaultConstants.SET_SEALED_STATUS:
        sealedStatus = {
          sealed: payload.data.sealed,
          threshold: payload.data.t,
          progress: payload.data.progress,
        };
        break;
      case VaultConstants.SET_PATHS:
        paths = payload.data;
        break;
      default:
    }

    this.__emitChange();
  }
}

export default new VaultStore(dispatcher);
