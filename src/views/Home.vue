<template>
  <div cols="12" class="home">
    <app-editor />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  components: {
    AppEditor: () => import('@/components/partial/AppEditor.vue'),
  },
});
</script>
<style lang="scss">
.home {
  width: 100%;
  height: 100%;
}
</style>
