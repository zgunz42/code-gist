import { getCurrentInstance, reactive } from '@vue/composition-api';

enum Mode {
  DAFTAR,
  MASUK,
  AUTH,
  ANONIM,
}

type State = {
  namaPengguna?: string;
  // message: string;
  // dialog: boolean;
  mode: Mode;
};
export default function useAuth() {
  const vm = getCurrentInstance();
  if (!vm) {
    throw new Error('You must use this function within the "setup()" method');
  }
  const state = reactive<State>({
    namaPengguna: undefined,
    // message: '',
    // dialog: false,
    mode: Mode.ANONIM,
  });

  function masukkan({ namaPengguna }: { namaPengguna: string }) {
    if (state.namaPengguna !== '') {
      state.mode = Mode.MASUK;
      vm?.$store.dispatch('pengguna/masuk', { namaPengguna });
    }
  }

  function daftarkan({ namaPengguna }: { namaPengguna: string }) {
    if (state.namaPengguna !== '') {
      state.mode = Mode.DAFTAR;
      vm?.$store.dispatch('pengguna/daftar', { namaPengguna });
    }
  }
}
