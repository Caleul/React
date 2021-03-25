import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { reducer as toastr } from 'react-redux-toastr';
import { reducer as auth } from './auth';
import { reducer as workers } from './workers';

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    auth,
    workers,
    toastr,
  });
export default createRootReducer;
