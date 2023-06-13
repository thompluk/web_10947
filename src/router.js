import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/beranda",
    name: "beranda",
    component: () => import("@/components/DashboardLayout.vue"),
    children: [
      {
        path: "/member",
        name: "member.index",
        component: () => import("@/views/Member/indexPage.vue"),
      },
      {
        path: "/member/create",
        name: "member.create",
        component: () => import("@/views/Member/createPage.vue"),
      },
      {
        path: "/member/edit",
        name: "member.edit",
        component: () => import("@/views/Member/editPage.vue"),
      },
      {
        path: "/member/ubahpass",
        name: "member.ubahpass",
        component: () => import("@/views/Member/ubahPasswordPage.vue"),
      },

      {
        path: "/instruktur",
        name: "instruktur.index",
        component: () => import("@/views/Instruktur/indexPage.vue"),
      },
      {
        path: "/instruktur/create",
        name: "instruktur.create",
        component: () => import("@/views/Instruktur/createPage.vue"),
      },
      {
        path: "/instruktur/edit",
        name: "instruktur.edit",
        component: () => import("@/views/Instruktur/editPage.vue"),
      },

      {
        path: "/pegawai",
        name: "pegawai.index",
        component: () => import("@/views/Pegawai/indexPage.vue"),
      },
      {
        path: "/pegawai/create",
        name: "pegawai.create",
        component: () => import("@/views/Pegawai/createPage.vue"),
      },
      {
        path: "/pegawai/edit",
        name: "pegawai.edit",
        component: () => import("@/views/Pegawai/editPage.vue"),
      },

      {
        path: "/kelas",
        name: "kelas.index",
        component: () => import("@/views/Kelas/indexPage.vue"),
      },
      {
        path: "/kelas/create",
        name: "kelas.create",
        component: () => import("@/views/Kelas/createPage.vue"),
      },
      {
        path: "/kelas/edit",
        name: "kelas.edit",
        component: () => import("@/views/Kelas/editPage.vue"),
      },

      {
        path: "/jadwal_umum",
        name: "jadwal_umum.index",
        component: () => import("@/views/JadwalUmum/indexPage.vue"),
      },
      {
        path: "/jadwal_umum/create",
        name: "jadwal_umum.create",
        component: () => import("@/views/JadwalUmum/createPage.vue"),
      },
      {
        path: "/jadwal_umum/edit",
        name: "jadwal_umum.edit",
        component: () => import("@/views/JadwalUmum/editPage.vue"),
      },

      {
        path: "/jadwal_harian",
        name: "jadwal_harian.index",
        component: () => import("@/views/JadwalHarian/indexPage.vue"),
      },
      {
        path: "/jadwal_harian/edit",
        name: "jadwal_harian.edit",
        component: () => import("@/views/JadwalHarian/editPage.vue"),
      },

      {
        path: "/transaksi_aktivasi",
        name: "transaksi_aktivasi.index",
        component: () => import("@/views/TransaksiAktivasi/indexPage.vue"),
      },
      {
        path: "/transaksi_aktivasi/create",
        name: "transaksi_aktivasi.create",
        component: () => import("@/views/TransaksiAktivasi/createPage.vue"),
      },

      {
        path: "/transaksi_deposit_uang",
        name: "transaksi_deposit_uang.index",
        component: () => import("@/views/TransaksiDepositUang/indexPage.vue"),
      },
      {
        path: "/transaksi_deposit_uang/create",
        name: "transaksi_deposit_uang.create",
        component: () => import("@/views/TransaksiDepositUang/createPage.vue"),
      },

      {
        path: "/transaksi_deposit_kelas",
        name: "transaksi_deposit_kelas.index",
        component: () => import("@/views/TransaksiDepositKelas/indexPage.vue"),
      },
      {
        path: "/transaksi_deposit_kelas/create",
        name: "transaksi_deposit_kelas.create",
        component: () => import("@/views/TransaksiDepositKelas/createPage.vue"),
      },

      {
        path: "/izin_instruktur",
        name: "izin_instruktur.index",
        component: () => import("@/views/IzinInstruktur/indexPage.vue"),
      },

      {
        path: "/sistem",
        name: "sistem.index",
        component: () => import("@/views/Sistem/indexPage.vue"),
      },

      {
        path: "/presensi_gym",
        name: "presensi_gym.index",
        component: () => import("@/views/PresensiGym/indexPage.vue"),
      },

      {
        path: "/presensi_kelas",
        name: "presensi_kelas.index",
        component: () => import("@/views/PresensiKelas/indexPage.vue"),
      },

      {
        path: "/laporan_gym",
        name: "laporan_gym.index",
        component: () => import("@/views/LaporanGym/indexPage.vue"),
      },

      {
        path: "/laporan_kelas",
        name: "laporan_kelas.index",
        component: () => import("@/views/LaporanKelas/indexPage.vue"),
      },

      {
        path: "/laporan_kinerja",
        name: "laporan_kinerja.index",
        component: () => import("@/views/LaporanKinerja/indexPage.vue"),
      },

      {
        path: "/laporan_pendapatan",
        name: "laporan_pendapatan.index",
        component: () => import("@/views/LaporanPendapatan/indexPage.vue"),
      },
    ],
  },
  {
    path: "/",
    name: "login",
    component: () => import("@/components/LoginPage.vue"),
  }
]
//create router 
const router = createRouter({ 
    history: createWebHistory(), routes // config routes 
}) 
export default router;
