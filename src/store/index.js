import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sideBarOpen: false,
  },
  mutations: {
    toggleSidebar(state, data) {
      state.sideBarOpen = data;
    },
  },
  actions: {
  },
  modules: {
  },
});
