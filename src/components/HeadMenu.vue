<template>
  <div>
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
  </div>
</template>

<style scoped>
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
.form button {
  border: none;
  outline: none;
  background-color: transparent;
}

</style>
