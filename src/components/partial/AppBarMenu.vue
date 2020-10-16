<template>
  <div class="nav-right">
    <ul class="menu menu-utilities">
      <li
        @click="show = !show"
        class="menu-item menu-item--save-to has-dropdown"
        :class="{
          show: show,
        }"
        dropdown=""
      >
        <a
          class="dropdown-toggle"
          dropdown-toggle=""
          aria-haspopup="true"
          aria-expanded="false"
          ><span>{{ name }}</span>
          <v-icon color="#a0aabf">mdi-menu-down</v-icon></a
        >
        <ul class="dropdown dropdown-menu" role="menu">
          <li v-for="(it, index) in items" :key="index" class="ng-scope">
            <a :href="it.link" class="text-decoration-none">
              <span class="body-2">{{ it.label }}</span>
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    name: { type: String, required: true },
    items: { type: Array, deafult: () => [] },
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
      padding: 0 24px;
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
