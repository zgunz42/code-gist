<template>
  <div class="editor-code">
    <v-card>
      <v-row no-gutters class="fill-height">
        <v-col class="editor-code-container">
          <div class="header">
            <h3 class="font-weight-light text-uppercase overline">
              JAVASCRIPT
            </h3>
          </div>
          <div class="body">
            <app-editor-kode />
          </div>
        </v-col>
        <v-col class="editor-code-container">
          <div class="body fill-height">
            <app-editor-preview
              :inputKode="inputKode"
              :bahasaPemrogramanTerpilih="bahasaPemrogramanTerpilih"
              :hasilHighlight="hasilHighlight"
            />
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script lang="ts">
import { stringifyUrl } from 'query-string';
import debounce from 'debounce-fn';
import { URL_API, OPSI_STRINGIFY } from '@/constants';
import { kirimData } from '@/utils';
import { defineComponent, reactive, toRefs, watch } from '@vue/composition-api';

type State = {
  inputKode: string;
  bahasaPemrogramanTerpilih?: string;
  namaBerkas?: string;
  highlight?: string;
  twoslashTerpilih?: string;
  hasilHighlight?: string;
};

export default defineComponent({
  components: {
    AppEditorKode: () => import('@/components/partial/AppEditorKode.vue'),
    AppEditorPreview: () => import('@/components/partial/AppEditorPreview.vue'),
  },
  setup(_, { root: { $store } }) {
    const state = reactive<State>({
      inputKode: '',
      bahasaPemrogramanTerpilih: undefined,
      namaBerkas: undefined,
      highlight: undefined,
      twoslashTerpilih: undefined,
      hasilHighlight: undefined,
    });

    async function highlighter(inputKode: string, download?: boolean) {
      try {
        $store.dispatch('proses/tampilkanProses', null);
        const objekUrl = {
          url: URL_API,
          query: {
            lang: state.bahasaPemrogramanTerpilih,
            fileName: state.namaBerkas,
            highlight: state.highlight,
            twoslash: state.twoslashTerpilih,
            download,
          },
        };
        const url = stringifyUrl(objekUrl, OPSI_STRINGIFY);

        const respon = await kirimData(url, {
          code: inputKode,
        });

        if (respon.success && !respon.error) {
          state.hasilHighlight = respon.data;
        } else {
          throw new Error(respon.message);
        }
      } catch (error) {
        const dataNotifikasiGalat = {
          apakahTampil: true,
          pesan: error.message || 'Bahasa Pemrograman dan Kode wajib diisi',
        };
        $store.dispatch('notifikasi/tampilkanNotifikasi', dataNotifikasiGalat);
        console.log(error);
      } finally {
        $store.dispatch('proses/hilangkanProses', null);
      }
    }

    watch(
      () => state.inputKode,
      kode => {
        debounce(
          () => {
            state.hasilHighlight = '';
            highlighter(kode);
          },
          { wait: 3000 }
        );
      }
    );

    return {
      ...toRefs(state),
    };
  },
});
</script>
<style lang="scss">
.editor-code {
  .v-card {
    overflow: hidden;
    max-height: calc(100vh - 191px);
  }
  &-container {
    position: relative;
    .header,
    .body {
      display: flex;
      padding: 0 8px;
      align-items: center;
    }
    .header {
      min-height: 50px;
      position: absolute;
      top: 0;
      left: 0;
    }
    .body {
      padding: 0;
      padding-top: 50px;
      border-top: none;
    }
    .data-code {
      background: #000;
      height: 100%;
    }
  }
}
</style>
