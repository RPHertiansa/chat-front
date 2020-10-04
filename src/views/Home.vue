<template>
  <div class="home">
    <div class="card">
      <div class="card-header">
        <h1>Chatroom</h1>
        <h2>Welcome {{username}}</h2>
      </div>
      <div class="card-body">
        <div class="chat-room">
          <div v-if="notificationActive" class="alert alert-box alert-dismissible fade show" role="alert">
            {{notification}}
            <button @click="closeNotification" type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div  class="chat-bubble" v-for="(item, index) in chatList" :key="index">
            {{item}}
          </div>
        </div>
      </div>
      <div class="card-footer">
        <form @submit.prevent="sendMessage()">
          <div class="input-group">
          <input v-model="message" type="text" class="form-control" placeholder="Type your message" aria-describedby="button-addon2">
          <div class="input-group-append">
              <button class="btn send-btn" type="button" id="button-addon2">Send</button>
          </div>
        </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'

export default {
  name: 'Home',
  data () {
    return {
      username: this.$route.query.username,
      message: '',
      socket: io('http://localhost:3005/'),
      chatList: [],
      notificationActive: false,
      notification: ''
    }
  },
  methods: {
    sendMessage () {
      this.socket.emit('sendMessage', {
        username: this.username,
        message: this.message
      })
      this.message = ''
    },
    closeNotification () {
      this.notificationActive = false
    }
  },
  mounted () {
    this.socket.on('receiveMessage', (msg) => {
      this.chatList = [...this.chatList, msg]
    })
    this.socket.on('get-notified', (notif) => {
      this.notificationActive = true
      this.notification = notif
    })
  }
}
</script>

<style>
.chat-room{
  min-height: 50vh;
}
.send-btn{
  background-color: #7E98DF;
  color: #FAFAFA;
}
.alert-box{
  color: #7E98DF;
  background-color: #FAFAFA;
  border: 1px solid #7E98DF;
}
.chat-bubble{
  background-color: #7E98DF;
  color: #FAFAFA
}
</style>
