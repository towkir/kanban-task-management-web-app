import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sideBarOpen: true,
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
