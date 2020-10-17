<template>
    <div class="container-fluid">
      <div class="home">
        <div class="row">
      <div class="sidebar-page col-lg-3">
      <div class="container">
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
          <input type="text" class="form-control" placeholder="Search here"/>
          <button><img src="../assets/img/Plus.png" alt=""></button>
        </div>
      </form>
        <div class="row mx-auto">
          <button class="btn headchat mx-auto"> All </button>
          <button class="btn headchat mx-auto"> Important</button>
          <button class="btn headchat mx-auto"> Unread </button>
        </div>

      <hr>
      <div class="list-contact" v-for="(item, index) in userList" :key="index">
        <div v-if="sender !== item.username">
          <div class="contact-person form-inline" @click="selectUser(item.username, item.image)">
            <img :src="`${url}${item.image}`" alt="photo" class="pl-2 prof-pic">
              <div class="info ml-2 pt-2">
                <b>{{item.name}}</b>
              </div>
            </div>
            <hr>
          </div>
        </div>
      </div>
  </div>
  <div class="col-lg-9">
    <div class="chat-page">
      <div v-if="receiver === null">
        <p class="text-muted text-center mt-5">Please select a user to start chatting</p>
      </div>
      <div v-else>
        <div class="header-info form-inline" v-b-toggle.friend-info>
              <img :src="`${url}${receiverImg}`" alt="photo" class="m-2 prof-pic">
              <div class="info ml-3">
                <b>{{receiver}}</b>
              </div>
        </div>
          <div class="chat-room">
              <div  v-for="(item, index) in historyMsg" :key="`a`+index" class="msg-sent ">
                <div  v-if="item.sender === sender">
                  <div class="text-right bg-success">
                    {{item.message}}
                  </div>
                </div>
                <div v-else class="text-left bg-warning">
                    {{item.message}}
                </div>
              </div>
              <div  v-for="(item, index) in privateChat" :key="index" class=" msg-sent ">
                <div  v-if="item.sender === sender">
                  <div class="text-right bg-success">
                    {{item.message}}
                  </div>
                </div>
                <div v-else class="text-left bg-warning">
                    {{item.msg}}
                </div>
              </div>
          </div>
              <form @submit.prevent="sendMessage">
                <div class="form m-3">
                  <input type="text" class="form-control" placeholder="Type your message here ..." v-model="message">
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
    </div>
</template>

<script>
import io from 'socket.io-client'
import { URL_SOCKET } from '../helpers/env'

export default {
  name: 'Home',
  data () {
    return {
      sender: localStorage.getItem('username'),
      message: '',
      socket: io(`${URL_SOCKET}`),
      userList: [],
      url: URL_SOCKET,
      receiver: null,
      receiverImg: null,
      listMessage: [],
      historyMsg: [],
      privateChat: [],
      receivedMsg: null
    }
  },
  methods: {
    onLogout () {
      localStorage.removeItem('token')
      localStorage.removeItem('refreshtoken')
      localStorage.removeItem('username')
      window.location = '/login'
    },
    async selectUser (user, image) {
      this.receiver = user
      this.receiverImg = image
      this.setPrivateChat()
      await this.socket.emit('get-history', {
        sender: this.sender,
        receiver: this.receiver
      })
      this.getHistoryMessage()
    },
    sendMessage () {
      const chat = {
        sender: this.sender,
        receiver: this.receiver,
        message: this.message
      }

      this.listMessage = [...this.listMessage, chat]

      this.socket.emit('send-message', {
        sender: this.sender,
        receiver: this.receiver,
        message: this.message
      })
      this.message = ''
      this.setPrivateChat()
    },
    getHistoryMessage () {
      this.socket.on('historyMessage', (payload) => {
        this.historyMsg = payload
      })
    },
    setPrivateChat () {
      const privateChats = this.listMessage.filter(e => {
        if (this.receiver === null) {
          return e.sender === this.receiver || e.sender === this.sender
        } else {
          return e.receiver === this.receiver || e.sender === this.receiver
        }
      })
      this.privateChat = privateChats
    }

  },
  mounted () {
    this.socket.emit('get-all-users', [])
    this.socket.on('userList', (payload) => {
      this.userList = payload
    })

    this.socket.emit('join-room', this.sender)

    this.socket.on('private-message', (payload) => {
      this.listMessage = [...this.listMessage, payload]
      if (this.receiver !== null) {
        this.setPrivateChat()
      }
    })
  }
}
</script>

<style scoped>
.home {
  height: 100vh;
  background-color: #FAFAFA;
}
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
.headchat:active, .headchat:hover {
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
</style>
