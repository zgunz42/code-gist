import { dapatkanOpsi } from '@/utils';
import { reactive, toRefs } from '@vue/composition-api';
type State = {
  daftarBahasaPemrograman: any[];
  daftarTwoslash: any[];
};

export default function getOptions() {
  const state = reactive<State>({
    daftarBahasaPemrograman: [],
    daftarTwoslash: ['twoslash', 'tsconfig'],
  });

  async function dapatkanDaftarBahasaPemrograman() {
    try {
      const respon = await dapatkanOpsi();
      if (respon.success && !respon.error) {
        state.daftarBahasaPemrograman = respon.data.languages;
      }
      return respon;
    } catch (error) {
      throw {
        apakahTampil: true,
        pesan: error.message,
      };
    }
  }
  return {
    ...toRefs(state),
    load: dapatkanDaftarBahasaPemrograman,
  };
}
