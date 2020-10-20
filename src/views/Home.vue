<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-3 col-md-3 friendlist d-none d-md-block">
        <div class="container">
        <HeadMenu/>
        <hr>
          <div class="list-contact" v-for="(item, index) in friendList" :key="index">
            <div class="pointer form-inline" @click="selectUser(item.name, item.image, item.iduser)">
              <img :src="`${url}${item.image}`" alt="photo" class="pl-2 prof-pic">
                <div class="info ml-2 pt-2">
                  <b>{{item.name}}</b>
                </div>
            </div>
            <hr>
          </div>
        </div>
      </div>
      <b-sidebar id="sidebar">
        <div class="p-4">
          <MyProfile/>
          <Settings/>
        </div>
      </b-sidebar>
      <UpdateProfile/>
      <AddFriend/>
      <b-sidebar id="friend-prof" right shadow>
        <div class="p-4">
          <div class="text-center">
            <h4 class="tele-text mt-0 mb-3">{{friendDetail.data.username}}</h4>
            <img class="prof-pic" :src="`${url}${friendDetail.data.image}`" alt="">
            <div>
              <h4 class="mb-0">{{friendDetail.data.name}}</h4>
            </div>
            <div>
              <p class="text-muted mt-0">@{{friendDetail.data.username}}</p>
            </div>
          </div>
          <div class="text-left">
            <h4 class="font-weight-bold">Account</h4>
            <div>
              <p class="text-muted mb-0">Phone number</p>
              <p>{{friendDetail.data.phonenumber}}</p>
            </div>
            <div>
              <p class="text-muted mb-0">Bio</p>
              <p>{{friendDetail.data.bio}}</p>
            </div>
          </div>
        </div>
    </b-sidebar>
      <div class="col-lg-9 col-md-9 d-none d-md-block">
        <div>
          <div v-if="receiver === null">
            <p class="text-muted text-center empty-chat">Please select a user to start chatting</p>
          </div>
          <div v-else >
            <div class="receiver-info form-inline" >
              <img :src="`${url}${receiverImg}`" alt="photo" class="m-2 prof-pic" @click="friendsDetail()" v-b-toggle.friend-prof >
              <div class="info ml-3">
                <b>{{receiver}}</b>
              </div>
            </div>
            <div  class="chat-room">
              <div  v-for="(item, index) in historyMsg" :key="`a`+index">
                <div  v-if="item.sender === sender">
                  <div class="msg-sent text-right ml-auto col-8 text-break">
                    {{item.message}}
                  </div>
                </div>
                <div v-else class="msg-received text-left col-8 text-break">
                    {{item.message}}
                </div>
              </div>
              <div  v-for="(item, index) in privateChat" :key="index">
                <div  v-if="item.sender === sender">
                  <div class="msg-sent text-right ml-auto col-8 text-break">
                    {{item.message}}
                  </div>
                </div>
                <div v-else class="msg-received text-left col-8 text-break">
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
      <div> <!-- responsif -->
        <div class="container friendlist d-sm-none d-block">
        <HeadMenu/>

        <hr>
          <div  class="list-contact" v-for="(item, index) in friendList" :key="index">
            <div class="form-inline">
              <img :src="`${url}${item.image}`" alt="photo" class="pl-2 prof-pic" @click="friendsDetail()" v-b-toggle.friend-prof>
                <div class="pointer info ml-2 pt-2" v-b-modal.mobile-chat  @click="selectUser(item.name, item.image, item.iduser)">
                  <b>{{item.name}}</b>
                </div>
            </div>
            <hr>
          </div>
        </div>
        <b-modal id="mobile-chat" centered hide-footer>
          <div class="receiver-info form-inline">
              <img :src="`${url}${receiverImg}`" alt="photo" class="m-2 prof-pic" >
              <div class="info ml-3">
                <b>{{receiver}}</b>
              </div>
            </div>
            <div  class="chat-room">
              <div  v-for="(item, index) in historyMsg" :key="`a`+index">
                <div  v-if="item.sender === sender">
                  <div class="msg-sent text-right ml-auto col-8 text-break">
                    {{item.message}}
                  </div>
                </div>
                <div v-else class="msg-received text-left col-8 text-break">
                    {{item.message}}
                </div>
              </div>
              <div  v-for="(item, index) in privateChat" :key="index">
                <div  v-if="item.sender === sender">
                  <div class="msg-sent text-right ml-auto col-8 text-break">
                    {{item.message}}
                  </div>
                </div>
                <div v-else class="msg-received text-left col-8 text-break">
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
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { URL_SOCKET } from '../helpers/env'
import { mapActions, mapGetters } from 'vuex'
import UpdateProfile from '../components/UpdateProfile'
import AddFriend from '../components/AddFriend'
import Settings from '../components/Settings'
import MyProfile from '../components/MyProfile'
import HeadMenu from '../components/HeadMenu'

export default {
  name: 'Home',
  components: {
    UpdateProfile,
    AddFriend,
    Settings,
    MyProfile,
    HeadMenu
  },
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
      receiverId: null,
      listMessage: [],
      historyMsg: [],
      privateChat: [],
      receivedMsg: null
    }
  },
  computed: {
    ...mapGetters({
      friendDetail: 'user/friendDetail'
    })
  },
  methods: {
    ...mapActions({
      actionFriendsDetail: 'user/getFriendsDetail'
    }),
    async selectUser (user, image, id) {
      this.receiver = user
      this.receiverImg = image
      this.receiverId = id
      this.setPrivateChat()
      await this.socket.emit('get-history', {
        sender: this.sender,
        receiver: this.receiver
      })
      this.getHistoryMessage()
    },
    friendsDetail () {
      const friendId = this.receiverId
      this.actionFriendsDetail(friendId)
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
.chat-page {
  margin-left: -15px;
}
.friendlist {
  background-color: #fff;
  border: 1px solid #ddd;
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 10px;
  height: 720px;
  overflow: auto;
}
.receiver-info {
  padding: 5px;
  background-color: #fff;
}
.chat-room {
  border-bottom: 1px solid #ddd;
  background-color:#F6F6F6;
  height: 570px;
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
.tele-text {
  color:  #7E98DF;
}
.tele-btn {
  background: #7E98DF !important;
  color: #ffffff !important;
}
.tele-btn-cancel {
  background: #f3efef !important;
  color: #7E98DF !important;
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
  border-radius: 35px 35px 10px  35px;
  padding:20px;
  width:fit-content;
}
.msg-received {
  background-color: #FFFFFF;
  margin: 10px;
  border-radius: 35px 35px 35px 10px;
  padding:20px;
  width:fit-content
}
.empty-chat {
  background-color: #F6F6F6;
  padding:350px 0px;
}
</style>
