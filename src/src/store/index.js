import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    showNav: true,
    token: null,
    username: '',
    userid: '',
    useravatar:'',
    message: [],
    messageRead:[],
};
export default new Vuex.Store({
    state,
})

/*
Vuex状态修改：
<script>
 export default{
     created(){
         this.$store.state.showNav = false
     },
     destroyed(){
         this.$store.state.showNav = true
     }
 }
</script>
*/