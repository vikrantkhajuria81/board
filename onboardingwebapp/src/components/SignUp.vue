<template>
<img class="logo" src="../assets/sign-up.png" />
<h3>Sign Up</h3>
<div class="register">
    <input v-model="name" type="text" placeholder="Enter Name">
    <input  v-model="email" type="email" placeholder="Enter Email">
    <input   v-model="password" type="password" placeholder="Enter Password">
    <button v-on:click="signUp()" type="submit">Register</button>
       <p>
       <router-link to="/login">Login</router-link>
       </p>
</div>
</template>

<script>
import axios from 'axios'
export default {
    Name: 'SignUp',
    data(){
        return{
            name:'',
            email:'',
            password:''
        }
    },
    methods:{
      async  signUp(){
            let result = await axios.post('http://localhost:3000/users',{
                name: this.name,
                email : this.email ,
                password: this.password
            });
            if(result.status==201){
                alert("SignUp DOne")
            }
            localStorage.setItem("user-info",JSON.stringify(result.data))
            this.$router.push({name:'Home'})
        }
    },
    mounted(){
        let user = localStorage.getItem('user-info');
        if(user){
              this.$router.push({ name: 'Home' })
        }
    }
}
</script>

