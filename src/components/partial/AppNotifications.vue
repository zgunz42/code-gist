<template>
  <div v-if="!hidden" class="notifications">
    <v-alert
      v-for="(alert, index) in displayAlert"
      :key="index"
      text
      dense
      color="info"
      border="left"
      icon="mdi-clock-fast"
      transition="slide-x-transition"
    >
      {{ alert }}
    </v-alert>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  onUnmounted,
  ref,
} from '@vue/composition-api';

const MAX_COUNT = 3;

export default defineComponent({
  setup(_, { root: { $store } }) {
    const alerts = ref<any>([]);
    const hidden = ref(false);

    const hentikan = $store.subscribe(({ type, payload }, state) => {
      if (type.startsWith('notifikasi')) {
        //do your stuff here
        if (type.endsWith('aturNotifikasi')) {
          alerts.value = [...alerts.value, payload.pesan];
        } else if (type.endsWith('hapusNotifikasi')) {
          const alert = [...alerts.value];
          alert.pop();
          alerts.value = alert;
        }
      }
    });

    const displayAlert = computed(() => {
      return alerts.value.slice(0, MAX_COUNT);
    });
    const disable = () => (hidden.value = true);
    const enable = () => (hidden.value = true);

    onUnmounted(() => {
      hentikan();
    });

    return {
      displayAlert,
      disable,
      enable,
      hidden,
    };
  },
});
</script>
<style lang="scss">
.notifications {
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 8px;
  z-index: 99;
  max-width: 300px;
}
</style>
