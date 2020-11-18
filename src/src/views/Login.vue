<template>
  <div class="welcome">
    <vue-particles
        color="#000"
        :particleOpacity="0.1"
        :particlesNumber="40"
        shapeType="circle"
        :particleSize="6"
        linesColor="#000"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.1"
        :linesDistance="180"
        :moveSpeed="2"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
        class="lizi"
        style="z-index:-10"
      >
      </vue-particles>
    <a-row>
      <a-col :span="12">
        <a-card style="width:400px;margin:220px auto;text-align:center">
          <h1 style="margin-top:20px;margin-left:5px;font-size:38px;float:left">
            <b>登录账户</b>
          </h1>
          <a-input
            size="large"
            placeholder="邮箱"
            ref="usernameInput"
            v-model="email"
            style="margin-top:20px"
          >
            <a-icon slot="prefix" type="user" />
          </a-input>
          <a-input-password
            size="large"
            placeholder="密码"
            ref="passwordInput"
            v-model="password"
            style="margin-top:30px"
          >
            <a-icon slot="prefix" type="info-circle" />
          </a-input-password>
          <div v-if="errorLogin" style="color:red">用户名或密码错误！</div>
          <a-row type="flex" justify="center" style="margin-top:50px;margin-bottom:30px">
            <a-col :span="11" style="margin-right:20px">
              <a-button size="large" type="primary" block @click="toRegister">注册</a-button>
            </a-col>
            <a-col :span="11">
              <a-button size="large" type="primary" block @click="checkLogin">登录</a-button>
            </a-col>
          </a-row>
          <a-avatar style="opacity:0.8" src="https://i.loli.net/2020/08/10/Q1G3yKVZDa8In7q.png" />
          <div style="text-align:center" />
        </a-card>
      </a-col>
      <a-col :span="12"></a-col>
    </a-row>
  </div>
</template>

<style>
.welcome {
  background: url("../assets/cover.png");
}

.logo {
  width: 40px;
  height: 40px;
  float: center;
  background: url("../assets/logo1.png");
}

#particles-js{
  width: 100%;
  height: calc(100% - 100px);
  position: absolute;    
}
</style>

<script>
// @ is an alias to /src
import firebase from "firebase";

var config = {
    apiKey: "AIzaSyCd3aIBhwTRZwYa2JzNWhou2-Mg-kAwv6A",
    authDomain: "googoscholar-294912.firebaseapp.com",
};
firebase.initializeApp(config);



export default {
  name: "Login",
  components: {},
  data() {
    return {
      email: "",
      password: "",
      token: "",
      count: "",
      errorLogin: false,
    };
  },
  
  methods: {
    toRegister() {
      this.$router.push({ path: "/register" });
    },
    checkLogin() {
      var that = this;
      firebase.auth().signInWithEmailAndPassword(this.email,this.password).catch(function(error) {
        that.setError();
        var errorMessage = error.message;
        console.log(errorMessage)
        //var errorMessage = error.message;
      })
    },
    setError(){
      this.errorLogin = true;
    }
    
  },
  created() {
    this.$store.state.showNav = false;
  },
  destroyed() {
    this.$store.state.showNav = true;
  },
};
</script>