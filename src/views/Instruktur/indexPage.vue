<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Dashboard</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body"> 
                        <router-link :to="{name: 'instruktur.create'}"
                            class="btn btn-md btn-success">TAMBAH INSTRUKTUR</router-link>
                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">NAMA</th>
                                    <th scope="col">EMAIL</th>
                                    <th scope="col">PASSWORD</th>
                                    <th scope="col">NOMOR TELEPON</th>
                                    <th scope="col">TANGGAL LAHIR</th>
                                    <th scope="col">GENDER</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(instruktur, id_instruktur) in instrukturs" :key="id_instruktur">
                                    <td>{{ instruktur.id_instruktur}}</td>
                                    <td>{{ instruktur.nama}}</td>
                                    <td>{{ instruktur.email }}</td>
                                    <td>{{ instruktur.password }}</td>
                                    <td>{{ instruktur.no_telp }}</td>
                                    <td>{{ instruktur.tgl_lahir }}</td>
                                    <td>{{ instruktur.gender }}</td>
                                    <td>
                                        <router-link :to="{name: 'instruktur.edit', params:{id : instruktur.id_instruktur}}"
                                            class="btn btn-md btn-primary">EDIT</router-link>
                                        <button class="btn btn-sm btn-danger ml-1" @click="deleteInstruktur(instruktur.id_instruktur)">DELETE</button>
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
        let instrukturs = ref([]) 
        //mounted 
        onMounted(() => {
            //get API from Laravel Backend 
            axios.get('https://api-gofit.200710947.com/api/instruktur') 
            .then(response => { 
                //assign state posts with response data 
                instrukturs.value = response.data.data 
            }).catch(error => {
                 console.log(error.response.data) 
            }) 
        }) 

        function deleteInstruktur(id) {
            
            //delete data post by ID
            axios.delete(`https://api-gofit.200710947.com/api/instruktur/${id}`)
            .then(() => {
                       
                //splice posts 
                instrukturs.value.splice(instrukturs.value.indexOf(id), 1);
                location.reload()
             }).catch(error => {
                 console.log(error.response.data)
             })
         
         }
            //return 
        return { instrukturs, deleteInstruktur } } } 
    </script> 
<style> </style>