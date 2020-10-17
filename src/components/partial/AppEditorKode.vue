<template>
  <div class="wrapper">
    <div ref="wrapper" class="tln-wrapper">
      <span
        v-for="(line, index) in lines"
        :key="index"
        @click="toggleSelect(line)"
        :class="{
          selected: selected.includes(line),
        }"
        class="tln-line"
      ></span>
    </div>
    <textarea
      ref="area"
      class="tln-active"
      :value="kode"
      @scroll="fetchScroll"
      @input="ev => $emit('input', ev.target.value)"
    ></textarea>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  inject,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from '@vue/composition-api';

export default defineComponent({
  model: {
    prop: 'kode',
    event: 'input',
  },
  setup(_, { refs, emit }) {
    const eventList: any = {};
    const lines = ref<number[]>([]);
    const selected = ref<number[]>([]);

    watch(selected, () => emit('mark', selected.value));

    function toggleSelect(line: number) {
      if (selected.value.includes(line)) {
        selected.value.splice(selected.value.indexOf(line), 1);
      } else {
        selected.value.push(line);
      }
    }

    function updateLineNumbers(ta: any) {
      // Let's check if there are more or less lines than before
      const lineCount = ta.value.split('\n').length;
      const childCount = lines.value.length;
      let difference = lineCount - childCount;
      // If there is any positive difference, we need to add more line numbers
      if (difference > 0) {
        // Create a fragment to work with so we only have to update DOM once
        // const frag = document.createDocumentFragment();
        // For each new line we need to add,
        while (difference > 0) {
          // Create a <span>, add TLN class name, append to fragment and
          // update difference
          // const lineNumber = document.createElement('span');
          // lineNumber.className = 'tln-line';
          // frag.appendChild(lineNumber);
          lines.value.push(lines.value.length + 1);
          difference--;
        }
        // Append fragment (with <span> children) to our wrapper element
        // el.appendChild(frag);
      }
      // If, however, there's negative difference, we need to remove line numbers
      while (difference < 0) {
        // Simple stuff, remove last child and update difference
        // el.removeChild(el.lastChild);
        lines.value.pop();
        difference++;
      }
    }
    function appendLineNumbers() {
      // Get reference to desired <textarea>
      const ta = refs.area;
      const id = 1;

      // If getting reference to element fails, warn and leave
      if (ta == null) {
        return console.warn("[tln.js] Couldn't find textarea");
      }
      // If <textarea> already has TLN active, warn and leave
      // if (ta.className.indexOf('tln-active') != -1) {
      //   return console.warn('[tln.js] textarea of is already numbered');
      // }
      // Otherwise, we're safe to add the class name and clear inline styles
      // ta.classList.add('tln-active');
      // ta.setAttribute('style', '');

      // Create line numbers wrapper, insert it before <textarea>
      // const el = document.createElement('div');
      // el.className = 'tln-wrapper';
      // ta.parentNode && ta.parentNode.insertBefore(el, ta);
      // Call update to actually insert line numbers to the wrapper
      updateLineNumbers(ta);
      // Initialize event listeners list for this element ID, so we can remove
      // them later if needed
      eventList[id] = [];

      // Constant list of input event names so we can iterate
      const changeEvts = ['propertychange', 'input', 'keydown', 'keyup'];
      // Default handler for input events
      const changeHdlr = (function(ta) {
        return function(e: any) {
          // If pressed key is Left Arrow (when cursor is on the first character),
          // or if it's Enter/Home, then we set horizontal scroll to 0
          // Check for .keyCode, .which, .code and .key, because the web is a mess
          // [Ref] stackoverflow.com/a/4471635/4824627
          if (
            (+ta.scrollLeft == 10 &&
              (e.keyCode == 37 ||
                e.which == 37 ||
                e.code == 'ArrowLeft' ||
                e.key == 'ArrowLeft')) ||
            e.keyCode == 36 ||
            e.which == 36 ||
            e.code == 'Home' ||
            e.key == 'Home' ||
            e.keyCode == 13 ||
            e.which == 13 ||
            e.code == 'Enter' ||
            e.key == 'Enter' ||
            e.code == 'NumpadEnter'
          )
            ta.scrollLeft = 0;
          // Whether we scrolled or not, let's check for any line count updates
          updateLineNumbers(ta);
        };
      })(ta);

      // Finally, iterate through those event names, and add listeners to
      // <textarea> and to events list
      /// TODO: Performance gurus: is this suboptimal? Should we only add a few
      /// listeners? I feel the update method is optimal enough for this to not
      /// impact too much things.
      for (let i = changeEvts.length - 1; i >= 0; i--) {
        ta.addEventListener(changeEvts[i], changeHdlr);
        eventList[id].push({
          evt: changeEvts[i],
          hdlr: changeHdlr,
        });
      }

      // Constant list of scroll event names so we can iterate
      const scrollEvts = ['change', 'mousewheel', 'scroll'];
      // Default handler for scroll events (pretty self explanatory)
      const scrollHdlr = (function(ta, el) {
        return function() {
          el.scrollTop = ta.scrollTop;
        };
      })(ta, refs.wrapper);
      // Just like before, iterate and add listeners to <textarea> and to list
      /// TODO: Also just like before: performance?
      for (let i = scrollEvts.length - 1; i >= 0; i--) {
        ta.addEventListener(scrollEvts[i], scrollHdlr);
        eventList[id].push({
          evt: scrollEvts[i],
          hdlr: scrollHdlr,
        });
      }
    }

    function removeLineNumbers() {
      // Get reference to <textarea>
      const ta = refs.area;
      const id = 1;
      // If getting reference to element fails, warn and leave
      if (ta == null) {
        return console.warn(
          "[tln.js] Couldn't find textarea of id '" + id + "'"
        );
      }
      // If <textarea> already doesn't have TLN active, warn and leave
      if (ta.className.indexOf('tln-active') == -1) {
        return console.warn(
          "[tln.js] textarea of id '" + id + "' isn't numbered"
        );
      }
      // Otherwise, remove class name
      ta.classList.remove('tln-active');

      // Remove previous sibling if it's our wrapper (otherwise, I guess 'woops'?)
      const wrapperChck = ta.previousSibling;
      if (wrapperChck && wrapperChck.className == 'tln-wrapper')
        wrapperChck.remove();

      // If somehow there's no event listeners list, we can leave
      if (!eventList[id]) return;
      // Otherwise iterate through listeners list and remove each one
      for (let i = eventList[id].length - 1; i >= 0; i--) {
        const evt = eventList[id][i];
        ta.removeEventListener(evt.evt, evt.hdlr);
      }
      // Finally, delete the listeners list for that ID
      delete eventList[id];
    }

    onMounted(() => appendLineNumbers());
    onUnmounted(() => removeLineNumbers());
    const data = inject<any>('scroll');
    function fetchScroll(ev: any) {
      const target = ev.target;
      const totalY = target.scrollHeight - target.clientHeight;
      const totalPercY = totalY ? (target.scrollTop / totalY) * 100 : 0;
      const totalX = target.scrollWidth - target.clientWidth;
      const totalPercX = totalX ? (target.scrollLeft / totalX) * 100 : 0;

      data.scrollX.value = totalPercX;
      data.scrollY.value = totalPercY;
    }
    return { lines, toggleSelect, selected, fetchScroll };
  },
  props: {
    kode: { type: String, required: true },
  },
});
</script>
<style lang="scss">
$line-width: 2.5em;
.wrapper {
  width: 100%;
  height: 100%;
}
.tln-active,
.tln-wrapper,
.tln-line {
  margin: 0;
  border: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
  vertical-align: middle;
  list-style: none;
}
.tln-active {
  display: inline-block;
  padding: 0.6875em 0.2em;
  width: calc(100% - #{$line-width});
  height: 100%;
  font-size: 1em;
  line-height: 1.5;
  font-family: 'Roboto Mono', monospace;
  word-break: break-all;
  border: 1px solid #aeaeae;
  background-color: #fff;
  resize: none;
  overflow-wrap: normal;
  overflow-x: auto;
  white-space: pre;
}
.tln-wrapper {
  width: $line-width;
  // padding: 0.6875em 0.3125em 2.1875em;
  height: 100%;
  word-break: break-all;
  overflow: hidden;
  display: inline-block;
  counter-reset: line;
  background: #f5f7fa;
  color: #a0aabf;
  overflow: hidden;
  padding: 0 0 2.1875em;
  border-right: 1px solid #d3daea;
}
.tln-line {
  width: 100%;
  display: block;
  text-align: right;
  line-height: 1.5;
  font-size: 1em;
  color: #aeaeae;
  padding: 0 0.3125em 0;
  vertical-align: top;

  &:first-child:not(:last-child) {
    padding: 0.6875em 0.3125em 0;
  }
  &.selected {
    background-color: #aeaeae;
    color: #686868;
  }
}
.tln-line::before {
  counter-increment: line;
  content: counter(line);
  font-size: 1em;
  user-select: none;
  vertical-align: top;
  white-space: pre;
  overflow: hidden;
}
</style>
