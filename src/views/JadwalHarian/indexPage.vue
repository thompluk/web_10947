<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Dashboard</h1>
<!--         
        <div class="alert alert-danger" v-if="validation != ''"> {{ validation.message }}</div> -->
        
    </div>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body"> 
                        <button class="btn btn-md btn-success" @click="isOk = true">GENERATE DATA</button>
                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">INSTRUKTUR</th>
                                    <th scope="col">KELAS</th>
                                    <th scope="col">HARI</th>   
                                    <th scope="col">TANGGAL</th>                              
                                    <th scope="col">JAM MULAI</th>
                                    <th scope="col">JAM SELESAI</th>
                                    <th scope="col">STATUS</th>
                                    <th scope="col">KOUTA</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(jadwal_harian, id_jadwal_harian) in jadwal_harians" :key="id_jadwal_harian">
                                    <td>{{ jadwal_harian.id_jadwal_harian}}</td>
                                    <td>{{ jadwal_harian.instruktur.nama}}</td>
                                    <td>{{ jadwal_harian.kelas.nama_kelas }}</td>
                                    <td>{{ jadwal_harian.hari}}</td>
                                    <td>{{ jadwal_harian.tanggal}}</td>
                                    <td>{{ jadwal_harian.jam_mulai }}</td>
                                    <td>{{ jadwal_harian.jam_selesai }}</td>
                                    <td>{{ jadwal_harian.status}}</td>
                                    <td>{{ jadwal_harian.kuota}}</td>
                                    <td>
                                        <router-link :to="{name: 'jadwal_harian.edit', params:{id : jadwal_harian.id_jadwal_harian}}"
                                            class="btn btn-md btn-primary">EDIT</router-link>
                                        <button class="btn btn-sm btn-primary ml-1" @click="ubahStatus(jadwal_harian.id_jadwal_harian)">LIBUR</button>
                                        <button class="btn btn-sm btn-danger ml-1" @click="deleteJadwalHarian(jadwal_harian.id_jadwal_harian)">DELETE</button>
                                    </td>
                                </tr>
                            </tbody> 
                        </table> 
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

      <teleport to="body">
        <div class="modal-ok" v-if="isOk">
          <div>
            <h2> Anda yakin ingin generate?</h2>
            <button @click="storeJadwalHarian(), isOk = false">Yakin</button>
            <button @click="isOk = false">Tidak</button>
            
          </div>
        </div>
      </teleport>

</template> 
<script> 
import axios from 'axios' 
import { onMounted, ref } from 'vue' 

export default { 
    setup() { 
        //reactive state 
        let jadwal_harians = ref([]) 
        const validation = ref([])
        const isOpen = ref(false)
        const isOk = ref(false)
        
        //mounted  
        onMounted(() => {
            //get API from Laravel Backend 
            axios.get('https://api-gofit.200710947.com/api/jadwal_harian') 
            .then(response => { 
                //assign state posts with response data 
                jadwal_harians.value = response.data.data 
            }).catch(error => {
                 console.log(error.response.data)
                 console.log("gyujkio") 
 
            }) 
        })

        function storeJadwalHarian(){
            axios.post(`https://api-gofit.200710947.com/api/jadwal_harian`)
            .then(() => {               
                location.reload()
             }).catch(error => {
                validation.value = error.response.data.message
                isOpen.value = true
                setTimeout(() => { isOpen.value = false},2000);
             })
        }

        function deleteJadwalHarian(id) {
            
            //delete data post by ID
            axios.delete(`https://api-gofit.200710947.com/api/jadwal_harian/${id}`)
            .then(() => {
                       
                //splice posts 
                jadwal_harians.value.splice(jadwal_harians.value.indexOf(id), 1);
                location.reload()
             }).catch(error => {
                 console.log(error.response.data)
             })
         
         }

         function ubahStatus(id){
            axios.post(`https://api-gofit.200710947.com/api/jadwal_harian/libur/${id}`)
            .then(() => {               
                location.reload()
             }).catch(error => {
                 console.log(error.response.data)
             })
        }
            //return 
        return { isOk,isOpen,jadwal_harians,validation,storeJadwalHarian, deleteJadwalHarian, ubahStatus} } } 
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

.modal-ok{
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
  background-color: rgb(196, 136, 136);
  padding: 50px;
  border-radius: 10px;
}

.modal-ok> div {
  background-color: rgb(172, 171, 164);
  padding: 50px;
  border-radius: 10px;
}
</style>   