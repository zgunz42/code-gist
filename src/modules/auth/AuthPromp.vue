<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">
          Simpan Kode
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12"
                >Masukan Nama Pengguna untuk menyimpan kode</v-col
              >
              <v-col cols="12">
                <v-text-field
                  v-model="namaPengguna"
                  label="Username*"
                  required
                  hide-details="auto"
                  :error-messages="errorMsg ? [errorMsg] : undefined"
                  :rules="[value => !!value || 'Required.']"
                  :disabled="disabled"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            depressed
            text
            @click="daftar({ namaPengguna })"
            :disabled="disabled"
          >
            Daftar
          </v-btn>
          <v-btn
            depressed
            color="primary"
            @click="masuk({ namaPengguna })"
            :disabled="disabled"
          >
            Masuk
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script lang="ts">
import { DAFTAR_NOTIF, MASUK_NOTIF } from '@/constants';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { AuthPropInt } from './types';

const penggunaModule = namespace('pengguna');
const prosesModule = namespace('proses');
const notifModule = namespace('notifikasi');

@Component
export default class AuthPromp extends Vue implements AuthPropInt {
  namaPengguna = '';
  errorMsg?: string = '';
  dialog = false;

  @prosesModule.State('apakahProsesTampil') disabled?: boolean;
  @notifModule.State('pesan') pesan?: string;

  @Watch('pesan')
  onPesanChanged(val: string) {
    if (val !== null) {
      if (val === MASUK_NOTIF || val === DAFTAR_NOTIF) {
        this.errorMsg = '';
        this.sembuyi();
      } else {
        this.errorMsg = val;
      }
    }
  }

  @penggunaModule.Action('masuk') masuk?: (payload: {
    namaPengguna: string;
  }) => void;

  @penggunaModule.Action('daftar') daftar?: (payload: {
    namaPengguna: string;
  }) => void;

  tampil() {
    if (!this.disabled) {
      this.dialog = true;
    }
  }

  sembuyi() {
    this.dialog = false;
  }
}
</script>
