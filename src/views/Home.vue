<template>
  <div cols="12" class="home">
    <v-row justify="space-between" align="center" class="m-12 p-4">
      <v-col class="header">
        <h3 class="font-weight-light text-uppercase overline">
          DOCUMENT NAME
        </h3>
        <p class="font-weight-regular subtitle-1">Untitled Document.md</p>
      </v-col>
      <v-col cols="auto" class="actions">
        <v-container>
          <v-row>
            <v-col><v-btn color="primary">Unduh</v-btn></v-col>
            <v-col><v-btn color="primary" @click="login">Simpan</v-btn></v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
    <app-editor-kode />
  </div>
</template>

<script lang="ts">
import { authSym } from '@/layouts/PageLayout.vue';
import { defineComponent, inject } from '@vue/composition-api';

export default defineComponent({
  components: {
    AppEditorKode: () => import('@/components/partial/AppEditorKode.vue'),
  },
  setup() {
    const authPromp = inject<any>(authSym);
    const login = () => authPromp.value?.tampil();

    return { login };
  },
});
</script>
<style lang="scss">
.home {
  width: 100%;
  height: 100%;
}
</style>
