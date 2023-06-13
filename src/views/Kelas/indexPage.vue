<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Dashboard</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body"> 
                        <router-link :to="{name: 'kelas.create'}"
                            class="btn btn-md btn-success">TAMBAH KELAS</router-link>
                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">NAMA KELAS</th>
                                    <th scope="col">HARGA</th>                                 
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(kelas, id_kelas) in kelass" :key="id_kelas">
                                    <td>{{ kelas.id_kelas}}</td>
                                    <td>{{ kelas.nama_kelas}}</td>
                                    <td>{{ kelas.harga }}</td>
                                    <td>
                                        <router-link :to="{name: 'kelas.edit', params:{id : kelas.id_kelas}}"
                                            class="btn btn-md btn-primary">EDIT</router-link>
                                        <button class="btn btn-sm btn-danger ml-1" @click="deleteKelas(kelas.id_kelas)">DELETE</button>
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
        let kelass = ref([]) 
        //mounted 
        onMounted(() => {
            //get API from Laravel Backend 
            axios.get('https://api-gofit.200710947.com/api/kelas') 
            .then(response => { 
                //assign state posts with response data 
                kelass.value = response.data.data 
            }).catch(error => {
                 console.log(error.response.data) 
            }) 
        })
        
        function deleteKelas(id) {
            
            //delete data post by ID
            axios.delete(`https://api-gofit.200710947.com/api/kelas/${id}`)
            .then(() => {
                       
                //splice posts 
                kelass.value.splice(kelass.value.indexOf(id), 1);
                location.reload()
                
             }).catch(error => {
                 console.log(error.response.data)
             })

            // 
         
         }
            //return 
        return { 
            kelass,
            deleteKelas
         } } } 
    </script> 
<style> </style>