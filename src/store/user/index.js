import axios from 'axios'
import { URL } from '../../helpers/env'
const state = () => {
  return {
    token: localStorage.getItem('token') || null
  }
}

const getters = {
  isLogin: (state) => {
    if (state.token !== null) {
      return true
    } else {
      return false
    }
  }
}

const actions = {
  onRegister: (context, payload) => {
    return new Promise((resolve, reject) => {
      axios.post(`${URL}/users/register`, {
        name: payload.name,
        email: payload.email,
        password: payload.password
      })
        .then((response) => {
          resolve(response.data.message)
        })
        .catch((err) => {
          console.log(err)
        })
    })
  },
  onLogin: (context, payload) => {
    return new Promise((resolve, reject) => {
      axios.post(`${URL}/users/login`, {
        username: payload.username,
        password: payload.password
      }).then(result => {
        resolve(result.data.message)
        localStorage.setItem('token', result.data.data.token)
        localStorage.setItem('refreshtoken', result.data.data.refreshtoken)
        localStorage.setItem('username', result.data.data.username)
      }).catch(err => {
        console.log(err)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions
}
