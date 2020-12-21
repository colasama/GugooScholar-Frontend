<template>
    <div>
        <a-layout>
            <a-layout-content >
                <div class="scientist-show">
                    <div class="leftContent">
                        <div class="avatar">
                            <a-avatar :size="256" icon="user" :src="avatarSrc"/>
                        </div>
                        <div class="authorInfo">
                            <div class="authorName">
                                {{authorName}}
                            </div>
                            <div class="authorDes">
                                {{career}}<br/>{{university}}<br/>{{universityChineseName}}
                            </div>
                        </div>
                        <div class="authorAchieve">
                            <div class="achieve">
                                H指数<br/>{{hIndex}}
                            </div>
                            <div class="achieve" style="margin-left: 120px">
                                论文数<br/>{{nPubs}}
                            </div>
                            <div class="achieve" style="margin-left: 120px">
                                被引量<br/>{{nCitation}}
                            </div>
                        </div>
                    </div>
                    <div class="rightContent">
                        <div style="font-size: 18px; color: #BDD9E1;">专家关系网络</div>
                        <a-spin v-if="isCompleted == false" size="large" style="margin-top:100px" tip="加载关系网络中"/>
                        <div class="expertWeb" >
                            <VueApexCharts  v-if="isCompleted" ref="chart" type="polarArea" :options="chartOptions" :series="series">
                            </VueApexCharts>
                        </div>
                    </div>
                </div>
                <div class="specificInfo">
                    <a-menu mode="horizontal" :default-selected-keys="['1']">
                        <a-menu-item key="1" @click="isPaper=true"><a-icon type="book"/>发表论文</a-menu-item>
                        <a-menu-item key="2" @click="isPaper=false"><a-icon type="appstore" />科研项目</a-menu-item>
                    </a-menu>

                    <div class="leftDownContent">
                        <a-spin v-if="isPaperCompleted===false" size="large"
                                style="margin-top:100px;margin-left: 400px" tip="加载论文中"/>
                        <div  v-if="isPaperCompleted">
                            <div style="margin-left: 450px" v-show="this.pubList.length === 0 && isPaper">
                                <a style="color: #74b1be">暂无相关论文</a>
                            </div>
                            <a-card
                                class="leftCard"
                                :hoverable="true"
                                v-show="isPaper"
                                @click="toPaper(article.id)"
                                v-for="(article,index) in pubList"
                                :key="index">
                                    <p class="p1">
                                        <a-icon type="book"/>&#12288;
                                        <span v-html="article.title.length > 90 ? article.title.substr(0, 90) + '...' : article.title"></span>
                                        <template>
                                            <div style="float:right">{{article.n_citation}}{{'  citations'}}</div>
                                        </template>
                                    </p>
                                    <p style="font-family:Times New Roman;font-weight:700;margin-top:8px">
                                        <template>
                                            <div v-if="article.year && article.venue">
                                                {{article.year+"  "}}{{article.venue.name}}
                                            </div>
                                        </template>
                                    </p>
                                    <p style="margin-top:3px;font-weight:100;font-family:Times New Roman;font-size:14px">
                                        <template v-for="(author, index2) in article.authors">

                                            <template v-if="index2 < 10 && index2 < article.authors.length">
                                                {{author.name}}
                                            </template>
                                            <template v-if="index2 < 9 && index2 < article.authors.length-1">
                                                {{' & '}}
                                            </template>
                                        </template>
                                    </p>
                                    <p style="margin-top:3px;font-family:Georgia;font-weight:200;">
                                        <template v-for="(field,index3) in article.keywords">
                                            <template v-if="index3 < 3" style="float:left">
                                                <a-button type="primary" style="height:25px;max-width:250px;padding-left:5px;padding-right:5px;
                            " :key="index3">
                                                    <div class="test" style="text-overflow:ellipsis;"><a-icon style="padding-right:3px" type="experiment" />
                                                        {{field}}
                                                    </div>
                                                </a-button>
                                                <template v-if="index3 < article.keywords.length-1 && index3 < 2">
                                                    {{'&nbsp;'}}
                                                </template>
                                            </template>
                                        </template>
                                    </p>
                                    <p class="p_abstarct">
                                        <template>
                                            {{article.abstract.substr(0, 200) + '...'}}
                                        </template>
                                    </p>
                            </a-card>
                            <div style="margin-left: 450px" v-show="this.fundList.length === 0 && !isPaper">
                                <a style="color: #74b1be">暂无相关科研项目</a>
                            </div>
                            <a-card class="leftCard" :hoverable="true"  v-show="!isPaper" @click="toPaper(article.id)" v-for="(fund,index) in fundList" :key="index">
                                <p class="p1">
                                    <a-icon type="appstore"/>&#12288;
                                    <span v-html="fund.title.length > 90 ? fund.title.substr(0, 90) + '...' : fund.title"></span>
                                </p>
                                <p style="font-family:Times New Roman;font-weight:700;margin-top:8px">
                                    <template>
                                        <span v-if="fund.start_year && fund.end_year"><i>{{fund.start_year}} - {{fund.end_year}}</i></span>
                                        <span style="margin-left: 10px">{{fund.author.name}}</span>
                                    </template>
                                </p>
                                <p style="margin-top:3px;font-weight:100;font-family:Times New Roman;font-size:14px">
                                    <template style="float:left" v-if="fund.src">
                                        <a-button class="button" type="primary">
                                            <div >
                                                DataSource:<a-icon type="zoom-in" style="padding-right: 3px; padding-left: 5px"/>{{fund.src}}
                                            </div>
                                        </a-button>
                                    </template>
                                </p>
                                <p style="margin-top:3px;font-weight:100;font-family:Times New Roman;font-size:14px">
                                    <template style="float:left" v-if="fund.desc">
                                        <a-button class="button" type="primary" style="background-color: #FF9900">
                                            <div>
                                                Description: {{fund.desc}}
                                            </div>
                                        </a-button>
                                    </template>
                                </p>
                                <p style="margin-top:3px;font-family:Georgia;font-weight:200;">
                                    <template style="float:left" v-if="fund.type">
                                        <a-button
                                            type="primary"
                                            style="height:25px;max-width:250px;padding-left:5px;padding-right:5px;">
                                            <div class="test" style="text-overflow:ellipsis;">
                                                <a-icon style="padding-right:3px" type="experiment" />{{fund.type}}
                                            </div>
                                        </a-button>
                                    </template>
                                </p>
                                <p class="p_abstarct">
                                    <template>
                                        {{fund.abstract.substr(0, 200) + '...'}}
                                    </template>
                                </p>
                            </a-card>
                        </div>
                        <div style="margin-bottom: 5px" v-show="this.pubList.length === 5 && isPaper">
                            <a style="color: #74b1be" @click="toSearch">查看该专家更多论文</a>
                        </div>
                        <div style="margin-bottom: 5px" v-show="this.fundList.length === 5 && !isPaper">
                            <a style="color: #74b1be" @click="toSearch">查看该专家更多科研项目</a>
                        </div>
                    </div>
                    <!--<div class="leftDownContent">
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
                    </div>-->
                    <div class="rightDownContent">
                        <a-card title="相似作者" class="otherAuthor" :body-style="bodyAuthorStyle">
                            <a-card-grid class="cardGrid" v-for="s in 12" :key="s">
                                <div><a-avatar shape="square" :size="64" icon="user" /><br>{{s}}</div>
                            </a-card-grid>
                        </a-card>
                    </div>
                    <div style="clear:both;height:0;font-size: 1px;line-height: 0px;"></div>
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
    import VueApexCharts from 'vue-apexcharts'
    export default {

        components: {
            VueApexCharts
        },
        data() {
            return {
                relations: [],
                sites: [0,0,0,0,0,0,0,0,0,0,0,0],
                isCompleted: false,
                isPaperCompleted: false,
                headStyle: {},
                bodyStyle: {"margin-left": "0"},
                bodyAuthorStyle: {"padding": "0 5px 50px 5px"},
                avatarSrc: "https://i.loli.net/2020/11/26/ANYtuRaPrLJTDwy.jpg",
                authorChineseName: "原仓周",
                authorName: "CangZhou Yuan",
                career: "教授 北京航空航天大学通信与信息系统博士",
                university: "School of Software,Beijing University of Aeronautics and Astronautics,Beijing ,China",
                universityChineseName: "北京航空航天大学软件学院",
                hIndex: 0,
                nPubs: 0,
                nCitation: 0,
                isPaper: true,
                experience: "主持参与航天预研、“核高基”重大专项、“863”高科技重大专项、航空基金等国家级课题近20项" +
                    "，主持多项大型软件研发项目。近几年在国内外期刊会议上发表SCI/EI学术论文40余篇，" +
                    "授权国家专利12项，2项已转让。",
                education: "暂无",
                selfIntro: "现任软件学院一级实践指导主任。 具有较丰富的教学经验和丰富的软件管理和开发经验。" +
                    "在 MIS 、 GIS 、网络通信和信息安全方面有多年的开发实践经验，主持和参与过包括部级项目" +
                    "在内的多项课题和工程的设计和开发。已发表科研论文十余篇，其中多篇被 EI 收录。是" +
                    "软件学院“操作系统”、“ Linux 内核分析”、“软件工程专业实践一级”等课程的主讲教师。" +
                    "主要研究领域为嵌入式系统开发、信息安全、软件开发技术等。著有多种专业论文。",
                pubList: [],
                fundList: [],
                series: [0],
                chartOptions: {
                    chart: {
                        type: 'polarArea',
                        foreColor: 'white',
                        events: {},
                    },
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200
                            },
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }],
                    stroke: {
                        colors: ['#fff']
                    },
                    labels: [],
                    fill: {
                        opacity: 0.9
                    },
                    /*theme: {
                        monochrome: {
                            enabled: true,
                            shadeTo: 'light',
                            shadeIntensity: 0.6
                        }
                    },*/
                    yaxis: {
                        show: false
                    },
                },
            }
        },
        created() {
            let scientistId = this.$route.params.id;
            console.log(scientistId);
            //let scientistId = '53f4474cdabfaee43ec81506';
            this.university = '暂无所属机构';
            this.getAuthor(scientistId);
            this.getRelations(scientistId);
            this.getPubs(scientistId);
            this.getFunds(scientistId);
        },
        mounted() {

        },
        methods:{
            toHome() {
                this.current = "home";
                this.$router.push({ path: "/" });
            },
            clickChart() {
                console.log("click");
            },
            dealWithData() {
                let max = -1;
                let size = this.relations.length;
                for (let i = 0; i < size; i++) {
                    this.series[i] = this.relations[i].weight;
                    if (max < this.relations[i].name.length) max = this.relations[i].name.length;
                    this.chartOptions.labels[i] = this.relations[i].name;
                }
                for (let i = 0; i < size; i++) {
                    let len = this.chartOptions.labels[i].length;
                    if (len < max) {
                        for (let j = 0; j < max - len; j++) {
                            this.chartOptions.labels[i] = this.chartOptions.labels[i] + "&ensp;";
                        }
                    }
                }
            },
            initEvent() {
                let _this = this;
                this.chartOptions.chart.events = {
                    legendClick: function(chartContext, seriesIndex, config) {
                        console.log(config);
                        if (_this.relations[seriesIndex].id) {
                            _this.$router.push("/scientist/show/"+ _this.relations[seriesIndex].id);
                        } else {
                            _this.$message.error('暂无该专家数据');
                        }

                    },
                    dataPointSelection: function(event, chartContext, config) {
                        if (_this.relations[config.dataPointIndex].id) {
                            _this.$router.push("/scientist/show/" + _this.relations[config.dataPointIndex].id);
                        } else {
                            _this.$message.error('暂无该专家数据');
                        }

                    }
                };
            },
            getAuthor(scientistId) {
                this.$http.get('https://gugooscholar-k5yn3ahzxq-df.a.run.app/author/' + scientistId,
                    {headers: {token: 'xx'}}
                ).then((res)=>{
                    let data = res.data.data
                    this.authorName = data.name;
                    if (data.orgs != null) this.university = data.orgs;
                    this.nPubs = data.n_pubs;
                    this.hIndex = data.h_index;
                    this.nCitation = data.n_citation;
                }).catch(()=>{
                    this.$message.error('invalid access');
                    this.$router.push('/');
                });
            },
            getRelations(scientistId) {
                this.$http.get('https://gugooscholar-k5yn3ahzxq-df.a.run.app/author/' + scientistId + '/relation',
                    {headers: {token: 'xx'}}
                ).then((res)=>{
                    this.relations = res.data.data;
                    this.dealWithData();
                    this.initEvent();
                    this.isCompleted = true;
                    //this.$refs.chart.render();
                    this.$refs.chart.updateSeries(this.series);
                    this.$refs.chart.updateOptions(this.chartOptions);

                }).catch((e)=>{
                    console.log(e);
                });
            },
            getPubs(scientistId) {
                this.$http.get('https://gugooscholar-k5yn3ahzxq-df.a.run.app/author/' + scientistId + '/paper',
                    {headers: {token: 'xx'}}
                ).then((res)=>{
                    let pubs = res.data.data;
                    this.isPaperCompleted = true;
                    if (pubs.length >= 5) this.pubList = pubs.slice(0, 5);
                    else this.pubList = pubs;
                }).catch((e)=>{
                    console.log(e);
                });
            },
            getFunds(scientistId) {
                this.$http.get('https://gugooscholar-k5yn3ahzxq-df.a.run.app/author/' + scientistId + '/fund',
                    {headers: {token: 'xx'}}
                ).then((res)=>{
                    let funds = res.data.data;
                    if (funds.length >= 5) this.fundList = funds.slice(0, 5);
                    else this.fundList = funds;
                    console.log(this.fundList);
                }).catch((e)=>{
                    console.log(e);
                });
            },
            toPaper(paperid) {
                let routeData = this.$router.resolve({
                    path: '/paper',
                    query: {
                        id: paperid,
                    }
                });
                window.open(routeData.href, '_blank');
            },
            toSearch() {
                let routeUrl = this.$router.resolve({
                    path: "/search",
                    //query: {id:96}
                });
                window.open(routeUrl.href, '_blank');
            }
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
    min-height: 600px;
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
    margin-left: 7%;
}
.rightDownContent {
    margin-top: 40px;
    float: left;
    position: absolute;
    left: 70%;
}
.leftCard {
    text-align: left;
    margin-bottom: 5px;
    width: 800px;
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
.expertWeb {
    margin-top: 20px;
    position: absolute;
    left: 66%;
    width: 400px;
}
.button {
    height: 25px;
    max-width: 250px;
    padding-left: 5px;
    padding-right: 5px;
}
.p1 {
    font-weight: 700;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
}
.p_abstarct{
    font-family: Book Antiqua,serif;
    margin-top: 3px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
}
</style>
