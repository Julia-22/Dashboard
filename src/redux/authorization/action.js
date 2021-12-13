import { createAction } from "@reduxjs/toolkit";

const registerRequest = createAction('authorization/registerRequest');
const registerSuccess = createAction('authorization/registerSuccess');
const registerError = createAction('authorization/registerError');

const loginRequest = createAction('authorization/loginRequest');
const loginSuccess = createAction('authorization/loginSuccess');
const loginError = createAction('authorization/loginError');

const logoutRequest = createAction('authorization/logoutRequest');
const logoutSuccess = createAction('authorization/logoutSuccess');
const logoutError = createAction('authorization/logoutError');

export default {
  registerRequest,
  registerSuccess,
  registerError,
  loginRequest,
  loginSuccess,
  loginError,
  logoutRequest,
  logoutSuccess,
  logoutError
}