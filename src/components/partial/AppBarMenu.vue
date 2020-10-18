<template>
  <div
    @click="show = !show"
    class="menu-item menu-item--save-to"
    :class="{
      open: show,
      'has-dropdown': hasItems,
    }"
    v-click-outside="() => (show = false)"
  >
    <a
      class="dropdown-toggle d-flex block justify-center items-center text-decoration-none"
      dropdown-toggle=""
      aria-haspopup="true"
      aria-expanded="false"
      :href="to"
      ><slot
        ><span>{{ name }}</span></slot
      >
      <v-icon v-if="hasItems" color="#a0aabf">mdi-menu-down</v-icon></a
    >
    <ul v-if="hasItems" class="dropdown dropdown-menu" role="menu">
      <li v-for="(it, index) in items" :key="index" class="ng-scope">
        <a @click="$emit('click-items', it)" class="text-decoration-none">
          <span class="body-2">{{ it }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    name: { type: String, required: true },
    to: { type: String, required: false },
    items: { type: Array, required: false, deafult: () => [] },
  },
  setup(props) {
    const hasItems = computed(() => {
      return props.items && props.items.length > 0;
    });

    return { hasItems };
  },
  data() {
    return {
      show: false,
    };
  },
});
</script>
<style lang="scss">
.menu {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;

  .menu-item {
    border: 0;

    /* display: none; */
    float: left;
    margin: 0;
    position: relative;

    & > a {
      display: block;
      font-size: 12px;
      height: 51px;
      letter-spacing: 1px;
      line-height: 51px;
      padding: 0 8px;
    }

    &.open > a {
      background-color: #1d212a;
    }
  }
}

.open {
  .dropdown,
  .settings,
  .sidebar-list {
    display: block;
  }
}

.dropdown li,
.settings li {
  line-height: 1;
}

.dropdown li {
  margin: 25px 0;
  padding: 0 0 0 16px;
}

.v-application .menu a {
  border: 0;
  color: #a0aabf;
  font-family: source sans pro, helvetica neue, Helvetica, Arial, sans-serif;
  outline: none;
  text-transform: uppercase;
}

.dropdown,
.settings,
.sidebar-list {
  list-style: none;
  margin: 0;
}

.dropdown {
  padding: 0;
  display: none;
  background-color: #1d212a;
}

.settings {
  display: none;
  background-color: #1d212a;
}

.dropdown {
  position: absolute;
  right: 0;
  top: 51px;
  width: 188px;
}
</style>
