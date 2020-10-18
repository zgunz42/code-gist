<template>
  <app-bar-menu name="" :items="isLogin ? items : []" @click-items="keluar">
    <v-list-item
      v-if="isLogin"
      two-line
      style="padding: 0px; height: 0;"
      dense
      dark
      link
    >
      <v-list-item-avatar>
        <img :src="avatarUrl" />
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>{{ namaPengguna }}</v-list-item-title>
        <v-list-item-subtitle>keluar?</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <div v-else @click="showAuthDialog">Daftar / Masuk</div>
  </app-bar-menu>
</template>
<script lang="ts">
import { authSym } from '@/layouts/PageLayout.vue';
import { computed, defineComponent, inject } from '@vue/composition-api';

export default defineComponent({
  components: {
    AppBarMenu: () => import('@/components/partial/AppBarMenu.vue'),
  },
  setup(props, { root: { $store } }) {
    const namaPengguna = computed(() => $store.state.pengguna.namaPengguna);
    const isLogin = computed(() => !!$store.state.pengguna.idPengguna);
    function keluar() {
      return $store.dispatch('pengguna/keluar');
    }

    const avatarUrl = computed(() => {
      const name = namaPengguna.value?.replace(' ', '+') || '';
      return `https://ui-avatars.com/api/?name=${name}&background=0D8ABC&color=fff&rounded=true&size=128`;
    });
    const auth: any = inject(authSym);

    const items = ['Keluar'];

    return {
      showAuthDialog: () => auth?.value.tampil(),
      namaPengguna,
      isLogin,
      keluar,
      avatarUrl,
      items,
    };
  },
});
</script>
