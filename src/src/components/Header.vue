<template>
  <div class="re-header">
    <div @click="toIndex" class="top-logo" style="margin-left:16%" />

    <a-menu style="background-color:rgb(43, 46, 59)" mode="horizontal" v-model="current" :style="{ lineHeight: '80px' }" class="header-menu" :default-selected-keys="['1']" :open-keys.sync="openKeys">
      <a-menu-item key="indexTab" @click="toIndex">主页</a-menu-item>
      <a-menu-item key="rankTab" @click="toRankList">排行榜</a-menu-item>
      <a-menu-item key="fieldTab" @click="toField">领域</a-menu-item>
      <a-menu-item key="subscribeTab" @click="toSubscribe">订阅</a-menu-item>
      <a-button
        type="ghost"
        @click="toRegister"
        style="margin-left:10px"
        v-if="$store.state.token==null"
      >注册</a-button>
      <a-button
        type="ghost"
        @click="toLogin"
        style="margin-left:15px;margin-right:16%"
        v-if="$store.state.token==null"
      >登录</a-button>

      <a-dropdown v-if="$store.state.token!=null">
      <a-menu style="margin-top:4px" slot="overlay">
          <a-menu-item key="1" @click="toUserIndex">账户信息</a-menu-item>
          <a-menu-item key="2" @click="toAdmin">系统管理</a-menu-item>
          <a-menu-item key="3" @click="exit">退出</a-menu-item>
        </a-menu>
      <a-button type="link" @click="toUserIndex" style="margin-right:16%;color:#9feaf9" v-if="$store.state.token!=null">
          <a-avatar
            :size="32"
            inline
            style="margin-right:6px"
            :style="{ backgroundColor: '#9feaf9', verticalAlign: 'middle' }"
            v-if="$store.state.useravatar==null||$store.state.useravatar=='null'"
          >{{$store.state.username[0].toUpperCase()}}</a-avatar>
          <a-avatar
            v-else
            :src="$store.state.useravatar"
            style="margin-right:6px"
          />
          {{$store.state.username}}
          <a-icon type="down" />
        </a-button>
        </a-dropdown>
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
  background: #2c2e3b;
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
//import Vue from 'vue';

const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
export default {
  components: {
  },
  data() {
    return {
      showLogin: true,
      color: colorList[0],
      current: ['indexTab'],
    };
  },
  created: function () {

  },
  computed: {},
  watch: {},
  methods: {
    toRegister() {
      this.$router.push({ path: "/register"});
    },
    toUserIndex() {
      this.$router.push({ path: "/admin/user"});
    },
    toAdmin() {
      this.$router.push({ path: "/admin/admin"});
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
    toField(){
      this.$router.push({ path: "/fieldlist"})
    },
    toRankList() {
      this.$router.push({ path: "/ranklist"});
    },
    exit() {
      this.$store.state.token = null;
      this.$store.state.username = "";
      this.$store.state.useravatar = null;
      this.$store.state.email = "";
      this.$store.state.location = "";
      this.$store.state.introduction = "";
      this.$store.state.name = "";
      window.sessionStorage.clear();
      this.$router.push({ path: "/" });
    },
  },
};
</script>