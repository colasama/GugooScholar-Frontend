<template>
  <div id="app" style="display:flex;flex-direction:column;">
    <AppHeader v-if="$store.state.showNav" style="min-width:100%"></AppHeader>
    <!--transition name="fade" mode="out-in"-->
      <router-view style="text-align: center;flex:1;min-width:100%" :key="$route.path" v-if="isRouterActive"/>

    <!--a-layout-footer>Footer</！a-layout-footer-->
    <!--/transition-->
  </div>
</template>

<style>
html,body,#app{
  height: 100%;
  min-height: 100%;
  width: 100%;
  margin: 0;
}
</style>

<script>
import AppHeader from './components/Header.vue';
export default {
  provide(){
    return{
      reload: this.reload
    }
  },
  components:{
    AppHeader,
  },
  data() {
    return {
      isRouterActive: true
    }
  },
  created: function(){
    document.title = this.$route.meta.title || this.$route.meta.pathName
  },
  watch:{
    $route(){
      document.title = this.$route.meta.title || this.$route.meta.pathName
    }
  },
  methods: {
    reload(){
      this.isRouterActive = false;
      this.$nextTick(function () {
        this.isRouterActive = true;
      })
    }
  }
};
</script>
