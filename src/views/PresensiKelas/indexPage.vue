<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Presensi Kelas</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body"> 
                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">JAM</th>
                                    <th scope="col">TANGGAL</th>
                                    <th scope="col">KELAS</th>
                                    <th scope="col">MEMBER</th>
                                    <th scope="col">KEHADIRAN</th>
                                    <th scope="col">JAM KEDATANGAN</th>
                                    <th scope="col">JAM KEPULANGAN</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(presensi, id_presensi_kelas) in presensis" :key="id_presensi_kelas">
                                    <td>{{ presensi.id_presensi_kelas}}</td>
                                    <td>{{ presensi.booking_kelas.jadwal_harian.jam_mulai}} - {{ presensi.booking_kelas.jadwal_harian.jam_selesai}}</td>
                                    <td>{{ presensi.booking_kelas.jadwal_harian.tanggal}}</td>
                                    <td>{{ presensi.booking_kelas.jadwal_harian.kelas.nama_kelas}}</td>
                                    <td>{{ presensi.member.nama }}</td>
                                    <td>{{ presensi.kehadiran }}</td>
                                    <td>{{ presensi.jam_kedatangan }}</td>
                                    <td>{{ presensi.jam_kepulangan }}</td>
                                    <td v-show="presensi.kehadiran == 'Hadir'">
                                        <button v-show="presensi.booking_kelas.pembayaran == 'Deposit Uang'" class="btn btn-sm btn-primary ml-1" @click="strukUang(presensi)">STRUK</button>
                                        <button v-show="presensi.booking_kelas.pembayaran == 'Deposit Kelas'" class="btn btn-sm btn-primary ml-1" @click="strukKelas(presensi)">STRUK</button>
                                    </td>
                                </tr>
                            </tbody> 
                        </table> 
                    </div> 
                </div> 
            </div> 
        </div> 
    </div> 
</template>

<script> 
import axios from 'axios' 
import { onMounted, ref } from 'vue' 
import jsPDF from 'jspdf'

export default { 
    setup() { 
        //reactive state 
        let presensis = ref([]) 
        let deposit = ref([])

        //mounted 
        onMounted(() => {
            //get API from Laravel Backend

            axios.get('https://api-gofit.200710947.com/api/presensi_kelas') 
            .then(response => { 
                //assign state posts with response data 
                presensis.value = response.data.data 
            }).catch(error => {
                 console.log(error.response.data) 
            }) 
        }) 

        function strukUang(presensi){


            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'cm',
                format: [14, 17]
            });
            pdf.text('Go Fit', 0.5, 2);
            pdf.text('Jl. Centralpark No.10 Yogyakarta', 0.5, 3);
            pdf.text('STRUK PRESENSI KELAS', 0.5, 5);
            pdf.text('No Struk      : '+ presensi.id_presensi_kelas, 0.5, 6);
            pdf.text('Tanggal       : '+ presensi.booking_kelas.jadwal_harian.tanggal+'  '+presensi.jam_kepulangan, 0.5, 7);
            pdf.text('Member         : '+presensi.member.id_member+' / '+presensi.member.nama, 0.5, 9);
            pdf.text('Kelas             : '+presensi.booking_kelas.jadwal_harian.kelas.nama_kelas, 0.5, 10);
            pdf.text('Instruktur       : '+presensi.booking_kelas.jadwal_harian.instruktur.nama, 0.5, 11);
            pdf.text('Tariff              : Rp.'+presensi.booking_kelas.jadwal_harian.kelas.harga, 0.5, 12);
            pdf.text('Sisa Deposit  : Rp.'+presensi.member.deposit_uang, 0.5, 13)

            pdf.save("Struk Presensi Kelas_" + presensi.id_presensi_kelas + ".pdf");
        }

        function strukKelas(presensi){
            
            axios.get(`https://api-gofit.200710947.com/api/deposit_kelas/showByMember/${presensi.member.id_member}`) 
            .then(response => { 
                //assign state posts with response data 
                deposit.value = response.data.data
                console.log(deposit.value.kadaluarsa)
               
            }).catch(error => {
                 console.log(error.response.data) 
            }) 


            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'cm',
                format: [14, 17]
            });
            pdf.text('Go Fit', 0.5, 2);
            pdf.text('Jl. Centralpark No.10 Yogyakarta', 0.5, 3);
            pdf.text('STRUK PRESENSI PAKET KELAS', 0.5, 5);
            pdf.text('No Struk          : '+ presensi.id_presensi_kelas, 0.5, 6);
            pdf.text('Tanggal           : '+ presensi.booking_kelas.jadwal_harian.tanggal+'  '+presensi.jam_kepulangan, 0.5, 7);
            pdf.text('Member                : '+presensi.member.id_member+' / '+presensi.member.nama, 0.5, 9);
            pdf.text('Kelas                   : '+presensi.booking_kelas.jadwal_harian.kelas.nama_kelas, 0.5, 10);
            pdf.text('Instruktur            : '+presensi.booking_kelas.jadwal_harian.instruktur.nama, 0.5, 11);
            pdf.text('Sisa Deposit       : '+presensi.sisa_deposit, 0.5, 12);
            pdf.text('Berlaku Sampai  : '+presensi.kadaluarsa, 0.5, 13)

            pdf.save("Struk Presensi Kelas_" + presensi.id_presensi_kelas + ".pdf");
        }

        return { presensis,deposit, strukUang, strukKelas} } } 
    </script> 
<style> </style>