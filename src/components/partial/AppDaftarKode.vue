<template>
  <section class="daftar-kode col-12">
    <gl-kode
      v-for="itemKode in $store.state.kode.daftarKode"
      :key="itemKode.id"
      :id-kode="itemKode.id"
      :kode="itemKode.code"
      :bahasa-pemrograman="itemKode.lang"
      :apakah-highlight-menyala="apakahHighlightMenyala"
      @terhapus="dapatkanDaftarKode"
    />
  </section>
</template>

<script>
import {
  reactive,
  watchEffect,
  toRef,
  watch,
  toRefs,
} from '@vue/composition-api';
export default {
  setup(_, { root: { $store } }) {
    const idPengguna = toRef($store.state.pengguna, 'idPengguna');
    const filter = reactive({
      halaman: 1,
      banyakData: 6,
      urutkanBerdasarkan: 'createdAt',
      urutkan: 'DESC',
      apakahHighlightMenyala: 1,
    });

    async function dapatkanDaftarKode() {
      await $store.dispatch('kode/dapatkanSemuaKode', {
        idPengguna: idPengguna.value,
        filter: {
          halaman: filter.halaman,
          banyakData: filter.banyakData,
          urutkanBerdasarkan: filter.urutkanBerdasarkan,
          urutkan: filter.urutkan,
          apakahHighlightMenyala: filter.apakahHighlightMenyala,
        },
      });
    }
    watch(idPengguna, id => {
      if (id && id !== null) {
        dapatkanDaftarKode();
      }
    });

    return {
      ...toRefs(filter),
      dapatkanDaftarKode,
    };
  },
};
</script>
<style lang="scss">
.daftar-kode {
  --auto-grid-min-size: 16rem;

  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(var(--auto-grid-min-size), 1fr)
  );
  grid-gap: 1rem;
  .tampilan-kode {
    // padding: 5rem 1rem;
    text-align: center;
    font-size: 1.2rem;
    .shiki {
      min-height: 150px;
    }
  }
}
</style>
