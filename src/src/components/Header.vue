<template>
  <div class="re-header">
    <div @click="toIndex" class="top-logo" />

    <a-menu style="background-color:rgb(43, 46, 59)" mode="horizontal" :style="{ lineHeight: '80px' }" class="header-menu" :default-selected-keys="['1']" :open-keys.sync="openKeys">
      <a-menu-item key="1" @click="toRankList">排名榜</a-menu-item>
      <a-menu-item key="2" @click="toSubscribe">订阅</a-menu-item>

      <a-button
        type="ghost"
        @click="toRegister"
        style="margin-left:10px"
        v-if="$store.state.token==null"
      >注册</a-button>
      <a-button
        type="ghost"
        @click="toLogin"
        style="margin-left:15px;margin-right:48px"
        v-if="$store.state.token==null"
      >登录</a-button>
      <a-button type="link" @click="toUserindex" style="margin-right:12px;" v-if="$store.state.token!=null">
          <a-avatar
            :size="32"
            inline
            style="margin-right:6px"
            v-if="$store.state.useravatar==null||$store.state.useravatar=='null'"
            :username="`${$store.state.username}`"
          ></a-avatar>
          <a-avatar
            v-else
            :src="$store.state.useravatar"
            style="margin-right:6px"
          />
          {{$store.state.username}}
          <a-icon type="down" />
        </a-button>
    </a-menu>
  </div>
</template>

<style>
.top-logo {
  cursor: pointer;
  width: 200px;
  height: 46px;
  background: url("../assets/logo.png");
  margin: 16px 48px 0px 48px;
  float: left;
}

.search {
  cursor: pointer;
  height: 40px;
  margin: 0px 0px 0px calc(50vw - 300px);
  float: left;
}

.re-header {
  background: rgb(43, 46, 59);
  height: 80px;
  text-align: center;
}

.header-menu {
  text-align: right;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>



<script>
export default {
  components: {
  },
  data() {
    return {
      showLogin: true,
    };
  },
  created: function () {},
  computed: {},
  watch: {},
  methods: {
    toRegister() {
      this.$router.push({ path: "/register"});
    },
    toLogin() {
      this.$router.push({ path: "/login"});
    },
    toIndex() {
      this.$router.push({ path: "/" });
      //location.reload();//话说为啥加这行来着，如果不注释掉会回到原页面？
    },
    toSubscribe() {
      this.$router.push({ path: "/subscribe" });
    },
    toRankList() {
      this.$router.push({ path: "/rankList"});
    },
    exit() {
      this.$store.state.token = null;
      this.$store.state.username = "";
      this.$store.state.userid = "";
      this.$store.state.useravatar = "";
      window.sessionStorage.clear();
      this.$router.push({ path: "/" });
    },
  },
};
</script>