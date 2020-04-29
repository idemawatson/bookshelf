import * as types from "./type";
export default {
  [types.SET_USER](state, user) {
    state.user = user;
  }
};
