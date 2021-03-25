import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  addUserRequest: ['username', 'name', 'email', 'password', 'admin'],
  addUserSuccess: ['user'],
  // TODO: Crear getUsers
});

export const WorkersTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  users: [],
});

/* Reducers */

export const addUser = (state, { user }) =>
  state.merge({ users: [...state.users, user] });

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_USER_SUCCESS]: addUser,
});
