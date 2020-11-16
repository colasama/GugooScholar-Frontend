<template>
  <div class="re-header">
    <div @click="toIndex" class="top-logo" />

    <a-menu theme="dark" mode="horizontal" :style="{ lineHeight: '96px' }" class="header-menu">
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
    </a-menu>
  </div>
</template>

<style>
.top-logo {
  cursor: pointer;
  width: 135px;
  height: 40px;
  background: url("../assets/logo1.png");
  margin: 14px 48px 0px 48px;
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
  height: 94px;
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
    toRegister() {},
    toIndex() {
      this.$router.push({ path: "/" });
      location.reload();
    },
    exit() {
      this.$store.state.token = null;
      this.$store.state.username = "";
      this.$store.state.userid = "";
      this.$store.state.useravatar = "";
      window.sessionStorage.clear();
      this.$router.push({ path: "/welcome" });
    },
  },
};
</script>