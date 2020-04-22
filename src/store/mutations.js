export default {
  setToken(state, data) {
    state.token = data.token;
    state.userName = data.userName;
  }
};
