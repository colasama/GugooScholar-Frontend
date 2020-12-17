import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
import store from '../store/index.js'
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
    path: '/subscribe',
    name: '404',
    meta: {title:'消息 - 咕鸽学术'},
    component:() => import('../views/Subscribe.vue')
  },
  {
    // 暂时先这样 测试用 后面具体再改
    path: '/scientist/show',
    name: 'scientist',
    meta: {title: '科研人员展示 - 咕鸽学术'},
    component: () => import('../views/content/Scientist')
  },
  {
    path: '/regt',
    name: '404',
    meta: {title:'注册 - 咕鸽学术'},
    component:() => import('../views/regTest.vue')
  },
  {
    path: '/admin/user',
    name: 'adminUser',
    meta: {title: '用户管理 - 咕鸽学术'},
    component:() => import('../views/admin/User.vue')
  },
  {
    path: '/ranklist',
    name: 'ranklist',
    meta: {title: '排行榜 - 咕鸽学术'},
    component:() => import('../views/rank/Ranklist.vue')
  },
  {
    path: '/rank',
    name: 'Rank',
    meta: { title: '排行榜 - 咕鸽学术' },
    component: () => import('../views/rank/Rank.vue')
  },
  {
    path: '/search',
    name: 'search',
    meta: {title:'搜索 - 咕鸽学术'},
    component:() => import('../views/Search.vue')
  },
  {
    // 会匹配所有路径
    path: '/paper*',
    name: 'Paper',
    meta: {title:'论文 - 咕鸽学术'},
    component:() => import('../views/content/Paper.vue')
  },
    {
      path: '/list',
      name: 'List',
      meta: {title:'学科领域列表 - 咕鸽学术'},
      component:() => import('../views/field/List.vue')
    },
    {
      path: '/field',
      name: 'Field',
      meta: {title:'学科领域 - 咕鸽学术'},
      component:() => import('../views/field/Field.vue')
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

router.beforeResolve(() => {
  if (store.state.token==null) {
    store.state.token=window.sessionStorage.getItem('token');
    store.state.username=window.sessionStorage.getItem('username');
    store.state.userid=window.sessionStorage.getItem('userid');
    store.state.useravatar=window.sessionStorage.getItem('useravatar');
  }
})

export default router
