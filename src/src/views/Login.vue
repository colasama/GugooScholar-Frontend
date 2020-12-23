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
      <a-col :span="6"></a-col>
      <a-col :span="12">
        <a-card style="width:400px;margin:220px auto;text-align:center">
          <h1 style="margin-top:20px;margin-left:5px;font-size:38px;float:left">
            <b>登录账户</b>
          </h1>
          <a-input
            size="large"
            placeholder="用户名"
            ref="usernameInput"
            v-model="username"
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
          <div style="text-align:center" />
        </a-card>
      </a-col>
      <a-col :span="6"></a-col>
    </a-row>
  </div>
</template>

<style scoped>
.welcome_archived {
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
import Vue from "vue";

export default {
  name: "Login",
  components: {},
  data() {
    return {
      username: "",
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
      Vue.axios({
        method: "post",
        url: "https://gugooscholar-k5yn3ahzxq-df.a.run.app/user/login",
        data: {
          username: this.username,
          password: this.password,
        },
      }).then(function (response) {
        if (response.data.[0].success == true) {
          that.$store.state.token = response.data.[0].data.token;
          var userinfo_url = "https://gugooscholar-k5yn3ahzxq-df.a.run.app/user/"+that.username+"/info";
          console.log(userinfo_url)
          Vue.axios({
            method: "get",
            url: userinfo_url,
            headers: {
              token: that.$store.state.token,
            },
          })
            .then((response) => {
              console.log(response.data)
              that.$store.state.username = response.data.data.username;
              that.$store.state.email = response.data.data.email;
              that.$store.state.name = response.data.data.name;
              that.$store.state.introduction = response.data.data.introduction;
              that.$store.state.location = response.data.data.location;
              that.$store.state.activate = response.data.data.activate;
              window.sessionStorage.setItem('token',that.$store.state.token)
              window.sessionStorage.setItem('name',that.$store.state.name)
              window.sessionStorage.setItem('username',that.$store.state.username)
              window.sessionStorage.setItem('email',that.$store.state.email)
              window.sessionStorage.setItem('introduction',that.$store.state.introduction)
              window.sessionStorage.setItem('location',that.$store.state.location)
              window.sessionStorage.setItem('activate',that.$store.state.activate)
            })
            .catch(function (response) {
              console.log(response);
            });
          that.$message.success("登录成功，即将跳转主页", 1.5).then(() => {
            that.$router.push({ path: "/" });
            that.$store.state.showNav = true;
          });
        } else {
          that.$message.error(response.data.message);
        }
      })
      .catch(function (response) {
        that.$message.error("用户名或者密码错误！");
        console.log(response);
      });
      
    },
    setError(){
      this.errorLogin = true;
    }
    
  },
  created() {
    this.$store.state.showNav = false;
  },
  mounted(){
    this.$store.state.showNav = false;
  },
  destroyed() {
    this.$store.state.showNav = true;
  },
};
</script>