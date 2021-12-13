import axios from "axios";
import action from "./action";
import selector from './selector';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem("token", token);
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
    localStorage.clear();
  }
}

const setEmail = (email) => {
  localStorage.setItem("email", email);
}

const register = credentials => dispatch => {
  dispatch(action.registerRequest());

  axios.post('https://board-apiapp.herokuapp.com/api/users/signup', credentials)
    .then(response => {
      token.set(response.data.accessToken);
      dispatch(action.registerSuccess(response.data));
    })
    .catch(error => dispatch(action.registerError(error.message)));
}

const login = credentials => dispatch => {
  dispatch(action.loginRequest());

  axios.post('https://board-apiapp.herokuapp.com/api/users/login', credentials)
    .then(response => {
      token.set(response.data.accessToken);
      setEmail(response.data.user.email);
      dispatch(action.loginSuccess(response.data))
    })
    .catch(error => dispatch(action.loginError(error.message)));
}

const logout = () => dispatch => {
  token.unset();
  dispatch(action.logoutSuccess());
}

const getCurrentUser = () => dispatch => {
  const tokenFromLocalStorage = localStorage.getItem("token");

  if (!tokenFromLocalStorage) {
    return;
  }

  token.set(tokenFromLocalStorage);
  dispatch(action.getCurrentUserRequest());

  axios.get(`https://board-apiapp.herokuapp.com/api/users/current`)
    .then(response => dispatch(action.getCurrentUserSuccess(response.data)))
    .catch(error => dispatch(action.getCurrentUserError(error.message)));
}

export default {
  register,
  login,
  logout,
  getCurrentUser
}