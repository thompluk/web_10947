<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Dashboard</h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body"> 
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
                                    <th scope="col">KADALUARSA MEMBERSHIP</th>
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
                                        <button class="btn btn-sm btn-primary ml-1" @click="deaktivasi(member.id_member)">DEAKTIVASI</button>
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
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body"> 
                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">ID DEPOSIT KELAS</th>
                                    <th scope="col">NAMA MEMBER</th>
                                    <th scope="col">KELAS</th>
                                    <th scope="col">SISA DEPOSIT</th>
                                    <th scope="col">KADALUARSA</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(deposit_kelas, id_deposit_kelas) in deposit_kelass" :key="id_deposit_kelas">
                                    <td>{{ deposit_kelas.id_deposit_kelas}}</td>
                                    <td>{{ deposit_kelas.member.nama}}</td>
                                    <td>{{ deposit_kelas.kelas.nama_kelas }}</td>
                                    <td>{{ deposit_kelas.sisa_deposit }}</td>
                                    <td>{{ deposit_kelas.kadaluarsa }}</td>
                                    <td>
                                        <button class="btn btn-sm btn-primary ml-1" @click="reset(deposit_kelas.id_deposit_kelas)">RESET</button>
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
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body"> 
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
                                    <th scope="col">JUMLAH TERLAMBAT</th>

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
                                    <td>{{ instruktur.keterlambatan }}</td>

                                    <td>
                                        <button class="btn btn-sm btn-primary ml-1" @click="resetTerlambat(instruktur.id_instruktur)">RESET</button>
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
        let deposit_kelass = ref([]) 
        let instrukturs = ref([]) 
        //mounted 
        onMounted(() => {
            //get API from Laravel Backend 
            axios.post('https://api-gofit.200710947.com/api/member/kadaluarsa') 
            .then(response => { 
                //assign state posts with response data 
                members.value = response.data.data 
            }).catch(error => {
                 console.log(error.response.data) 
            }) 

            axios.post('https://api-gofit.200710947.com/api/deposit_kelas/kadaluarsa') 
            .then(response => { 
                //assign state posts with response data 
                deposit_kelass.value = response.data.data 
            }).catch(error => {
                 console.log(error.response.data) 
            }) 

            axios.post('https://api-gofit.200710947.com/api/instruktur/tanggal') 
            .then(response => { 
                //assign state posts with response data 
                instrukturs.value = response.data.data 
            }).catch(error => {
                 console.log(error.response.data) 
            }) 
        }) 

        function deaktivasi(id) {
            
            //delete data post by ID
            axios.post(`https://api-gofit.200710947.com/api/member/deaktivasi/${id}`)
            .then(() => {
                       
                //splice posts 
                members.value.splice(members.value.indexOf(id), 1);
                location.reload()
             }).catch(error => {
                 console.log(error.response.data)
             })
         
         }

         function reset(id) {
            
            //delete data post by ID
            axios.post(`https://api-gofit.200710947.com/api/deposit_kelas/reset/${id}`)
            .then(() => {
                       
                //splice posts 
                deposit_kelass.value.splice(members.value.indexOf(id), 1);
                location.reload()
             }).catch(error => {
                 console.log(error.response.data)
             })
         
         }

         function resetTerlambat(id) {
            
            //delete data post by ID
            axios.post(`https://api-gofit.200710947.com/api/instruktur/reset/${id}`)
            .then(() => {
                       
                //splice posts 
                instrukturs.value.splice(members.value.indexOf(id), 1);
                location.reload()
             }).catch(error => {
                 console.log(error.response.data)
             })
         
         }
            //return 
        return { members, deposit_kelass, instrukturs, deaktivasi, reset, resetTerlambat} } } 
    </script> 
<style> </style>