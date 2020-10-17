<template>
  <v-app-bar height="51px" color="#373d49" dark app>
    <v-app-bar-nav-icon @click="$emit('click-nav')"></v-app-bar-nav-icon>
    <v-toolbar-title>Title</v-toolbar-title>
    <v-spacer></v-spacer>
    <div class="mx-2">
      <app-bar-menu
        name="Bucket"
        :items="[{ link: '/', label: 'Javascript' }]"
      />
    </div>
    <v-btn icon @click="$emit('click-settings')">
      <v-icon>mdi-cog</v-icon>
    </v-btn>
  </v-app-bar>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api';
export default defineComponent({
  components: {
    AppBarMenu: () => import('@/components/partial/AppBarMenu.vue'),
  },
  data() {
    return {
      overlay: false,
    };
  },
});
</script>
