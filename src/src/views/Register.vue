
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
    ></vue-particles>
    <a-row>
      <a-col :span="6"></a-col>
      <a-col :span="12">
        <a-card style="width:400px;margin:100px auto;text-align:center" v-if="!isregister">
          <h1 style="margin-top:20px;margin-left:5px;font-size:38px;float:left">
            <b>注册账户</b>
          </h1>
          <a-input size="large" placeholder="用户名" v-model="username" style="margin-top:30px">
            <a-icon slot="prefix" type="user" />
          </a-input>
          <a-input size="large" placeholder="邮箱地址" v-model="email" style="margin-top:20px">
            <a-icon slot="prefix" type="mail" />
          </a-input>
          <a-input-password
            size="large"
            placeholder="密码"
            v-model="password"
            style="margin-top:30px"
          >
            <a-icon slot="prefix" type="info-circle" />
          </a-input-password>
          <a-input-password
            size="large"
            placeholder="重复密码"
            v-model="repassword"
            style="margin-top:30px;margin-bottom:15px"
          >
            <a-icon slot="prefix" type="info-circle" />
          </a-input-password>
          <!--a-input size="large" placeholder="手机号" v-model="phone" style="margin-top:30px">
            <a-icon slot="prefix" type="phone" />
          </a-input>
          <a-input-search
            style="margin-top:30px;margin-bottom:15px"
            placeholder="邮箱验证码"
            size="large"
            @search="sendMail"
            v-model="authcode"
          >
            <a-button v-if="count==0" slot="enterButton">获取验证码</a-button>
            <a-button v-else disabled slot="enterButton">{{count}}秒后重试</a-button>
          </a-input-search -->
          <div v-if="errorLogin" style="color:red">用户名或密码错误！</div>
          <a href="#/login" >已有账号？点击这里登录</a>
          <a-button
            size="large"
            type="primary"
            style="margin-top:15px;margin-bottom:30px"
            block
            @click="register"
            :loading="regLoading"
          >注册</a-button>
          <div style="text-align:center" />
        </a-card>
        
        <a-card v-if="isregister" style="width:60%;min-width:400px;margin:240px auto;">

          <div v-if="!mailsended">
            
            <div style="text-align:left"><h1 style="margin-top:20px;margin-left:5px;font-size:38px">
                <b>还差最后一步...</b>
            </h1></div>
            <div style="text-align:left;margin-left:6px" v-if="mailsended">验证码已经发送到您的邮箱，请查收！</div>
            
            <div style="text-align:right"><a-button
              size="large"
              type="primary"
              @click="sendMail"
              style="margin-top:24px;width:128px"
              :loading = "mailsendLoading"
            >发送验证码</a-button></div>
          </div>

          <!--div v-if="mailsended">
            <a-input
              style="margin-top:30px;margin-bottom:15px"
              placeholder="验证码"
              size="large"
              v-model="authcode"
            />
            
            <div style="text-align:right;margin-top:12px">
              <a-button v-if="count==0" style="width:144px;margin-right:10px" size="large" @click="sendMail">重新发送验证码</a-button>
              <a-button v-else style="width:144px;margin-right:10px" size="large" disabled>{{count}}秒后重试</a-button>
              <a-button
                size="large"
                type="primary"
                @click="applyCode"
                style="width:96px"
              >确 认</a-button>
            </div-->
          <div v-if="mailsended">
            <a-result
              status="success"
              title="一封激活邮件已发送!"
              sub-title="请您查看邮箱，根据邮件中的步骤进行最后的账户激活过程。"
            >
              <template #extra>
                <a-button key="buy" @click="toIndex">
                  返回主页
                </a-button>
              </template>
            </a-result>
          </div>
        </a-card>
      </a-col>
      <a-col :span="6"></a-col>
    </a-row>
  </div>
</template>
<style scoped>
.logo {
  width: 40px;
  height: 40px;
  float: center;
  background: url("../assets/logo1.png");
}

.welcome_archived {
  background: url("../assets/cover.png");
}

#particles-js {
  width: 100%;
  height: calc(100% - 100px);
  position: absolute;
}
</style>

<script>
// @ is an alias to /src
import Vue from "vue";

export default {
  name: "Register",
  components: {},
  data() {
    return {
      username: "",
      email: "",
      password: "",
      repassword: "",
      token: "",
      authcode: "",
      timer: null,
      count: 0,
      isregister: false,
      errorLogin: false,
      mailsended: false,
      regLoading: false,
      mailsendLoading: false,
    };
  },
  methods: {
    toIndex() {
      this.$router.push({ path: "/" });
    },
    register() {
      this.regLoading = true;
      var that = this;
      var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      var errorTip = "";
      if (this.username == "") errorTip = "请输入您的用户名";
      else if (this.password == "" || this.repassword == "")
        errorTip = "请输入您的密码";
      else if (this.email == "") errorTip = "请输入您的邮箱";
      else if (!regEmail.test(this.email)) errorTip = "请输入正确的邮箱";
      else if (this.password != this.repassword)
        errorTip = "两次输入的密码不同";
      if (errorTip != "") {
        this.regLoading = false;
        this.$message.error(errorTip);
        return;
      }
      Vue.axios({
        method: "post",
        url: "https://gugooscholar-k5yn3ahzxq-df.a.run.app/user/register",
        data: {
          username: this.username,
          password: this.password,
          email: this.email,
        },
      }).then(function (response) {
        that.regLoading = false;
        console.log(response.data);
        if (response.data.success == true) {
          that.isregister = true;
          that.mailsended = true;
          Vue.axios({
            method: "post",
            url: "https://gugooscholar-k5yn3ahzxq-df.a.run.app/user/sendmail",
            data: {
              username: that.username,
              email: that.email,
              url: "https://gugoo.fewings.xyz/#/auth",
            },
          }).then(function (response) {
            that.regLoading = false;
            console.log(response.data);
            if (response.data.success == true) {
              that.isregister = true;
              that.mailsended = true;
              
              /*that.$message
                .success("注册成功，即将跳转登录页面")
                .then(() => that.$router.push({ path: "/login" }));
                */
            } else {
              that.$message.error(response.data.message);
            }
          });
          /*that.$message
            .success("注册成功，即将跳转登录页面")
            .then(() => that.$router.push({ path: "/login" }));
            */
        } else {
          that.$message.error(response.data.message);
        }
      });
    },
    sendMail() {
    },
    created() {
      this.$store.state.showNav = false;
    },
    mounted(){
      this.$store.state.showNav = false;
    },
    destroyed() {
      this.$store.state.showNav = true;
    }
  }
}
</script>
