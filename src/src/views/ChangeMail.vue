
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
            <b>修改邮箱</b>
          </h1>
          <a-input size="large" placeholder="新邮箱地址" v-model="email" style="margin-top:20px">
            <a-icon slot="prefix" type="mail" />
          </a-input>
          <a-button
            size="large"
            type="primary"
            style="margin-top:15px;margin-bottom:30px"
            block
            @click="register"
            :loading="regLoading"
          >修改</a-button>
          <div style="text-align:center" />
        </a-card>
      </a-col>
      </a-row>
      <a-row>
      <a-col :span="6"></a-col>
      <a-col :span="12">
        
        <a-card v-if="isregister&&isActive" style="width:60%;min-width:400px;margin:120px auto;">
          <div>
            <a-result
              status="success"
              title="你的邮箱已经成功修改!"
              sub-title="请尽情享受咕鸽学术带给您的便捷吧！"
            >
              <template #extra>
                <a-button key="buy" @click="toLogin">
                  登录
                </a-button>
              </template>
            </a-result>
          </div>
        </a-card>

        <a-card v-if="isregister&&!isActive" style="width:60%;min-width:400px;margin:120px auto;">
          <div>
            <a-result
              status="error"
              title="修改失败!"
              sub-title="请检查是否是链接过期了或者是已经激活过了？试一下重新发送二维码？"
            >
              <template #extra>
                <a-button key="buy" @click="toLogin">
                  登录
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
      email: "",
      token: "",
      authcode: "",
      timer: null,
      count: 0,
      isregister: false,
      errorLogin: false,
      regLoading: false,
      mailsendLoading: false,
      isActive: true,
    };
  },
  methods: {
    toIndex() {
      this.$router.push({ path: "/" });
    },
    register() {
      console.log(this.email);
      this.regLoading = true;
      var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      var errorTip = "";
      if (this.email == "") errorTip = "请输入您的邮箱";
      else if (!regEmail.test(this.email)) errorTip = "请输入正确的邮箱";
      else if (this.password != this.repassword)
        errorTip = "两次输入的密码不同";
      if (errorTip != "") {
        this.$message.error(errorTip);
        this.regLoading = false;
        return;
      }

      
      Vue.axios({
        method: "post",
        url: "https://gugooscholar-k5yn3ahzxq-df.a.run.app/user/changemail",
        data: {
          email: this.email,
          authkey: this.$route.query.authkey,
        },
      }).then((res) => {
        console.log(res);
        this.isActive = true;
        this.regLoading = false;
        this.isregister = true;
      }).catch((res) => {
        console.log(res);
        this.isActive = false;
        this.regLoading = false;
        this.isregister = true;
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
