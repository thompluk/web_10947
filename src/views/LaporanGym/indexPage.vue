<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Laporan Aktivitas Gym</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <button  class="btn btn-md-3 btn-success"  @click="downloadPDF()">Cetak</button>
                <div class="card border-0 rounded shadow">
                    <div class="card-body" ref='content'> 
                        <div>
                            <h2>Bulan : {{ bulan }}  -  Tahun : {{ tahun }}</h2>
                            <h2>Tanggal Cetak  : {{ tanggal_cetak }}</h2>
                        </div>
                        <table class="table table-striped table-bordered mt-4" border="1">                           
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Tanggal</th>
                                    <th scope="col">JUMLAH MEMBER</th>                                                                
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(lapGym, id) in lapGyms" :key="id">
                                    <td>{{ lapGym.tanggal}}</td>
                                    <td>{{ lapGym.jumlah}}</td>
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
// import jsPDF from 'jspdf'

export default { 
    setup() { 
        //reactive state 
        let lapGyms = ref([]) 
        let bulan = ref([]) 
        let tahun = ref([]) 
        let tanggal_cetak = ref([]) 

        //mounted 
        onMounted(() => {
            //get API from Laravel Backend 
            axios.get('https://api-gofit.200710947.com/api/laporan/gym') 
            .then(response => { 
                //assign state posts with response data 
                lapGyms.value = response.data.data 
                bulan.value = response.data.bulan
                tahun.value = response.data.tahun 
                tanggal_cetak.value = response.data.tanggal_cetak 
                console.log(lapGyms)
            }).catch(error => {
                 console.log(error.response.data) 
            }) 

        }) 

        return { lapGyms, bulan, tahun, tanggal_cetak} },
    

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
<style> 
</style>