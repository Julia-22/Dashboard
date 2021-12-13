const isAuthenticated = state => state.authorization.isAuthenticated;
const getUserEmail = state => state.authorization.user.email;

export default {
  isAuthenticated,
  getUserEmail
}