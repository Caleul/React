import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import api from '~/services/api';

import WorkersTypes from '../ducks/workers';

export function* addUser({ username, name, email, password, admin }) {
  try {
    const response = yield call(api.post, 'users', {
      username,
      name,
      email,
      password,
      admin,
    });
    yield put(WorkersTypes.addUserSuccess(response.data));
    yield put(
      toastrActions.add({
        type: 'success',
        title: 'adcionado com sucesso',
      })
    );
  } catch (err) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'nao foi possivel adcionar',
      })
    );
  }
}
