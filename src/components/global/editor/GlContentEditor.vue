<template>
  <gl-text-editor
    :set="(setVEdit = undefined)"
    @edit.capture="save = false"
    @save="saveFileName"
    v-click-outside="() => (setVEdit && setVEdit(false)) || fetchInText()"
  >
    <template #content="{ inEdit, setEdit, setSave }">
      <span
        ref="filename"
        :set="(setVEdit = setEdit)"
        :contenteditable="inEdit"
        @keydown.enter="setSave"
      >
        <slot></slot>
      </span>
    </template>
  </gl-text-editor>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  model: {
    prop: 'text',
    event: 'save',
  },
  props: {
    text: { type: [String, Number], required: true },
  },
  setup(props, { refs, emit }) {
    const save = ref(false);
    // const fileName = ref('Untitled Document.md');

    function saveFileName() {
      save.value = true;
      emit('save', refs.filename.innerText);
    }

    function fetchInText() {
      if (false === save.value) {
        refs.filename.innerText = props.text;
      }
    }

    return { saveFileName, fetchInText, save };
  },
});
</script>
