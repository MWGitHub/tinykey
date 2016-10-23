import { Store } from 'flux/utils';
import dispatcher from '../dispatcher';
import UserConstants from '../constants/user-constants';

let user = {};

class UserStore extends Store {
  getUser() {
    return {
      token: user.token,
      name: user.name,
    };
  }

  __onDispatch(payload) {
    switch (payload.actionType) {
      case UserConstants.SET_USER: {
        const token = payload.data.auth.client_token;
        const name = payload.data.auth.metadata.username;

        user = {
          token,
          name,
        };
        break;
      }
      case UserConstants.RESET_USER:
        user = null;
        break;
      default:
    }

    this.__emitChange();
  }
}

export default new UserStore(dispatcher);
