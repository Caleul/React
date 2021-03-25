import { all, takeLatest } from 'redux-saga/effects';

import { logIn, logOut } from './auth';
import { AuthTypes } from '../ducks/auth';

import { addUser } from './workers';
import { WorkersTypes } from '../ducks/workers';

export default function* rootSaga() {
  return yield all([
    takeLatest(AuthTypes.LOG_IN_REQUEST, logIn),
    takeLatest(AuthTypes.LOG_OUT, logOut),

    takeLatest(WorkersTypes.ADD_USER_REQUEST, addUser),
  ]);
}
