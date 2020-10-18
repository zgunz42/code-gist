<template>
  <div class="editor-wrapper">
    <slot
      name="content"
      :inEdit="inEdit"
      :setEdit="setEdit"
      :setSave="setSave"
    ></slot>
    <v-btn
      class="editor-btn font-weight-light text-lowercase"
      text
      @click="!inEdit ? setEdit(true) : setSave()"
      color="primary"
    >
      <v-icon class="font-weight-light" size="small" dark>
        {{ !inEdit ? 'mdi-pencil' : 'mdi-content-save' }}
      </v-icon>
      {{ !inEdit ? 'Edit' : 'Save' }}
    </v-btn>
  </div>
</template>
<script>
import { defineComponent, ref, nextTick } from '@vue/composition-api';

export default defineComponent({
  setup(_, { emit }) {
    const inEdit = ref(false);
    function setEdit(edit) {
      if (edit) {
        emit('edit');
      }
      inEdit.value = edit;
    }
    function setSave() {
      emit('save');
      setEdit(false);
    }
    return { inEdit, setEdit, setSave };
  },
});
</script>
<style lang="scss">
.editor-wrapper {
  position: relative;
  display: inline-block;
  padding-right: 65px;
  .editor-btn {
    height: 0 !important;
    position: absolute;
    right: 0;
    top: 14px;
  }
}
</style>
