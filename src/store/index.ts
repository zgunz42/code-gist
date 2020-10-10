import Vue from 'vue';
import Vuex from 'vuex';
import kode from './kode';
import notifikasi from './notifikasi';
import pengguna from './pengguna';
import proses from './proses';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  modules: {
    kode,
    notifikasi,
    pengguna,
    proses,
  },
});
