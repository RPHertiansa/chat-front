<template>
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
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Settings',
  methods: {
    ...mapActions({
      actionLogout: 'user/onLogout'
    }),
    onLogout () {
      this.actionLogout()
      window.location = '/login'
    }
  }
}
</script>

<style scoped>

.tele-text {
  color:  #7E98DF;
}
.pointer {
  cursor: pointer;
}
</style>
