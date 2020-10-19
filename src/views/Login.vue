<template>
<div class="container-fluid">
  <div class="row d-flex justify-content-center main-page">
    <div class="col-lg-4 col-11  login p-4">
      <form @submit.prevent="login">
        <h3 class="text-center" style="color: #7E98DF">Login</h3>
        <p class="text-left mt-4 mb-4">Hi, Welcome back!</p>

        <div class="md-form">
          <label for="text">Username</label>
          <input type="text" v-model="username" id="text" class="form-control">
        </div>

        <div class="md-form" style="">
          <label for="password">Password</label>
          <input type="password" v-model="password" id="password" class="form-control">
        </div>

        <div class="form-group text-right">
          <router-link to="forgot-password">Forgot Password ?</router-link>
        </div>

        <div class="form-group text-center">
          <button type="submit" class="btn btn-block login-btn">Login</button>
        </div>

        <div class="row">
          <div class="col-lg-4 col-4">
            <hr class="line">
          </div>
          <div class="col-lg-4 col-4 text-center mt-1">
            <p>Login with</p>
          </div>
          <div class="col-lg-4 col-4">
            <hr class="line">
          </div>
        </div>

        <div class="form-group text-center">
         <button class="btn btn-block btn-google">
          Google
          </button>
        </div>

        <div class="form-group text-center">
       <p>Don’t have an account? <router-link to="/register" style="color: #7E98DF">Sign Up</router-link></p>
        </div>

      </form>
    </div>
  </div>
</div>
</template>
<script>
import io from 'socket.io-client'
import { mapActions } from 'vuex'
import Swal from 'sweetalert2'
import { URL_SOCKET } from '../helpers/env'

export default {
  data () {
    return {
      username: '',
      password: '',
      socket: io(`${URL_SOCKET}`)
    }
  },
  methods: {
    ...mapActions({
      onLogin: 'user/onLogin'
    }),
    login () {
      const userData = {
        username: this.username,
        password: this.password
      }
      this.onLogin(userData)
        .then((response) => {
          if (response === 'Need Activation') {
            localStorage.removeItem('iduser')
            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('name')
            localStorage.removeItem('username')
            this.needActivation()
          } else if (response !== 'Login Success') {
            localStorage.removeItem('iduser')
            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('name')
            localStorage.removeItem('username')
            this.failedLogin()
          } else {
            this.socket.emit('notification', this.username)
            window.location = '/home'
          }
        })
    },
    failedLogin () {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Please check your username or password!'
      })
    },
    needActivation () {
      Swal.fire({
        icon: 'warning',
        title: 'Unverified Account',
        text: 'Please check your email to verify your account!'
      })
    }
  }
}
</script>
<style scoped>
.main-page {
  padding-top: 50px;
}
.login {
  background: #ffffff;
  box-shadow: 0px 20px 20px rgba(126, 152, 223, 0.05);
  border-radius: 30px;
  height: 90vh;
  text-align: left
}
.line {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-style: solid;
  border-width: 1px;
}
.login-btn {
  background: #7E98DF;
  border-radius: 50px;
  color: #ffffff;
  padding: 15px;
}
.btn-google {
  border-radius: 50px;
  color: #7E98DF;
  padding: 15px;
  border: 2px solid #7E98DF;
}

</style>
