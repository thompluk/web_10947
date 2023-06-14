<template>
    <div id="app">
      <div id="login">
        <div id="description">
          <h1>Login</h1>
          <p>Badan yang sehat merupakan awal dari kebahagiaan dalam hidup ini.</p>
        </div>
        <div id="form">
          <form @submit.prevent="login">
    
            <label for="email">Email</label>
            <input type="text" id="email" v-model="logins.email" placeholder="example@email.com" autocomplete="off">
            <div v-if="validation.email" class="mt-2 alert alert-danger"> {{validation.email[0] }} </div>

            <label for="password">Password</label>&nbsp;
            <i class="fas" :class="[passwordFieldIcon]" @click="hidePassword = !hidePassword"></i>
            <input :type="passwordFieldType" id="password" placeholder="***********" v-model="logins.password" >
            <div v-if="validation.password" class="mt-2 alert alert-danger"> {{validation.password[0] }} </div>

            <button type="submit">Log in</button>
          </form>
        </div>
      </div>
      
      <teleport to="body">
        <div class="modal" v-if="isOpen">
          <div>
            <h2> {{validation}}</h2>
            <button @click="isOpen = false"> Close</button>
          </div>
        </div>
      </teleport>

    </div>
  </template>



<script>
import { Teleport, computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
//import Swal from 'sweetalert2'

export default {
    rules: {
        required: value => !!value || "Field is required",
    },
    setup() {
        const isOpen = ref(false);
        //state departemen 
        const logins = reactive({
            email: "",
            password: "",
        });
        const hidePassword = ref(true);
        const passwordFieldIcon = computed(() => hidePassword.value ? "fa-eye" : "fa-eye-slash");
        const passwordFieldType = computed(() => hidePassword.value ? "password" : "text");
        //state validation 
        const validation = ref([]);
        //vue router 
        const router = useRouter();
        const validationEmail = ref([]);
        const validationPassword = ref([]);
        //method store 
        function login() {
            let email = logins.email;
            let password = logins.password;
            axios.post("https://api-gofit.200710947.com/api/login", {
                email: email,
                password: password,
            }).then((response) => {
                let role = response.data.role;
                localStorage.setItem("Role", role);
                localStorage.setItem("Id_User", response.data.data.id_pegawai)
                router.push({
                    name: "beranda",
                });
            })
                .catch((error) => {
                  validation.value = error.response.data
                  if(error.response.data.email == null && error.response.data.password == null){
                    validation.value = error.response.data.message;
                    isOpen.value = true
                    setTimeout(() => { isOpen.value = false},2000);
                    // Swal.fire({
                    //   icon: 'error',
                    //   title: validation.value
                    // })
                  }   
                  
                  
                  
                 
            });
        }
        return {
            isOpen,
            logins,
            hidePassword,
            passwordFieldIcon,
            passwordFieldType,
            validation,
            validationEmail,
            validationPassword,
            router,
            login
        };
    },
    components: { Teleport }
}
</script>

<style >

* {
  box-sizing: border-box;
  font-family: Verdana, sans-serif;
}

html,

body {
  height: 100%;
  margin: 0;
  padding: 0;
  width: 100%;
}

div#app {
  width: 100%;
  height: 100%;
}

div#app div#login {
  align-items: center;
  background-color: #e2e2e5;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}

div#app div#login div#description {
  background-color: #ffffff;
  width: 280px;
  padding: 35px;
}

div#app div#login div#description h1,
div#app div#login div#description p {
  margin: 0;
}

div#app div#login div#description p {
  font-size: 0.8em;
  color: #95a5a6;
  margin-top: 10px;
}

div#app div#login div#form {
  background-color: #34495e;
  border-radius: 5px;
  box-shadow: 0px 0px 30px 0px #666;
  color: #ecf0f1;
  width: 410px;
  padding: 35px;
}

div#app div#login div#form label,
div#app div#login div#form input {
  outline: none;
  width: 100%;
}

div#app div#login div#form label {
  color: #95a5a6;
  font-size: 0.8em;
}

div#app div#login div#form input {
  background-color: transparent;
  border: none;
  color: #ecf0f1;
  font-size: 1em;
  margin-bottom: 20px;
}

div#app div#login div#form ::placeholder {
  color: #ecf0f1;
  opacity: 0.5;
}

div#app div#login div#form button {
  background-color: #ffffff;
  cursor: pointer;
  border: none;
  padding: 10px;
  transition: background-color 0.2s ease-in-out;
  width: 100%;
}

div#app div#login div#form button:hover {
  background-color: #eeeeee;
}

@media screen and (max-width: 600px) {
  div#app div#login {
    align-items: unset;
    background-color: unset;
    display: unset;
    justify-content: unset;
  }

  div#app div#login div#description {
    margin: 0 auto;
    max-width: 350px;
    width: 100%;
  }

  div#app div#login div#form {
    border-radius: unset;
    box-shadow: unset;
    width: 100%;
  }

  div#app div#login div#form form {
    margin: 0 auto;
    max-width: 280px;
    width: 100%;
  }
}

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