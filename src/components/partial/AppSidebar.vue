<template>
  <v-navigation-drawer
    :value="value"
    color="black"
    class="white--text"
    absolute
    temporary
  >
    <template v-if="isLogin" v-slot:prepend>
      <v-list-item two-line style="padding: 8px" dark link>
        <v-list-item-avatar>
          <img :src="avatarUrl" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ namaPengguna }}</v-list-item-title>
          <v-list-item-subtitle>Logged In</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item v-for="item in items" :key="item.title" dark>
        <v-list-item-icon>
          <v-icon dark>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            {{ item.title }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <template v-if="isLogin" v-slot:append>
      <v-list dense>
        <v-list-item @click="keluar">
          <v-list-item-icon>
            <v-icon color="red">mdi-exit-run</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title
              ><span class="red--text">Keluar</span></v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>
<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    value: { type: Boolean },
  },
  setup(props, { root: { $store } }) {
    const namaPengguna = computed(() => $store.state.pengguna.namaPengguna);
    const isLogin = computed(() => $store.getters.isLogin);
    function keluar() {
      return $store.dispatch('pengguna/keluar');
    }

    const avatarUrl = computed(() => {
      const name = namaPengguna.value?.replace(' ', '+') || '';
      return `https://ui-avatars.com/api/?name=${name}&background=0D8ABC&color=fff&rounded=true&size=128`;
    });

    return {
      namaPengguna,
      isLogin,
      keluar,
      avatarUrl,
    };
  },
  data() {
    return {
      drawer: true,
      items: [
        { title: 'Home', icon: 'mdi-home' },
        { title: 'Format Code', icon: 'mdi-plus-box' },
        { title: 'Saved Code', icon: 'mdi-cards-outline' },
      ],
      mini: true,
    };
  },
});
</script>
