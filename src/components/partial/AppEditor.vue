<template>
  <div class="container">
    <v-row justify="space-between" align="center" class="m-12 p-4">
      <v-col class="header">
        <h3 class="font-weight-light text-uppercase overline">
          DOCUMENT NAME
        </h3>

        <gl-content-editor v-model="namaBerkas">
          <p class="font-weight-regular subtitle-1">
            {{ namaBerkas }}
          </p>
        </gl-content-editor>
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
    <div class="editor-code">
      <v-card>
        <v-row no-gutters class="fill-height">
          <v-col class="editor-code-container editor">
            <div class="header">
              <gl-content-editor
                :text="bahasaPemrogramanTerpilih"
                @save="val => (bahasaPemrogramanTerpilih = val.toLowerCase())"
              >
                <h3 class="font-weight-light text-uppercase overline">
                  {{ bahasaPemrogramanTerpilih }}
                </h3>
              </gl-content-editor>
              <v-select
                v-if="supportSlash"
                v-model="twoslashTerpilih"
                :items="daftarTwoslash"
                label="Pilih Twoslash"
                class="editor-code-variant"
                dense
                solo
              ></v-select>
            </div>
            <div class="body editor">
              <app-editor-kode v-model="inputKode" @mark="putMark" />
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
  toRefs,
  watch,
  onMounted,
  ref,
  provide,
  computed,
  nextTick,
  triggerRef,
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
    const scrollX = ref(0);
    const scrollY = ref(0);
    provide('scroll', { scrollX, scrollY });
    const state = reactive<State>({
      inputKode: '',
      bahasaPemrogramanTerpilih: 'javascript',
      namaBerkas: 'Untitled Document',
      highlight: undefined,
      twoslashTerpilih: undefined,
      hasilHighlight: undefined,
    });
    const supportSlash = computed(
      () =>
        state.bahasaPemrogramanTerpilih === 'typescript' ||
        state.bahasaPemrogramanTerpilih === 'json'
    );
    const { load, daftarBahasaPemrograman, daftarTwoslash } = getOptions();

    onMounted(() => {
      load().catch(function(dataNotifikasiGalat) {
        $store.dispatch('notifikasi/tampilkanNotifikasi', dataNotifikasiGalat);
      });
    });

    async function highlighter(
      state: any,
      inputKode: string,
      download?: boolean
    ) {
      try {
        $store.dispatch('proses/tampilkanProses', null);
        const objekUrl = {
          url: URL_API,
          query: {
            lang: state.bahasaPemrogramanTerpilih,
            fileName: state.namaBerkas,
            highlight: state.highlight,
            twoslash: supportSlash.value ? state.twoslashTerpilih : undefined,
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

    function putMark(marks: number[]) {
      if (state.inputKode) {
        state.highlight = marks.join(',');
      }
    }

    watch(state, (nState, oldState) => {
      if (
        nState.bahasaPemrogramanTerpilih !== oldState.bahasaPemrogramanTerpilih
      ) {
        nextTick(() => (state.inputKode = ''));
        return;
      }
      if (nState.inputKode === oldState.inputKode) {
        highlighter(nState, nState.inputKode);
      }
    });

    watch(
      toRef(state, 'inputKode'),
      debounce(
        kode => {
          // state.hasilHighlight = '';
          highlighter(state, kode);
        },
        { wait: 300 }
      )
    );

    return {
      ...toRefs(state),
      daftarBahasaPemrograman,
      daftarTwoslash,
      putMark,
      supportSlash,
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
.editor-code-variant {
  text-align: right;
  display: flex;
  justify-content: flex-end;
  .v-input__control {
    height: 0;
    max-width: 120px;
  }
}
</style>
