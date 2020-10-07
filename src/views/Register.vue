<template>
  <div class="d-flex justify-content-center pt-5">
    <div class="card">
    <div class="card-body">
      <form @submit.prevent="onRegister">
        <div class="form-group">
          <label for="exampleInputName1">Name</label>
          <input  v-model="name" class="form-control" id="exampleInputName1">
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Email</label>
          <input type="email"  v-model="email" class="form-control" id="exampleInputEmail1">
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" v-model="password" class="form-control" id="exampleInputPassword1">
        </div>
        <button type="submit" class="btn login-btn btn-primary">Register</button>
    </form>
    </div>
  </div>
  </div>
</template>
<script>
import io from 'socket.io-client'
import axios from 'axios'

export default {
  data () {
    return {
      name: '',
      email: '',
      password: '',
      socket: io('http://localhost:3005/')
    }
  },
  methods: {
    onRegister () {
      axios.post('http://127.0.0.1:3005/api/v1/users/register', {
        name: this.name,
        email: this.email,
        password: this.password
      })
        .then((response) => {
          alert(response.data.message)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
<style>
.login-btn{
  background-color:  #7E98DF;
}
</style>
