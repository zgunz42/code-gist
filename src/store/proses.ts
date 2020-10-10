import { ActionTree, MutationTree } from 'vuex';

type State = {
  apakahProsesTampil: boolean;
};

function state(): State {
  return {
    apakahProsesTampil: false,
  };
}

const mutations: MutationTree<State> = {
  aturProsesTampil(state, { apakahProsesTampil }) {
    state.apakahProsesTampil = apakahProsesTampil;
  },
};

const actions: ActionTree<State, object> = {
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
