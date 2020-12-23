<template>
        <div class="avatar">
            <a-avatar :size="48" class="profile" :style="color">{{name.charAt(0).toUpperCase()}}</a-avatar>
            <span class="au_name">{{name}}</span>
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
        margin: 10px 5px 24px 5px;
    }

    .avatar .au_name {
        color:#f1f1f1;
        margin: 0 5px 0 5px;
    }
    .avatar .profile {
        font-size: 25px;
    }
</style>