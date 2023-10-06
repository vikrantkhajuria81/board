<template>
<img class="logo" src="../assets/sign-up.png" />
<h3>Login</h3>

<div class="login">
    <input v-model="email" type="email" placeholder="Enter Email">
    <input v-model="password" type="password" placeholder="Enter Password">
    <button v-on:click="login()" type="submit">Login</button>
    <p>
        <router-link to="/signup">Signup</router-link>
    </p>
</div>
</template>

<script>
import axios from 'axios'
export default {

    Name: 'Login',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        async login() {

            let result = await axios.get(`//localhost:3000/users?email=${this.email}&password=${this.password}`);

            console.warn(result)
            if (result.status == 200 && result.data.length > 0) {
                alert("Login DOne")
                localStorage.setItem("user-info", JSON.stringify(result.data[0]))
                this.$router.push({
                    name: 'Home'
                })

            } else {
                alert("Invalid")
                this.$router.push({
                    name: 'Login'
                })
            }
        }
    }
}
</script>
