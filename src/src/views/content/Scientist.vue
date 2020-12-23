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
                                
                                <a-tooltip>
                                    <template slot="title">点击收藏科研人员</template>
                                    <a-icon type="star" v-show="!subscribe" @click="subscribeAuthor(true)"/>
                                </a-tooltip>
                                <a-tooltip>
                                    <template slot="title">点击取消收藏</template>
                                    <a-popconfirm
                                            title="您确定要取消收藏吗?"
                                            ok-text="是的"
                                            cancel-text="我再想想"
                                            @confirm="subscribeAuthor(false)"
                                    >
                                        <a-icon style="color: yellow" type="star" theme="filled" v-show="subscribe"/>
                                    </a-popconfirm>
                                </a-tooltip>
                                {{authorName}}
                            </div>
                            <div class="authorDes">
                                所属机构：{{university}}
                            </div>
                            <div style="margin-top: 35px">
                                <a-button v-show="!isClaim" type="primary" @click="claimPortal">
                                    <a-icon type="user" />认领门户
                                </a-button>
                                <a-button style="border-color:#999999;background-color: #999999" v-show="isClaim"
                                          type="primary" @click="claimPortal" disabled>
                                    <a-icon type="user" />已认领
                                </a-button>
                                <span v-show="isClaim" style="margin-left: 8px">
                                    <a-tooltip>
                                        <template slot="title">
                                          查看认领人信息
                                        </template>
                                        <a-button style="font-size: 20px" type="link" @click="openNotification">
                                            <a-icon type="zoom-in" />
                                        </a-button>
                                    </a-tooltip>
                                </span>

                                <a-modal title="认领门户简单验证" :visible="modalVisible0"
                                         @ok="handleOk(0)" @cancel="modalVisible0=false">
                                    <p>您的名字是{{authorName}}吗？</p>
                                </a-modal>
                                <a-modal title="认领门户简单验证" :visible="modalVisible1"
                                         @ok="handleOk(1)" @cancel="modalVisible1=false">
                                    <p>{{ pubList[0].title }}, 该论文是您曾发表的论文吗？</p>
                                </a-modal>
                                <a-modal title="认领门户简单验证" :visible="modalVisible2" :confirm-loading="confirmLoading"
                                         @ok="handleOk(2)" @cancel="modalVisible2=false">
                                    <p>您曾和{{ otherAuthors[0].name }}合作过吗？</p>
                                </a-modal>
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
                        <div style="font-size: 18px; color: #BDD9E1;">科研人员关系网络</div>
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

                    <div class="sum">
                    <a-row type="flex" justify="center">
                    <a-col :span="12" style="text-align:center">
                        <a-spin v-if="isPaperCompleted===false" size="large"
                                style="margin-top:10px;margin-left: 10px" tip="加载论文中"/>
                        <div  v-if="isPaperCompleted">
                            <div style="margin-left: 10px" v-show="this.pubList.length === 0 && isPaper">
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
                            <div style="margin-left: 10px" v-show="this.fundList.length === 0 && !isPaper">
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
                            <a style="color: #74b1be" @click="toSearch">查看更多论文</a>
                        </div>
                        <div style="margin-bottom: 5px" v-show="this.fundList.length === 5 && !isPaper">
                            <a style="color: #74b1be" @click="toSearch">查看更多科研项目</a>
                        </div>
                    </a-col>
                    <a-col :span="1"/>
                    <a-col :span="4">
                    <div >
                        <a-spin v-if="!isAvatarCompleted" size="large"
                                style="margin-left: 50px" tip="加载相关作者图片中"/>
                        <a-card v-if="isAvatarCompleted" title="相似作者" class="otherAuthor" :body-style="bodyAuthorStyle">
                            <a-card-grid class="cardGrid" @click="toAuthor(author.id)" v-for="(author, index) in otherAuthors" :key="index">
                                <div style="cursor:pointer"><a-avatar shape="square" :size="64" icon="user" :src="author.avatar"/><br>{{author.name}}</div>
                            </a-card-grid>
                        </a-card>
                    </div>
                    </a-col>
                    </a-row></div>
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
                confirmLoading: false,
                modalVisible0: false,
                modalVisible1: false,
                modalVisible2: false,
                ModalText: 'xxx',
                isClaim: false,
                bindUser: {},
                subscribe: false,
                relations: [],
                sites: [0,0,0,0,0,0,0,0,0,0,0,0],
                isCompleted: false,
                isPaperCompleted: false,
                isAvatarCompleted: false,
                headStyle: {},
                bodyStyle: {"margin-left": "0"},
                bodyAuthorStyle: {"padding": "0 5px 20px 5px"},
                avatarSrc: "",
                authorName: "",
                university: "暂无所属机构",
                hIndex: 0,
                nPubs: 0,
                nCitation: 0,
                isPaper: true,
                pubList: [{title: ''}],
                fundList: [],
                otherAuthors: [{avatar: ''}],
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
                    yaxis: {
                        show: false
                    },
                },
            }
        },
        created() {
            let scientistId = this.$route.params.id;
            //console.log(scientistId);
            //let scientistId = '53f4474cdabfaee43ec81506';
            this.getAuthor(scientistId);
            this.getIsSubscribe(scientistId);
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
                            let routeUrl = _this.$router.resolve({
                                path: "/scientist/show/" + _this.relations[seriesIndex].id,
                            });
                            window.open(routeUrl.href, '_blank');
                        } else {
                            _this.$message.error('暂无科研人员的数据');
                        }

                    },
                    dataPointSelection: function(event, chartContext, config) {
                        if (_this.relations[config.dataPointIndex].id) {
                            let routeUrl = _this.$router.resolve({
                                path: "/scientist/show/" + _this.relations[config.dataPointIndex].id,
                            });
                            window.open(routeUrl.href, '_blank');
                        } else {
                            _this.$message.error('暂无科研人员的数据');
                        }

                    }
                };
            },
            getAuthor(scientistId) {
                this.$http.get('https://gugooscholar-k5yn3ahzxq-df.a.run.app/author/' + scientistId,
                ).then((res)=>{
                    let data = res.data.data;
                    this.authorName = data.name;
                    if (data.orgs != null) this.university = data.orgs;
                    this.nPubs = data.n_pubs;
                    this.hIndex = data.h_index;
                    this.nCitation = data.n_citation;
                    this.avatarSrc = data.avatar;
                    if (data.bind_user) {
                        this.isClaim = true;
                        this.getUserInfo(data.bind_user);
                    }
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
                    //this.$refs.chart.updateSeries(this.series);
                    //this.$refs.chart.updateOptions(this.chartOptions);
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
                    this.getOtherAuthor();
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
                    //console.log(this.fundList);
                }).catch((e)=>{
                    console.log(e);
                });
            },
            getUserInfo(username) {
                this.$http.get('https://gugooscholar-k5yn3ahzxq-df.a.run.app/user/'+ username + '/info'
                ).then((res)=>{
                    this.bindUser = res.data.data;
                    console.log(res.data.data)
                }).catch((e)=>{
                    console.log(e);
                });
            },
            getIsSubscribe(scientistId) {
                this.$http.post('https://gugooscholar-k5yn3ahzxq-df.a.run.app/subscribe/author/subscribed',
                    {author_id: scientistId},
                    {headers: {token: window.sessionStorage.getItem('token')}}
                ).then((res) => {
                   this.subscribe = res.data.success;
                }).catch((e) => {
                    console.log(e);
                });
            },
            getOtherAuthor() {
                let map = new Map();
                let cnt = 0;
                this.pubList.forEach((pub) => {
                    for (let author of pub.authors) {
                        if (!(author instanceof Object)) break;
                        if (author.id && author.id !== this.$route.params.id) {
                            map.set(author.name, author);
                        }
                    }
                });
                for (let key of map.keys()) {
                    if (cnt >= 9) break;
                    this.otherAuthors[cnt] = map.get(key);
                    cnt++;
                }
                cnt = 0;
                this.otherAuthors.forEach((author)=>{
                    this.$http.get('https://gugooscholar-k5yn3ahzxq-df.a.run.app/author/' + author.id + '/avatar'
                    ).then((res)=>{
                        author.avatar = res.data.data.avatar;
                        cnt++;
                        if (cnt === this.otherAuthors.length) this.isAvatarCompleted=true;
                    }).catch((e)=>{
                        console.log(e);
                    });
                });
            },
            subscribeAuthor(bool) {
                let token = window.sessionStorage.getItem('token');
                if (!token) {
                    this.$message.info("请先登录再使用该功能");
                    return;
                }
                if (bool) {
                    this.$http.post('https://gugooscholar-k5yn3ahzxq-df.a.run.app/subscribe/author',
                        {author_id: this.$route.params.id},
                        {headers: {token: token}}
                    ).then((res) => {
                        console.log(res);
                        this.$message.success("收藏成功");
                        this.subscribe = true;
                    }).catch((e) => {
                        console.log(e);
                    });
                } else {
                    this.$http.post('https://gugooscholar-k5yn3ahzxq-df.a.run.app/subscribe/cancel/author',
                        {author_id: this.$route.params.id},
                        {headers: {token: token}}
                    ).then((res) => {
                        console.log(res);
                        this.$message.info("已取消收藏");
                        this.subscribe = false;
                    }).catch((e) => {
                        console.log(e);
                    });
                }
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
                    query: {
                        id:this.$route.params.id,
                        name:this.authorName
                        }
                });
                window.open(routeUrl.href, '_blank');
            },
            toAuthor(authorId) {
                let routeUrl = this.$router.resolve({
                    path: "/scientist/show/" + authorId,
                });
                window.open(routeUrl.href, '_blank');
            },
            handleOk(num){
                if (num === 0) {
                    this.modalVisible0 = false;
                    this.modalVisible1 = true;
                } else if (num === 1) {
                    this.modalVisible1 = false;
                    this.modalVisible2 = true;
                } else {
                    this.confirmLoading = true;
                    this.$http.post('https://gugooscholar-k5yn3ahzxq-df.a.run.app/user/bindauthor',
                        {author_id: this.$route.params.id},
                        {headers: {token: window.sessionStorage.getItem('token')}}
                    ).then(() => {
                        this.confirmLoading = false;
                        this.modalVisible2 = false;
                        this.isClaim = true;
                        this.$message.success("认领成功");
                    }).catch((e) => {
                        console.log(e);
                        this.$message.error("认领失败");
                    });
                }
            },
            claimPortal() {
                let token = window.sessionStorage.getItem('token');
                if (!token) {
                    this.$message.info("请先登录再使用该功能");
                    return;
                }
                this.modalVisible0 = true;
            },
            openNotification() {
                const key = `open${Date.now()}`;
                this.$notification.open({
                    message: '认领人信息',
                    description: '认领人：' + this.bindUser.username +
                        '\n认领人真实姓名：' + this.bindUser.name +
                        '\n认领人位置：'+ this.bindUser.location +
                        '\n认领人联系方式：' + this.bindUser.email +
                        '\n认领人简介：' + this.bindUser.introduction,
                    style: 'white-space: pre-wrap',
                    duration: 0,
                    btn: h => {
                        return h( 'a-button', {
                            props: {type: 'primary',size: 'small',},
                            on: {click: () => this.$notification.close(key),},
                        },
                        'ok', );
                    }, key,onClose: close,
                    icon: <a-icon type="smile" style="color: #108ee9" />,
                });
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
    width: 33%;
    padding: 20px 5px 0 15px;
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

.sum>>>.ant-row>div {
    background: transparent;
    margin: 0 16% 0 16%;
    min-width: calc(100% - 32%);
    border: 0;
}
.sum {
    margin-top: 50px;
}
</style>
