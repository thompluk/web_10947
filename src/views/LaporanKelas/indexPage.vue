<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Laporan Aktivitas Kelas</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <button  class="btn btn-md-3 btn-success"  @click="cetakLaporan(tahun, tanggal_cetak, bulan )">Cetak</button>
                <div class="card border-0 rounded shadow">
                    <div class="card-title">
                        <div class="d-flex mt-3 ms-3">
                            <select
                                class="form-select select-style"
                                aria-label="Default select example"
                                v-model="bulan_temp"
                            >
                                <option value="1" selected>Januari</option>
                                <option value="2">Februari</option>
                                <option value="3">Maret</option>
                                <option value="4">April</option>
                                <option value="5">Mei</option>
                                <option value="6">Juni</option>
                                <option value="7">Juli</option>
                                <option value="8">Agustus</option>
                                <option value="9">September</option>
                                <option value="10">Oktober</option>
                                <option value="11">November</option>
                                <option value="12">Desember</option>
                            </select>
                            <button
                                class="btn btn-primary ms-3"
                                type="submit"
                                @click="laporanKelasGet(bulan_temp)"
                            >
                                Cari
                            </button>
                            </div>
                        </div>
                    <div class="card-body" ref='content'> 
                        <div v-if="lapKelass != ''">
                            <h2>Bulan : {{ bulan }}  -  Tahun : {{ tahun }}</h2>
                            <h2>Tanggal Cetak  : {{ tanggal_cetak }}</h2>
                        </div>
                        <table class="table table-striped table-bordered mt-4" id="table">                           
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">KELAS</th>
                                    <th scope="col">INSTRUKTUR</th>          
                                    <th scope="col">JUMLAH LIBUR</th> 
                                    <th scope="col">JUMLAH PESERTA</th>                                                       
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(lapKelas, id) in lapKelass" :key="id">
                                    <td>{{ lapKelas.kelas}}</td>
                                    <td>{{ lapKelas.instruktur}}</td>
                                    <td>{{ lapKelas.jumlah_libur}}</td>
                                    <td>{{ lapKelas.jumlah_peserta}}</td>
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
import {  ref } from 'vue' 
import jsPDF from 'jspdf'
import 'jspdf-autotable'


export default { 
    setup() { 
        //reactive state 
        let lapKelass = ref([]) 
        let bulan = ref([]) 
        let tahun = ref([]) 
        let tanggal_cetak = ref([]) 

        //mounted 
        function laporanKelasGet(bulan_temp){
            //get API from Laravel Backend 
            axios.get('https://api-gofit.200710947.com/api/laporan/kelas/'+ bulan_temp) 
            .then(response => { 
                //assign state posts with response data 
                lapKelass.value = response.data.data 
                bulan.value = response.data.bulan
                tahun.value = response.data.tahun 
                tanggal_cetak.value = response.data.tanggal_cetak 
                console.log(lapKelass)
            }).catch(error => {
                 console.log(error.response.data) 
            });

        }

        function cetakLaporan($periode, $tanggal_cetak, $bulan) {
            var elementHTML = document.getElementById("table");

            const doc = new jsPDF({
                orientation: "potrait",
                format: "a4",
            });
            doc.setFont("helvetica", "bold");
            doc.text("Go-Fit!", 15, 20);
            doc.setFont("helvetica", "normal");
            doc.text("Jl. Centralpark No. 10 Yogyakarta", 15, 30);

            doc.setFont("helvetica", "bold");
            doc.text("Laporan Kelas Bulanan", 15, 40);
            doc.setFont("helvetica", "normal");
            doc.text("Periode - Bulan", 15, 50);
            doc.text(": " + $periode + " - " + $bulan, 60, 50);
            doc.text("Tanggal Cetak", 15, 60);
            doc.text(": " + $tanggal_cetak, 60, 60);
            
            doc.autoTable({
                html: elementHTML,
                margin: { top: 70 },
            });

            doc.save("Laporan Kelas Bulanan - " + $tanggal_cetak + ".pdf");
            }

        return { lapKelass, bulan, tahun, tanggal_cetak, laporanKelasGet, cetakLaporan} },
    

        methods:{
            downloadPDF(){

            var html = this.$refs.content
            
            let newWin = '';

            newWin = window.open("");
            newWin.document.write(html.outerHTML);
            newWin.print();
            newWin.close();

        }
        }
    } 
    </script> 
<style> </style>