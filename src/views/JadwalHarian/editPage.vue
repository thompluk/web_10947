<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2"></h1>
        
        <div class="alert alert-danger" v-if="validation != ''"> {{ validation.message }}</div>
        
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT JADWAL HARIAN</h4>
                        <hr>
                        <form @submit.prevent="update">
                            <div class="form-group mb-3"> <label class="form-label">Instruktur</label> 
                                <select
                                    class="form-select"
                                    aria-label="Default select example"
                                    v-model="jadwal_harian.id_instruktur"
                                    >
                                    <option
                                        v-for="(instruktur, id_instruktur) in instrukturs"
                                        :key="id_instruktur"
                                        :value="instruktur.id_instruktur">
                                        {{ instruktur.nama }}
                                    </option>
                                </select>
                                <div v-if="validation.id_instruktur" class="mt-2 alert alert-danger"> {{
                                    validation.id_instruktur[0] }} </div>
                            </div>
                            <div class="form-group mb-3"> <label class="form-label">Kelas</label> 
                                <select
                                    class="form-select"
                                    aria-label="Default select example"
                                    v-model="jadwal_harian.id_kelas"
                                    >
                                    <option
                                        v-for="(kelas, id_kelas) in kelass"
                                        :key="id_kelas"
                                        :value="kelas.id_kelas">
                                        {{ kelas.nama_kelas }}
                                    </option>
                                </select>
                                <div v-if="validation.id_kelas" class="mt-2 alert alert-danger"> {{
                                    validation.id_kelas[0] }} </div>
                            </div>
                            <div class="form-group mb-3"> <label class="form-label">Hari</label> 
                                <select
                                    class="form-select"
                                    aria-label="Default select example"
                                    v-model="jadwal_harian.hari"
                                    >
                                    <option value="Senin">Senin</option>
                                    <option value="Selasa">Selasa</option>
                                    <option value="Rabu">Rabu</option>
                                    <option value="Kamis">Kamis</option>
                                    <option value="Jumat">Jumat</option>
                                    <option value="Sabtu">Sabtu</option>
                                    <option value="Minggu">Minggu</option>
                                    </select>
                                <div v-if="validation.hari" class="mt-2 alert alert-danger"> {{
                                    validation.hari[0] }} </div>
                            </div>
                            <div class="form-group mb-3"> <label class="form-label">pilihan_jam</label>
                                <select
                                    class="form-select"
                                    aria-label="Default select example"
                                    v-model="jadwal_harian.jam_mulai"
                                    >
                                    <option value="08:00:00" >08:00:00 - 09:30:00</option>
                                    <option value="09:30:00" >09:30:00 - 11:00:00</option>
                                    <option value="17:00:00" >17:00:00 - 18:30:00</option>
                                    <option value="18:30:00" >18:30:00 - 20:00:00</option>
                                    </select>
                                <div v-if="validation.jam_mulai" class="mt-2 alert alert-danger"> {{
                                    validation.jam_mulai[0] }} </div>
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

        const jadwal_harian = ref([])

        let instrukturs = ref([])

        let kelass = ref([])

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
        //method store 

        onMounted(() => {
            //get API from Laravel Backend 
            axios.get(`https://api-gofit.200710947.com/api/jadwal_harian/${route.params.id}`).then(response => {
                //assign state posts with response data
                jadwal_harian.value = response.data.data
                console.log(jadwal_harian.value)              
            }).catch(error => {
                console.log(error.response.data)
            })
        })


        function update() { 
            let id_instruktur = jadwal_harian.value['id_instruktur']
            let id_kelas = jadwal_harian.value['id_kelas']
            let hari = jadwal_harian.value['hari']
            let jam_mulai = jadwal_harian.value['jam_mulai']
            axios.put(`https://api-gofit.200710947.com/api/jadwal_harian/${route.params.id}`,{ 
                id_instruktur : id_instruktur,
                id_kelas : id_kelas,
                hari : hari,
                jam_mulai : jam_mulai,
            }).then(() => {
                 //redirect ke post index 
                 router.push({ name: 'jadwal_harian.index' }) 
                }).catch(error => { 
                    //assign state validation with error 
                    validation.value = error.response.data 
                }) 
            }

            return { 
                jadwal_harian,
                instrukturs,
                kelass, 
                validation, 
                router,
                update
            }
        }   

        
}
</script>

<style>
</style>