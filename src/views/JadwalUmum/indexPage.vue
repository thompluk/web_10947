<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Dashboard</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body"> 
                        <router-link :to="{name: 'jadwal_umum.create'}"
                            class="btn btn-md btn-success">TAMBAH JADWAL UMUM</router-link>
                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">INSTRUKTUR</th>
                                    <th scope="col">KELAS</th>
                                    <th scope="col">HARI</th>                                 
                                    <th scope="col">JAM MULAI</th>
                                    <th scope="col">JAM SELESAI</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(jadwal_umum, id_jadwal_umum) in jadwal_umums" :key="id_jadwal_umum">
                                    <td>{{ jadwal_umum.id_jadwal_umum}}</td>
                                    <td>{{ jadwal_umum.instruktur.nama}}</td>
                                    <td>{{ jadwal_umum.kelas.nama_kelas }}</td>
                                    <td>{{ jadwal_umum.hari}}</td>
                                    <td>{{ jadwal_umum.jam_mulai }}</td>
                                    <td>{{ jadwal_umum.jam_selesai }}</td>
                                    <td>
                                        <router-link :to="{name: 'jadwal_umum.edit', params:{id : jadwal_umum.id_jadwal_umum}}"
                                            class="btn btn-md btn-primary">EDIT</router-link>
                                        <button class="btn btn-sm btn-danger ml-1" @click="deleteJadwalUmum(jadwal_umum.id_jadwal_umum)">DELETE</button>
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

export default { 
    setup() { 
        //reactive state 
        let jadwal_umums = ref([]) 

        //mounted  
        onMounted(() => {
            //get API from Laravel Backend 
            axios.get('https://api-gofit.200710947.com/api/jadwal_umum') 
            .then(response => { 
                //assign state posts with response data 
                jadwal_umums.value = response.data.data 
            }).catch(error => {
                 console.log(error.response.data)
                 console.log("gyujkio") 
 
            }) 
        })

        function deleteJadwalUmum(id) {
            
            //delete data post by ID
            axios.delete(`https://api-gofit.200710947.com/api/jadwal_umum/${id}`)
            .then(() => {
                       
                //splice posts 
                jadwal_umums.value.splice(jadwal_umums.value.indexOf(id), 1);
                location.reload()
             }).catch(error => {
                 console.log(error.response.data)
             })
         
         }
            //return 
        return { jadwal_umums, deleteJadwalUmum } } } 
    </script> 
<style> </style>   