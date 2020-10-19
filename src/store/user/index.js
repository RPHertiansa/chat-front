import axios from 'axios'
import { URL } from '../../helpers/env'
const state = () => {
  return {
    all: {
      data: [],
      isLoading: false
    },
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
  },
  userDetail (state) {
    return state.all
  }
}

const mutations = {
  SET_ALL_DATA (state, payload) {
    state.all.data = payload
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
        .then((result) => {
          resolve(result.data.message)
        })
        .catch((err) => {
          reject(new Error(err))
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
        localStorage.setItem('iduser', result.data.data.iduser)
        localStorage.setItem('token', result.data.data.token)
        localStorage.setItem('refreshToken', result.data.data.refreshToken)
        localStorage.setItem('name', result.data.data.name)
        localStorage.setItem('username', result.data.data.username)
      }).catch(err => {
        console.log(err)
      })
    })
  },
  onLogout (context) {
    return new Promise((resolve) => {
      localStorage.removeItem('iduser')
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('name')
      localStorage.removeItem('username')
      resolve('Logout success')
    })
  },
  getDetail: (context, payload) => {
    const iduser = localStorage.getItem('iduser')
    return new Promise((resolve, reject) => {
      axios.get(`${URL}/users/getdetail/${iduser}`)
        .then((result) => {
          context.commit('SET_ALL_DATA', result.data.data[0])
        })
        .catch((err) => {
          console.log(err)
        })
    })
  },
  update: (context, payload) => {
    const iduser = localStorage.getItem('iduser')
    return new Promise((resolve, reject) => {
      axios.patch(`${URL}/users/update/${iduser}`, payload)
        .then((result) => {
          console.log(result.data.message)
          resolve(result.data.message)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
