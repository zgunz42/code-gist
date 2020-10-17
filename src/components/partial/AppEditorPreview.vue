<template>
  <section class="editor-kode flex fill-height">
    <gl-kode
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
