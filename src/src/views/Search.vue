<template>

  <a-layout>
    <a-layout-header class="headtext">
      <div class="search">
        <a-input-group compact>
          <a-cascader
            :options="options"
            :allowClear="false"
            change-on-select 
            trigger="hover"
            v-model="searchClassify"
            expand-trigger="hover"
            style="width: 120px;" size="large"
            />
          <a-input v-on:keyup.enter.native="onSearch()" style="width: 30%;" placeholder="搜索你想要的" size="large" v-model="searchContent" />
          <a-button style="width: 80px;background-color: #9feaf9; font-size: 14px;" size="large" @click="onSearch()">搜索
          </a-button>
        </a-input-group>
      </div>
    </a-layout-header>
    <a-layout-content class="homemain">
      <div class="classify" style="margin-top:10px">
        <a-menu mode="horizontal" v-model="current">
          <a-menu-item style="width:180px;" key="paper" @click="changeTag('paper')">
            <a-icon type="book" />论文 </a-menu-item>
          <a-menu-item style="width:180px" key="fund" @click="changeTag('fund')">
            <a-icon type="reconciliation" />项目 </a-menu-item>
          <a-menu-item style="width:180px" key="user" @click="changeTag('user')">
            <a-icon type="user" />科研人员</a-menu-item>
        </a-menu>

      </div>
      <div class="content">
        <a-spin v-if="isSearchCompleted==false" size="large" style="margin-top:100px"/>
        <div v-for="(article,index) in paperResult" :key="index">
          <a-card  class="result" @mouseover="changeShowText(index)"
          :hoverable="true" v-if="current !=null && current[0]=='paper'&&index<20&&isSearchCompleted==true" @click="toPaper(article.id)">
            <div style="text-align:left">
              <a-row>
                <a-col :span="1"><a-icon type="book" /></a-col>
                <a-col :span="20" v-html="ruleTitle(article.title)" style="font-weight:700;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;"></a-col>
                <a-col  style="float:right;font-weight:700;">
                  <template v-if="article.n_citation">{{article.n_citation}}</template>
                  <template v-else>0</template>
                  {{'  citations'}}
                </a-col>
              </a-row>
              <p style="font-family:Times New Roman;font-weight:700;margin-top:8px">
                <template>
                  <div v-if="article.year && article.venue"><p style="display: -webkit-box;-webkit-box-orient: vertical;
                  -webkit-line-clamp: 4;overflow: hidden;">{{article.year+"  "}}{{article.venue.name}}</p></div>
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
                      <div v-html="ruleTitle(field)" class="test" style="text-overflow:ellipsis;"><a-icon style="padding-right:3px" type="experiment" />{{field}}</div>
                    </a-button>
                    <template v-if="index3 < article.keywords.length-1 && index3 < 2">{{'，'}}</template>
                  </template>
                </template>
              </p>
              <p v-html="ruleTitle(article.abstract)"
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
        <div v-for="(fund,index7) in fundResult" :key="index7+'fund'">
          <a-card class="result" :hoverable="true" v-if="current!=null && current[0]=='fund'&&index7<20&&isSearchCompleted==true" @click="toFund(fund.id)">
            <div style="text-align:left">
              <a-row>
                <a-col :span='1'>
                  <a-icon type="reconciliation" />
                </a-col>
                <a-col :span="23" v-html="ruleTitle(fund.title)" style="font-weight:700;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;">
                </a-col>
              </a-row>
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
              <p v-html="ruleTitle(fund.abstract)"
                style="font-family:Book Antiqua;margin-top:3px;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 4;overflow: hidden;">
              </p>
            </div>
          </a-card>
        </div>
        <div v-for="(author,index4) in authorResult" :key="index4+'author'">
          <a-card class="result" :hoverable="true" v-if="current!=null && current[0]=='user' && index4<20 && isSearchCompleted==true" @click="toScientist(author.id)">
            <div style="text-align:left">
              <a-row>
                <a-col :span="1"><a-icon type="user" /></a-col>
                <a-col :span="18" v-html="ruleTitle(author.name)" style="font-weight:700;"></a-col>
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
        <div v-if=" this.isSearched==true && this.isSearchCompleted==true ">
          <a-result v-if="((searchClassify1[0]=='all' && isCurrentNone()) || (current[0]=='user'&& this.authorResult.length==0) 
        || (current[0]=='paper' && this.paperResult.length==0) || (current[0]=='fund' && this.fundResult.length==0))"  sub-title="Sorry, the result you searched is empty." status="404" >
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
          <a-button  v-if="this.searchOffset>0 || (this.searchClassify1[0]=='all' && !isCurrentOffsetZero()) " @click="onChange(false)" size="large" type="primary" style="float:left;padding-left:20px;padding-right:20px;margin-right:30px"><a-icon type="left" /></a-button>
          <a-button disabled v-else size="large" type="primary" style="float:left;padding-left:20px;padding-right:20px;margin-right:30px"><a-icon type="left" /></a-button>
          <a-button v-if="judge1()" @click="onChange(true)" size="large" type="primary" style="padding-left:20px;padding-right:20px;"><a-icon type="right" /></a-button>
          <a-button disabled v-else size="large" type="primary" style="padding-left:20px;padding-right:20px;"><a-icon type="right" /></a-button>
        </template>
      </div>
      <!--<a-button @click="test"> test</a-button>-->
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
        currentHover:-1,
        showText:false,
        isSearched:false,
        searchClassify:['all'],//1:paer,2:fund,3:author
        searchClassify1:[],
        isSearchCompleted:true,
        paperResult:[],
        authorResult:[],
        fundResult:[],
        searchType: "title",
        searchContent: "",
        searchOffset:0,
        searchOffset_paper:0,
        searchOffset_author:0,
        searchOffset_fund:0,
        options: [
        {
          value:'all',
          label:'全部',
        },
        {
          value: 'author',
          label: '作者',
        },
        {
          value: 'paper',
          label: '论文',
          children: [
            {
              value: 'title',
              label: '标题',
            },
            {
              value: 'author',
              label: '作者',
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
        ],
      };
    },
    watch: {
    
    },
    updated() {},
    created() {
      if (this.$route.query.searchClassify)
      {
        this.searchClassify = this.$route.query.searchClassify;
        this.searchClassify1 = this.$route.query.searchClassify;
      }
      if (this.$route.query.searchContent)
        this.searchContent = this.$route.query.searchContent;
      if(this.$route.query.id)
      {
        this.searchContent=this.$route.query.name;
        this.searchClassify[0]='paper';
        this.searchClassify[1]='author';
        this.current=['paper'];
        this.search();
      }
      if(this.$route.query.searchClassify && this.$route.query.searchContent)
        this.search();
    },
    methods: {
      judge1(){
        return  (this.current[0]=='user'&& this.authorResult.length==20) 
          || (this.current[0]=='paper' && this.paperResult.length==20) || (this.current[0]=='fund' && this.fundResult.length==20)
      },
      getPubs(scientistId) {
        this.$http.get('https://gugooscholar-k5yn3ahzxq-df.a.run.app/author/' + scientistId + '/paper',
            {headers: {token: 'xx'}}
        ).then((res)=>{
            this.paperResult = res.data.data;
            this.isSearched=true;
            this.isSearchCompleted= true;
        }).catch((e)=>{
            console.log(e);
        });
      },
      getCurrentOffset(){
        if(this.searchClassify1[0]=='all'){
          if(this.current[0]=='paper')
              return this.searchOffset_paper;
            else if(this.current[0]=='fund')
              return this.searchOffset_fund;
            else
              return this.searchOffset_author;
        }
        else
          return this.searchOffset
      },
      onChange(isNext) 
      {
        if(isNext){
          if(this.searchClassify1[0]=='all')
          {
            if(this.current[0]=='paper')
              this.searchOffset_paper+=1;
            else if(this.current[0]=='fund')
              this.searchOffset_fund+=1;
            else
              this.searchOffset_author+=1;
          }
          else
            this.searchOffset+=1;
        }else{
          if(this.searchClassify1[0]=='all')
          {
            if(this.current[0]=='paper' && this.searchOffset_paper>0)
              this.searchOffset_paper-=1;
            else if(this.current[0]=='fund'&& this.searchOffset_fund>0)
              this.searchOffset_fund-=1;
            else if(this.current[0]=='user'&& this.searchOffset_author>0)
              this.searchOffset_author-=1;
          }
          else if(this.searchOffset>0)
            this.searchOffset-=1;
        }
        this.search();
      },
      isCurrentNone(){
        if(this.current[0]=='paper' && this.paperResult.length==0)
          return true;
        if(this.current[0]=='user' && this.authorResult.length==0)
          return true;
        if(this.current[0]=='fund' && this.fundResult.length==0)
          return true;
        return false;
      },
      isCurrentOffsetZero(){
        if(this.current[0]=='paper' && this.searchOffset_paper==0)
          return true;
        if(this.current[0]=='user' && this.searchOffset_author==0)
          return true;
        if(this.current[0]=='fund' && this.searchOffset_fund==0)
          return true;
        return false;
      },
      changeShowText (index1) {
        this.showText = true;
        this.currentHover=index1;
      },
      changeTag (tag) {
        if(this.searchClassify1[0]=='all')
        {
          this.current=[tag];
          console.log(this.current);
        }
      },
      ruleTitle(title_str) {
        let titleString = title_str;
        if (!titleString) {
          return '';
        }
        if (this.searchContent && this.searchContent.length > 0) {
          // 匹配关键字正则
          let replaceReg = new RegExp(this.searchContent, 'gi');
          // 高亮替换v-html值
          let findContent = new RegExp(this.searchContent,'i');
          let replaceString = '<span class="search-text">' + titleString.match(findContent) + '</span>';
          // 开始替换
          titleString = titleString.replace(replaceReg,replaceString);
        }
        return titleString;
      },
      handleChange(value) {
        this.searchType = value;
      },
      test() {
        console.log(this.judge1());
        console.log(this.current);
        console.log(this.paperResult.length);
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
      toFund(fundId) {
        let routeData = this.$router.resolve({
          path: '/fund',
          query: {
            id: fundId,
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
      onSearch(){
        this.searchOffset=0;
        this.searchOffset_paper=0;
        this.searchOffset_author=0;
        this.searchOffset_fund=0;
        this.search();
      },

      search() {
        if(this.searchContent=='' || this.searchContent==null)
          return
        if(this.searchClassify[0]=='' || this.searchClassify[0]==null || this.searchClassify.length==0)
          return
        this.isSearchCompleted=false;
        this.isSearched=true;
        this.searchClassify1=this.searchClassify;
        if(this.searchClassify1[0] == 'all' && this.getCurrentOffset()==0)
        {
          this.current=['paper'];
          this.searchAuthor(true);
          this.searchPaper('title',true);
          this.searchFund('title',true);
        }
        else if(this.searchClassify1[0] == 'author' || 
        (this.searchClassify1[0] == 'all' && this.current[0]=='user' && this.getCurrentOffset()>0))
        {
          this.current=['user'];
          this.searchAuthor(false);
        }else if(this.searchClassify1[0] == 'paper'
        || (this.searchClassify1[0] == 'all' && this.current[0]=='paper' && this.getCurrentOffset()>0))
        {
          this.current=['paper'];
          if(!this.searchClassify1[1])
          {
            this.searchPaper('title',false);
          }
          else if(this.searchClassify1[1]!='author')
            this.searchPaper(this.searchClassify1[1],false);
          else
            this.getPubs(this.$route.query.id);
        }else{
          this.current=['fund'];
          if(!this.searchClassify1[1])
          {
            this.searchFund('title',false);
          }
          else
            this.searchFund(this.searchClassify1[1],false);
        }
      },
      searchAuthor(isAll) {
        let offset=this.searchOffset;
        if(this.searchClassify1[0]=='all')
        {
          offset=this.searchOffset_author;
        }
        this.$axios({
          method: 'get',
          url: 'https://gugooscholar-k5yn3ahzxq-df.a.run.app/author/search',
          params: {
            words: this.searchContent,
            offset: offset*10
          }
        }).then((res)=>{
                this.authorResult = res.data.data;
                if(!isAll)
                  this.isSearchCompleted=true;
            }).catch((e)=>{
                console.log(e);
            });
      },
      searchPaper(searchType,isAll) {
        let offset=this.searchOffset;
        if(this.searchClassify1[0]=='all')
        {
          offset=this.searchOffset_paper;
        }
        this.$axios({
          method: 'get',
          url: 'https://gugooscholar-k5yn3ahzxq-df.a.run.app/paper/search',
          params: {
            words: this.searchContent,
            type:searchType,
            offset: offset*10
          }
        }).then((res)=>{
                  this.paperResult = res.data.data;
                  if(!isAll)
                    this.isSearchCompleted=true;
                  else
                    this.isSearchCompleted=true;
            }).catch((e)=>{
                console.log(e);
            });
      },
      searchFund(searchType,isAll) {
        let offset=this.searchOffset;
        if(this.searchClassify1[0]=='all')
        {
          offset=this.searchOffset_fund;
        }
        this.$axios({
          method: 'get',
          url: 'https://gugooscholar-k5yn3ahzxq-df.a.run.app/fund/search',
          params: {
            words: this.searchContent,
            type:searchType,
            offset: offset*10
          }
        }).then((res)=>{
              this.fundResult = res.data.data;
              if(!isAll)
                this.isSearchCompleted=true;      
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
  .content >>> .search-text
  {
    color:#f7c94a
  }
</style>