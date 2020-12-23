<template>
    <div class="w">
        <a-layout id="components-layout-demo-basic" style="background:#2c2e3b">
            <!--            <a-layout-content v-if="isEmpty">当前暂无数据！</a-layout-content>-->
            <a-layout-content style="margin:48px 16% 0 16%">
                <div class="topic" v-if="searchResult.title!=null" style="max-width:calc(100% - 32%)">
                    {{searchResult.title}}
                    <a-tooltip>
                        <template slot="title">点击收藏论文</template>
                        <a-icon type="star" v-show="!subscribe" @click="subscribePaper(true)"/>
                    </a-tooltip>
                    <a-tooltip>
                        <template slot="title">点击取消收藏</template>
                        <a-popconfirm
                                title="您确定要取消收藏吗?"
                                ok-text="是的"
                                cancel-text="我再想想"
                                @confirm="subscribePaper(false)"
                        >
                            <a-icon style="color: yellow" type="star" theme="filled" v-show="subscribe"/>
                        </a-popconfirm>
                    </a-tooltip>
                </div>
                <div style="overflow:auto;max-width:calc(100% - 32%)" v-if="searchResult.authors!=null">
                    <div style="margin:24px 0 0 0" v-for="(author,i) in searchResult.authors"
                        :key="author.length">

                        <div class="avatar">
                            <a-avatar :size="48" class="profile" :style="colorList[i%6]">{{author.name[0].toUpperCase()}}</a-avatar>
                            <span class="au_name">{{author.name}}</span>
                        </div>
                    </div>
                </div>
                
                <div style="overflow:auto;max-width:calc(100% - 32%);text-align:left">
                    <div style="font-size:19px;color: #b3cbd0;font-weight:700;height:25px;flex:1;margin-bottom:12px;"
                        v-if="searchResult.keywords!=null">关键词
                    </div>

                    <template v-for="(keyword,index3) in searchResult.keywords">
                        <span style="display: inline-block; height:25px;max-width:250px;padding-left:10px;padding-right:10px; margin:5px 5px; background-color: #74b1be;border-radius: 4px;
                        " :key="index3">
                            <div class="test" style="text-overflow:ellipsis;">
                                {{keyword}}
                            </div>
                        </span>
                        <template v-if="index3 < searchResult.keywords.length-1 && index3 < 2">{{'&nbsp;'}}</template>
                    </template>
                </div>

                <div style="overflow:auto;max-width:calc(100% - 32%);text-align:left;color:white;padding-top: 10px; border-radius: 10px;margin-bottom:48px">
                    <template>
                        <span style="font-size:19px;color: #b3cbd0;font-weight:700;height:25px;flex:1"
                          v-if="searchResult.keywords!=null">详细信息</span>
                          <a-row style="margin-top:12px">
                            <a-col :span="6">
                                <div style="font-size:16px" v-if="searchResult.venue.name!=null"><b>所属期刊 </b> {{searchResult.venue.name}}</div>
                                </a-col>
                            <a-col :span="6">
                                <div style="font-size:16px" v-if="searchResult.issue!=null"><b>所属期数 </b> {{searchResult.issue}}</div>
                                </a-col>
                            <a-col :span="6">
                                <div style="font-size:16px" v-if="searchResult.volume!=null"> <b>所属卷数 </b> {{searchResult.volume}}</div>
                            </a-col>
                            <a-col :span="6">
                                <div style="font-size:16px" v-if="searchResult.n_citation!=null"><b>被引用量 </b> {{searchResult.n_citation}}</div>
                                </a-col>
                        </a-row>
                        <a-row>
                            <a-col :span="6">
                                <div style="font-size:16px" v-if="searchResult.lang!=null"><b>语言 </b> {{searchResult.lang}}</div>
                            </a-col>
                            <a-col :span="6">
                                <div style="font-size:16px" v-if="searchResult.year!=null"><b>出版年份 </b> {{searchResult.year}}</div>
                            </a-col>
                            <a-col :span="6">
                                <div style="font-size:16px" v-if="searchResult.doi!=null"><b>DOI </b> {{searchResult.doi}}</div>
                            </a-col>
                            <a-col :span="6">
                                <div style="font-size:16px" v-if='searchResult.page_end!=""&&searchResult.page_start!=""'>
                                    <b>页码 </b>
                                    {{searchResult.page_start}}-{{searchResult.page_end}}
                                </div>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col :span="6">
                                <div style="font-size:16px" v-if="searchResult.pdf!=null" @click="open(searchResult.pdf)" ><b>原文链接 </b> {{searchResult.pdf}}</div>
                            </a-col>
                            <a-col :span="6">    
                                <div style="font-size:16px" v-if="searchResult.url!=null"><div><b>相关链接 </b></div>
                                    <span :href="searchResult.url" class="paper_url" v-for="(url,i) in searchResult.url"
                                        :key="url.length"
                                        @click=open(searchResult.url[i])>
                                        <span v-if="i===searchResult.url.length-1"
                                            class="paper_url">{{searchResult.url[i]}}</span>
                                        <span v-if="i!==searchResult.url.length-1" class="paper_url">{{searchResult.url[i]}}<br></span>
                                    </span>
                                </div>
                            </a-col>
                            <a-col :span="6">
                                <div style="font-size:16px" v-if="searchResult.issn!=null"><b>ISSN </b> {{searchResult.issn}}</div>
                            </a-col>
                            <a-col :span="6">
                                <div style="font-size:16px" v-if="searchResult.isbn!=null"><b>ISBN </b> {{searchResult.isbn}}</div>
                            </a-col>
                          </a-row>
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

            <!--            <div class="details" v-if="searchResult.abstract!=null">-->
            <!--                <span class="rowtit">摘要：</span>-->
            <!--                <span class="abstract-text">{{searchResult.abstract}}</span>-->
            <!--            </div>-->
            <!--            <div class="details" v-if="searchResult.keywords!=null">-->
            <!--                <span class="rowtit">关键词：</span>-->
            <!--                <span class="abstract-text" v-for="(keyword,i) in searchResult.keywords" :key="keyword.length">-->
            <!--                    <span v-if="i===searchResult.keywords.length-1">{{keyword}}</span>-->
            <!--                    <span v-else-if="i!==keyword.length-1">{{keyword}}, </span>-->
            <!--                </span>-->
            <!--            </div>-->
            <!--            <div class="details" v-if="searchResult.doi!=null">-->
            <!--                <span class="rowtit">DOI：</span>-->
            <!--                <span class="abstract-text">{{searchResult.doi}}</span>-->
            <!--            </div>-->
            <!--            <div class="details" v-if="searchResult.n_citation!=null">-->
            <!--                <span class="rowtit">被引量：</span>-->
            <!--                <span class="abstract-text">{{searchResult.n_citation}}</span>-->
            <!--            </div>-->
            <!--            <div class="details" v-if="searchResult.pdf!=null">-->
            <!--                <span class="rowtit">原文链接：</span>-->
            <!--                <span :href="searchResult.pdf" class="paper_url"-->
            <!--                      @click=open(searchResult.pdf)>{{searchResult.pdf}}</span>-->
            <!--            </div>-->
            <!--            <div class="details" v-if="searchResult.url!=null">-->
            <!--                <span class="rowtit">相关链接：</span>-->
            <!--                <span :href="searchResult.url" class="paper_url" v-for="(url,i) in searchResult.url" :key="url.length"-->
            <!--                      @click=open(searchResult.url[i])>-->
            <!--                    <span v-if="i===searchResult.url.length-1" class="paper_url">{{searchResult.url[i]}}</span>-->
            <!--                    <span v-if="i!==searchResult.url.length-1" class="paper_url">{{searchResult.url[i]}}<br></span>-->
            <!--                </span>-->
            <!--            </div>-->
            <!--            <div class="details" v-if="searchResult.venue!=null">-->
            <!--                <span class="rowtit">所属期刊：</span>-->
            <!--                <span class="abstract-text">{{searchResult.venue.name}}</span>-->
            <!--            </div>-->
            <!--            <div class="details" v-if="searchResult.year!=null">-->
            <!--                <span class="rowtit">出版年份：</span>-->
            <!--                <span class="abstract-text">{{searchResult.year}}</span>-->
            <!--            </div>-->
            <!--            <div class="details" v-if="searchResult.volume!=null">-->
            <!--                <span class="rowtit">所属卷数：</span>-->
            <!--                <span class="abstract-text">{{searchResult.volume}}</span>-->
            <!--            </div>-->
            <!--            <div class="details" v-if="searchResult.issue!=null">-->
            <!--                <span class="rowtit">所属期数：</span>-->
            <!--                <span class="abstract-text">{{searchResult.issue}}</span>-->
            <!--            </div>-->
            <!--            <div class="details" v-if='searchResult.page_end!=""&&searchResult.page_start!=""'>-->
            <!--                <span class="rowtit">页码：</span>-->
            <!--                <span class="abstract-text">{{searchResult.page_start}}-{{searchResult.page_end}}</span>-->
            <!--            </div>-->
            <!--            <div class="details" v-if="searchResult.issn!=null">-->
            <!--                <span class="rowtit">ISSN：</span>-->
            <!--                <span class="abstract-text">{{searchResult.issn}}</span>-->
            <!--            </div>-->
            <!--            <div class="details" v-if="searchResult.isbn!=null">-->
            <!--                <span class="rowtit">ISBN：</span>-->
            <!--                <span class="abstract-text">{{searchResult.isbn}}</span>-->
            <!--            </div>-->
            <!--            <div class="details" v-if="searchResult.lang!=null">-->
            <!--                <span class="rowtit">语言：</span>-->
            <!--                <span class="abstract-text">{{searchResult.lang}}</span>-->
            <!--            </div>-->
        </div>
    </div>

</template>

<script>
    //import author_avatar from "../../components/author_avatar";

    export default {
        name: 'paper',
        components: {
            //author_avatar
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
            let paperId = this.$route.query.id;
            console.log(paperId);
            // let id = "1e60ZHlVd6xQjz9FX7j2"
            let search_url = "https://gugooscholar-k5yn3ahzxq-df.a.run.app/paper/" + paperId
            // while(this.search!==''){
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
                    console.log(this.searchResult.authors);
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
        color: rgb(120,177,190);
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