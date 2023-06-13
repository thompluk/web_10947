<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH JADWAL UMUM</h4>
                        <hr>
                        <form @submit.prevent="store">
                            <div class="form-group mb-3"> <label class="form-label">Instruktur</label> 
                                <!-- <input
                                    type="number" class="form-control" v-model="jadwal_umum.id_instruktur"
                                    placeholder="Masukkan Instruktur">  -->
                                <select
                                    class="form-select"
                                    aria-label="Default select example"
                                    v-model="jadwal_umum.id_instruktur"
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
                                    v-model="jadwal_umum.id_kelas"
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
                                    v-model="jadwal_umum.hari"
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
                            <div class="form-group mb-3"> <label class="form-label">pilihan jam</label>
                                <select
                                    class="form-select"
                                    aria-label="Default select example"
                                    v-model="jadwal_umum.jam_mulai"
                                    >
                                    <option value="08:00:00" >08:00:00 - 09:30:00</option>
                                    <option value="09:30:00" >09:30:00 - 11:00:00</option>
                                    <option value="17:00:00" >17:00:00 - 18:30:00</option>
                                    <option value="18:30:00" >18:30:00 - 20:00:00</option>
                                    </select>
                                <div v-if="validation.jam_mulai" class="mt-2 alert alert-danger"> {{
                                    validation.jam_mulai[0] }} </div>
                            </div>
                            <!-- <div class="form-group mb-3"> <label class="form-label">Jam Selesai</label> <input
                                    type="text" class="form-control" v-model="jadwal_umum.jam_selesai"
                                    placeholder="Masukkan Jam Selesai"> 
                                <div v-if="validation.jam_selesai" class="mt-2 alert alert-danger"> {{
                                    validation.jam_selesai[0] }} </div>
                            </div> -->
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

        const isOpen = ref(false)
        //state departemen 
        const jadwal_umum = reactive({ 
            id_instruktur : '',
            id_kelas : '',
            hari : '',
            jam_mulai: '',
        })
        //state validation 
        const validation = ref([])
        //vue router 
        const router = useRouter()

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
        function store() { 
            let id_instruktur = jadwal_umum.id_instruktur
            let id_kelas = jadwal_umum.id_kelas
            let hari = jadwal_umum.hari
            let jam_mulai = jadwal_umum.jam_mulai
            axios.post('https://api-gofit.200710947.com/api/jadwal_umum', { 
                id_instruktur : id_instruktur,
                id_kelas : id_kelas,
                hari : hari,
                jam_mulai : jam_mulai,
            }).then(() => {
                 //redirect ke post index 
                 router.push({ name: 'jadwal_umum.index' }) }).catch(error => { 
                    //assign state validation with error 
                    validation.value = error.response.data 
                    if(error.response.data.message != null){
                        validation.value = error.response.data.message;
                        console.log(error.response.data) 
                        isOpen.value = true
                        setTimeout(() => { isOpen.value = false},2000);
                    }
                }) 
            }

            return { 
                isOpen,
                jadwal_umum, 
                instrukturs,
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


