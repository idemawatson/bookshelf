import * as types from "./type";
export default {
  [types.SET_NAME](state, payload) {
    state.userName = payload.userName;
  }
};
