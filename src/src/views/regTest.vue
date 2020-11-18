<template>
    <div style="text-align:center">
        <a-input></a-input>
        <a-input></a-input>
        <a-button></a-button>
    </div>
</template>

<style>

</style>

<script>
import firebase from "firebase";

var config = {
    apiKey: "AIzaSyCd3aIBhwTRZwYa2JzNWhou2-Mg-kAwv6A",
    authDomain: "googoscholar-294912.firebaseapp.com",
};
firebase.initializeApp(config);

export default {
    name: 'DocDel',
    components: {
    },
    data() {
        return {
        }
    },
    methods:{
        toHome() {
            this.current = "home";
            this.$router.push({ path: "/" });
        },
    }
}
</script>
