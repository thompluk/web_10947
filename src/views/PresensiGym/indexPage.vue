<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Presensi Gym</h1>
    </div>
    <div class="container mt-5">
        <h1 class="h2">Presensi Gym Hari Ini</h1>
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body"> 
                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">SESI</th>
                                    <th scope="col">TANGGAL</th>
                                    <th scope="col">MEMBER</th>
                                    <th scope="col">KEHADIRAN</th>
                                    <th scope="col">JAM KEDATANGAN</th>
                                    <th scope="col">JAM KEPULANGAN</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(presensiToday, id_presensi_gym) in presensiTodays" :key="id_presensi_gym">
                                    <td>{{ presensiToday.id_presensi_gym}}</td>
                                    <td>Sesi : {{ presensiToday.booking_gym.sesi}}</td>
                                    <td>{{ presensiToday.tgl_dibooking}}</td>
                                    <td>{{ presensiToday.member.nama }}</td>
                                    <td>{{ presensiToday.kehadiran }}</td>
                                    <td>{{ presensiToday.jam_kedatangan }}</td>
                                    <td>{{ presensiToday.jam_kepulangan }}</td>
                                    <td>
                                        <button class="btn btn-sm btn-primary ml-1" @click="kedatangan(presensiToday.id_presensi_gym)">Kedatangan</button>
                                        <button class="btn btn-sm btn-primary ml-1" @click="kepulangan(presensiToday.id_presensi_gym)">Kepulangan</button>
                                    </td>
                                    <td v-show="presensiToday.kehadiran == 'Hadir'">
                                        <button class="btn btn-sm btn-primary ml-1" @click="downloadPDF(presensiToday)">STRUK</button>
                                    </td>
                                </tr>
                            </tbody> 
                        </table> 
                    </div> 
                </div> 
            </div> 
        </div> 
    </div> 

    <div class="container mt-5">
        <h1 class="h2">Presensi Gym </h1>
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body"> 
                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">SESI</th>
                                    <th scope="col">TANGGAL</th>
                                    <th scope="col">MEMBER</th>
                                    <th scope="col">KEHADIRAN</th>
                                    <th scope="col">JAM KEDATANGAN</th>
                                    <th scope="col">JAM KEPULANGAN</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(presensi, id_presensi_gym) in presensis" :key="id_presensi_gym">
                                    <td>{{ presensi.id_presensi_gym}}</td>
                                    <td>Sesi : {{ presensi.booking_gym.sesi}}</td>
                                    <td>{{ presensi.tgl_dibooking}}</td>
                                    <td>{{ presensi.member.nama }}</td>
                                    <td>{{ presensi.kehadiran }}</td>
                                    <td>{{ presensi.jam_kedatangan }}</td>
                                    <td>{{ presensi.jam_kepulangan }}</td>
                                    
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
        let presensiTodays = ref([]) 
        //mounted 
        onMounted(() => {
            //get API from Laravel Backend 
            axios.get('https://api-gofit.200710947.com/api/presensi_gym/showHariIni') 
            .then(response => { 
                //assign state posts with response data 
                presensiTodays.value = response.data.data 
            }).catch(error => {
                 console.log(error.response.data) 
            }) 

            axios.get('https://api-gofit.200710947.com/api/presensi_gym') 
            .then(response => { 
                //assign state posts with response data 
                presensis.value = response.data.data 
            }).catch(error => {
                 console.log(error.response.data) 
            }) 
        }) 

        function kedatangan(id) {
            
            //delete data post by ID
            axios.post(`https://api-gofit.200710947.com/api/presensi_gym/kedatangan/${id}`)
            .then(() => {
                       
                //splice posts 
                presensis.value.splice(presensis.value.indexOf(id), 1);
                location.reload()
             }).catch(error => {
                 console.log(error.response.data)
             })
         
         }
         function kepulangan(id) {
            
            //delete data post by ID
            axios.post(`https://api-gofit.200710947.com/api/presensi_gym/kepulangan/${id}`)
            .then(() => {
                       
                //splice posts 
                presensis.value.splice(presensis.value.indexOf(id), 1);
                location.reload()
             }).catch(error => {
                 console.log(error.response.data)
             })
         
         }

         function downloadPDF(presensi){
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'cm',
                format: [11, 17]
            });
            pdf.text('Go Fit', 0.5, 2);
            pdf.text('Jl. Centralpark No.10 Yogyakarta', 0.5, 3);
            pdf.text('STRUK PRESENSI GYM', 0.5, 5);
            pdf.text('No Struk      : '+ presensi.id_presensi_gym, 0.5, 6);
            pdf.text('Tanggal       : '+ presensi.tgl_dibooking, 0.5, 7);
            pdf.text('Member        : '+presensi.member.id_member+' / '+presensi.member.nama, 0.5, 9);
            pdf.text('Durasi Gym    : '+presensi.jam_kedatangan+' - '+presensi.jam_kepulangan, 0.5, 10);

            pdf.save("Struk Presensi Gym_" + presensi.id_presensi_gym + ".pdf");
        }
            //return 
        return { presensis, presensiTodays, kedatangan, kepulangan, downloadPDF } } } 
    </script> 
<style> </style>