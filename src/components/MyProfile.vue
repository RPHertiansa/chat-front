<template>
  <div>
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
      <h4 class="font-weight-bold">Account <b-icon-pencil v-b-modal.update-prof class="tele-text text-right"></b-icon-pencil></h4>
      <div>
        <p class="text-muted mb-0">Phone number</p>
        <p>{{userDetail.data.phonenumber}}</p>
      </div>
      <div>
        <p class="text-muted mb-0">Bio</p>
        <p>{{userDetail.data.bio}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import { URL_SOCKET } from '../helpers/env'

export default {
  name: 'MyProfile',
  data () {
    return {
      url: URL_SOCKET
    }
  },
  computed: {
    ...mapGetters({
      userDetail: 'user/userDetail'
    })
  },
  methods: {
    ...mapActions({
      actionGetDetail: 'user/getDetail'
    })
  },
  mounted () {
    this.actionGetDetail()
  }
}
</script>

<style scoped>
.prof-pic {
  height: 60px;
  border-radius: 20px;
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
