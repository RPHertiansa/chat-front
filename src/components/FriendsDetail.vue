<template>
  <div>
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'FriendsDetail',
  data () {
    return {
      receiverId: ''
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
    friendsDetail () {
      this.receiverId = localStorage.getItem('receiverId')
      const friendId = this.receiverId
      this.actionFriendsDetail(friendId)
    }
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
