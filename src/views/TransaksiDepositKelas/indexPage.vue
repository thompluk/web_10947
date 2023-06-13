<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body"> 
                        <router-link :to="{name: 'transaksi_deposit_kelas.create'}"
                            class="btn btn-md btn-success">TAMBAH TRANSAKSI DEPOSIT KELAS</router-link>
                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">PEGAWAI</th>
                                    <th scope="col">MEMBER</th>  
                                    <th scope="col">KELAS</th>                                 
                                    <th scope="col">BONUS</th>
                                    <th scope="col">JUMLAH PEMBELIAN DEPOSIT KELAS</th>
                                    <th scope="col">TANGGAL KADALUARSA</th>
                                    <th scope="col">HARGA</th>
                                    <th scope="col">TANGGAL TRANSAKSI</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(transaksi_deposit_kelas, id_transaksi_deposit_kelas) in transaksi_deposit_kelass" :key="id_transaksi_deposit_kelas">
                                    <td>{{ transaksi_deposit_kelas.id_transaksi_deposit_kelas}}</td>
                                    <td>{{ transaksi_deposit_kelas.pegawai.nama}}</td>
                                    <td>{{ transaksi_deposit_kelas.member.nama }}</td>
                                    <td>{{ transaksi_deposit_kelas.kelas.nama_kelas }}</td>
                                    <td>{{ transaksi_deposit_kelas.promo_kelas.bonus }}</td>
                                    <td>{{ transaksi_deposit_kelas.jumlah_deposit_kelas }}</td>
                                    <td>{{ transaksi_deposit_kelas.kadaluarsa }}</td>
                                    <td>{{ transaksi_deposit_kelas.harga }}</td>
                                    <td>{{ transaksi_deposit_kelas.tgl_pembelian }}</td>   
                                    <td>
                                        <button class="btn btn-sm btn-primary ml-1" @click="downloadPDF(transaksi_deposit_kelas,Number(transaksi_deposit_kelas.promo_kelas.bonus) ,Number(transaksi_deposit_kelas.jumlah_deposit_kelas))">STRUK</button>
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
        let transaksi_deposit_kelass = ref([]) 
        //mounted 
        onMounted(() => {
            //get API from Laravel Backend 
            axios.get('https://api-gofit.200710947.com/api/transaksi_deposit_kelas') 
            .then(response => { 
                //assign state posts with response data 
                transaksi_deposit_kelass.value = response.data.data 
            }).catch(error => {
                 console.log(error.response.data) 
            }) 
        })

        function downloadPDF(transaksi_deposit_kelas, data1, data2){
            const total = data1 + data2

            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'cm',
                format: [12, 18]
            });
            pdf.text('Struk Transaksi Deposit Kelas', 5,1);
            pdf.text('-------------------------------------------------------------------------------------------', 0.5,1.5);
            pdf.text('Go Fit', 0.5, 2);
            pdf.text("No Struk : "+ transaksi_deposit_kelas.id_transaksi_deposit_kelas, 11, 2);
            pdf.text('Jl. Centralpark No.10 Yogyakarta', 0.5, 3);
            pdf.text("Tanggal : "+ transaksi_deposit_kelas.tgl_pembelian, 11, 3);
            pdf.text("Member                             : "+ transaksi_deposit_kelas.member.id_member +" / " + transaksi_deposit_kelas.member.nama, 0.5, 5);
            pdf.text("Deposit(bayar)                  : Rp."+ transaksi_deposit_kelas.harga + "("+transaksi_deposit_kelas.jumlah_deposit_kelas+" x Rp."+transaksi_deposit_kelas.kelas.harga+")", 0.5, 6);
            pdf.text("Bonus                                :"+ transaksi_deposit_kelas.promo_kelas.bonus, 0.5, 7)
            pdf.text("Jenis Kelas                       : " + transaksi_deposit_kelas.kelas.nama_kelas, 0.5, 8);
            pdf.text("Total Deposit "+transaksi_deposit_kelas.kelas.nama_kelas+"         : "+ total, 0.5, 9);
            pdf.text("Berlaku sampai dengan    : "+ transaksi_deposit_kelas.kadaluarsa, 0.5 , 10);
            pdf.text("Kasir : " + transaksi_deposit_kelas.pegawai.id_pegawai + " /" + transaksi_deposit_kelas.pegawai.nama, 11, 11);
            pdf.save("Struk Aktivasi_" + transaksi_deposit_kelas.id_transaksi_deposit_kelas + ".pdf");
        }
        
            //return 
        return { 
            transaksi_deposit_kelass,
            downloadPDF,
         } } } 
    </script> 
<style> </style>