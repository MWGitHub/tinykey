import { Store } from 'flux/utils';
import dispatcher from '../dispatcher';
import UserConstants from '../constants/user-constants';

let token = null;

class UserStore extends Store {
  getToken() {
    return token;
  }

  __onDispatch(payload) {
    switch (payload.actionType) {
      case UserConstants.RECEIVE_TOKEN:
        token = payload.token;
        break;
      case UserConstants.RESET_TOKEN:
        token = null;
        break;
      default:
    }

    this.__emitChange();
  }
}

export default new UserStore(dispatcher);
