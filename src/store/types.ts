export type PenggunaState = {
  idPengguna: number | null;
  namaPengguna: string | null;
};

export type ProsesState = {
  apakahProsesTampil: boolean;
};

export type NotifikasiState = {
  apakahTampil: boolean;
  pesan: string | null;
};

export type KodeState = {
  daftarKode: object[];
};

export type RootState = {
  kode: KodeState;
  notifikasi: NotifikasiState;
  pengguna: PenggunaState;
  proses: ProsesState;
};
