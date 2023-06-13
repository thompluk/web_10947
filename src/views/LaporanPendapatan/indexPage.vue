<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Laporan Pendapatan</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <button  class="btn btn-md-3 btn-success"  @click="cetakLaporan(tahun, tanggal_cetak)">Cetak</button>
                <div class="card-title">
                        <div class="d-flex mt-3 ms-3">
                            <select
                                class="form-select select-style"
                                aria-label="Default select example"
                                v-model="tahun_temp"
                            >
                                <option value="2022" selected>2022</option>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                            </select>
                            <button
                                class="btn btn-primary ms-3"
                                type="submit"
                                @click="laporanPendapatanGet(tahun_temp)"
                            >
                                Cari
                            </button>
                            </div>
                        </div>
                <div class="card border-0 rounded shadow" ref='content'>
                    <div class="card-body" > 
                        <div v-if="lapPendapatans != ''">
                            <h2>Periode : {{ tahun_temp }}</h2>
                            <h2>Tanggal Cetak  : {{ tanggal_cetak }}</h2>
                        </div>
                        <table class="table table-striped table-bordered mt-4" id="table">                           
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">BULAN</th>
                                    <th scope="col">DEPOSIT UANG</th>          
                                    <th scope="col">DEPOSIT KELAS</th> 
                                    <th scope="col">AKTIVASI</th>   
                                    <th scope="col">TOTAL</th>                                                     
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(lapPendapatan, id) in lapPendapatans" :key="id">
                                    <td>{{ lapPendapatan.bulan}}</td>
                                    <td align="right">Rp. {{ lapPendapatan.deposit_uang}}</td>
                                    <td align="right">Rp. {{ lapPendapatan.deposit_kelas}}</td>
                                    <td align="right">Rp. {{ lapPendapatan.aktivasi}}</td>
                                    <td align="right">Rp. {{ lapPendapatan.total}}</td>
                                </tr>
                                <tr v-if="lapPendapatans != ''" >                                   
                                    <td colspan="4" align="right"><B>Total</B></td>
                                    <td align="right">Rp. {{ total }}</td>
                                </tr>
                            </tbody> 
                        </table>                        
                    </div> 
                    <div class="card-body" id="allChart">
                    <div class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3">
                        <h3><b><u>Graph Laporan Bulanan</u></b></h3>
                        <canvas id="myChart"></canvas>
                    </div>
                </div>
                </div> 
            </div> 
        </div> 
    </div> 
</template>
<script> 
import axios from 'axios' 
import { ref } from 'vue' 
import Chart from 'chart.js/auto'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import html2canvas from 'html2canvas';


export default { 
    setup() { 
        //reactive state 
        let lapPendapatans = ref([]) 
        let total = ref([]) 
        let tahun = ref([]) 
        let tanggal_cetak = ref([]) 
        //mounted 
        function laporanPendapatanGet(tahun_temp){
            //get API from Laravel Backend 
            axios.get('https://api-gofit.200710947.com/api/laporan/pendapatan/' + tahun_temp) 
            .then(response => { 
                //assign state posts with response data 
                lapPendapatans.value = response.data.data 
                total.value = response.data.total_semua
                tahun.value = response.data.tahun 
                tanggal_cetak.value = response.data.tanggal_cetak

                const ctx = document.getElementById('myChart');

                new Chart(ctx, {
                    type: 'bar',
                    data: {
                    labels: lapPendapatans.value.map(item => item.bulan),
                    datasets: [{
                        label: '# Total Perbulannya',
                        data: lapPendapatans.value.map(item => item.total),
                        borderWidth: 1
                    }]
                    },
                    options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                    }
                });
            }).catch(error => {
                 console.log(error.response) 
            }) 

        }

        function cetakLaporan($tahun, $tanggal_cetak) {
            var elementHTML = document.getElementById("table");
            var graphElement = document.getElementById("allChart");

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
            doc.text(": " + $tahun , 60, 50);
            doc.text("Tanggal Cetak", 15, 60);
            doc.text(": " + $tanggal_cetak, 60, 60);
            
            doc.autoTable({
                html: elementHTML,
                margin: { top: 70 },
            });

            doc.addPage(); 
            html2canvas(graphElement).then(function(canvas) {
                const graphData = canvas.toDataURL('image/png');
                doc.addImage(graphData, 'PNG', 15, 30, 180, 160);
                doc.save('Laporan Pendapatan Bulanan - ' + $tanggal_cetak + '.pdf')

            });   
            }

        return {lapPendapatans, total, tahun, tanggal_cetak, laporanPendapatanGet, cetakLaporan} 
    },
    

        
        //     downloadPDF(){

        //     var html = this.$refs.content
            
        //     let newWin = '';

        //     newWin = window.open("");
        //     newWin.document.write(html.outerHTML);
        //     newWin.print();
        //     newWin.close();

        // }
        // }
methods:{
        downloadPDF(){
            var html = this.$refs.content;

            let newWin = '';
            newWin = window.open("");
            newWin.document.write(html.outerHTML);
            newWin.print();
            newWin.close();
        }
    } 
}
    </script> 

<style>
</style>
