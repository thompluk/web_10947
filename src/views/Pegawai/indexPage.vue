<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Dashboard</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body"> 
                        <router-link :to="{name: 'pegawai.create'}"
                            class="btn btn-md btn-success">TAMBAH Pegawai</router-link>
                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">NAMA</th>
                                    <th scope="col">EMAIL</th>
                                    <th scope="col">PASSWORD</th>
                                    <th scope="col">ROLE</th>
                                    <th scope="col">NOMOR TELEPON</th>
                                    <th scope="col">TANGGAL LAHIR</th>
                                    <th scope="col">GENDER</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(pegawai, id_pegawai) in pegawais" :key="id_pegawai">
                                    <td>{{ pegawai.id_pegawai}}</td>
                                    <td>{{ pegawai.nama}}</td>
                                    <td>{{ pegawai.email }}</td>
                                    <td>{{ pegawai.password }}</td>
                                    <td>{{ pegawai.role }}</td>
                                    <td>{{ pegawai.no_telp }}</td>
                                    <td>{{ pegawai.tgl_lahir }}</td>
                                    <td>{{ pegawai.gender }}</td>
                                    <td>
                                        <router-link :to="{name: 'pegawai.edit', params:{id : pegawai.id_pegawai}}"
                                            class="btn btn-md btn-primary">EDIT</router-link>
                                        <button class="btn btn-sm btn-danger ml-1" @click="deletePegawai(pegawai.id_pegawai)">DELETE</button>
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
        let pegawais = ref([]) 
        //mounted 
        onMounted(() => {
            //get API from Laravel Backend 
            axios.get('https://api-gofit.200710947.com/api/pegawai') 
            .then(response => { 
                //assign state posts with response data 
                pegawais.value = response.data.data 
            }).catch(error => {
                 console.log(error.response.data) 
            }) 
        }) 

        function deletePegawai(id) {
            
            //delete data post by ID
            axios.delete(`https://api-gofit.200710947.com/api/pegawai/${id}`)
            .then(() => {
                       
                //splice posts 
                pegawais.value.splice(pegawais.value.indexOf(id), 1);
                location.reload()
             }).catch(error => {
                 console.log(error.response.data)
             })
         
         }
            //return 
        return { pegawais, deletePegawai } } } 
    </script> 
<style> </style>