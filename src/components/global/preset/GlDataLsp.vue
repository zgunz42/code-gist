<template>
  <span
    v-tooltip.top="{ content: lsp, autoHide: false, html: true }"
    class="data-lsp"
  >
    <slot />
  </span>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { VTooltip } from 'v-tooltip';

export default defineComponent({
  name: 'DataLsp',
  directives: {
    tooltip: VTooltip,
  },
  props: {
    lsp: {
      type: String,
      required: true,
    },
  },
});
</script>
