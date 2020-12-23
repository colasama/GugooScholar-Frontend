<template>
    <div class="w">
        <a-layout id="components-layout-demo-basic" style="background:#2c2e3b">
            <!--            <a-layout-content v-if="isEmpty">当前暂无数据！</a-layout-content>-->
            <a-layout-content style="margin-left:16%;margin-top:48px">
                <div class="topic" v-if="searchResult.title!=null">
                    {{searchResult.title}}
                    <a-icon type="star" v-show="!subscribe" @click="subscribePaper"/>
                    <a-icon style="color: yellow" type="star" theme="filled" v-show="subscribe"
                            @click="subscribe=false"/>
                </div>
                <div>
                    <div style="margin:24px 0 0 0" v-for="(author,i) in searchResult.authors"
                        :key="author.length">
                        <author_avatar 
                                :name=author.name :color="colorList[i%6]"></author_avatar>
                    </div>
                </div>
                <a-divider/>

                <div style="text-align:left">
                    <span style="font-size:19px;color: #b3cbd0;font-weight:700;height:25px;flex:1"
                          v-if="searchResult.keywords!=null">关键词：</span>
                    <a-list :grid="{ gutter: 16, column: 4 }" :data-source="searchResult.keywords">
                        <a-list-item slot="renderItem" title="关键词" slot-scope="item">
                        <a-button type="primary" class="keyword">
                            <div class="test">{{item}}</div>
                        </a-button>
                        </a-list-item>
                    </a-list>
                    <template v-if="index3 < searchResult.keywords.length-1 && index3 < 2">{{'&nbsp;'}}</template>
                </div>

                <div style="text-align:left;color:white;padding-top: 10px; max-width: 60%; margin:0 auto 20px;border-radius: 10px;">
                    <template>
                        <a-descriptions title="详细信息" layout="vertical">
                            <a-descriptions-item label="DOI" v-if="searchResult.doi!=null">
                                <span class="abstract-text">{{searchResult.doi}}</span>
                            </a-descriptions-item>
                            <a-descriptions-item label="被引量" v-if="searchResult.n_citation!=null">
                                <span class="abstract-text">{{searchResult.n_citation}}</span>
                            </a-descriptions-item>
                            <a-descriptions-item label="原文链接" v-if="searchResult.pdf!=null">
                                <span :href="searchResult.pdf" class="paper_url"
                                      @click=open(searchResult.pdf)>{{searchResult.pdf}}</span>
                            </a-descriptions-item>
                            <a-descriptions-item label="相关链接" v-if="searchResult.url!=null">
                                <span :href="searchResult.url" class="paper_url" v-for="(url,i) in searchResult.url"
                                      :key="url.length"
                                      @click=open(searchResult.url[i])>
                                    <span v-if="i===searchResult.url.length-1"
                                          class="paper_url">{{searchResult.url[i]}}</span>
                                    <span v-if="i!==searchResult.url.length-1" class="paper_url">{{searchResult.url[i]}}<br></span>
                                </span>
                            </a-descriptions-item>
                            <a-descriptions-item class="details" label="所属期刊" v-if="searchResult.venue!=null">
                                <span class="abstract-text">{{searchResult.venue.name}}</span>
                            </a-descriptions-item>
                            <a-descriptions-item label="出版年份" v-if="searchResult.year!=null">
                                <span class="abstract-text">{{searchResult.year}}</span>
                            </a-descriptions-item>
                            <a-descriptions-item label="所属卷数" v-if="searchResult.volume!=null&&searchResult.volume!=''">
                                <span class="abstract-text">{{searchResult.volume}}</span>
                            </a-descriptions-item>
                            <a-descriptions-item label="所属期数" v-if="searchResult.issue!=null&&searchResult.issue!=''">
                                <span class="abstract-text">{{searchResult.issue}}</span>
                            </a-descriptions-item>
                            <a-descriptions-item class="details" label="页码"
                                                 v-if='searchResult.page_end!=""&&searchResult.page_start!=""'>
                                <span class="abstract-text">{{searchResult.page_start}}-{{searchResult.page_end}}</span>
                            </a-descriptions-item>
                            <a-descriptions-item class="details" label="ISSN" v-if="searchResult.issn!=null">
                                <span class="abstract-text">{{searchResult.issn}}</span>
                            </a-descriptions-item>
                            <a-descriptions-item class="details" label="ISBN" v-if="searchResult.isbn!=null">
                                <span class="abstract-text">{{searchResult.isbn}}</span>
                            </a-descriptions-item>
                            <a-descriptions-item class="details" label="语言" v-if="searchResult.lang!=null">
                                <span class="abstract-text">{{searchResult.lang}}</span>
                            </a-descriptions-item>
                        </a-descriptions>
                    </template>
                </div>
            </a-layout-content>
        </a-layout>
        <div style="margin: 50px 0">
            <div style="border-radius: 5px;text-align:left">
                <a-card style="width: 80%;margin:auto;">
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
    import author_avatar from "../../components/author_avatar";

    export default {
        name: 'paper',
        components: {
            author_avatar
        },
        data() {
            return {
                subscribe: false,
                searchResult: {},
                colorList: ["background: #87d068", "background: #c9bcd6", "background:#edadad",
                    "background:#108ee9", "background: #ff5500", "background: #2db7f5"],
                loading: true,
                // {"title": "马保国现象：一个传统武术江湖人士的人设特征解读",
                //     "abstract": "文章运用社会学理论对马保国现象进行分析。马保国是自媒体时代的新型江湖艺人,他将自我塑造成沉浮于市井的文、武兼备之人,并对自身武" +
                // "学品格做出深度描述,打造出全知全能的武师形象。除了对自己的尚武业绩做出虚饰性宣" +
                // "传,还试图占据道德制高点,对古典完人形象进行再度扮演。他塑造的海归武师角色,更像是走向社会表演的非尚武类武者," +
                // "他并未真正走进中国传统武术,也并非武术高手,却竭力在各种场合扮演武林高人的角色," +
                // "最终在实战中败下阵来。\"马保国事件\"可能促进中国传统武术的内部革新,成为重新审视中国传统武术的契机。",
                //         "authors":["耗子尾汁","嘤国大理石","九十多公斤","八十多公斤","赖佐田","马老师","婷婷"],
                //     "keywords": ["马保国现象","江湖艺人","社会角色","传统武术","现代体育"],
                //     "doi": "10.15877/j.cnki.nsic.20201009.004",
                //     "n_citation": "233",
                //     "pdf": "https://kns.cnki.net/KXReader/Detail?PlatForm=kdoc&TIMESTAMP=637421042801093750&DBCODE=CJFD&TABLEName=CJFDAUTO&FileName=LJTB202005012&RESULT=1&SIGN=KImDfrMgmsANqw9qdedfVFPO2FM%3d",
                //     "url": "",
                //     "venue": "体育学研究",
                //     "year": "2020",
                //     "volume": "",
                //     "issue": "05",
                //     "page_start": "87",
                //     "page_end": "94",
                //     "issn": " ",
                //     "isbn": " ",
                //     "lang": "中文"},
                //     content: '',
                //     isEmpty: false,
            }
        },
        methods: {
            subscribePaper() {
                let id = this.searchResult.id;
                this.axios({
                    headers: {
                        token:'xx',
                    },
                    method: 'post',
                    url: 'https://gugooscholar-k5yn3ahzxq-df.a.run.app/subscribe/paper',
                    data: {
                        'paper_id': id
                    }
                }).then(
                    (res) => {
                        let result = res.data;
                        console.log(result);
                        this.subscribe = true;
                        this.$message.success("收藏成功");
                    }
                ).catch((e) => {
                    console.log(e);
                });
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
</style>