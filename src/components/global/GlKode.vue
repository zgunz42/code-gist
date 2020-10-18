<template>
  <div class="tampilan-kode">
    <gl-data-code
      :code="kode"
      :lang="bahasaPemrograman"
      :is-highlighted="apakahHighlightMenyala"
    />
    <div class="actions">
      <v-btn
        depressed
        color="error"
        v-if="idKode"
        @click="ketikaTombolHapusDiKlik"
      >
        Hapus
      </v-btn>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { validator } from '@/utils';

export default defineComponent({
  props: {
    idKode: {
      type: String,
      default: null,
    },
    kode: {
      default: '',
      required: true,
      validator,
    },
    bahasaPemrograman: {
      default: '',
      required: true,
      validator,
    },
    apakahHighlightMenyala: {
      type: Number,
      default: 1,
    },
  },
  setup(props, { root: { $store }, emit }) {
    async function ketikaTombolHapusDiKlik() {
      const hasilKonfirmasi = confirm('Apakah kamu yakin?');
      if (hasilKonfirmasi && this.idKode) {
        await this.$store.dispatch('kode/hapusKode', {
          idPengguna: $store.state.pengguna.idPengguna,
          idKode: props.idKode,
        });
        await emit('terhapus');
      }
    }
    return { ketikaTombolHapusDiKlik };
  },
});
</script>
<style lang="scss" scoped>
.tampilan-kode {
  position: relative;
  .actions {
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 4px;
  }
}
</style>
