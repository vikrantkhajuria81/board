<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="/">On Boarding App</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
        </ul>
        <form class="form-inline my-2 my-lg-0">
            <p style="color: black; margin: 20px">{{ name }}</p> 
          <button class="btn btn-outline-dark my-2 my-sm-0" v-on:click="logout()" >LogOut</button>
        </form>
      </div>
    </nav>
</template>

<script>
export default {
    name: 'Header',
    data() {
        return {
            name: '',
        }
    },
    methods: {
        logout() {
            localStorage.clear();
            this.$router.push({
                name: 'Login'
            })
            alert("Logout Successfully")
        },
    },
    async mounted() {
        let user = localStorage.getItem('user-info');
        if (!user) {
            this.$router.push({
                name: 'SignUp'
            })
            alert("please singup first")
        } else {
            this.name = JSON.parse(user).name
        }
    },
}
</script>

<style>
.nav {
    background-color: #333;
    overflow: hidden;
}
.nav a {
    float: left;
    color: white;
    text-align: center;
    padding: 16px 14px;
    text-decoration: none;
    font-size: 16px;
    margin-right: 5px;
}
.nav p {
    float: left;
    color: yellow;
    text-align: center;
    margin-left: 56pc;
    padding-top: 15px;
}
.nav a:hover {
    background-color: #ddd;
    color: #222;
}
</style>
