<template>
  <span class="data-err"><slot /></span>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'DataErr',
});
</script>
