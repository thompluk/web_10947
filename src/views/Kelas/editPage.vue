<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT KELAS</h4>
                        <hr>
                        <form @submit.prevent="update()">
                            <div class="form-group mb-3"> <label class="form-label">Nama Kelas</label> <input
                                    type="text" class="form-control" v-model="kelas.nama_kelas"
                                    placeholder="Masukkan Nama Kelas"> <!-- validation -->
                                <div v-if="validation.nama_kelas" class="mt-2 alert alert-danger"> {{
                                    validation.nama_kelas[0] }} </div>
                            </div>
                            <div class="form-group mb-3"> <label for="content" class="form-label">Harga</label>
                                <input class="form-control" type="number" v-model="kelas.harga"
                                    placeholder="Masukkan harga kelas">
                                <div v-if="validation.harga" class="mt-2 alert alert-danger"> {{
                                    validation.harga[0] }} </div>
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

        //state departemen 
        // const kelas = reactive({ 
        //     nama_kelas : '',
        //     harga : '',
        // })
        //state validation 
        const validation = ref([])
        //vue router 
        const router = useRouter()

        const route = useRoute()

        const kelas = ref([])
        //method store 

        onMounted(() => {
            //get API from Laravel Backend 
            axios.get(`https://api-gofit.200710947.com/api/kelas/${route.params.id}`).then(response => {
                //assign state posts with response data
                kelas.value = response.data.data
                console.log(kelas.value)              
            }).catch(error => {
                console.log(error.response.data)
            })
        })


        function update() { 
            let nama_kelas = kelas.value['nama_kelas']
            let harga = kelas.value['harga']
            axios.put(`https://api-gofit.200710947.com/api/kelas/${route.params.id}`,{ 
                nama_kelas : nama_kelas,
                harga : harga,
            }).then(() => {
                 //redirect ke post index 
                 router.push({ name: 'kelas.index' }) 
                }).catch(error => { 
                    //assign state validation with error 
                    validation.value = error.response.data 
                }) 
            }

            return { 
                kelas, 
                validation, 
                router,
                update
            }
        }   

        
}
</script>

<style>
</style>
