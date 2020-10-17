<template>
  <div class="editor-code">
    <v-card>
      <v-row no-gutters class="fill-height">
        <v-col class="editor-code-container editor">
          <div class="header">
            <h3 class="font-weight-light text-uppercase overline">
              JAVASCRIPT
            </h3>
          </div>
          <div class="body editor">
            <app-editor-kode v-model="inputKode" />
          </div>
        </v-col>
        <v-col class="editor-code-container">
          <div class="body fill-height pt-0">
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
import {
  defineComponent,
  reactive,
  toRef,
  onBeforeMount,
  toRefs,
  watch,
  onMounted,
} from '@vue/composition-api';
import getOptions from '@/compositions/getOptions';

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
      bahasaPemrogramanTerpilih: 'javascript',
      namaBerkas: undefined,
      highlight: undefined,
      twoslashTerpilih: undefined,
      hasilHighlight: undefined,
    });

    const { load, daftarBahasaPemrograman, daftarTwoslash } = getOptions();

    onMounted(() => {
      load().catch(function(dataNotifikasiGalat) {
        $store.dispatch('notifikasi/tampilkanNotifikasi', dataNotifikasiGalat);
      });
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
      toRef(state, 'inputKode'),
      debounce(
        kode => {
          state.hasilHighlight = '';
          highlighter(kode);
        },
        { wait: 300 }
      )
    );

    return {
      ...toRefs(state),
      daftarBahasaPemrograman,
      daftarTwoslash,
    };
  },
});
</script>
<style lang="scss">
.editor-code {
  &-container {
    position: relative;
    overflow: hidden;
    height: calc(100vh - 190px);
    .header,
    .body {
      display: flex;
      padding: 0 8px;
      align-items: center;
    }
    .header {
      min-height: 50px;
    }
    .body {
      padding: 0;
      border-top: none;
      // overflow-y: scroll;
      &.editor {
        overflow: hidden;
        height: calc(100% - 50px);
      }
    }
    .data-code {
      background: #000;
      height: 100%;
    }
  }
}
</style>
