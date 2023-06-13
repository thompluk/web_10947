<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Dashboard</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body"> 
                        <router-link :to="{name: 'member.create'}"
                            class="btn btn-md btn-success">TAMBAH MEMBER</router-link>
                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">ID MEMBER</th>
                                    <th scope="col">NAMA</th>
                                    <th scope="col">EMAIL</th>
                                    <th scope="col">PASSWORD</th>
                                    <th scope="col">NOMOR TELEPON</th>
                                    <th scope="col">TANGGAL LAHIR</th>
                                    <th scope="col">GENDER</th>
                                    <th scope="col">DEPOSIT UANG</th>
                                    <th scope="col">TANGGAL DAFTAR</th>
                                    <th scope="col">MEMBERSHIP</th>
                                    <th scope="col">KADALUARSAN MEMBERSHIP</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(member, id_member) in members" :key="id_member">
                                    <td>{{ member.id_member}}</td>
                                    <td>{{ member.nama}}</td>
                                    <td>{{ member.email }}</td>
                                    <td>{{ member.password }}</td>
                                    <td>{{ member.no_telp }}</td>
                                    <td>{{ member.tgl_lahir }}</td>
                                    <td>{{ member.gender }}</td>
                                    <td>{{ member.deposit_uang }}</td>
                                    <td>{{ member.tgl_daftar }}</td>
                                    <td>{{ member.membership }}</td>
                                    <td>{{ member.kadaluarsa_membership }}</td>
                                    <td>
                                        <router-link :to="{name: 'member.edit', params:{id : member.id_member}}"
                                            class="btn btn-md btn-primary">EDIT</router-link>
                                        <router-link :to="{name: 'member.ubahpass', params:{id : member.id_member}}"
                                            class="btn btn-md btn-primary">UBAH PASSWORD</router-link>
                                        <button class="btn btn-sm btn-primary ml-1" @click="resetPassword(member.id_member)">RESET PASSWORD</button>
                                        <button class="btn btn-sm btn-danger ml-1" @click="deleteMember(member.id_member)">DELETE</button>
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
        let members = ref([]) 
        //mounted 
        onMounted(() => {
            //get API from Laravel Backend 
            axios.get('https://api-gofit.200710947.com/api/member') 
            .then(response => { 
                //assign state posts with response data 
                members.value = response.data.data 
            }).catch(error => {
                 console.log(error.response.data) 
            }) 
        }) 

        function deleteMember(id) {
            
            //delete data post by ID
            axios.delete(`https://api-gofit.200710947.com/api/member/${id}`)
            .then(() => {
                       
                //splice posts 
                members.value.splice(members.value.indexOf(id), 1);
                location.reload()
             }).catch(error => {
                 console.log(error.response.data)
             })
         
         }

         function resetPassword(id) {
            
            //delete data post by ID
            axios.post(`https://api-gofit.200710947.com/api/member/resetpass/${id}`)
            .then(() => {
                       
                //splice posts 
                members.value.splice(members.value.indexOf(id), 1);
                location.reload()
             }).catch(error => {
                 console.log(error.response.data)
             })
         
         }
            //return 
        return { members, deleteMember, resetPassword } } } 
    </script> 
<style> </style>