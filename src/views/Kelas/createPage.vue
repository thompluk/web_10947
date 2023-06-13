<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH KELAS</h4>
                        <hr>
                        <form @submit.prevent="store">
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
                            <button type="submit" class="btn btn-primary">SIMPAN</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
    setup() {
        //state departemen 
        const kelas = reactive({ 
            nama_kelas : '',
            harga : '',
        })
        //state validation 
        const validation = ref([])
        //vue router 
        const router = useRouter()
        //method store 
        function store() { 
            let nama_kelas = kelas.nama_kelas
            let harga = kelas.harga
            axios.post('https://api-gofit.200710947.com/api/kelas', { 
                nama_kelas : nama_kelas,
                harga : harga,
            }).then(() => {
                 //redirect ke post index 
                 router.push({ name: 'kelas.index' }) }).catch(error => { 
                    //assign state validation with error 
                    validation.value = error.response.data 
                }) 
            }

            return { 
                kelas, 
                validation, 
                router, 
                store 
         }
    }
}
</script>

<style>
</style>


