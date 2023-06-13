<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT INSTRUKTUR</h4>
                        <hr>
                        <form @submit.prevent="update()">
                            <div class="form-group mb-3"> <label class="form-label">Nama</label> <input
                                    type="text" class="form-control" v-model="instruktur.nama"
                                    placeholder="Masukkan Nama Instruktur"> <!-- validation -->
                                <div v-if="validation.nama" class="mt-2 alert alert-danger"> {{
                                    validation.nama[0] }} </div>
                            </div>
                            <div class="form-group mb-3"> <label for="content" class="form-label">Email</label>
                                <input class="form-control" v-model="instruktur.email"
                                    placeholder="Masukkan email instruktur"> <!-- validation -->
                                <div v-if="validation.email" class="mt-2 alert alert-danger"> {{
                                    validation.email[0] }} </div>
                            </div>
                            <div class="form-group mb-3"> <label for="content" class="form-label">Nomor Telepon</label>
                                <input class="form-control" type="number" v-model="instruktur.no_telp"
                                    placeholder="Masukkan nomor telepon">
                                <div v-if="validation.no_telp" class="mt-2 alert alert-danger"> {{
                                    validation.no_telp[0] }} </div>
                            </div>
                            <div class="form-group mb-3"> <label for="content" class="form-label">Tanggal Lahir</label>
                                <input type="date" class="form-control" v-model="instruktur.tgl_lahir"
                                    placeholder="Masukkan tanggal lahir">
                                <div v-if="validation.tgl_lahir" class="mt-2 alert alert-danger"> {{
                                    validation.tgl_lahir[0] }} </div>
                            </div>
                            <div class="form-group mb-3"> <label for="content" class="form-label">Gender</label>
                                <select
                                    class="form-select"
                                    aria-label="Default select example"
                                    v-model="instruktur.gender"
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


        const validation = ref([])
        //vue router 
        const router = useRouter()

        const route = useRoute()

        const instruktur = ref([])
        //method store 

        onMounted(() => {
            //get API from Laravel Backend 
            axios.get(`https://api-gofit.200710947.com/api/instruktur/${route.params.id}`).then(response => {
                //assign state posts with response data
                instruktur.value = response.data.data
                console.log(instruktur.value)              
            }).catch(error => {
                console.log(error.response.data)
            })
        })


        function update() { 
            let nama = instruktur.value['nama']
            let email = instruktur.value['email']
            let no_telp = instruktur.value['no_telp']
            let tgl_lahir = instruktur.value['tgl_lahir']
            let gender = instruktur.value['gender']
            axios.put(`https://api-gofit.200710947.com/api/instruktur/${route.params.id}`,{ 
                nama : nama,
                email : email,
                no_telp : no_telp,
                tgl_lahir : tgl_lahir,
                gender : gender,
            }).then(() => {
                 //redirect ke post index 
                 router.push({ name: 'instruktur.index' }) 
                }).catch(error => { 
                    //assign state validation with error 
                    validation.value = error.response.data 
                }) 
            }

            return { 
                instruktur, 
                validation, 
                router,
                update
            }
        }   

        
}
</script>

<style>
</style>

