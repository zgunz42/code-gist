<template>
  <v-app-bar height="51px" color="#373d49" dark app>
    <v-toolbar-title>MakeUp Formmater</v-toolbar-title>
    <v-spacer></v-spacer>
    <div class="mx-2">
      <div class="nav-right">
        <ul class="menu menu-utilities">
          <li @click="showAuthDialog">
            <app-bar-menu name="Daftar / Masuk" />
          </li>
        </ul>
      </div>
    </div>
    <!-- <v-btn icon @click="$emit('click-settings')">
      <v-icon>mdi-cog</v-icon>
    </v-btn> -->
  </v-app-bar>
</template>
<script lang="ts">
import { authSym } from '@/layouts/PageLayout.vue';
import { defineComponent, inject } from '@vue/composition-api';
export default defineComponent({
  components: {
    AppBarMenu: () => import('@/components/partial/AppBarMenu.vue'),
  },
  setup() {
    const auth: any = inject(authSym);
    return {
      showAuthDialog: () => auth?.value.tampil(),
    };
  },
  data() {
    return {
      overlay: false,
    };
  },
});
</script>
