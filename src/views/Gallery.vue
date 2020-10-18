<template>
  <div class="about container">
    <div class="heading">
      <h4 class="h3">All Code Saved</h4>
      <p class="subtitle-1">showing list of code saved by you</p>
    </div>
    <div class="content">
      <v-row align="center">
        <v-col class="d-flex">
          <span class="bold mr-2">Display:</span> 6
        </v-col>
        <v-col class="d-flex">
          <v-select
            :items="['items']"
            label="Urutkan Berdasarkan"
            class="mr-4"
            dense
            solo
          ></v-select>
          <v-select :items="['items']" label="Urutkan" dense solo></v-select>
        </v-col>
      </v-row>
      <app-daftar-kode />
      <v-row align="center" justify="center" class="mt-4">
        <v-col cols="auto"
          ><v-btn rounded color="primary" large dark>Load More</v-btn></v-col
        >
      </v-row>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  components: {
    AppDaftarKode: () => import('@/components/partial/AppDaftarKode.vue'),
  },
});
</script>
