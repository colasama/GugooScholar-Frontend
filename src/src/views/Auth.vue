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
        
        <a-card v-if="isActivate" style="width:60%;min-width:400px;margin:240px auto;">
          <div>
            <a-result
              status="success"
              title="你的邮箱已经成功激活!"
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

        <a-card v-if="!isActivate" style="width:60%;min-width:400px;margin:240px auto;">
          <div>
            <a-result
              status="error"
              title="激活失败!"
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
        isActivate:true,
    };
  },
  methods: {
    toLogin() {
      this.$router.push({ path: "/login" });
    },
  },
    /*created() {
      var that = this;
      this.$store.state.showNav = false;
      console.log("Page created.");
      Vue.axios({
        method: "post",
        url: "https://gugooscholar-k5yn3ahzxq-df.a.run.app/user/activate",
        data: {
            authkey: this.$route.query.authkey,
        },
      }).then(function (response) {
          console.log(response);
          that.isActivate = true;
      });
    },*/
    mounted(){
      var that = this;
      this.$store.state.showNav = false;
      console.log("Page mounted.");
      console.log(this.$route.query.authkey);
      Vue.axios({
        method: "post",
        url: "https://gugooscholar-k5yn3ahzxq-df.a.run.app/user/activate",
        data: {
            authkey: this.$route.query.authkey,
        },
      }).then(function (response) {
          console.log(response);
          that.isActivate = true;
      }).catch((e)=>{
          that.isActivate = false;
          console.log(e);
      });
    },
    destroyed() {
      this.$store.state.showNav = true;
    }
  }
</script>
