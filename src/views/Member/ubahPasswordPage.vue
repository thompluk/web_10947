<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT PASSWORD MEMBER</h4>
                        <hr>
                        <form @submit.prevent="update()">
                            <div class="form-group mb-3"> <label class="form-label">Password Baru</label> <input
                                    type="text" class="form-control" v-model="member.password"
                                    placeholder="Masukkan Password Baru"> 
                                <div v-if="validation.nama" class="mt-2 alert alert-danger"> {{
                                    validation.nama[0] }} </div>
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

        const member = ref([])
        //method store 

        onMounted(() => {
            //get API from Laravel Backend 
            axios.get(`https://api-gofit.200710947.com/api/member/${route.params.id}`).then(response => {
                //assign state posts with response data
                member.value = response.data.data
                console.log(member.value)              
            }).catch(error => {
                console.log(error.response.data)
            })
        })


        function update() { 
            let password = member.value['password']
            axios.post(`https://api-gofit.200710947.com/api/member/ubahpass/${route.params.id}`,{ 
                password : password,
                
            }).then(() => {
                 //redirect ke post index 
                 router.push({ name: 'member.index' }) 
                }).catch(error => { 
                    //assign state validation with error 
                    validation.value = error.response.data 
                }) 
            }

            return { 
                member, 
                validation, 
                router,
                update
            }
        }   

        
}
</script>

<style>
</style>