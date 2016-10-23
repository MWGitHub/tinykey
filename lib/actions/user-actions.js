import Dispatcher from '../dispatcher';
import UserConstants from '../constants/user-constants';

function receiveLogin(data) {
  Dispatcher.dispatch({
    actionType: UserConstants.SET_USER,
    data,
  });
}

function reset() {
  Dispatcher.dispatch({
    actionType: UserConstants.RESET_USER,
  });
}

export default {
  receiveLogin,
  reset,
};
