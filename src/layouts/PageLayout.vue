<template>
  <v-app>
    <v-navigation-drawer expand-on-hover permanent left app>
      <template v-slot:prepend>
        <v-list-item two-line style="padding: 8px" @click="san">
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Jane Smith</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-sheet height="400" class="overflow-hidden" style="position: relative;">
        <v-container class="fill-height">
          <v-row align="center" justify="center">
            <router-view />
          </v-row>
        </v-container>
      </v-sheet>
    </v-main>
    <auth-promp ref="authPromp" />
  </v-app>
</template>
<script lang="ts">
import Component from 'vue-class-component';
import { ProvideReactive, Ref } from 'vue-property-decorator';
import Vue from 'vue';
import AuthPromp from '../modules/auth/AuthPromp.vue';

@Component({
  components: { AuthPromp },
})
export default class PageLayout extends Vue {
  @Ref('authPromp')
  @ProvideReactive('authPromp')
  readonly authPromp!: AuthPromp;
  san() {
    this.authPromp.tampil();
  }
  data() {
    return {
      drawer: true,
      items: [
        { title: 'Home', icon: 'mdi-home-city' },
        { title: 'My Account', icon: 'mdi-account' },
        { title: 'Users', icon: 'mdi-account-group-outline' },
      ],
      mini: true,
    };
  }
}
</script>
