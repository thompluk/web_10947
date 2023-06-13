<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2"></h1>
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TRANSAKSI DEPOSIT KELAS</h4>
                        <hr>
                        <form @submit.prevent="store">
                            <!-- <div class="form-group mb-3"> <label class="form-label">Pegawai</label> 
                                <select
                                    class="form-select"
                                    aria-label="Default select example"
                                    v-model="transaksi_deposit_kelas.id_pegawai"
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
                            </div> -->
                            <div class="form-group mb-3"> <label class="form-label">Member</label> 
                                <select
                                    class="form-select"
                                    aria-label="Default select example"
                                    v-model="transaksi_deposit_kelas.id_member"
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
                            <div class="form-group mb-3"> <label class="form-label">Kelas</label> 
                                <select
                                    class="form-select"
                                    aria-label="Default select example"
                                    v-model="transaksi_deposit_kelas.id_kelas"
                                    >
                                    <option
                                        v-for="(kelas, id_kelas) in kelass"
                                        :key="id_kelas"
                                        :value="kelas.id_kelas">
                                        {{ kelas.nama_kelas }}
                                    </option>
                                </select>
                                <div v-if="validation.id_member" class="mt-2 alert alert-danger"> {{
                                    validation.id_member[0] }} </div>
                            </div>
                            <!-- <div class="form-group mb-3"> <label for="content" class="form-label">Jumlah Pembelian Deposit</label>
                                <input class="form-control" type="number" v-model="transaksi_deposit_kelas.jumlah_deposit_kelas"
                                    placeholder="Masukkan jumlah deposit kelas">
                                <div v-if="validation.jumlah_deposit_kelas" class="mt-2 alert alert-danger"> {{
                                    validation.jumlah_deposit_kelas[0] }} </div>
                            </div> -->

                            <div class="form-group mb-3"> <label class="form-label">Jumlah Pembelian Deposit</label>
                                <select
                                    class="form-select"
                                    aria-label="Default select example"
                                    v-model="transaksi_deposit_kelas.jumlah_deposit_kelas"
                                    >
                                    <option value="5" >5</option>
                                    <option value="10" >10</option>
                                    </select>
                                <div v-if="validation.jumlah_deposit_kelas" class="mt-2 alert alert-danger"> {{
                                    validation.jumlah_deposit_kelas[0] }} </div>
                            </div>
                            <button type="submit" class="btn btn-primary">SIMPAN</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <teleport to="body">
        <div class="modal" v-if="isOpen">
          <div>
            <h2> {{validation}}</h2>
          </div>
        </div>
      </teleport>

</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
    setup() {
        //state departemen 
        const transaksi_deposit_kelas = reactive({ 
            id_pegawai : '',
            id_member : '',
            jumlah_deposit_kelas : '',
        })
        //state validation 
        const validation = ref([])
        //vue router 
        const router = useRouter()

        const isOpen = ref(false)

        let id_user = localStorage.getItem("Id_User");

        let pegawais = ref([])

        let members = ref([])

        let kelass = ref([])

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
        function store() { 
            let id_pegawai = id_user
            let id_member = transaksi_deposit_kelas.id_member
            let id_kelas = transaksi_deposit_kelas.id_kelas
            let jumlah_deposit_kelas = transaksi_deposit_kelas.jumlah_deposit_kelas
            axios.post('https://api-gofit.200710947.com/api/transaksi_deposit_kelas', { 
                id_pegawai : id_pegawai,
                id_member : id_member,
                id_kelas : id_kelas,
                jumlah_deposit_kelas : jumlah_deposit_kelas,
            }).then(() => {
                 //redirect ke post index 
                 router.push({ name: 'transaksi_deposit_kelas.index' }) }).catch(error => { 
                    //assign state validation with error 
                    validation.value = error.response.data 
                    if(error.response.data .message != null){
                        validation.value = error.response.data.message
                        isOpen.value = true
                        setTimeout(() => { isOpen.value = false},2000);    
                    }
                    
                }) 

        }
        return { 
            isOpen,
            transaksi_deposit_kelas, 
            id_user,
            pegawais,
            members,
            kelass,
            validation, 
            router, 
            store 
         }
    }
}
</script>

<style>
.root{
  position: relative;
}

.modal{
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.1);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content:center;
  align-items:center;
}

.modal > div {
  background-color: rgb(226, 139, 139);
  padding: 50px;
  border-radius: 10px;
}
</style>