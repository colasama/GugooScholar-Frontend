<template>
    <div>
        <a-layout>
            <a-layout-content class="scientist-show">
                <div class="leftContent">
                    <div class="avatar">
                        <a-avatar :size="256" icon="user" :src="avatarSrc"/>
                    </div>
                    <div class="authorInfo">
                        <div class="authorName">
                            {{authorChineseName}}（{{authorName}}）
                        </div>
                        <div class="authorDes">
                            {{career}}<br/>{{university}}<br/>{{universityChineseName}}
                        </div>
                    </div>
                    <div class="authorAchieve">
                        <div class="achieve">
                            论文数<br/>{{paperNum}}
                        </div>
                        <div class="achieve" style="margin-left: 120px">
                            专利数<br/>{{patentNum}}
                        </div>
                        <div class="achieve" style="margin-left: 120px">
                            科研项目数<br/>{{researchNum}}
                        </div>
                    </div>
                </div>
                <div class="rightContent">
                    <div style="font-size: 18px; color: #BDD9E1;">专家关系网络</div>
                    <!--TODO 专家网络可视化-->
                    <div></div>
                </div>
            </a-layout-content>
            <a-layout-content style="background-color: white">
                <div class="leftDownContent">
                    <a-card class="leftCard">
                        <div style="text-align: left" slot="title"><a-icon type="home"/>工作经历</div>
                        <div style="text-align: left">{{experience}}</div>
                    </a-card>
                    <a-card class="leftCard" style="margin-top: 20px">
                        <div style="text-align: left" slot="title"><a-icon type="home"/>教育背景</div>
                        <div style="text-align: left">{{education}}</div>
                    </a-card>
                    <a-card class="leftCard" style="margin-top: 20px">
                        <div style="text-align: left" slot="title"><a-icon type="home"/>个人简介</div>
                        <div style="text-align: left">{{selfIntro}}</div>
                    </a-card>
                </div>
                <div class="rightDownContent">
                    <a-card title="相似作者" style="width: 300px; border-radius: 0">
                        <p>card content</p>
                        <p>card content</p>
                        <p>card content</p>
                    </a-card>
                </div>
            </a-layout-content>
            <!--<a-layout-footer>Footer</a-layout-footer>-->
        </a-layout>
    </div>
</template>

<script>
    export default {

        components: {

        },
        data() {
            return {
                avatarSrc: "https://i.loli.net/2020/11/26/ANYtuRaPrLJTDwy.jpg",
                authorChineseName: "原仓周",
                authorName: "CangZhou Yuan",
                career: "副教授",
                university: "School of Software,Beijing University of Aeronautics and Astronautics,Beijing ,China",
                universityChineseName: "北京航空航天大学软件学院",
                paperNum: "65536",
                patentNum: "65536",
                researchNum: "65536",
                experience: "xxx",
                education: "xxx",
                selfIntro: "xxx",

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

<style>
.scientist-show {
    background: #2F3241;
    height: 400px;
    color: #fff;
}
.avatar {
    position: absolute;
    left: 13%;
}
.leftContent {
    float: left;
    width: 50%;
    margin-top: 40px;
}
.authorInfo {
    margin-top: 15px;
    text-align: left;
    width: 50%;
    position: absolute;
    left: 33%;
    color: #BDD9E1;
}
.authorName {
    font-size: 30px;
}
.authorDes {
    margin-top: 50px;
    width: 50%;
}
.authorAchieve{
    margin-top: 250px;
    text-align: left;
    position: absolute;
    left: 30%;
    color: #BDD9E1;
}
.achieve {
    float: left;
    font-size: 20px;
}
.rightContent {
    float: left;
    width: 50%;
    margin-top: 50px;
}
.leftDownContent {
    margin-top: 40px;
    float: left;
    position: absolute;
    left: 20%;
}
.rightDownContent {
    margin-top: 40px;
    float: left;
    position: absolute;
    left: 70%;
}
.leftCard {
    width: 600px;
    border-radius: 0;
}
</style>
