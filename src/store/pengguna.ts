import { ActionTree, GetterTree, MutationTree } from 'vuex';
import { DAFTAR_NOTIF, MASUK_NOTIF, URL_API } from '../constants';
import { kirimData } from '@/utils';
import { PenggunaState, RootState } from './types';

function state(): PenggunaState {
  return {
    idPengguna: null,
    namaPengguna: null,
  };
}

const mutations: MutationTree<PenggunaState> = {
  aturDataPengguna(state, { idPengguna, namaPengguna }) {
    state.idPengguna = idPengguna;
    state.namaPengguna = namaPengguna;
  },
  resetDataPengguna(state) {
    state.idPengguna = null;
    state.namaPengguna = null;
  },
};

const actions: ActionTree<PenggunaState, object> = {
  async masuk({ commit, dispatch }, { namaPengguna }) {
    try {
      dispatch('proses/tampilkanProses', null, { root: true });
      const url = `${URL_API}/user/login`;

      const respon = await kirimData(url, {
        name: namaPengguna,
      });

      if (respon.success && !respon.error) {
        commit('aturDataPengguna', {
          idPengguna: respon.data.id,
          namaPengguna: respon.data.name,
        });
        const dataNotifikasi = {
          apakahTampil: true,
          pesan: MASUK_NOTIF,
        };
        await dispatch('notifikasi/tampilkanNotifikasi', dataNotifikasi, {
          root: true,
        });
      } else {
        throw new Error(respon.message);
      }
    } catch (error) {
      const dataNotifikasiGalat = {
        apakahTampil: true,
        pesan: error.message,
      };
      dispatch('notifikasi/tampilkanNotifikasi', dataNotifikasiGalat, {
        root: true,
      });
      console.log(error);
    } finally {
      dispatch('proses/hilangkanProses', null, { root: true });
    }
  },
  async daftar({ commit, dispatch }, { namaPengguna }) {
    try {
      dispatch('proses/tampilkanProses', null, { root: true });
      const url = `${URL_API}/user/register`;

      const respon = await kirimData(url, {
        name: namaPengguna,
      });

      if (respon.success && !respon.error) {
        commit('aturDataPengguna', {
          idPengguna: respon.data.id,
          namaPengguna: respon.data.name,
        });
        const dataNotifikasi = {
          apakahTampil: true,
          pesan: DAFTAR_NOTIF,
        };
        await dispatch('notifikasi/tampilkanNotifikasi', dataNotifikasi, {
          root: true,
        });
      } else {
        throw new Error(respon.message);
      }
    } catch (error) {
      const dataNotifikasiGalat = {
        apakahTampil: true,
        pesan: error.message,
      };
      dispatch('notifikasi/tampilkanNotifikasi', dataNotifikasiGalat, {
        root: true,
      });
      console.log(error);
    } finally {
      dispatch('proses/hilangkanProses', null, { root: true });
    }
  },
  keluar({ commit, dispatch }) {
    commit('resetDataPengguna');
    commit('kode/resetDaftarKode', null, { root: true });
    const dataNotifikasi = {
      apakahTampil: true,
      pesan: 'Berhasil keluar',
    };
    dispatch('notifikasi/tampilkanNotifikasi', dataNotifikasi, { root: true });
  },
};

const getters: GetterTree<PenggunaState, RootState> = {
  isLogin(s) {
    return s.idPengguna && s.idPengguna !== null;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
