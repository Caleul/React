import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  logInRequest: ['username', 'password'],
  logInSuccess: ['token', 'name', 'admin'],
  logOut: null,
});

export const AuthTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  loggedIn: !!sessionStorage.getItem('@OpticalLab:token'),
  token: sessionStorage.getItem('@OpticalLab:token') || null,
  username: sessionStorage.getItem('@OpticalLab:username') || 'user',
  admin: sessionStorage.getItem('@OpticalLab:admin') === 'true' || false,
});

/* Reducers */

export const success = (state, { token, username, admin }) => {
  return state.merge({ loggedIn: true, token, username, admin });
};

export const logout = state => state.merge({ loggedIn: false, token: null });

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOG_IN_SUCCESS]: success,
  [Types.LOG_OUT]: logout,
});
