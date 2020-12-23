<template>
    <div class="w">
        <a-layout id="components-layout-demo-basic" style="background:#2c2e3b">
            <!--            <a-layout-content v-if="isEmpty">当前暂无数据！</a-layout-content>-->
            <a-layout-content style="margin:48px 16% 0 16%">
                <div class="topic" v-if="searchResult.title!=null">
                    {{searchResult.title}}
<!--                    <a-tooltip>-->
<!--                        <template slot="title">点击收藏论文</template>-->
<!--                        <a-icon type="star" v-show="!subscribe" @click="subscribePaper(true)"/>-->
<!--                    </a-tooltip>-->
<!--                    <a-tooltip>-->
<!--                        <template slot="title">点击取消收藏</template>-->
<!--                        <a-popconfirm-->
<!--                                title="您确定要取消收藏吗?"-->
<!--                                ok-text="是的"-->
<!--                                cancel-text="我再想想"-->
<!--                                @confirm="subscribePaper(false)"-->
<!--                        >-->
<!--                            <a-icon style="color: yellow" type="star" theme="filled" v-show="subscribe"/>-->
<!--                        </a-popconfirm>-->
<!--                    </a-tooltip>-->
                </div>
                <div style="overflow:auto;max-width:calc(100% - 32%)" v-if="searchResult.author!=null">
                    <div style="margin:24px 0 0 0">
                        <div class="avatar">
                            <a-avatar :size="48" class="profile" :style="colorList[2]">{{searchResult.author.name[0].toUpperCase()}}</a-avatar>
                            <span class="au_name">{{searchResult.author.name}}</span>
                        </div>
<!--                        <author_avatar :name=searchResult.author.name :color="colorList[2]"></author_avatar>-->
                    </div>
                </div>

                <div style="overflow:auto;max-width:calc(100% - 32%);text-align:left;color:white;padding-top: 10px; border-radius: 10px;margin-bottom:48px">
                    <template>
                        <span style="font-size:19px;color: #b3cbd0;font-weight:700;height:25px;flex:1"
                              >详细信息</span>
                        <a-row style="margin-top:12px">
                            <a-col :span="6" v-if="searchResult.desc!=null">
                                <div style="font-size:16px" ><b>描述 </b> {{searchResult.desc}}</div>
                            </a-col>
                            <a-col :span="3" v-if="searchResult.src!=null">
                                <div style="font-size:16px" ><b>数据来源 </b> {{searchResult.src}}</div>
                            </a-col>
                            <a-col :span="6" v-if="searchResult.type!=null">
                                <div style="font-size:16px" > <b>项目类型 </b> {{searchResult.type}}</div>
                            </a-col>
                            <a-col :span="6" v-if="searchResult.end_date!=null">
                                <div style="font-size:16px"><b>结束日期 </b> {{searchResult.end_date}}</div>
                            </a-col>
                            <a-col :span="6" v-if='searchResult.end_year!=""&&searchResult.start_year!=""'>
                                <div style="font-size:16px" >
                                    <b>始末年份 </b>
                                    {{searchResult.start_year}}-{{searchResult.end_year}}
                                </div>
                            </a-col>
                        </a-row>
<!--                        <a-row>-->
<!--                            <a-col :span="6">-->
<!--                                <div style="font-size:16px" v-if="searchResult.desc!=null"><b>描述 </b> {{searchResult.desc}}</div>-->
<!--                            </a-col>-->
<!--                            <a-col :span="6">-->
<!--                                <div style="font-size:16px" v-if="searchResult.src!=null"><b>数据来源 </b> {{searchResult.src}}</div>-->
<!--                            </a-col>-->
<!--                            <a-col :span="6">-->
<!--                                <div style="font-size:16px" v-if="searchResult.type!=null"> <b>项目类型 </b> {{searchResult.type}}</div>-->
<!--                            </a-col>-->
<!--                            <a-col :span="6">-->
<!--                                <div style="font-size:16px" v-if="searchResult.end_date!=null"><b>结束日期 </b> {{searchResult.end_date}}</div>-->
<!--                            </a-col>-->
<!--                            <a-col :span="6">-->
<!--                                <div style="font-size:16px" v-if='searchResult.end_year!=""&&searchResult.start_year!=""'>-->
<!--                                    <b>始末年份 </b>-->
<!--                                    {{searchResult.start_year}}-{{searchResult.end_year}}-->
<!--                                </div>-->
<!--                            </a-col>-->
<!--                        </a-row>-->
                    </template>
                </div>
            </a-layout-content>
        </a-layout>
        <div style="margin:48px 16% 0 16%">
            <div style="border-radius: 5px;text-align:left">
                <a-card style="margin:auto;">
                    <h1>摘要</h1>
                    <p style="font-size: 16px;">{{searchResult.abstract}}</p>
                </a-card>
            </div>
        </div>
    </div>

</template>

<script>
    // import author_avatar from "../../components/author_avatar";

    export default {
        name: 'Fund',
        components: {
            // author_avatar
        },
        data() {
            return {
                subscribe: false,
                searchResult: {},
                colorList: ["background: #87d068", "background: #c9bcd6", "background:#edadad",
                    "background:#108ee9", "background: #ff5500", "background: #2db7f5"],
                loading: true,
            }
        },
        methods: {
            subscribePaper(bool) {
                let token = window.sessionStorage.getItem('token');
                if (!token) {
                    this.$message.info("请先登录再使用该功能");
                    return;
                }
                if (bool) {
                    this.$http.post('https://gugooscholar-k5yn3ahzxq-df.a.run.app/subscribe/paper',
                        {paper_id: this.$route.query.id},
                        {headers: {token: token}}
                    ).then((res) => {
                        console.log(res);
                        this.$message.success("收藏成功");
                        this.subscribe = true;
                    }).catch((e) => {
                        console.log(e);
                    });
                } else {
                    this.$http.post('https://gugooscholar-k5yn3ahzxq-df.a.run.app/subscribe/cancel/paper',
                        {paper_id: this.$route.query.id},
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
            handleClick() {
                this.loading = !this.loading;
            },
            open(url) {
                window.open(url);
            },
            searchPaper() {
                var search_url = "https://gugooscholar-k5yn3ahzxq-df.a.run.app/paper/yYKQ8ILOTGHbdxH4YzZC"
                this.$axios({
                    method: 'get',
                    url: search_url,
                    data: {}
                }).then(
                    response => {
                        console.log(response.data["data"]);
                        this.searchResult = response.data["data"];
                        if (response.data["data"] === null) {
                            this.searchResult = [];
                        }
                    },
                    err => {
                        console.log(err);
                    }
                ).catch((error) => {
                    console.log(error);
                });
            }
        },
        created() {
            let fundId = this.$route.query.id;
            console.log(fundId);
            let search_url = "https://gugooscholar-k5yn3ahzxq-df.a.run.app/fund/" + fundId
            this.$axios.get(search_url, {
                data: {
                    key: this.search,
                }
            }).then(
                response => {
                    console.log(response.data["data"]);
                    let origin = this.searchResult;
                    this.searchResult = response.data["data"];
                    console.log(response.data.length);
                    if (response.data.length === 0)
                        this.isEmpty = true;
                    else if (response.data["data"] !== origin)
                        console.log(this.searchResult);
                },
                err => {
                    console.log(err);
                }).catch((error) => {
                console.log(error);
            });
        }
    }
</script>

<style>
    .w {
        /*background-color: #fef2da;*/
    }

    #components-layout-demo-basic .ant-layout-content {
        background: #2c2e3b;
        color: #fff;
        min-width:100%;
        height: fit-content;
        font-size: 20px;
    }

    #components-layout-demo-basic .topic {
        /*float: left;*/
        /*margin-bottom: 15px;*/
        text-align:left;
        font-weight: 400;
        color: #ffffff;
        font-size: 40px;
        /*margin-top: 15px;*/
        /*margin-left: 50px;*/
        /*padding-left:50px;*/
        max-width: 80%;
        /*width: 600px;*/
        height: fit-content;
        word-wrap: break-word;
        word-break: break-all;
    }

    #components-layout-demo-basic .author {
        display: block;
        position: relative;
        /*min-width: 150px;*/
        max-width: 85%;
        height: fit-content;
        font-size: 20px;
        background-size: cover;
        border-bottom: 10px;
        margin: -22px auto;
    }

    .keywords {
        margin: 15px auto;
        font-family: Georgia;
        font-weight: 200;
        padding: 5px 0;
        text-align: left;
        max-width: 85%;
    }

    #components-layout-demo-basic .test {
        white-space: nowrap;
        width: auto;
        max-width: 12em;
        overflow: hidden;
        font-size: 16px;
    }

    .details {
        margin-top: 20px;
        margin-left: 50px;
        width: 1100px;
        font-size: 18px;
        font-weight: 500;
        clear: both;
        text-align: justify;
        font-family: "Microsoft YaHei UI", serif;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .details .rowtit {
        display: inline-block;
        vertical-align: middle;
        padding-right: 5px;
        line-height: 26px;
        font-weight: bold;
    }

    .details .abstract-text {
        display: inline;
        color: #675850;
        line-height: 26px;
        font-weight: normal;
        text-align: justify;
        text-justify: inter-word;
    }

    .paper_url {
        text-decoration: none;
        color: #2440b3;
        width: 1100px;
        overflow: hidden;
    }

    .paper_url:hover {
        cursor: pointer;
        text-decoration: underline;
        color: #6aaddf
    }

    .test {
        white-space: nowrap;
        width: auto;
        max-width: 12em;
        overflow: hidden;
        text-overflow: ellipsis;
        font-family: Book Antiqua;
    }


    .keyword {
        height: 24px;
        max-width: 250px;
        padding-left: 10px;
        padding-right: 10px;
        margin-right: 5px;
        margin-left: 5px;
    }
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