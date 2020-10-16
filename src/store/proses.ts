import { ActionTree, MutationTree } from 'vuex';
import { ProsesState } from './types';

function state(): ProsesState {
  return {
    apakahProsesTampil: false,
  };
}

const mutations: MutationTree<ProsesState> = {
  aturProsesTampil(state, { apakahProsesTampil }) {
    state.apakahProsesTampil = apakahProsesTampil;
  },
};

const actions: ActionTree<ProsesState, object> = {
  tampilkanProses({ commit }) {
    commit('aturProsesTampil', {
      apakahProsesTampil: true,
    });
  },
  hilangkanProses({ commit }) {
    commit('aturProsesTampil', {
      apakahProsesTampil: false,
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
