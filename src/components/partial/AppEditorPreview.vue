<template>
  <section class="editor-kode flex fill-height">
    <app-kode
      :kode="hasilHighlight"
      :bahasa-pemrograman="bahasaPemrogramanTerpilih"
      class="tampilan-kode--kustom fill-height"
    />
  </section>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

import { validator } from '@/utils';

export default defineComponent({
  components: {
    AppKode: () => import('@/components/AppKode.vue'),
  },
  props: {
    inputKode: {
      default: '',
      required: true,
      validator,
    },
    hasilHighlight: {
      type: String,
      default: '',
      required: true,
    },
    bahasaPemrogramanTerpilih: {
      default: '',
      required: true,
      validator,
    },
  },
});
</script>
