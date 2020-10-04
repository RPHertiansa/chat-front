<template>
  <div class="d-flex justify-content-center pt-5">
    <div class="card">
    <div class="card-body">
      <form @submit.prevent="onLogin">
        <div class="form-group">
          <label for="exampleInputEmail1">Username</label>
          <input  v-model="username" class="form-control" id="exampleInputEmail1">
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" v-model="password" class="form-control" id="exampleInputPassword1">
        </div>
        <button type="submit" class="btn login-btn btn-primary">Login</button>
    </form>
    </div>
  </div>
  </div>
</template>
<script>
import io from 'socket.io-client'

export default {
  data () {
    return {
      username: '',
      password: '',
      socket: io('http://localhost:3005/')
    }
  },
  methods: {
    onLogin () {
      this.socket.emit('notification', this.username)
      this.$router.push({
        path: '/home',
        query: {
          username: this.username
        }
      }
      )
    }
  }
}
</script>
<style>
.login-btn{
  background-color:  #7E98DF;
}
</style>
