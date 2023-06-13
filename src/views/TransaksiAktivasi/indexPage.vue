<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body"> 
                        <router-link :to="{name: 'transaksi_aktivasi.create'}"
                            class="btn btn-md btn-success">TAMBAH TRANSAKSI AKTIVASI</router-link>
                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">PEGAWAI</th>
                                    <th scope="col">MEMBER</th>                                 
                                    <th scope="col">TANGGAL AKTIVASI</th>
                                    <th scope="col">TANGGAL KADALUARSAN</th>
                                    <th scope="col">HARGA</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(transaksi_aktivasi, id_aktivasi) in transaksi_aktivasis" :key="id_aktivasi">
                                    <td>{{ transaksi_aktivasi.id_aktivasi}}</td>
                                    <td>{{ transaksi_aktivasi.pegawai.nama}}</td>
                                    <td>{{ transaksi_aktivasi.member.nama }}</td>
                                    <td>{{ transaksi_aktivasi.tgl_aktivasi }}</td>
                                    <td>{{ transaksi_aktivasi.tgl_kadaluarsa }}</td>
                                    <td>{{ transaksi_aktivasi.harga }}</td>
                                    <td>
                                        <button class="btn btn-sm btn-danger ml-1" @click="deleteTransakai(transaksi_aktivasi.id_aktivasi)">DELETE</button>
                                    </td>
                                    <td>
                                        <button class="btn btn-sm btn-primary ml-1" @click="downloadPDF(transaksi_aktivasi)">STRUK</button>
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
        let transaksi_aktivasis = ref([]) 
        //mounted 
        onMounted(() => {
            //get API from Laravel Backend 
            axios.get('https://api-gofit.200710947.com/api/transaksi_aktivasi') 
            .then(response => { 
                //assign state posts with response data 
                transaksi_aktivasis.value = response.data.data 
            }).catch(error => {
                 console.log(error.response.data) 
            }) 
        })
        
        function deleteTransakai(id) {
            
            //delete data post by ID
            axios.delete(`https://api-gofit.200710947.com/api/transaksi_aktivasi/${id}`)
            .then(() => {
                       
                //splice posts 
                transaksi_aktivasis.value.splice(transaksi_aktivasis.value.indexOf(id), 1);
                location.reload()
                
             }).catch(error => {
                 console.log(error.response.data)
             })

            
         
         }
         function downloadPDF(transaksi_aktivasi){
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'cm',
                format: [9, 17]
            });
            pdf.text('Struk Transaksi Aktivasi', 6,1);
            pdf.text('--------------------------------------------------------------------------------------', 0.5,1.5);
            pdf.text('Go Fit', 0.5, 2);
            pdf.text("No Struk : "+ transaksi_aktivasi.id_aktivasi, 11, 2);
            pdf.text('Jl. Centralpark No.10 Yogyakarta', 0.5, 3);
            pdf.text("Tanggal : "+ transaksi_aktivasi.tgl_aktivasi, 11, 3);
            pdf.text('', 0.5, 4);
            pdf.text("Member                    : "+ transaksi_aktivasi.member.id_member +" / " + transaksi_aktivasi.member.nama, 0.5, 5);
            pdf.text("Aktivasi Tahunan      : Rp.3.000.000,- ", 0.5, 6);
            pdf.text("Masa aktif member   : " + transaksi_aktivasi.tgl_kadaluarsa, 0.5, 7);
            pdf.text("Kasir : " + transaksi_aktivasi.pegawai.id_pegawai + " /" + transaksi_aktivasi.pegawai.nama, 11, 8);
            pdf.save("Struk Aktivasi_" + transaksi_aktivasi.id_aktivasi + ".pdf");
        }
            //return 
        return { 
            transaksi_aktivasis,
            deleteTransakai,
            downloadPDF,
         }
    }
} 


</script> 
<style> </style>