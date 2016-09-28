import { Store } from 'flux/utils';
import dispatcher from '../dispatcher';

class UserStore extends Store {
  onDispatch(payload) {
    console.log(payload);
  }
}

export default new UserStore(dispatcher);
