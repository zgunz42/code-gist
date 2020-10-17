<script lang="ts">
// Taken from: https://jsfiddle.net/Linusborg/1zdzu7k1/
import Vue from 'vue';

import { boolean } from 'boolean';
import { htmlEscape } from 'escape-goat';

import { validator } from '@/utils';
import {
  computed,
  ComputedRef,
  defineComponent,
  inject,
  onMounted,
  Ref,
  ref,
  watchEffect,
} from '@vue/composition-api';
import { VNode } from 'vue/types/umd';
type CreateElement = (createElement: any) => VNode;
type Raw = {
  templateRender: Ref<CreateElement | undefined>;
  whichCode: ComputedRef<string>;
};
export default defineComponent<any, Raw>({
  props: {
    code: {
      default: '',
      required: true,
      validator,
    },
    lang: {
      default: '',
      required: true,
      validator,
    },
    isHighlighted: {
      type: Number,
      default: 1,
      required: true,
    },
  },
  setup(props, { refs }) {
    const templateRender = ref<CreateElement>();
    const scroll: any = inject('scroll');
    const whichCode = computed(() => {
      if (!boolean(props.isHighlighted)) {
        return `<pre ref="codeView" class="data-code fill-height shiki-unparsed">${
          props.lang === 'html' ? htmlEscape(props.code) : props.code
        }</pre>`;
      }
      return `<div ref="codeView" class="data-code fill-height">${props.code}</div>`;
    });
    return { templateRender, whichCode, ...scroll };
  },
  watch: {
    scrollX: {
      handler: function(percX) {
        const target: any = this.$refs.codeView;
        const scorller = target?.children[0];

        if (scorller) {
          const totalX = scorller.scrollWidth - scorller.clientWidth;
          const totalPercX = totalX ? (percX * totalX) / 100 : 0;
          scorller.scrollLeft = totalPercX;
        }
      },
    },
    scrollY: {
      handler: function(percY) {
        const target: any = this.$refs.codeView;
        const scorller = target?.children[0];

        if (scorller) {
          const totalY = scorller.scrollHeight - scorller.clientHeight;
          const totalPercY = totalY ? (percY * totalY) / 100 : 0;
          scorller.scrollTop = totalPercY;
        }
      },
    },
    whichCode: {
      immediate: true,
      handler: function(code) {
        const res = Vue.compile(code);

        this.templateRender = res.render;

        // staticRenderFns belong into $options,
        // appearantly
        this.$options.staticRenderFns = [];

        // clean the cache of static elements
        // this is a cache with the results from the staticRenderFns
        this._staticTrees = [];
        // Fill it with the new staticRenderFns
        for (const i in res.staticRenderFns) {
          //staticRenderFns.push(res.staticRenderFns[i])
          this.$options.staticRenderFns.push(res.staticRenderFns[i]);
        }
      },
    },
  },
  render(createElement) {
    if (this.templateRender !== undefined) {
      return this.templateRender(createElement);
    }
    return createElement();
  },
});
</script>
