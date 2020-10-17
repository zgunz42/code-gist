<template>
  <div class="tampilan-kode">
    <gl-data-code
      :code="kode"
      :lang="bahasaPemrograman"
      :is-highlighted="apakahHighlightMenyala"
    />
    <v-button v-if="idKode" @click="ketikaTombolHapusDiKlik">
      Hapus
    </v-button>
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
