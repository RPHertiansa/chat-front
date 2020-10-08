<template>
  <div class="container-fluid">
    <div class="row">
      <div class="sidebar-page col-lg-3">
    <div class="container mt-2">
      <b-row>
        <b-col>
          <router-link to="/home">
          <h4 class="font-weight-bold tele-text mt-2">Telegram</h4>
          </router-link>
        </b-col>
        <b-col class="text-right">
          <b-dropdown variant="violet">
            <template v-slot:button-content>
              <b-icon-justify-left class="icon"></b-icon-justify-left>
            </template>
            <div class="bg-telegram">
            <b-dropdown-item to="/profile"><b-icon-gear class="mr-3"></b-icon-gear> Setting</b-dropdown-item>
            <b-dropdown-item><b-icon-person class="mr-3"></b-icon-person> Contacts</b-dropdown-item>
            <b-dropdown-item><b-icon-telephone class="mr-3"></b-icon-telephone> Calls</b-dropdown-item>
            <b-dropdown-item><b-icon-bookmark class="mr-3"></b-icon-bookmark> Save messages</b-dropdown-item>
            <b-dropdown-item><b-icon-person-plus class="mr-3"></b-icon-person-plus> Invite Friends</b-dropdown-item>
            <b-dropdown-item><b-icon-question-circle class="mr-3"></b-icon-question-circle> Telegram FAQ</b-dropdown-item>
            <b-dropdown-item @click="onLogout"><b-icon-box-arrow-right class="mr-3"></b-icon-box-arrow-right> Logout</b-dropdown-item>
            </div>
          </b-dropdown>
        </b-col>
      </b-row>
      <form >
        <div class="form">
          <button><b-icon icon="search" variant="secondary"></b-icon></button>
          <input type="text" class="form-control" placeholder="Search here" v-model="keyword" />
          <button><img src="../assets/img/Plus.png" alt=""></button>
        </div>
      </form>
        <div class="row">
          <a class="btn btn-sort"> All </a>
          <a class="btn btn-sort"> Important </a>
          <a class="btn btn-sort"> Unread </a>
        </div>

      <hr>
      <div class="list-contact" v-for="(item, index) in userList" :key="index">
        <div v-if="username !== item.username">
          <div class="contact-person form-inline" @click="selectUser(item.username), selectImage(item.image), selectId(item.id)">
            <img :src="`${url}${item.image}`" alt="photo" class="pl-2 prof-pic">
              <div class="info ml-2 pt-2">
                <b>{{item.name}}</b>
                <p class="small tele-text mt-2">Hello world</p>
              </div>
            </div>
            <hr>
          </div>
        </div>
      </div>
  </div>
  <div class="col-lg-9">
    <div class="chat-page">
      <div v-if="userReceiver === null || userReceiverImage === null">
        <p class="text-muted text-center mt-5">Please select a chat to start messaging</p>
      </div>
      <div v-else>
        <div class="header-info form-inline" v-b-toggle.friend-info>
              <img :src="`${url}${userReceiverImage}`" alt="photo" class="m-2 prof-pic">
              <div class="info ml-3">
                <b>{{userReceiver}}</b>
              </div>
        </div>
          <div class="chat-room">
            <div v-if="userReceiver">
              <div v-for="(item, index) in privateMessages" :key="index">
                {{item.message}}
              </div>
            </div>
            <div v-else>
              <div v-for="(item, index) in listMessage" :key="index">
                {{item.message}}
              </div>
            </div>
            </div>
              <form @submit.prevent="sendMessage()">
                <div class="form m-3">
                  <input type="text" class="form-control" placeholder="Type message here ..." v-model="message">
                  <button><img src="../assets/img/Plus.png" alt=""></button>
                  <button><img src="../assets/img/emoji.png" alt=""></button>
                  <button><img src="../assets/img/square.png" alt=""></button>
                </div>
              </form>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import io from 'socket.io-client'
import { URL_SOCKET } from '../helpers/env'

export default {
  name: 'Home',
  data () {
    return {
      username: localStorage.getItem('username'),
      message: '',
      socket: io(`${URL_SOCKET}`),
      userList: [],
      url: URL_SOCKET,
      userReceiver: null,
      userReceiverImage: null,
      listUsers: [],
      listMessage: [],
      privateMessages: [],
      keyword: null
    }
  },
  methods: {
    onLogout () {
      localStorage.removeItem('token')
      localStorage.removeItem('refreshtoken')
      localStorage.removeItem('username')
      window.location = '/login'
    },
    selectUser (user) {
      this.userReceiver = user
      const privateMessage = this.listMessage.filter((n) => n.sender === n.userReceiver || n.sender === n.username)
      this.privateMessages = privateMessage
    },
    selectImage (image) {
      this.userReceiverImage = image
    },
    selectId (iduser) {
      localStorage.setItem('receiver', iduser)
    },
    sendMessage () {
      const msg = `${this.username} : ${this.message}`
      this.listMessage = [...this.listMessage, {
        sender: this.username,
        receiver: this.userReceiver,
        message: msg
      }]
      this.socket.emit('send-message', {
        sender: this.username,
        receiver: this.userReceiver,
        message: msg
      })
      this.message = ''
    }
  },
  mounted () {
    this.socket.emit('get-all-users', [])
    this.socket.on('userList', (data) => {
      this.userList = data
    })

    this.socket.on('connection', (data) => {
      this.connections = data
    })

    this.socket.emit('join-room', {
      user: this.username
    })
    this.socket.on('list-messages', (data) => {
      this.listMessage = [...this.listMessage, data]
      const privateMessage = this.listMessage.filter((e) => e.sender === e.userReceiver || e.sender === e.username)
      this.privateMessages = privateMessage
    })
    this.socket.on('typing', (username) => {
      this.typing = username
    })
    this.socket.on('stopTyping', () => {
      this.typing = false
    })
  }
}

</script>

<style scoped>
.text-empty {
  position: absolute;
  left: 50%;
  top: 50%;
}
.chat-page {
  margin-left: -15px;
  height: 100vh;
}
.header-info {
  padding: 5px;
  background-color: #fff;
}
.chat-room {
  height: 500px;
  border-bottom: 1px solid #ddd;
  background-color:#F6F6F6;
}
input[type="text"] {
  background-color: transparent;
  border: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  position: relative;
  bottom: 0;
}
input[type="text"]:focus {
  background-color: transparent;
  -webkit-box-shadow: none;
  box-shadow: none;
}
.form {
  display: flex;
  background-color: #f3efef;
  border-radius: 20px;
  margin: 10px 0;
}
.form button {
  border: none;
  outline: none;
  background-color: transparent;
}
/* Sidebar */
.sidebar-page {
  background-color: #fff;
  border: 1px solid #ccc;
}
.form {
  display: flex;
  background-color: #f3efef;
  border-radius: 20px;
  margin: 10px 0;
}
.form button {
  border: none;
  outline: none;
  background-color: transparent;
}
input[type="text"] {
  background: transparent;
  border: none;
  -webkit-box-shadow: none;
  box-shadow: none;
}
input[type="text"]:focus {
  -webkit-box-shadow: none;
  box-shadow: none;
  background: transparent;
}
.icon {
  width: 40px;
  height: 40px;
  margin-top: -6px;
  color: #7E98DF;
}
.tele-text {
  color:  #7E98DF;
}
.bg-telegram{
  background-color:  #7E98DF;
  color: #FAFAFA;
}
.btn-sort {
  margin: auto;
}
.btn-sort:active, .btn-sort:hover {
  background-color:  #7E98DF;
  color: #fff !important;
  border-radius: 15px;
}

.contact-person {
  cursor: pointer;
}
.prof-pic {
  height: 60px;
  border-radius: 20px;
}
@media(max-width: 576px) {
  .chat-page {
  margin-left: 0px;
  height: 100%;
  }
  .sidebar-page {
    height: 100vh;
  }
  .chat-room {
  height: 430px;
  }
}
</style>
