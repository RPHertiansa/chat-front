<template>
<div class="container-fluid">
  <div class="row d-flex justify-content-center main-page">
    <div class="col-lg-4 col-11  register p-4">
      <form @submit.prevent="register()">
        <div class="row">
          <div class="col-lg-1 col-1">
            <router-link to="/login">
              <button class="btn"><img src="../assets/img/back.png" alt=""></button>
            </router-link>
          </div>
          <div class="col-lg-11 col-11">
              <h3 class="text-center" style="color: #7E98DF; margin-left: -30px">Register</h3>
          </div>
        </div>
        <p class="text-left  mt-4 mb-4">Let's create your account!</p>

        <div class="md-form">
          <label for="name">Name</label>
          <input type="text" v-model="name" id="name" class="form-control">
        </div>

        <div class="md-form">
          <label for="email">Email</label>
          <input type="email" v-model="email" id="email" class="form-control">
        </div>

        <div class="md-form">
          <label for="password1">Password</label>
          <input type="password" v-model="password" id="password1" class="form-control">
        </div>

        <div class="form-group text-center mt-5">
          <button type="submit" class="btn btn-block btn-register">Register</button>
        </div>
        <div class="row">
          <div class="col-lg-4 col-4">
            <hr class="line">
          </div>
          <div class="col-lg-4 col-4 text-center mt-1">
            <p>Register with</p>
          </div>
          <div class="col-lg-4 col-4">
            <hr class="line">
          </div>
        </div>
        <div class="form-group text-center">
         <button type="submit" class="btn btn-block btn-google">

          Google
          </button>
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
      name: '',
      email: '',
      password: '',
      socket: io(`${URL_SOCKET}`)
    }
  },
  methods: {
    ...mapActions({
      onRegister: 'user/onRegister'
    }),
    register () {
      const userData = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      this.onRegister(userData)
        .then((response) => {
          if (response === 'Success Registration, Please activate your email') {
            Swal.fire({
              icon: 'success',
              title: 'You are registered!',
              text: 'Please check your email to activate your account!'
            })
            window.location = '/login'
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Duplicate Email',
              text: 'Please use different email as this one is already registered'
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
<style>

.main-page {
  margin-top: -50px;
  padding-top: 20px;
}
.register {
  background: #ffffff;
  box-shadow: 0px 20px 20px rgba(126, 152, 223, 0.05);
  border-radius: 30px;
  height:95vh;
  text-align: left
}
.line {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-style: solid;
  border-width: 1px;
}
.btn-register {
  background: #7E98DF !important;
  border-radius: 50px !important;
  color: #ffffff !important;
  padding: 15px !important;
}
.btn-google {
  border-radius: 50px !important;
  color: #7E98DF !important;
  padding: 15px !important;
  border: 2px solid #7E98DF !important;
}
</style>
