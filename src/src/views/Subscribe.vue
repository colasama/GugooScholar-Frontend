<template>
    <a-layout style="minHeight:auto">
        <a-layout-content style="padding: 50px 0 50px 0;margin:0 16% 0 16%;max-width:68%">
            <a-layout class="subscribeBox">
                <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
                    <a-menu mode="inline" :default-selected-keys="['1']" style="height: 100%">
                        <a-menu-item key="paper" @click="changeTag('paper')">
                            <a-icon type="book"/>
                            <span>收藏论文</span>
                        </a-menu-item>
                        <a-menu-item key="scientist" @click="changeTag('scientist')">
                            <a-icon type="user"/>
                            <span>收藏科研人员</span>
                        </a-menu-item>
                    <a-menu-item key="fund" @click="changeTag('fund')">
                        <a-icon type="fund"/>
                        <span>收藏项目</span>
                    </a-menu-item>
                    </a-menu>
                </a-layout-sider>
                <a-layout-content>
                    <nothing-found title="收藏空空如也..." 
                        v-if="current === 'paper' && subscribePaper == false ||
                              current === 'scientist' && subscribeScientist == false ||
                              current === 'fund' && subscribeFund == false"/>

                    <div v-for="(article,index) in subscribePaper" :key="index">
                        <a-card class="result" v-if="current ==='paper'">
                            <div style="text-align:left">
                                <a-row>
                                    <a-col :span="20" style="font-weight:700;">
                                        <a-icon type="book"/>&#12288;
                                        <span style="cursor:pointer" @click="toPaper(article.id)">{{article.title}}</span>&#12288;
                                        <a-icon type="star" v-show="!(article.isSub == null || article.isSub === true)"
                                                @click="subscribeP(article.id,index)"/>
                                        <a-icon type="star" theme="filled"
                                                v-show="article.isSub == null || article.isSub === true"
                                                @click="cancelSubscribePaper(article.id,index)"/>
                                    </a-col>
                                    <a-col style="float:right;font-weight:700;">
                                        <template v-if="article.n_citation">{{article.n_citation}}</template>
                                        <template v-else>0</template>
                                        {{' citations'}}
                                    </a-col>
                                </a-row>
                                <p style="font-family:Times New Roman;font-weight:700;margin-top:8px">
                                    <template>
                                    </template>
                                </p>
                                <p style="margin-top:3px;font-weight:100;font-family:Times New Roman;font-size:14px">
                                    <template v-if="article.authors.length>0">{{"By"+" "}}</template>
                                    <template v-for="(author,index2) in article.authors">
                                        <template v-if="index2 < 10 && index2 < article.authors.length">{{author.name}}
                                        </template>
                                        <template v-if="index2 < 9 && index2 < article.authors.length-1">{{'，'}}</template>
                                    </template>
                                </p>
                                <p style="margin-top:3px;font-family:Georgia;font-weight:200;">
                                    <template v-for="(field,index3) in article.keywords">
                                        <template v-if="index3 < 3" style="float:left">
                                            <a-button type="primary" style="height:25px;max-width:250px;padding-left:5px;padding-right:5px;
                        " :key="index3+'fey'">
                                                <div v-html="field" class="test" style="text-overflow:ellipsis;">
                                                    <a-icon style="padding-right:3px" type="experiment"/>
                                                    {{field}}
                                                </div>
                                            </a-button>
                                            <template v-if="index3 < article.keywords.length-1 && index3 < 2">{{'，'}}
                                            </template>
                                        </template>
                                    </template>
                                </p>
                                <p v-html="article.abstract"
                                style="font-family:Book Antiqua;margin-top:3px;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 4;overflow: hidden;">
                                </p>
                            </div>
                            <div slot="actions" v-if="index==currentHover && showText==true">
                                <a-row>
                                    <a-col :span="18">
                                    </a-col>
                                    <a-col :span="2">
                                        <a-icon key="setting" type="star"/>
                                    </a-col>
                                    <a-col :span="2">
                                        <a-icon key="edit" type="read"/>
                                    </a-col>
                                    <a-col :span="2">
                                        <a-icon key="ellipsis" type="share-alt"/>
                                    </a-col>
                                </a-row>
                            </div>
                        </a-card>
                    </div>
                    <div v-for="(author,index4) in subscribeScientist" :key="index4+'author'">
                        <a-card class="result" v-if="current==='scientist'">
                            <div style="text-align:left">
                                <a-row>
                                    <a-col :span="20" style="font-weight:700;">
                                        <a-icon type="user"/>&#12288;
                                        <span style="cursor:pointer" @click="toScientist(author.id)">{{author.name}}</span>&#12288;
                                        <a-icon type="star" v-show="!(author.isSub == null || author.isSub === true)"
                                                @click="subscribeS(author.id,index4)"/>
                                        <a-icon type="star" theme="filled"
                                                v-show="author.isSub == null || author.isSub === true"
                                                @click="cancelSubscribeScientist(author.id,index4)"/>
                                    </a-col>
                                    <a-col style="float:right;font-weight:700;">{{author.n_citation}}{{' citations'}}
                                    </a-col>
                                </a-row>
                                <p style="font-family:Times New Roman;font-weight:700;margin-top:8px">
                                    <template>
                                        <div v-if="author.h_index"
                                            style="display:inline-block;text-align:center;border-style:solid;border-width:1px;border-color:#66CCCC;border-radius:3px;width:70px">
                                            <a-row>
                                                <a-col :span="8" style="background-color:#66CCCC;color:white">
                                                    {{"H"}}
                                                </a-col>
                                                <a-col :span="16">
                                                    {{author.h_index}}
                                                </a-col>
                                            </a-row>
                                        </div>
                                        <div v-if="author.h_index"
                                            style="display:inline-block;margin-left:10px;text-align:center;border-style:solid;border-width:1px;border-color:	#D8D8D8;border-radius:3px;width:70px">
                                            <a-row>
                                                <a-col :span="8" style="background-color:#B0B0B0;color:white">
                                                    {{"P"}}
                                                </a-col>
                                                <a-col :span="16">
                                                    {{author.n_pubs}}
                                                </a-col>
                                            </a-row>
                                        </div>
                                    </template>
                                </p>
                                <p v-if="author.orgs"
                                style="font-family:Book Antiqua;margin-top:3px;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;">
                                    <template>
                                        <a-icon type="bank"/>
                                        {{" "+author.orgs}}
                                    </template>
                                </p>
                            </div>
                        </a-card>
                    </div>

                    <div v-for="(article,index) in subscribeFund" :key="index">
                        <a-card class="result" v-if="current ==='fund'">
                            <div style="text-align:left">
                                <a-row>
                                    <a-col :span="20" style="font-weight:700;">
                                        <a-icon type="book"/>&#12288;
                                        <span style="cursor:pointer" @click="toFund(article.id)">{{article.title}}</span>&#12288;
                                        <a-icon type="star" v-show="!(article.isSub == null || article.isSub === true)"
                                                @click="subscribeF(article.id,index)"/>
                                        <a-icon type="star" theme="filled"
                                                v-show="article.isSub == null || article.isSub === true"
                                                @click="cancelSubscribeFund(article.id,index)"/>
                                    </a-col>
                                    <a-col style="float:right;font-weight:700;">
                                        {{'From '}}
                                        <template v-if="article.src">{{article.src}}</template>
                                        <template v-else>0</template>
                                    </a-col>
                                </a-row>
                                <p style="font-family:Times New Roman;font-weight:700;margin-top:8px">
                                    <template>
                                    </template>
                                </p>
                                <p style="margin-top:3px;font-weight:100;font-family:Times New Roman;font-size:14px">
                                    <template v-if="article.author.length>0">{{"By"+" "}}</template>
                                    <template>
                                        {{article.author.name}}
                                    </template>
                                </p>
                                <p v-html="article.abstract"
                                style="font-family:Book Antiqua;margin-top:3px;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 4;overflow: hidden;">
                                </p>
                            </div>
                            <div slot="actions" v-if="index==currentHover && showText==true">
                                <a-row>
                                    <a-col :span="18">
                                    </a-col>
                                    <a-col :span="2">
                                        <a-icon key="setting" type="star"/>
                                    </a-col>
                                    <a-col :span="2">
                                        <a-icon key="edit" type="read"/>
                                    </a-col>
                                    <a-col :span="2">
                                        <a-icon key="ellipsis" type="share-alt"/>
                                    </a-col>
                                </a-row>
                            </div>
                        </a-card>
                    </div>
                </a-layout-content>
            </a-layout>
        </a-layout-content>
    </a-layout>
</template>
<script>
    import NothingFound from '../components/nothing_found'

    export default {
        inject: ['reload'],
        components: {
            'nothing-found': NothingFound
        },
        data() {
            return {
                collapsed: false,
                current: 'paper',
                subscribePaper: [],
                subscribeScientist: [],
                subscribeFund: []
            };
        },
        created() {
            this.$axios({
                method: 'post',
                url: 'https://gugooscholar-k5yn3ahzxq-df.a.run.app/subscribe/show/paper',
                headers: {
                    token: this.$store.state.token,
                },
            }).then((res) => {
                this.subscribePaper = res.data.data;
            }).catch((e) => {
                console.log(e);
            });
            this.$axios({
                method: 'post',
                url: 'https://gugooscholar-k5yn3ahzxq-df.a.run.app/subscribe/show/author',
                headers: {
                    token: this.$store.state.token,
                },
            }).then((res) => {
                this.subscribeScientist = res.data.data;
            }).catch((e) => {
                console.log(e);
            });
          this.$axios({
            method: 'post',
            url: 'https://gugooscholar-k5yn3ahzxq-df.a.run.app/subscribe/show/fund',
            headers: {
              token: this.$store.state.token,
            },
          }).then((res) => {
            this.subscribeFund = res.data.data;
          }).catch((e) => {
            console.log(e);
          });
        },
        methods: {
            changeTag(tag) {
                this.current = tag
            },
            subscribeP(id, index) {
                this.$axios({
                    method: 'post',
                    url: 'https://gugooscholar-k5yn3ahzxq-df.a.run.app/subscribe/paper',
                    headers: {
                        token: this.$store.state.token,
                    },
                    data: {
                        paper_id: id,
                    },
                }).then(() => {
                    this.subscribePaper[index].isSub = true;
                    this.$forceUpdate()
                    this.$message.success("已收藏");
                }).catch((e) => {
                    console.log(e);
                });
            },
            subscribeS(id, index) {
                this.$axios({
                    method: 'post',
                    url: 'https://gugooscholar-k5yn3ahzxq-df.a.run.app/subscribe/author',
                    headers: {
                        token: this.$store.state.token,
                    },
                    data: {
                        author_id: id,
                    },
                }).then(() => {
                    this.subscribeScientist[index].isSub = true;
                    this.$forceUpdate()
                    this.$message.success("已收藏");
                }).catch((e) => {
                    console.log(e);
                });
            },
          subscribeF(id, index) {
            this.$axios({
              method: 'post',
              url: 'https://gugooscholar-k5yn3ahzxq-df.a.run.app/subscribe/fund',
              headers: {
                token: this.$store.state.token,
              },
              data: {
                fund_id: id,
              },
            }).then(() => {
              this.subscribeFund[index].isSub = true;
              this.$forceUpdate()
              this.$message.success("已收藏");
            }).catch((e) => {
              console.log(e);
            });
          },
            cancelSubscribePaper(id, index) {
                this.$axios({
                    method: 'post',
                    url: 'https://gugooscholar-k5yn3ahzxq-df.a.run.app/subscribe/cancel/paper',
                    headers: {
                        token: this.$store.state.token,
                    },
                    data: {
                        paper_id: id,
                    },
                }).then(() => {
                    this.subscribePaper.splice(index, 1);
                    this.$forceUpdate()
                    this.$message.info("已取消收藏");
                }).catch((e) => {
                    console.log(e);
                });
            },
            cancelSubscribeScientist(id, index) {
                this.$axios({
                    method: 'post',
                    url: 'https://gugooscholar-k5yn3ahzxq-df.a.run.app/subscribe/cancel/author',
                    headers: {
                        token: this.$store.state.token,
                    },
                    data: {
                        author_id: id,
                    },
                }).then(() => {
                    this.subscribeScientist.splice(index, 1);
                    this.$forceUpdate()
                    this.$message.info("已取消收藏");
                }).catch((e) => {
                    console.log(e);
                });
            },
          cancelSubscribeFund(id, index) {
            this.$axios({
              method: 'post',
              url: 'https://gugooscholar-k5yn3ahzxq-df.a.run.app/subscribe/cancel/fund',
              headers: {
                token: this.$store.state.token,
              },
              data: {
                fund_id: id,
              },
            }).then(() => {
              this.subscribeFund.splice(index, 1);
              this.$forceUpdate()
              this.$message.info("已取消收藏");
            }).catch((e) => {
              console.log(e);
            });
          },
            toPaper(paperid) {
                let routeData = this.$router.resolve({
                    path: '/paper',
                    query: {
                        id: paperid,
                    }
                })
                window.open(routeData.href, '_blank')
            },
            toScientist(scientistId) {
                let routeData = this.$router.resolve({
                    path: '/scientist/show/' + scientistId,
                })
                window.open(routeData.href, '_blank')
            },
          toFund(fundId) {
            let routeData = this.$router.resolve({
              path: '/fund',
              query: {
                id: fundId,
              }
            })
            window.open(routeData.href, '_blank')
          },
        }
    };
</script>
<style scoped>
.subscribeBox{
  padding: 24px 0; 
  background: #fff;
  box-shadow: 0 0 5px hsla(0, 0%, 0%, 0.1);
}

#components-layout-demo-fixed-sider .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
