<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
        <a-menu-item key="paper" @click="changeTag('paper')">
          <a-icon type="book" />
          <span>收藏论文</span>
        </a-menu-item>
        <a-menu-item key="scientist" @click="changeTag('scientist')">
          <a-icon type="user" />
          <span>收藏科研人员</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content
          :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <div v-for="(article,index) in subscribePaper" :key="index">
          <a-card  class="result" v-if="current ==='paper'">
            <div style="text-align:left">
              <a-row>
                <a-col :span="20" style="font-weight:700;">
                  <a-icon type="book" />&#12288;
                  <span style="cursor:pointer" @click="toPaper(article.id)">{{article.title}}</span>&#12288;
                  <a-icon type="star" v-show="!(article.isSub == null || article.isSub === true)" @click="subscribeP(article.id,index)"/>
                  <a-icon type="star" theme="filled" v-show="article.isSub == null || article.isSub === true" @click="cancelSubscribePaper(article.id,index)"/>
                </a-col>
                <a-col  style="float:right;font-weight:700;">
                  <template v-if="article.n_citation">{{article.n_citation}}</template>
                  <template v-else>0</template>
                  {{'  citations'}}
                </a-col>
              </a-row>
              <p style="font-family:Times New Roman;font-weight:700;margin-top:8px">
                <template>
                </template>
              </p>
              <p style="margin-top:3px;font-weight:100;font-family:Times New Roman;font-size:14px">
                <template v-if="article.authors.length>0">{{"By"+"  "}}</template>
                <template v-for="(author,index2) in article.authors">
                  <template v-if="index2 < 10 && index2 < article.authors.length">{{author.name}}</template>
                  <template v-if="index2 < 9 && index2 < article.authors.length-1">{{'，'}}</template>
                </template>
              </p>
              <p style="margin-top:3px;font-family:Georgia;font-weight:200;">
                <template v-for="(field,index3) in article.keywords">
                  <template v-if="index3 < 3" style="float:left">
                    <a-button   type="primary" style="height:25px;max-width:250px;padding-left:5px;padding-right:5px;
                    " :key="index3+'fey'">
                      <div v-html="field" class="test" style="text-overflow:ellipsis;"><a-icon style="padding-right:3px" type="experiment" />{{field}}</div>
                    </a-button>
                    <template v-if="index3 < article.keywords.length-1 && index3 < 2">{{'，'}}</template>
                  </template>
                </template>
              </p>
              <p v-html="article.abstract"
                 style="font-family:Book Antiqua;margin-top:3px;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 4;overflow: hidden;">
              </p>
            </div>
            <div slot="actions" v-if="index==currentHover && showText==true">
              <a-row>
                <a-col :span="18" >
                </a-col>
                <a-col :span="2" >
                  <a-icon key="setting" type="star" />
                </a-col>
                <a-col :span="2">
                  <a-icon key="edit" type="read" />
                </a-col>
                <a-col :span="2">
                  <a-icon key="ellipsis" type="share-alt" />
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
                  <a-icon type="user" />&#12288;
                  <span style="cursor:pointer" @click="toScientist(author.id)">{{author.name}}</span>&#12288;
                  <a-icon type="star" v-show="!(author.isSub == null || author.isSub === true)" @click="subscribeS(author.id,index4)"/>
                  <a-icon type="star" theme="filled" v-show="author.isSub == null || author.isSub === true" @click="cancelSubscribeScientist(author.id,index4)"/>
                </a-col>
                <a-col style="float:right;font-weight:700;">{{author.n_citation}}{{'  citations'}}</a-col>
              </a-row>
              <p style="font-family:Times New Roman;font-weight:700;margin-top:8px">
                <template>
                  <div v-if="author.h_index" style="display:inline-block;text-align:center;border-style:solid;border-width:1px;border-color:#66CCCC;border-radius:3px;width:70px">
                    <a-row>
                      <a-col :span="8" style="background-color:#66CCCC;color:white">
                        {{"H"}}
                      </a-col>
                      <a-col :span="16">
                        {{author.h_index}}
                      </a-col>
                    </a-row>
                  </div>
                  <div v-if="author.h_index" style="display:inline-block;margin-left:10px;text-align:center;border-style:solid;border-width:1px;border-color:	#D8D8D8;border-radius:3px;width:70px">
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
              <p v-if="author.orgs" style="font-family:Book Antiqua;margin-top:3px;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;">
                <template>
                  <a-icon type="bank" />{{"  "+author.orgs}}
                </template>
              </p>
            </div>
          </a-card>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
      current:'paper',
      subscribePaper: [],
      subscribeScientist: [],
    };
  },
  created() {
    //test
    // this.$axios({
    //   method: 'get',
    //   url: 'https://gugooscholar-k5yn3ahzxq-df.a.run.app/author/search',
    //   params: {
    //     words: 'a',
    //     offset: 0
    //   }
    // }).then((res)=>{
    //   this.subscribeScientist = res.data.data;
    // }).catch((e)=>{
    //   console.log(e);
    // });
    // this.$axios({
    //   method: 'get',
    //   url: 'https://gugooscholar-k5yn3ahzxq-df.a.run.app/paper/search',
    //   params: {
    //     words: 'a',
    //     type:'title',
    //     offset: 0
    //   }
    // }).then((res)=>{
    //   this.subscribePaper = res.data.data;
    // }).catch((e)=>{
    //   console.log(e);
    // });

    //inference
    this.$axios({
      method: 'post',
      url: 'https://gugooscholar-k5yn3ahzxq-df.a.run.app/subscribe/show/paper',
      headers: {
        token: this.$store.state.token,
      },
    }).then((res)=>{
      this.subscribePaper = res.data.data;
    }).catch((e)=>{
      console.log(e);
    });
    this.$axios({
      method: 'post',
      url: 'https://gugooscholar-k5yn3ahzxq-df.a.run.app/subscribe/show/author',
      headers: {
        token: this.$store.state.token,
      },
    }).then((res)=>{
      this.subscribeScientist = res.data.data;
    }).catch((e)=>{
      console.log(e);
    });

  },
  methods: {
    changeTag (tag) {
      this.current = tag
    },
    subscribeP(id,index) {
      this.$axios({
        method: 'post',
        url: 'https://gugooscholar-k5yn3ahzxq-df.a.run.app/subscribe/paper',
        headers: {
          token: this.$store.state.token,
        },
        data: {
          paper_id: id,
        },
      }).then(()=>{
        this.subscribePaper[index].isSub = true;
        this.$forceUpdate()
        this.$message.success("已收藏");
      }).catch((e)=>{
        console.log(e);
      });
    },
    subscribeS(id,index) {
      this.$axios({
        method: 'post',
        url: 'https://gugooscholar-k5yn3ahzxq-df.a.run.app/subscribe/author',
        headers: {
          token: this.$store.state.token,
        },
        data: {
          author_id: id,
        },
      }).then(()=>{
        this.subscribeScientist[index].isSub = true;
        this.$forceUpdate()
        this.$message.success("已收藏");
      }).catch((e)=>{
        console.log(e);
      });
    },
    cancelSubscribePaper(id,index) {
      this.$axios({
        method: 'post',
        url: 'https://gugooscholar-k5yn3ahzxq-df.a.run.app/subscribe/cancel/paper',
        headers: {
          token: this.$store.state.token,
        },
        data: {
          paper_id: id,
        },
      }).then(()=>{
        this.subscribePaper[index].isSub = false;
        this.$forceUpdate()
        this.$message.info("已取消收藏");
      }).catch((e)=>{
        console.log(e);
      });
    },
    cancelSubscribeScientist(id,index) {
      this.$axios({
        method: 'post',
        url: 'https://gugooscholar-k5yn3ahzxq-df.a.run.app/subscribe/cancel/author',
        headers: {
          token: this.$store.state.token,
        },
        data: {
          author_id: id,
        },
      }).then(()=>{
        this.subscribeScientist[index].isSub = false;
        this.$forceUpdate()
        this.$message.info("已取消收藏");
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
      })
      window.open(routeData.href, '_blank')
    },
    toScientist(scientistId) {
      let routeData = this.$router.resolve({
        path: '/scientist/show/'+scientistId,
      })
      window.open(routeData.href, '_blank')
    },
  }
};
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>