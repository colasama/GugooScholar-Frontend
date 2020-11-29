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
            <a-layout-content class="specificInfo">
                <div class="leftDownContent">
                    <a-card class="leftCard" :head-style="headStyle" :body-style="bodyStyle">
                        <div style="text-align: left; margin: 0" slot="title"><a-icon type="audit"/> 工作经历</div>
                        <div class="author-contents">{{experience}}</div>
                    </a-card>
                    <a-card class="leftCard" style="margin-top: 20px">
                        <div style="text-align: left" slot="title"><a-icon type="trophy" theme="filled"/> 教育背景</div>
                        <div class="author-contents">{{education}}</div>
                    </a-card>
                    <a-card class="leftCard" style="margin-top: 20px">
                        <div style="text-align: left" slot="title"><a-icon type="edit" theme="filled"/> 个人简介</div>
                        <div class="author-contents">{{selfIntro}}</div>
                    </a-card>
                </div>
                <div class="rightDownContent">
                    <a-card title="相似作者" class="otherAuthor" :body-style="bodyAuthorStyle">
                        <a-card-grid class="cardGrid" v-for="s in 12" :key="s">
                            <div><a-avatar shape="square" :size="64" icon="user" /><br>{{s}}</div>
                        </a-card-grid>
                    </a-card>
                </div>
            </a-layout-content>
            <a-layout-footer class="footer">
                <p>gugugu</p>
            </a-layout-footer>
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
                sites: [0,0,0,0,0,0,0,0,0,0,0,0],
                headStyle: {},
                bodyStyle: {"margin-left": "0"},
                bodyAuthorStyle: {"padding": "0 5px 50px 5px"},
                avatarSrc: "https://i.loli.net/2020/11/26/ANYtuRaPrLJTDwy.jpg",
                authorChineseName: "原仓周",
                authorName: "CangZhou Yuan",
                career: "教授 北京航空航天大学通信与信息系统博士",
                university: "School of Software,Beijing University of Aeronautics and Astronautics,Beijing ,China",
                universityChineseName: "北京航空航天大学软件学院",
                paperNum: "65536",
                patentNum: "65536",
                researchNum: "65536",
                experience: "主持参与航天预研、“核高基”重大专项、“863”高科技重大专项、航空基金等国家级课题近20项" +
                    "，主持多项大型软件研发项目。近几年在国内外期刊会议上发表SCI/EI学术论文40余篇，" +
                    "授权国家专利12项，2项已转让。",
                education: "暂无",
                selfIntro: "现任软件学院一级实践指导主任。 具有较丰富的教学经验和丰富的软件管理和开发经验。" +
                    "在 MIS 、 GIS 、网络通信和信息安全方面有多年的开发实践经验，主持和参与过包括部级项目" +
                    "在内的多项课题和工程的设计和开发。已发表科研论文十余篇，其中多篇被 EI 收录。是" +
                    "软件学院“操作系统”、“ Linux 内核分析”、“软件工程专业实践一级”等课程的主讲教师。" +
                    "主要研究领域为嵌入式系统开发、信息安全、软件开发技术等。著有多种专业论文。",

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
/* 上右下左 */
.scientist-show {
    background: #2F3241;
    height: 400px;
    color: #fff;
}
.specificInfo {
    background: white;
    height: 620px;
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
    left: 65%;
}
.leftCard {
    width: 600px;
    border-radius: 0;
    box-shadow: -2px -2px 1px #F2F2F2;
}
.author-contents {
    text-align: left;
    font-size: 13px;
    margin-top: 0;
    /*background-color: #F2F2F2;*/
}
.cardGrid {
    width: 25%;
    padding: 20px 5px 0 8px;
    box-shadow: 0 0 0 white;
}
.otherAuthor {
    width: 350px;
    border-radius: 0;
    box-shadow: -2px -2px 1px #F2F2F2;
}
.footer {
    background-color: #FAFAFA;
}
</style>
