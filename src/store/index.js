import Vue from "vue";
import Vuex from "vuex";
import state from "@/store/state.js";
import mutations from "@/store/mutations.js";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: state,
  mutations: mutations,
  actions: {},
  modules: {}
});
