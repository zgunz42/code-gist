<template>
  <textarea v-model="code"></textarea>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  data() {
    return {
      code: 'foo',
    };
  },
});
</script>
<style scoped>
textarea {
  width: 100%;
  padding: 4px;
  min-height: 500px;
  border: none;
  overflow: auto;
  outline: none;

  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;

  resize: none; /*remove the resize handle on the bottom right*/
}
</style>
