<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="290" @click:outside="reset">
      <v-card>
        <v-card-title class="headline">
          Simpan Kode
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12"
                >Masukan Nama Pengguna untuk menyimpan kode</v-col
              >
              <v-col cols="12">
                <v-text-field
                  ref="username"
                  v-model="namaPengguna"
                  label="Username*"
                  hide-details="auto"
                  :error-messages="errorMsg ? [errorMsg] : undefined"
                  :success-messages="successMsg ? [successMsg] : undefined"
                  :rules="[value => !!value || 'Isi field username.']"
                  :disabled="disabled"
                  lazy-value
                  outlined
                  flat
                  dense
                  required
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            depressed
            text
            @click="daftarkan({ namaPengguna })"
            :loading="inDaftar"
            :disabled="disabled || inDaftar || inMasuk"
          >
            Daftar
            <template v-slot:loader>
              <span class="custom-loader">
                <v-icon light>mdi-cached</v-icon>
              </span>
              <span>Daftar</span>
            </template>
          </v-btn>
          <v-btn
            depressed
            color="primary"
            @click="masukkan({ namaPengguna })"
            :loading="inMasuk"
            :disabled="disabled || inDaftar || inMasuk"
          >
            Masuk
            <template v-slot:loader>
              <span class="custom-loader">
                <v-icon light>mdi-cached</v-icon>
              </span>
              <span>Masuk</span>
            </template>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script lang="ts">
import { DAFTAR_NOTIF, MASUK_NOTIF } from '@/constants';
import { notifSym } from '@/layouts/PageLayout.vue';
import {
  computed,
  defineComponent,
  inject,
  reactive,
  toRef,
  toRefs,
  watch,
} from '@vue/composition-api';

enum Mode {
  DAFTAR,
  MASUK,
  AUTH,
  ANONIM,
}

type State = {
  namaPengguna?: string;
  message: string;
  dialog: boolean;
  mode: Mode;
};

export default defineComponent({
  setup(props, { root: { $store }, refs }) {
    const state = reactive<State>({
      namaPengguna: undefined,
      message: '',
      dialog: false,
      mode: Mode.ANONIM,
    });
    const notify = inject<any>(notifSym);
    const disabled = toRef($store.state.proses, 'apakahProsesTampil');
    const pesan = toRef($store.state.notifikasi, 'pesan');

    function isLoading(mode: Mode) {
      return disabled.value && state.mode === mode;
    }

    const successMsg = computed(() => {
      if (state.message === MASUK_NOTIF || state.message === DAFTAR_NOTIF) {
        return state.message;
      }
      return false;
    });

    const errorMsg = computed(() => {
      if (state.message === MASUK_NOTIF || state.message === DAFTAR_NOTIF) {
        return false;
      }

      return state.message;
    });
    const inMasuk = computed(() => {
      return isLoading(Mode.MASUK);
    });

    const inDaftar = computed(() => {
      return isLoading(Mode.DAFTAR);
    });

    function tampil() {
      if (!disabled.value) {
        state.dialog = true;
        notify.value?.disable();
      }
    }

    function reset() {
      state.message = '';
      state.dialog = false;
      state.mode = Mode.ANONIM;
    }

    function sembuyi() {
      refs.username.blur();
      state.dialog = false;
      notify.value?.enable();
      reset();
    }

    watch(pesan, val => {
      if (val || val !== null) {
        if (val === MASUK_NOTIF || val === DAFTAR_NOTIF) {
          state.mode = Mode.AUTH;
          setTimeout(() => {
            sembuyi();
          }, 300);
        }
      }
      if (state.mode !== Mode.AUTH) {
        state.mode = Mode.ANONIM;
      }
      state.message = val;
    });
    function masukkan({ namaPengguna }: { namaPengguna: string }) {
      if (state.namaPengguna !== '') {
        state.mode = Mode.MASUK;
        $store.dispatch('pengguna/masuk', { namaPengguna });
      }
    }

    function daftarkan({ namaPengguna }: { namaPengguna: string }) {
      if (state.namaPengguna !== '') {
        state.mode = Mode.DAFTAR;
        $store.dispatch('pengguna/daftar', { namaPengguna });
      }
    }
    return {
      ...toRefs(state),
      masukkan,
      daftarkan,
      tampil,
      reset,
      sembuyi,
      successMsg,
      errorMsg,
      inMasuk,
      inDaftar,
      disabled,
    };
  },
});
</script>
<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
