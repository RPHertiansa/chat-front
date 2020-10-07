<template>
  <div class="text-center">
    <img class="logo" src="../assets/img/logocolor.png" alt=""> <br>
    <router-link to="/register"><button class="btn reg-btn">Register</button></router-link>
    <router-link to="/login"><button class="btn login-btn">Login</button></router-link>
  </div>
</template>

<style scoped>
.logo{
  margin-top: 250px;
}
.reg-btn{
  background-color: #FAFAFA;
  color:  #7E98DF;
  border: 1px solid  #7E98DF;
}
.login-btn{
  background-color:  #7E98DF;
  color: #FAFAFA;
}
</style>
