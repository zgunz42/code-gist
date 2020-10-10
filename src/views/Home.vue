<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" @click="login" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Component, InjectReactive, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import AuthPromp from '@/modules/auth/AuthPromp.vue';

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  @InjectReactive('authPromp') authPromp!: AuthPromp;
  login() {
    this.authPromp?.tampil();
    console.log(this.authPromp);
  }
}
</script>
