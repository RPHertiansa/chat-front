<template>
  <div class="text-center">
    <img class="logo" src="../assets/img/logocolor.png" alt=""> <br>
    <router-link to="/register"><button class="btn col-lg-4 mt-3 reg-btn">Register</button></router-link><br>
    <router-link to="/login"><button class="btn col-lg-4 mt-3 login-btn">Login</button></router-link>
  </div>
</template>

<style scoped>
.logo{
  margin-top: 100px;
}
.logo:hover{
  transform: rotate(20deg)
}
.reg-btn{
  border-radius: 50px;
  color: #7E98DF;
  padding: 15px;
  border: 2px solid #7E98DF;
}
.reg-btn:hover, .login-btn:hover {
  transform:scale(1.02);
}
.login-btn {
  background: #7E98DF;
  border-radius: 50px;
  color: #ffffff;
  padding: 15px;
}
</style>
