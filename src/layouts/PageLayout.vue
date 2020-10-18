<template>
  <v-app>
    <app-bar />
    <v-main>
      <v-sheet style="position: relative;">
        <v-container fluid class="fill-height">
          <router-view />
        </v-container>
      </v-sheet>
    </v-main>
    <auth-promp ref="authPromp" />
    <app-notifications ref="notify" />
  </v-app>
</template>
<script lang="ts">
import AppSidebar from '@/components/partial/AppSidebar.vue';
import AuthPromp from '@/components/container/AuthPromp.vue';
import AppNotifications from '@/components/partial/AppNotifications.vue';
import AppBar from '@/components/partial/AppBar.vue';
import { computed, defineComponent, provide, ref } from '@vue/composition-api';
export const authSym = Symbol();
export const notifSym = Symbol();
export default defineComponent({
  components: { AuthPromp, AppSidebar, AppNotifications, AppBar },
  setup(_, { refs }) {
    const authPrompt = computed(() => refs.authPromp);
    const notify = computed(() => refs.notify);
    provide(authSym, authPrompt);
    provide(notifSym, notify);
  },
});
</script>
<style lang="scss">
.settings {
  .v-overlay__content {
    position: absolute;
    right: 0;
    margin-top: 120px;
    margin-right: 15px;
    margin-bottom: 15px;
    bottom: 0;
  }
}
</style>
