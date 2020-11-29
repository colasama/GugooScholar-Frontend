import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
//import store from '../store/index.js'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    meta:{title:'咕鸽学术 - 学术成果分享平台'},
    component:() => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: '404',
    meta: {title:'登录 - 咕鸽学术'},
    component:() => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: '404',
    meta: {title:'注册 - 咕鸽学术'},
    component:() => import('../views/Register.vue')
  },
  {
    path: '/regt',
    name: '404',
    meta: {title:'注册 - 咕鸽学术'},
    component:() => import('../views/regTest.vue')
  },
  {
    path: '/adminUser',
    name: 'adminUser',
    meta: {title: '用户管理 - 咕鸽学术'},
    component:() => import('../views/admin/User.vue')
  },
  {
    // 会匹配所有路径
    path: '/*',
    name: '404',
    meta: {title:'404 - 咕鸽学术'},
    component:() => import('../views/404.vue')
  },
]

const router = new VueRouter({
  routes
})
/*
router.beforeResolve((to, from, next) => {
  if (store.state.token==null) {
    store.state.token=window.sessionStorage.getItem('token');
    store.state.username=window.sessionStorage.getItem('username');
    store.state.userid=window.sessionStorage.getItem('userid');
    store.state.useravatar=window.sessionStorage.getItem('useravatar');
  }
  if (to.name=="Document") {
    var docid = to.params.id;
    //拦截非法访问文档
    Vue.axios({
      method: "get",
      url: "http://39.106.230.20:8090/document/" + docid,
      headers: {
        token: store.state.token,
      },
    }).then(function (response) {
      if (response.data.success==false) {
        next('/doc404');
      }
    }).catch(function () {
      next('/doc404');
    });
  }
  //更新消息
  if (store.state.token!=null) {
    Vue.axios({
      method: "get",
      url: "http://39.106.230.20:8090/message/unread",
      headers: {
        token: store.state.token,
      },
    }).then(function (response) {
      store.state.message=response.data.unReadMessages;
      store.state.messageRead=response.data.readMessages;
    }).catch(function (res) {
      console.log(res);
    });

  }
  if (store.state.token==null&&(to.name=="Home"||to.name=="Profile")) {
    next('/welcome');
  }else{
    next();
  }
})
*/
export default router
