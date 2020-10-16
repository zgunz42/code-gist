import { ActionTree, MutationTree } from 'vuex';
import { NotifikasiState } from './types';

function state(): NotifikasiState {
  return {
    apakahTampil: false,
    pesan: null,
  };
}

const mutations: MutationTree<NotifikasiState> = {
  aturNotifikasi(state, { apakahTampil, pesan }) {
    state.apakahTampil = apakahTampil;
    state.pesan = pesan;
  },
  hapusNotifikasi(state) {
    state.apakahTampil = false;
    state.pesan = null;
  },
};

const actions: ActionTree<NotifikasiState, object> = {
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
