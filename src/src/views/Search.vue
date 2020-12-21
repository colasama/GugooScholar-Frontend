<template>

  <a-layout>
    <a-layout-header class="headtext">
      <div class="search">
        <a-input-group compact>
          <a-cascader
            :options="options"
            :allowClear="false"
            trigger="hover"
            v-model="searchClassify"
            expand-trigger="hover"
            placeholder="选择"
            style="width: 120px;" size="large"
            />
          <a-input v-on:keyup.enter.native="search()" style="width: 30%;" placeholder="搜索你想要的" size="large" v-model="searchContent" />
          <a-button style="width: 80px;background-color: #9feaf9; font-size: 14px;" size="large" @click="onSearch">搜索
          </a-button>
        </a-input-group>
      </div>
    </a-layout-header>
    <a-layout-content class="homemain">
      <div class="classify" style="margin-top:10px">
        <a-menu mode="horizontal" v-model="this.current">
          <a-menu-item style="width:180px;" key="paper">
            <a-icon type="book" />论文 </a-menu-item>
          <a-menu-item style="width:180px" key="fund">
            <a-icon type="reconciliation" />项目 </a-menu-item>
          <a-menu-item style="width:180px" key="user">
            <a-icon type="user" />科研人员</a-menu-item>
        </a-menu>

      </div>
      <div class="content">
        <a-spin v-if="isSearchCompleted==false" size="large" style="margin-top:100px"/>
        <div v-for="(article,index) in paperResult" :key="index">
          <a-card class="result" :hoverable="true" v-if="searchClassify1[0]=='paper'&&index<20&&isSearchCompleted==true" @click="toPaper(article.id)">
            <div style="text-align:left">
              <p style="font-weight:700;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;">
                <a-icon type="book" />&#12288;{{article.title}}
                <template>
                  <div style="float:right">{{article.n_citation}}{{'  citations'}}</div>
                </template>
              </p>
              <p style="font-family:Times New Roman;font-weight:700;margin-top:8px">
                <template>
                  <div v-if="article.year && article.venue"><p style="display: -webkit-box;-webkit-box-orient: vertical;
                  -webkit-line-clamp: 4;overflow: hidden;">{{article.year+"  "}}{{article.venue.name}}</p></div>
                </template>
              </p>
              <p style="margin-top:3px;font-weight:100;font-family:Times New Roman;font-size:14px">
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
                      <div class="test" style="text-overflow:ellipsis;"><a-icon style="padding-right:3px" type="experiment" />{{field}}</div>
                    </a-button>
                    <template v-if="index3 < article.keywords.length-1 && index3 < 2">{{'，'}}</template>
                  </template>
                </template>
              </p>
              <p
                style="font-family:Book Antiqua;margin-top:3px;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 4;overflow: hidden;">
                <template>
                  {{article.abstract}}
                </template>
              </p>
            </div>
          </a-card>
        </div>
        <div v-for="(fund,index7) in fundResult" :key="index7+'fund'">
          <a-card class="result" :hoverable="true" v-if="searchClassify1[0]=='fund'&&index7<20&&isSearchCompleted==true" @click="toPaper(fund.id)">
            <div style="text-align:left">
              <p style="font-weight:700;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;">
                <a-icon type="reconciliation" />&#12288;{{fund.title}}
              </p>
              <p style="font-family:Times New Roman;font-weight:700;margin-top:8px">
                <template>
                  <div v-if="fund.start_year && fund.end_year">{{fund.start_year+"--"}}{{fund.end_year}}</div>
                </template>
              </p>
              <p style="margin-top:3px;font-weight:100;font-family:Times New Roman;font-size:14px">
                  <template >{{fund.author.name}}</template>
              </p>
              <p style="margin-top:3px;font-family:Georgia;font-weight:200;">
                <a-button  v-if="fund.type" type="primary" style="height:25px;max-width:250px;padding-left:5px;padding-right:5px;" >
                  <div class="test" style="text-overflow:ellipsis;"><a-icon style="padding-right:3px" type="experiment" />{{fund.type}}</div>
                </a-button>
              </p>
              <p
                style="font-family:Book Antiqua;margin-top:3px;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 4;overflow: hidden;">
                <template>
                  {{fund.abstract}}
                </template>
              </p>
            </div>
          </a-card>
        </div>
        <div v-for="(author,index4) in authorResult" :key="index4+'author'">
          <a-card class="result" :hoverable="true" v-if="searchClassify1[0]=='author' && index4<20 && isSearchCompleted==true">
            <div style="text-align:left">
              <p style="font-weight:700;">
                <a-icon type="user" />&#12288;{{author.name}}
                <template>
                  <div style="float:right">{{author.n_citation}}{{'  citations'}}</div>
                </template>
              </p>
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
        <div v-if=" this.isSearched==true && this.isSearchCompleted==true ">
          <a-result v-if="((searchClassify1[0]=='author'&& this.authorResult.length==0) 
        || (searchClassify1[0]=='paper' && this.paperResult.length==0) || (searchClassify1[0]=='fund' && this.fundResult.length==0))"  sub-title="Sorry, the result you searched is empty." status="404" >
            <template #icon>
              <a-icon type="smile" theme="twoTone" />
            </template>
            <template #extra>
            </template>
          </a-result>
        </div>
      </div>
      <div v-if="isSearched&&isSearchCompleted==true
      " style="margin-top:30px;margin-left:28%;width:78%;backgound:black">
        <template>
          <!--<a-pagination v-model="searchOffset" :total="20" show-less-items @change="onChange()"/>-->
          <a-button  v-if="this.searchOffset>0 " @click="onChange(false)" size="large" type="primary" style="float:left;padding-left:20px;padding-right:20px;margin-right:30px"><a-icon type="left" /></a-button>
          <a-button disabled v-else size="large" type="primary" style="float:left;padding-left:20px;padding-right:20px;margin-right:30px"><a-icon type="left" /></a-button>
          <a-button v-if="(searchClassify1[0]=='author'&& this.authorResult.length==20) 
          || (searchClassify1[0]=='paper' && this.paperResult.length==20) || (searchClassify1[0]=='fund' && this.fundResult.length==20)" @click="onChange(true)" size="large" type="primary" style="padding-left:20px;padding-right:20px;"><a-icon type="right" /></a-button>
          <a-button disabled v-else size="large" type="primary" style="padding-left:20px;padding-right:20px;"><a-icon type="right" /></a-button>
        </template>
      </div>
    </a-layout-content>
  </a-layout>

</template>
<script>
  // @ is an alias to /src
  export default {
    name: "search",
    components: {

    },
    data() {
      return {
        current:['paper'],
        memberName: "",
        comma: ", ",
        isSearched:false,
        searchClassify:[],//1:paer,2:fund,3:author
        searchClassify1:[],
        isSearchCompleted:true,
        paperResult:[],
        authorResult:[],
        fundResult:[],
        searchType: "title",
        searchContent: "",
        searchOffset:0,
        options: [
        {
          value: 'paper',
          label: '论文',
          children: [
            {
              value: 'title',
              label: '标题',
            },
            {
              value: 'keywords',
              label: '关键词',
            },
            {
              value: 'abstract',
              label: '摘要',
            },
          ],
        },
        {
          value: 'fund',
          label: '项目',
          children: [
            {
              value: 'title',
              label: '标题',
            },
            {
              value: 'desc',
              label: '描述',
            },
            {
              value: 'abstract',
              label: '摘要',
            },
          ],
        },
        {
          value: 'author',
          label: '作者',
        },
        ],
      };
    },
    watch: {

    },
    updated() {},
    mounted() {
      if (this.$route.query.searchClassify)
      {
        this.searchClassify = this.$route.query.searchClassify;
        this.searchClassify1[1] = this.$route.query.searchClassify;
      }
      if (this.$route.query.searchContent)
        this.searchContent = this.$route.query.searchContent;
      if(this.$route.query.searchClassify && this.$route.query.searchContent)
        this.search();
    },
    methods: {
      handleChange(value) {
        this.searchType = value;
      },
      test() {
        console.log("searchClassify1[0]:"+this.searchClassify1[0]);
        console.log("fundResult.length:"+this.fundResult.length);
        console.log("isSearched:"+this.isSearched);
        console.log("isCOmplete:"+this.isSearchCompleted);
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
      onChange(isNext) 
      {
        if(isNext){
          this.searchOffset+=1;
        }else{
          if(this.searchOffset>0)
            this.searchOffset-=1;
        }
        this.search();
      },
      onSearch(){
        this.searchOffset=0;
        this.search();
      },
      search() {
        if(this.searchContent==''||this.searchContent==null)
          return
        if(this.searchClassify[0]=='' || this.searchClassify[0]==null || this.searchClassify.length==0)
          return
        this.isSearchCompleted=false;
        this.isSearched=true;
        this.searchClassify1=this.searchClassify;
        if(this.searchClassify1[0] == 'author')
        {
          this.current=['user'];
          this.searchAuthor();
        }else if(this.searchClassify1[0] == 'paper')
        {
          this.current=['paper'];
          this.searchPaper();
        }else{
          this.current=['fund'];
          this.searchFund();
        }
      },
      searchAuthor() {
        this.$axios({
          method: 'get',
          url: 'https://gugooscholar-k5yn3ahzxq-df.a.run.app/author/search',
          params: {
            words: this.searchContent,
            offset: this.searchOffset*10
          }
        }).then((res)=>{
                this.authorResult = res.data.data;
                this.isSearchCompleted=true;
            }).catch((e)=>{
                console.log(e);
            });
      },
      searchPaper() {
        this.$axios({
          method: 'get',
          url: 'https://gugooscholar-k5yn3ahzxq-df.a.run.app/paper/search',
          params: {
            words: this.searchContent,
            type:this.searchClassify[1],
            offset: this.searchOffset*10
          }
        }).then((res)=>{
                this.paperResult = res.data.data;
                this.isSearchCompleted=true;
            }).catch((e)=>{
                console.log(e);
            });
      },
      searchFund() {
        this.$axios({
          method: 'get',
          url: 'https://gugooscholar-k5yn3ahzxq-df.a.run.app/fund/search',
          params: {
            words: this.searchContent,
            type:this.searchClassify[1],
            offset: this.searchOffset*10
          }
        }).then((res)=>{
                this.fundResult = res.data.data;
                this.isSearchCompleted=true;
                console.log(this.isSearchCompleted);
            }).catch((e)=>{
                console.log(e);
            });
      },
    },
    
  };
</script>
<style scoped>
  * {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .headtext {
    width: 100%;
    height: 120px;
    line-height: 80px;
    color: #9feaf9;
    background-color: black;
  }

  .homemain {
    width: 100%;
    text-align: center;
    background-color: white;
  }

  .homemain .content {
    margin-top: 20px
  }

  .homemain .content .result {
    width: 700px;
    margin: 0px auto;
    margin-bottom: 10px
  }

  /*.homemain .img {
    width: 250px;
    height: 250px;
    margin: 40px auto 40px;
    background: url(../assets/logo_s.png) no-repeat;
  }*/

  .headtext .search {
    width: 100%;
    height: 50px;
    margin: 0 auto;
    margin-top: 35px;
  }

  .keywords {
    color: #9feaf9;
  }

  .keywords .keyword {
    margin: 0 3px;
  }
  .test
  {
    white-space:nowrap; 
    width:auto; 
    max-width: 12em;
    overflow:hidden; 
  }
</style>