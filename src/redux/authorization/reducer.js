import { createReducer, combineReducers } from "@reduxjs/toolkit";
import action from "./action";

const initialUser = { email: '', password: '' };
const initialAuth = !!localStorage.getItem('token') || false;

const userReducer = createReducer(initialUser, {
  [action.registerSuccess]: (_, { payload }) => payload.user,
  [action.loginSuccess]: (_, { payload }) => payload.user,
  [action.logoutSuccess]: () => initialUser,
});

const tokenReducer = createReducer(null, {
  [action.registerSuccess]: (_, { payload }) => payload.accessToken,
  [action.loginSuccess]: (_, { payload }) => payload.accessToken,
  [action.logoutSuccess]: () => null,
});

const errorReducer = createReducer(null, {
  [action.registerError]: (_, { payload }) => payload,
  [action.loginError]: (_, { payload }) => payload,
  [action.logoutError]: (_, { payload }) => payload,
});

const isAuthenticated = createReducer(initialAuth, {
  [action.loginSuccess]: () => true,
  [action.logoutSuccess]: () => false,
})

export default combineReducers({
  user: userReducer,
  token: tokenReducer,
  error: errorReducer,
  isAuthenticated
})