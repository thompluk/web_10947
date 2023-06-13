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
                        <h4>TRANSAKSI DEPOSIT UANG</h4>
                        <hr>
                        <form @submit.prevent="store">
                            <div class="form-group mb-3"> <label class="form-label">Pegawai</label> 
                                <select
                                    class="form-select"
                                    aria-label="Default select example"
                                    v-model="transaksi_deposit_uang.id_pegawai"
                                    >
                                    <option
                                        v-for="(pegawai, id_pegawai) in pegawais"
                                        :key="id_pegawai"
                                        :value="pegawai.id_pegawai"
                                        >
                                        {{ pegawai.nama }}  -  {{ pegawai.role }}
                                    </option>
                                </select>
                                <div v-if="validation.id_pegawai" class="mt-2 alert alert-danger"> {{
                                    validation.id_pegawai[0] }} </div>
                            </div>
                            <div class="form-group mb-3"> <label class="form-label">Member</label> 
                                <select
                                    class="form-select"
                                    aria-label="Default select example"
                                    v-model="transaksi_deposit_uang.id_member"
                                    >
                                    <option
                                        v-for="(member, id_member) in members"
                                        :key="id_member"
                                        :value="member.id_member">
                                        {{member.id_member}}  -  {{ member.nama }} 
                                    </option>
                                </select>
                                <div v-if="validation.id_member" class="mt-2 alert alert-danger"> {{
                                    validation.id_member[0] }} </div>
                            </div>
                            <div class="form-group mb-3"> <label for="content" class="form-label">Jumlah Pembelian Deposit</label>
                                <input class="form-control" type="number" v-model="transaksi_deposit_uang.jumlah_deposit_uang"
                                    placeholder="Masukkan jumlah deposit kelas">
                                <div v-if="validation.jumlah_deposit_uang" class="mt-2 alert alert-danger"> {{
                                    validation.jumlah_deposit_uang[0] }} </div>
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
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
    setup() {
        //state departemen 
        const transaksi_deposit_uang = reactive({ 
            id_pegawai : '',
            id_member : '',
            jumlah_deposit_uang : '',
        })
        //state validation 
        const validation = ref([])
        //vue router 
        const router = useRouter()

        let pegawais = ref([])

        let members = ref([])

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

        //method store 
        function store() { 
            let id_pegawai = transaksi_deposit_uang.id_pegawai
            let id_member = transaksi_deposit_uang.id_member
            let jumlah_deposit_uang = transaksi_deposit_uang.jumlah_deposit_uang
            axios.post('https://api-gofit.200710947.com/api/transaksi_deposit_uang', { 
                id_pegawai : id_pegawai,
                id_member : id_member,
                jumlah_deposit_uang : jumlah_deposit_uang,
            }).then(() => {
                 //redirect ke post index 
                 router.push({ name: 'transaksi_deposit_uang.index' }) }).catch(error => { 
                    //assign state validation with error 
                    validation.value = error.response.data 
                }) 

        }
        return { 
            transaksi_deposit_uang, 
            pegawais,
            members,
            validation, 
            router, 
            store 
         }
    }
}
</script>

<style>
</style>