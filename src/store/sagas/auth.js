import { call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { actions as toastrActions } from 'react-redux-toastr';
import api from '~/services/api';

import AuthActions from '../ducks/auth';

export function* logIn({ username, password }) {
  try {
    const response = yield call(api.post, 'sessions', {
      username,
      password,
    });
    sessionStorage.setItem('@OpticalLab:token', response.data.token.token);
    sessionStorage.setItem('@OpticalLab:username', response.data.user.username);
    sessionStorage.setItem('@OpticalLab:admin', response.data.user.admin);
    yield put(
      AuthActions.logInSuccess(
        response.data.token,
        response.data.user,
        response.data.user.admin
      )
    );
    yield put(push('/'));
    yield window.location.reload();
  } catch (err) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'falha no login',
        message: 'Verifique seu e-mail/senha',
      })
    );
  }
}

export function* logOut() {
  sessionStorage.clear();
  yield put(push('/login'));
}
