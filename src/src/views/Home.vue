<template>
  <a-layout>
    <a-layout-header class="headtext">论文在做了，在做了</a-layout-header>
    <a-layout-header class="homemain"></a-layout-header>
    <a-layout-content style="background:#fff">
      <div class="homemain">
        <div class="img"></div>
        <div class="search">
          <a-input-group compact>
            <a-cascader :options="options" :allowClear="false" trigger="hover" v-model="searchClassify" change-on-select 
              expand-trigger="hover"  style="width: 120px;" size="large" />
            <a-input v-on:keyup.enter.native="onSearch()" placeholder="搜索你想要的" style="width: 40%;" size="large"
              v-model="searchContent" />
            <!--a-input style="width: 40%;background-color: #3A585F;border-color:#3A585F;" placeholder="搜索你想要的" size="large" v-model="searchContent" /-->
            <a-button class="searchbutton" size="large" @click="onSearch">搜索
            </a-button>
          </a-input-group>
        </div>
        <div class="keywords" style="margin-bottom:48px">
          <a-icon type="fire"></a-icon>
          <b> 热点：</b> 
          <a-button type="primary" class="keyword" @click="searchKeyword(0)"><div class="test">{{keywords[0]}}</div></a-button>
          <a-button type="primary" class="keyword" @click="searchKeyword(1)"><div class="test">{{keywords[1]}}</div></a-button>
          <a-button type="primary" class="keyword" @click="searchKeyword(2)"><div class="test">{{keywords[2]}}</div></a-button>
          <a-button type="primary" class="keyword" @click="searchKeyword(3)"><div class="test">{{keywords[3]}}</div></a-button>
          <a-button type="primary" class="keyword" @click="searchKeyword(4)"><div class="test">{{keywords[4]}}</div></a-button>
          <a-button type="primary" class="keyword" @click="searchKeyword(5)"><div class="test">{{keywords[5]}}</div></a-button>
          <a-button type="primary" class="keyword" @click="searchKeyword(6)"><div class="test">{{keywords[6]}}</div></a-button>
          <a-button type="primary" class="keyword" @click="searchKeyword(7)"><div class="test">{{keywords[7]}}</div></a-button>
          <a-button type="primary" class="keyword" @click="searchKeyword(8)"><div class="test">{{keywords[8]}}</div></a-button>
          <a-button type="primary" class="keyword" @click="searchKeyword(9)"><div class="test">{{keywords[9]}}</div></a-button>
        </div>

        <div class="sum">
           <a-row type="flex" justify="center">
            <a-col :span="4" class="suminfo">
              <div style="font-size:24px;color:white;text-align:center">8,657,431</div>
              <div style="font-size:18px;color:white;text-align:center">论文数量</div>
            </a-col>
            <a-col :span="4" class="suminfo">
              <div style="font-size:24px;color:white;text-align:center">3,141,874</div>
              <div style="font-size:18px;color:white;text-align:center">科研人员</div>
            </a-col>
            <a-col :span="4" class="suminfo">
              <div style="font-size:24px;color:white;text-align:center">11,203</div>
              <div style="font-size:18px;color:white;text-align:center">科研项目</div>
            </a-col>
            <a-col :span="4" class="suminfo">
              <div style="font-size:24px;color:white;text-align:center">412,546,129</div>
              <div style="font-size:18px;color:white;text-align:center">引用关系</div>
            </a-col>
          </a-row>
        </div>
      </div>
      
      <div style="margin:0 320px 0 320px;min-width:calc(100% - 640px)">
        <a-row>
          <a-col :span="12" class="rank">
            <div class="rank-name">
              <a-icon style="margin-right: 12px;" type="file" />热门论文
            </div>
            <div v-for="paper in rankData[0]" :key="paper.key">
              <div class="rank-content" v-if="paper.key < 11">
                <div style="height: 40px;">
                  <div class="seq" style="background-color: gold;font-size: 20px; color: red;" v-if="paper.key == 1">1
                  </div>
                  <div class="seq" style="background-color: #c8d2e2;font-size: 20px; color: blue;"
                    v-else-if="paper.key == 2">2</div>
                  <div class="seq" style="background-color: #d5b59f;font-size: 20px; color: white;"
                    v-else-if="paper.key == 3">3</div>
                  <div class="seq" style="background-color: gray; color: white;" v-else> {{paper.key}} </div>
                  <div class="title rankLink" @click="toPaper(paper.id)"> {{paper.title}} </div>
                </div>
                <div class="description">
                  <span class="rankLink" v-for="author in paper.authors" :key="author" @click="toAuthor(author.id)">
                    {{author.name}};&nbsp; </span>
                  <span> {{paper.year}} </span>
                </div>
                <div class="citation"> 被引量：{{paper.n_citation}} </div>
              </div>
            </div>
          </a-col>
          
          <a-col :span="12" class="rank">
            <div class="rank-name">
              <a-icon style="margin-right: 12px;" type="team" />热门学者
            </div>
            <div v-for="author in rankData[1]" :key="author.key">
              <div class="rank-content" v-if="author.key < 11">
                <div style="height: 40px;">
                  <div class="seq" style="background-color: gold;font-size: 20px; color: red;" v-if="author.key == 1">1
                  </div>
                  <div class="seq" style="background-color: #c8d2e2;font-size: 20px; color: blue;"
                    v-else-if="author.key == 2">2</div>
                  <div class="seq" style="background-color: #d5b59f;font-size: 20px; color: white;"
                    v-else-if="author.key == 3">3</div>
                  <div class="seq" style="background-color: gray; color: white;" v-else> {{author.key}} </div>
                  <div class="title rankLink" @click="toAuthor(author.id)"> {{author.name}} </div>
                </div>
                <div class="description">
                  <!-- <span class="rankLink" v-for="author in paper.authors" :key="author" @click="toAuthor(author.id)">
                    {{author.name}};&nbsp; </span>
                  <span> {{paper.year}} </span> -->
                  <span>发表了{{author.n_pubs}}篇论文，被引用了{{author.n_citation}}次</span>
                </div>
                <div class="citation"> H指数：{{author.h_index}} </div>
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
    </a-layout-content>
  </a-layout>

</template>
<script>
  // @ is an alias to /src
  export default {
    name: "Home",
    components: {

    },
    data() {
      return {
        searchType: "abstract",
        searchContent: "",
        searchClassify: ['all'],
        options: [
          {
            value: 'all',
            label: '全部'
          },{
            value: 'paper',
            label: '论文',
            children: [{
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
            children: [{
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
        keywords: [
          "新冠肺炎",
          "机器学习",
          "心理健康",
          "大数据",
          "人工智能",
          "机械",
          "电子信息",
          "数据挖掘",
          "AI赋能教育",
          "FMRI",
          // "关键词11",
          // "关键词12",
          // "关键词13",
          // "关键词14",
          // "关键词15",
        ],
        rankColumns: [
          [{
              title: '标题',
              dataIndex: 'title',
              key: 'title',
              scopedSlots: {
                customRender: 'paperTitle'
              },
              ellipsis: true,
              align: 'center',
            },
            {
              title: '作者',
              dataIndex: 'authors',
              key: 'authors',
              scopedSlots: {
                customRender: 'authors'
              },
              width: 200,
              ellipsis: true,
              align: 'center',
            },
            // {
            //   title: '来源',
            //   dataIndex: 'venue',
            //   key: 'venue',
            // },

            {
              title: '被引量',
              key: 'n_citation',
              dataIndex: 'n_citation',
              align: 'center',
              ellipsis: true,
            },
          ],
          [{
              dataIndex: 'name',
              key: 'name',
              title: '姓名',
              align: 'center',
              scopedSlots: {
                customRender: 'name'
              },
              // width: 300,
              ellipsis: true,
            },
            // {
            //   title: '所属机构',
            //   dataIndex: 'orgs',
            //   key: 'orgs',
            // },
            {
              title: 'H指数',
              dataIndex: 'h_index',
              key: 'h_index',
              // width: 100,
              align: 'center',
              ellipsis: true,
            },
            {
              title: '论文数',
              key: 'n_pubs',
              dataIndex: 'n_pubs',
              align: 'center',
              ellipsis: true,
            },
            {
              title: '被引量',
              key: 'n_citation',
              dataIndex: 'n_citation',
              align: 'center',
              ellipsis: true,
            },
          ],
        ],
        rankData: [

        ],
      };
    },
    watch: {

    },
    updated() {},
    mounted() {
      this.getAuthorRank();
      this.getPaperRank();
    },
    methods: {
      onSearch() {
        console.log(this.searchContent);
        if (this.searchContent != "") {
          this.$router.push({
            name: "search",
            query: {
              searchClassify: this.searchClassify,
              searchContent: this.searchContent
            }
          });
        } else
          this.$router.push('/search');
      },
      searchKeyword(num) {
        this.$router.push({
          name: "search",
          query: {
            searchClassify: ['paper', 'keywords'],
            searchContent: this.keywords[num],
          }
        });
      },
      toAuthor(id) {
        this.$router.push("/scientist/show/" + id);
      },
      toPaper(id) {
        this.$router.push({
          path: "/paper",
          query: {
            id: id
          }
        });
      },
      getAuthorRank() {
        var that = this;
        this.loading2 = true;
        this.$axios({
          method: 'get',
          url: 'https://gugooscholar-k5yn3ahzxq-df.a.run.app/author/rank',
          params: {
            order_by: "h_index"
          }
        }).then(
          response => {
            var list = response.data["data"];
            for (let index = 0; index < list.length; index++) {
              list[index]["key"] = index + 1;
            }
            that.$set(that.rankData, 1, list);
            console.log("authorList!");
            that.loading2 = false;
          },
          err => {
            console.log(err);
          }).catch((error) => {
          console.log(error);
        });
      },
      getPaperRank() {
        var that = this;
        this.loading1 = true;
        this.$axios({
          method: 'get',
          url: 'https://gugooscholar-k5yn3ahzxq-df.a.run.app/paper/rank',
          params: {
            order_by: "n_citation"
          }
        }).then(
          response => {
            var list = response.data["data"];
            for (let index = 0; index < list.length; index++) {
              list[index]["key"] = index + 1;
              if (list[index]["url"] == null) {
                list[index]["url"] = ["null"];
              }
            }
            that.$set(that.rankData, 0, list);
            console.log("paperList!");
            that.loading1 = false;
          },
          err => {
            console.log(err);
          }).catch((error) => {
          console.log(error);
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
    height: 80px;
    text-align: center;
    line-height: 80px;
    color: #9feaf9;
    background-color: black;
    font-size: 14px;
    font-weight: 400;
  }

  .homemain {
    width: 100%;
    text-align: center;
    background-color: #2c2e3b;
    padding-bottom: 36px;
  }

  .homemain .img {
    width: 1080px;
    height: 282px;
    margin: 0 auto 48px;
    background: url(../assets/banner_1080.png) no-repeat;
  }

  .homemain .search {
    width: 100%;
    height: 64px;
    margin: 0 auto;
  }

  .keywords {
    color: #9feaf9;
  }

  .keywords .keyword {
    height:20px;
    max-width:250px;
    padding-left:10px;
    padding-right:10px;
    margin-right:5px;
    margin-left:5px;
  }

  .searchbutton {
    width: 80px;
    font-size: 14px;
  }

  .searchbutton_old {
    width: 80px;
    font-size: 14px;
    color: white;
    background-color: #3A585F;
    border-color: #3A585F;
  }

  .rank {
    margin-top: 24px;
  }

  .rank .rank-name {
    height: 80px;
    text-align: center;
    line-height: 80px;
    color: #4078c0;
    font-size: 28px !important;
    font-weight: 400;
  }

  .rank .rank-content {
    position: relative;
    width: 90%;
    margin: 10px auto;
    border: 2px solid #f3f3f2;
    height: 90px;
    text-align: left;
  }

  .rank .rank-content .seq {
    display: inline-block;
    height: 40px;
    width: 40px;
    border-radius: 20px;
    text-align: center;
    line-height: 40px;
    vertical-align: top;
    margin-left: 10px;
    margin-top: 10px;
  }

  .rank .rank-content .title {
    display: inline-block;
    width: 500px;
    height: 40px;
    line-height: 40px;
    font-size: 25px;
    font-weight: 500;
    vertical-align: top;
    margin-left: 10px;
    margin-top: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .rank .rank-content .rankLink:hover {
    color: #20bcdb;
    cursor: pointer;
  }

  .rank .rank-content .description {
    width: 500px;
    height: 40px;
    line-height: 40px;
    margin-left: 60px;
    margin-top: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .rank .rank-content .citation {
    position: absolute;
    right: 20px;
    top: 20px;
  }

  .test{
    white-space:nowrap; 
    width:auto; 
    max-width: 12em;
    overflow:hidden; 
    text-overflow:ellipsis;
    font-family:Book Antiqua;
  }

  .suminfo{
    width:150px;
    height:64px;
    background: rgb(73,96,106);
    color:white;
    margin:0 24px 0 24px;
  }

  .sum >>> .ant-row > div {
    background: transparent;
    margin:0 320px 0 320px;
    min-width:calc(100% - 640px);
    border: 0;
  }
</style>