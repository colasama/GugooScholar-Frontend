<template>
        <div class="avatar">
            <a-avatar :size="64" class="profile" :style="color">{{name.charAt(0).toUpperCase()}}</a-avatar>
            <p class="au_name">{{name}}</p>
<!--            :src="[this.link]"-->
        </div>
</template>

<script>
    export default {
        name: "author_avatar",
        props: {
            link: String,
            name: String,
            color: String,
        }
    }
</script>

<style scoped>
    .avatar {
        display: block;
        float: left;
        min-width: 180px;
        height: 100px;
        margin: 10px 20px 20px;
    }

    .avatar .au_name {
        display: block;
        float: bottom;
        line-height: 50px;
        margin: 0 20px 0 20px;
    }
    .avatar .profile {
        font-size: 25px;
    }
</style>