import Dispatcher from '../dispatcher';
import UserConstants from '../constants/user-constants';

function receiveToken(token) {
  Dispatcher.dispatch({
    actionType: UserConstants.RECEIVE_TOKEN,
    token,
  });
}

function resetToken() {
  Dispatcher.dispatch({
    actionType: UserConstants.RESET_TOKEN,
  });
}

export default { receiveToken, resetToken };
