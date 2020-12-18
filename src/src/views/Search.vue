<template>

  <a-layout>
    <a-layout-header class="headtext">
      <div class="search">
        <a-input-group compact>
          <a-select v-model="searchType" style="width: 120px;" size="large" @change="handleChange" title="篇名">
            <a-select-option value="title">
              篇名
            </a-select-option>
            <a-select-option value="abstract">
              摘要
            </a-select-option>
            <a-select-option value="keywords">
              关键词
            </a-select-option>
            <a-select-option value="author">
              作者
            </a-select-option>
          </a-select>
          <a-input style="width: 30%;" placeholder="搜索你想要的" size="large" v-model="searchContent" />
          <a-button style="width: 80px;background-color: #9feaf9; font-size: 14px;" size="large" @click="search">搜索
          </a-button>
        </a-input-group>
      </div>
    </a-layout-header>
    <a-layout-content class="homemain">
      <div class="classify" style="margin-top:10px">
        <a-menu mode="horizontal" v-model="this.current">
          <a-menu-item style="width:180px;" key="paper">
            <a-icon type="book" />论文 </a-menu-item>
          <a-menu-item style="width:180px" key="patent">
            <a-icon type="reconciliation" />专利 </a-menu-item>
          <a-menu-item style="width:180px" key="user">
            <a-icon type="user" />科研人员</a-menu-item>
        </a-menu>

      </div>
      <div class="content">
        <a-spin v-if="isSearchCompleted==false" size="large" style="margin-top:100px"/>
        <div v-for="(article,index) in paperResult" :key="index">
          <a-card class="result" :hoverable="true" v-if="isAuthor==false&&index<10&&isSearchCompleted==true">
            <div style="text-align:left">
              <p style="font-weight:700;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;">
                <a-icon type="book" />&#12288;{{article.title}}
                <template>
                  <div style="float:right">{{article.n_citation}}{{'  citations'}}</div>
                </template>
              </p>
              <p style="font-family:Times New Roman;font-weight:700;margin-top:8px">
                <template>
                  <div v-if="article.year && article.venue">{{article.year+"  "}}{{article.venue.name}}</div>
                </template>
              </p>
              <p style="margin-top:3px;font-weight:100;font-family:Times New Roman;font-size:14px">
                <template v-for="(author,index2) in article.authors">{{author.name}}
                  <template v-if="index2 < article.authors.length-1">{{'，'}}</template>
                </template>
              </p>
              <p style="margin-top:3px;font-family:Georgia;font-weight:200;">
                <template v-for="(field,index3) in article.keywords">
                  <template v-if="index3 < 3" style="float:left">
                    <a-button   type="primary" style="height:25px;max-width:250px;padding-left:5px;padding-right:5px;
                    " :key="index3">
                      <div class="test" style="text-overflow:ellipsis;">{{field}}</div>
                    </a-button>
                    <template v-if="index3 < article.keywords.length-1">{{'，'}}</template>
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

        <div v-for="(author,index4) in authorResult" :key="index4+'author'">
          <a-card class="result" :hoverable="true" v-if="isAuthor==true && index4<10 && isSearchCompleted==true">
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
      </div>
      <div v-if="isSearched&&isSearchCompleted==true" style="margin-top:30px">
        <template>
          <!--<a-pagination v-model="searchOffset" :total="20" show-less-items @change="onChange()"/>-->
          <a-button  @click="onChange(false)" size="large" type="primary" style="padding-left:20px;padding-right:20px;margin-right:30px">last</a-button>
          <a-button v-if="this.authorResult" @click="onChange(true)" size="large" type="primary" style="padding-left:20px;padding-right:20px;">next</a-button>
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
        current:["paper"],
        memberName: "",
        comma: ", ",
        isSearched:false,
        isAuthor:false,
        isSearchCompleted:true,
        paperResult:[],
        authorResult:[],
        searchType: "title",
        searchContent: "",
        searchOffset:0
      };
    },
    watch: {

    },
    updated() {},
    mounted() {
      if (this.$route.query.searchType)
        this.searchType = this.$route.query.searchType;
      if (this.$route.query.searchContent)
        this.searchContent = this.$route.query.searchContent;
    },
    methods: {
      handleChange(value) {
        this.searchType = value;
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
      search() {
        if(this.searchContent==''||this.searchContent==null)
          return
        this.isSearchCompleted=false;
        if(this.searchType == 'author')
        {
          this.current=["user"];
          this.searchAuthor();
        }else
        {
          this.current=["paper"];
          this.searchPaper();
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
                this.isSearched=true;
                this.isAuthor=true;
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
            type:this.searchType,
            offset: this.searchOffset*10
          }
        }).then((res)=>{
                this.paperResult = res.data.data;
                this.isSearched=true;
                this.isSearchCompleted=true;
                this.isAuthor=false;
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