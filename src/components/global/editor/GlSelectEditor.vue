<template>
  <v-menu :value="showHint" offset-y bottom>
    <template v-slot:activator="{ on, attrs }">
      <gl-text-editor
        :set="(setVEdit = undefined)"
        @edit.capture="save = false"
        @save="saveFileName"
        v-on="on"
        v-bind="attrs"
        v-click-outside="() => (setVEdit && setVEdit(false)) || fetchInText()"
      >
        <template
          #content="{ inEdit, setEdit, setSave }"
          :set="(showHint = inEdit)"
        >
          <span
            ref="filename"
            :set="(setVEdit = setEdit)"
            :contenteditable="inEdit"
            @input="ev => setChange(ev, inEdit)"
            @keydown.enter="setSave"
          >
            <slot></slot>
          </span>
        </template>
      </gl-text-editor>
    </template>
    <v-list>
      <v-list-item v-for="(item, index) in display" :key="index">
        <v-list-item-title @click="setValue(item)">{{
          item
        }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';

type Props = {
  text: string;
  items: string[];
};

export default defineComponent<Props>({
  model: {
    prop: 'text',
    event: 'save',
  },
  props: {
    text: { type: [String, Number], required: true },
    items: { type: Array, required: true },
  },
  setup(props, { refs, emit }) {
    const save = ref(false);
    const showHint = ref(false);
    // const fileName = ref('Untitled Document.md');
    const display = ref<string[]>([]);
    function saveFileName() {
      save.value = true;
      emit('save', refs.filename.innerText);
    }

    function fetchInText() {
      if (false === save.value) {
        refs.filename.innerText = props.text;
        showHint.value = false;
      }
    }

    function setValue(params: string) {
      save.value = true;
      emit('save', params);
    }

    function setChange(ev: any, params: boolean) {
      showHint.value = params;
      display.value = props.items.filter(it => {
        return it.includes(ev.target.innerText.toLowerCase().trim());
      });
    }

    return {
      saveFileName,
      fetchInText,
      save,
      showHint,
      setChange,
      display,
      setValue,
    };
  },
});
</script>
