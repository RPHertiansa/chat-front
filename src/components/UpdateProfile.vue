<template>
  <div>
    <b-modal id="update-prof" title="Edit Profile" hide-footer>
      <form @submit.prevent="updateProfile">
        <div>
          <div class="form">
            <input class="form form-control" type="text" placeholder="Phone number" v-model="phonenumber"/>
          </div>
          <div class="form">
            <input class="form form-control" type="text" placeholder="Bio" v-model="bio"/>
          </div>
          <input type="file" @change="processFile($event)" class="form-control-file form" id="exampleFormControlFile1" placeholder="Upload profile picture"/>
          <div class="form">
          </div>
        </div>
        <div class="text-right">
          <b-button type="button" class="tele-btn-cancel" @click="$bvModal.hide('update-prof')">Close</b-button>
          <b-button type="submit" class="ml-3 tele-btn">Submit</b-button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import { mapActions } from 'vuex'

export default {
  name: 'UpdateProfile',
  data () {
    return {
      image: null,
      name: '',
      phonenumber: '',
      bio: '',
      friends: ''
    }
  },
  methods: {
    processFile (event) {
      this.image = event.target.files[0]
    },
    ...mapActions({
      actionUpdate: 'user/update'
    }),
    updateProfile () {
      const image = this.image === null ? this.userDetail.data.image : this.image
      const phonenumber = this.phonenumber === null ? this.userDetail.data.phonenumber : this.phonenumber
      const bio = this.bio === null ? this.userDetail.data.bio : this.bio
      const fd = new FormData()
      fd.append('image', image)
      fd.append('phonenumber', phonenumber)
      fd.append('bio', bio)
      this.actionUpdate(fd)
        .then((result) => {
          console.log(result)
          if (result === 'Image size is too big! Please upload another one with size <5mb') {
            Swal.fire({
              icon: 'error',
              title: 'Image size is too big!',
              text: 'Please upload another one with size <5mb'
            })
          } else if (result === 'Image type must be JPG or JPEG') {
            Swal.fire({
              icon: 'error',
              title: 'Incorrect file type!',
              text: 'Image type must be JPG or JPEG'
            })
          } else {
            Swal.fire({
              icon: 'success',
              title: 'Your profile is updated!',
              text: 'You have successfully updated your profile'
            })
            window.location = '/home'
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
.prof-pic {
  height: 60px;
  border-radius: 20px;
}
</style>
