<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-3 friendlist">
        <div class="container">
        <b-row>
          <b-col>
            <router-link to="/home">
            <h4 class="font-weight-bold tele-text mt-2">Telegram</h4>
            </router-link>
          </b-col>
          <b-col class="text-right">
            <div class="btn-group">
              <button type="button" class="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img src="../assets/img/icon-click-chatlist.png" alt="">
              </button>
              <div class="dropdown-menu dropdown-menu-right menu">
                <button class="dropdown-item text-white" type="button" v-b-toggle.sidebar><b-icon-gear class="mr-4"></b-icon-gear>Settings</button>
                <button class="dropdown-item text-white" type="button"><b-icon-person class="mr-4"></b-icon-person>Contacts</button>
                <button class="dropdown-item text-white" type="button"><b-icon-telephone class="mr-4"></b-icon-telephone>Calls</button>
                <button class="dropdown-item text-white" type="button"><b-icon-bookmark class="mr-4"></b-icon-bookmark>Messages</button>
                <button class="dropdown-item text-white" type="button" v-b-toggle.add-friend><b-icon-person-plus flip-h class="mr-4"></b-icon-person-plus>Friends</button>
                <button class="dropdown-item text-white" type="button"><b-icon-question-circle class="mr-4"></b-icon-question-circle>FAQ</button>
              </div>
            </div>
          </b-col>
        </b-row>
        <div>
      <b-sidebar id="sidebar">
        <div class="p-4">
          <div class="text-center">
            <h4 class="tele-text mt-0 mb-3">{{userDetail.data.username}}</h4>
            <img class="prof-pic" :src="`${url}${userDetail.data.image}`" alt="">
            <div>
              <h4 class="mb-0">{{userDetail.data.name}}</h4>
            </div>
            <div>
              <p class="text-muted mt-0">@{{userDetail.data.username}}</p>
            </div>
          </div>
          <div class="text-left">
            <h4 class="font-weight-bold">Account</h4>
            <div>
              <p class="text-muted mb-0">Phone number</p>
              <p>{{userDetail.data.phonenumber}}</p>
            </div>
            <div>
              <p class="text-muted mb-0">Bio</p>
              <p>{{userDetail.data.bio}}</p>
            </div>
          </div>
          <div class="text-left">
              <h4 class="font-weight-bold mb-2">Settings</h4>
              <div class="tele-text">
                  <div><p><b-icon-bell scale="1.5" class="mr-3"></b-icon-bell>Notification and Sounds</p></div>
                  <div><p><b-icon-lock scale="1.5" class="mr-3"></b-icon-lock>Privacy and Security</p></div>
                  <div><p><b-icon-graph-up scale="1.5" class="mr-3"></b-icon-graph-up>Data and Storage</p></div>
                  <div><p><b-icon-chat-left-text scale="1.5" class="mr-3"></b-icon-chat-left-text>Chat Settings</p></div>
                  <div><p><b-icon-laptop scale="1.5" class="mr-3"></b-icon-laptop>Devices</p></div>
                  <div class="pointer" @click="onLogout()"><p><b-icon-power scale="1.5" class="mr-3"></b-icon-power>Logout</p></div>
              </div>
          </div>
        </div>
      </b-sidebar>

      <b-sidebar id="add-friend" shadow>
        <div class="px-3 py-2">
          <h3 class="tele-text">Add Friend</h3>
          <form >
            <div class="form">
              <input type="text" class="form-control" placeholder="insert username"/>
            </div>
          </form>
        </div>
      </b-sidebar>

    </div>
        <form >
          <div class="form">
            <button><b-icon icon="search" variant="secondary"></b-icon></button>
            <input type="text" class="form-control" placeholder="Search here"/>
            <button><img src="../assets/img/Plus.png" alt=""></button>
          </div>
        </form>
          <div class="row mx-auto">
            <button class="btn chat-category mx-auto"> All </button>
            <button class="btn chat-category mx-auto"> Important</button>
            <button class="btn chat-category mx-auto"> Unread </button>
          </div>

        <hr>
          <div class="list-contact" v-for="(item, index) in friendList" :key="index">
            <div class="pointer form-inline" @click="selectUser(item.name, item.image)">
              <img :src="`${url}${item.image}`" alt="photo" class="pl-2 prof-pic">
                <div class="info ml-2 pt-2">
                  <b>{{item.name}}</b>
                </div>
            </div>
            <hr>
          </div>
        </div>
      </div>
      <div class="col-lg-9">
        <div>
          <div v-if="receiver === null">
            <p class="text-muted empty-chat">Please select a user to start chatting</p>
          </div>
          <div v-else >
            <div class="receiver-info form-inline">
              <img :src="`${url}${receiverImg}`" alt="photo" class="m-2 prof-pic">
              <div class="info ml-3">
                <b>{{receiver}}</b>
              </div>
            </div>
            <div  class="chat-room">
              <div  v-for="(item, index) in historyMsg" :key="`a`+index">
                <div  v-if="item.sender === sender">
                  <div class="msg-sent text-right ml-auto">
                    {{item.message}}
                  </div>
                </div>
                <div v-else class="msg-received text-left">
                    {{item.message}}
                </div>
              </div>
              <div  v-for="(item, index) in privateChat" :key="index">
                <div  v-if="item.sender === sender">
                  <div class="msg-sent text-right ml-auto">
                    {{item.message}}
                  </div>
                </div>
                <div v-else class="msg-received text-left">
                    {{item.msg}}
                </div>
              </div>
            </div>
              <div>
                <form @submit.prevent="sendMessage">
                  <div class="form m-3">
                    <input type="text" class="form-control" placeholder="Type your message here..." v-model="message">
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
import Swal from 'sweetalert2'
import { URL_SOCKET } from '../helpers/env'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Home',
  data () {
    return {
      sender: localStorage.getItem('name'),
      username: localStorage.getItem('username'),
      socket: io(`${URL_SOCKET}`),
      friendList: [],
      url: URL_SOCKET,
      message: '',
      receiver: null,
      receiverImg: null,
      listMessage: [],
      historyMsg: [],
      privateChat: [],
      receivedMsg: null,
      image: null,
      name: '',
      phonenumber: '',
      bio: ''
    }
  },
  computed: {
    ...mapGetters({
      userDetail: 'user/userDetail'
    })
  },
  methods: {
    ...mapActions({
      actionGetDetail: 'user/getDetail',
      actionUpdate: 'user/update'
    }),
    onLogout () {
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('name')
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
    },
    updateProfile () {
      const name = this.name === null ? this.userDetail.data.name : this.name
      const image = this.image === null ? this.userDetail.data.image : this.image
      const phonenumber = this.phonenumber === null ? this.userDetail.data.phonenumber : this.phonenumber
      const bio = this.bio === null ? this.userDetail.data.bio : this.bio
      const fd = new FormData()
      fd.append('name', name)
      fd.append('image', image)
      fd.append('phonenumber', phonenumber)
      fd.append('bio', bio)
      this.actionUpdate(fd)
        .then((result) => {
          console.log(result)
          if (result === 'Image type must be JPG or JPEG') {
            Swal.fire({
              icon: 'error',
              title: 'Incorrect file type!',
              text: 'Image type must be JPG or JPEG'
            })
          } else if (result === 'Image size is too big! Please upload another one with size <5mb') {
            Swal.fire({
              icon: 'error',
              title: 'Image size is too big!',
              text: 'Please upload another one with size <5mb'
            })
          } else {
            Swal.fire({
              icon: 'success',
              title: 'Your profile is updated!',
              text: 'You have successfully updated your profile'
            })
          }
        })
        .catch((err) => {
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Something went wrong'
          })
        })
    }

  },
  mounted () {
    this.actionGetDetail(() => {
      // this.sender = this.userDetail.data.name
      // this.username = this.userDetail.data.username
      // console.log(this.sender)
      // console.log(this.username)
    })
    this.socket.emit('get-all-friends', { username: this.username })
    this.socket.on('friendList', (payload) => {
      this.friendList = payload
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
.container-fluid{
  margin-top: -60px;
}
.menu {
  background-color:  #7E98DF;
  color: #FAFAFA !important;
  border-radius: 35px 10px 35px 35px;
}
.dropdown-item:hover{
  color:  #7E98DF !important;
  background-color: #FAFAFA !important;
  border-radius: 35px 35x 35px 35px;
}
.chat-page {
  margin-left: -15px;
}
.friendlist {
  background-color: #fff;
  border: 1px solid #ddd;
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 10px;
  height: 650px;
  overflow: auto;
}
.receiver-info {
  padding: 5px;
  background-color: #fff;
}
.chat-room {
  border-bottom: 1px solid #ddd;
  background-color:#F6F6F6;
  height: 500px;
  overflow: auto;
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
.tele-text {
  color:  #7E98DF;
}

.chat-category:active, .chat-category:hover {
  background-color:  #7E98DF;
  color: #fff !important;
  border-radius: 15px;
}

.pointer {
  cursor: pointer;
}
.prof-pic {
  height: 60px;
  border-radius: 20px;
}
.msg-sent {
  background-color: #7E98DF;
  color: white;
  margin: 10px;
  margin-right: 10px;
  border-radius: 35px 35px 10px  35px;
  padding:20px;
  width:fit-content;
}
.msg-received {
  background-color: #FFFFFF;
  margin: 10px;
  margin-left:10px;
  border-radius: 35px 35px 35px 10px;
  padding:20px;
  width:fit-content
}
.empty-chat {
  background-color: #F6F6F6;
  padding:310px 0px;
}
</style>
