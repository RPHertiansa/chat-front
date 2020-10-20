<template>
  <div>
    <b-sidebar id="add-friend" shadow>
      <div class="px-3 py-2">
        <h3 class="tele-text">Add Friend</h3>
        <form @submit.prevent="addFriend">
          <div class="form">
            <input type="text" class="form-control" v-model="friends" placeholder="insert username"/>
          </div>
        </form>
      </div>
    </b-sidebar>
  </div>
</template>

<script>

import Swal from 'sweetalert2'
import { mapActions } from 'vuex'

export default {
  name: 'AddFriend',
  data () {
    return {
      friends: '',
      username: localStorage.getItem('username')
    }
  },
  methods: {
    ...mapActions({
      actionAddFriends: 'user/addFriends'
    }),
    addFriend () {
      const data = {
        users: this.username,
        friend: this.friends
      }
      this.actionAddFriends(data)
        .then((result) => {
          if (result === 'Error: Cannot add or update a child row: a foreign key constraint fails (`telegram`.`friends`, CONSTRAINT `friends_ibfk_2` FOREIGN KEY (`friend`) REFERENCES `users` (`username`))') {
            Swal.fire({
              icon: 'warning',
              title: 'Username does not exist',
              text: 'Please check the username again!'
            })
          } else if (result === 'Friend is added') {
            Swal.fire({
              icon: 'success',
              title: 'Add Friend Success!',
              text: `${this.friends} is added to your friends list`
            })
            window.location = '/home'
          } else {
            Swal.fire({
              icon: 'Error',
              title: 'Something Wrong'
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

<style scoped>

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
</style>
