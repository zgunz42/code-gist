import { ActionTree, MutationTree } from 'vuex';

type State = {
  apakahTampil: boolean;
  pesan: string | null;
};

function state(): State {
  return {
    apakahTampil: false,
    pesan: null,
  };
}

const mutations: MutationTree<State> = {
  aturNotifikasi(state, { apakahTampil, pesan }) {
    state.apakahTampil = apakahTampil;
    state.pesan = pesan;
  },
  hapusNotifikasi(state) {
    state.apakahTampil = false;
    state.pesan = null;
  },
};

const actions: ActionTree<State, object> = {
  tampilkanNotifikasi({ commit }, { apakahTampil, pesan }) {
    commit('aturNotifikasi', {
      apakahTampil,
      pesan,
    });
    setTimeout(() => {
      commit('hapusNotifikasi');
    }, 3000);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
