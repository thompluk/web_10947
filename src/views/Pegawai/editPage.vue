<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT PEGAWAI</h4>
                        <hr>
                        <form @submit.prevent="update">
                            <div class="form-group mb-3"> <label class="form-label">Nama</label> <input
                                    type="text" class="form-control" v-model="pegawai.nama"
                                    placeholder="Masukkan Nama Instruktur"> <!-- validation -->
                                <div v-if="validation.nama" class="mt-2 alert alert-danger"> {{
                                    validation.nama[0] }} </div>
                            </div>
                            <div class="form-group mb-3"> <label for="content" class="form-label">Email</label>
                                <input class="form-control" v-model="pegawai.email"
                                    placeholder="Masukkan email pegawai"> <!-- validation -->
                                <div v-if="validation.email" class="mt-2 alert alert-danger"> {{
                                    validation.email[0] }} </div>
                            </div>
                            <div class="form-group mb-3"> <label for="content" class="form-label">Role</label>
                                <select
                                    class="form-select"
                                    aria-label="Default select example"
                                    v-model="pegawai.role"
                                    >
                                    <option value="Kasir">Kasir</option>
                                    <option value="Admin">Admin</option>
                                    <option value="MO">MO</option>
                                    </select>
                                <div v-if="validation.role" class="mt-2 alert alert-danger"> {{
                                    validation.role[0] }} </div>
                            </div>
                            <div class="form-group mb-3"> <label for="content" class="form-label">Nomor Telepon</label>
                                <input class="form-control" type="number" v-model="pegawai.no_telp"
                                    placeholder="Masukkan nomor telepon">
                                <div v-if="validation.no_telp" class="mt-2 alert alert-danger"> {{
                                    validation.no_telp[0] }} </div>
                            </div>
                            <div class="form-group mb-3"> <label for="content" class="form-label">Tanggal Lahir</label>
                                <input type="date" class="form-control" v-model="pegawai.tgl_lahir"
                                    placeholder="Masukkan tanggal lahir">
                                <div v-if="validation.tgl_lahir" class="mt-2 alert alert-danger"> {{
                                    validation.tgl_lahir[0] }} </div>
                            </div>
                            <div class="form-group mb-3"> <label for="content" class="form-label">Gender</label>
                                <select
                                    class="form-select"
                                    aria-label="Default select example"
                                    v-model="pegawai.gender"
                                    >
                                    <option value="Laki-laki">Laki-laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                    </select>
                                <div v-if="validation.gender" class="mt-2 alert alert-danger"> {{
                                    validation.gender[0] }} </div>
                            </div>
                            <button type="submit" class="btn btn-primary">EDIT</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {  ref, onMounted } from 'vue'
import { useRouter, useRoute} from 'vue-router'
import axios from 'axios'

export default {
    created(){
        this.id = this.$route.params.id
    },
    setup() {

        //state validation 
        const validation = ref([])
        //vue router 
        const router = useRouter()

        const route = useRoute()

        const pegawai = ref([])
        //method store 

        onMounted(() => {
            //get API from Laravel Backend 
            axios.get(`https://api-gofit.200710947.com/api/pegawai/${route.params.id}`).then(response => {
                //assign state posts with response data
                pegawai.value = response.data.data
                console.log(pegawai.value)              
            }).catch(error => {
                console.log(error.response.data)
            })
        })


        function update() { 
            let nama = pegawai.value['nama']
            let email = pegawai.value['email']
            let role = pegawai.value['role']
            let no_telp = pegawai.value['no_telp']
            let tgl_lahir = pegawai.value['tgl_lahir']
            let gender = pegawai.value['gender']
            axios.put(`https://api-gofit.200710947.com/api/pegawai/${route.params.id}`,{ 
                nama : nama,
                email : email,
                role : role,
                no_telp : no_telp,
                tgl_lahir : tgl_lahir,
                gender : gender,
            }).then(() => {
                 //redirect ke post index 
                 router.push({ name: 'pegawai.index' }) 
                }).catch(error => { 
                    //assign state validation with error 
                    validation.value = error.response.data 
                }) 
            }

            return { 
                pegawai, 
                validation, 
                router,
                update
            }
        }   

        
}
</script>

<style>
</style>





