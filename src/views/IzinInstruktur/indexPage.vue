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
                                    <th scope="col">ID</th>
                                    <th scope="col">INSTRUKTUR</th>
                                    <th scope="col">JADWAL</th>     
                                    <th scope="col">INSTRUKTUR PENGGANTI</th>
                                    <th scope="col">KETERANGAN</th>
                                    <th scope="col">TANGGAL MENGAJUKAN</th> 
                                    <th scope="col">STATUS</th>                           
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(izin, id_izin) in izins" :key="id_izin">
                                    <td>{{ izin.id_izin}}</td>
                                    <td>{{ izin.instruktur.nama}}</td>
                                    <td>{{ izin.jadwal_harian.tanggal }}/{{ izin.jadwal_harian.jam_mulai }}-{{ izin.jadwal_harian.jam_selesai }}/{{ izin.jadwal_harian.id_kelas }}</td>
                                    <td>{{ izin.id_instruktur_pengganti}}</td>
                                    <td>{{ izin.teterangan }}</td>
                                    <td>{{ izin.tgl_mengajukan }}</td>
                                    <td>{{ izin.status }}</td>
                                    <td>
                                        <button class="btn btn-sm btn-primary ml-1" @click="isOpen = true, id_temp = izin.id_izin" >KONFIRMASi</button>
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
            <h2>Apakah anda yakin ingin mengonfirmasi izin ini?</h2>
            <button @click="konfirmasi(this.id_temp) ">Yakin</button>
            <button @click="isOpen = false">Tidak</button>
            
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
        let izins = ref([]) 
        const isOpen = ref(false)
        const id_temp = ''
        
        //mounted 
        onMounted(() => {

            //get API from Laravel Backend 
            axios.post('https://api-gofit.200710947.com/api/izin_instruktur/by_status') 
            .then(response => { 
                //assign state posts with response data 
                izins.value = response.data.data 
            }).catch(error => {
                 console.log(error.response.data) 
            }) 

        })
        
         function konfirmasi(id){
            axios.put(`https://api-gofit.200710947.com/api/izin_instruktur/${id}`)
                .then(() => {
                        
                    //splice posts 
                    izins.value.splice(izins.value.indexOf(id), 1);
                    location.reload()
                    
                }).catch(error => {
                    console.log(error.response.data)
                })
         }

         
            //return 
        return { 
            id_temp,
            isOpen,
            izins,
            konfirmasi,
            
         } } } 
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
  background-color: rgb(163, 166, 166);
  padding: 50px;
  border-radius: 10px;
}
</style>