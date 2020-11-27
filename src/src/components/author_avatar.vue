<template>
        <div class="avatar">
            <a-avatar :size="64" icon="user" :src="[this.link]"/>
            <p class="au_name">{{name}}</p>
        </div>
</template>

<script>
    export default {
        name: "author_avatar",
        props: {
            link: String,
            name: String
        }
    }
</script>

<style scoped>
    .avatar {
        display: block;
        float: left;
        min-width: 150px;
        height: 100px;
        margin: 10px 20px 20px;
    }

    .avatar .au_name {
        display: block;
        float: bottom;
        line-height: 50px;
        margin: 0 20px 0 20px;
    }
</style>