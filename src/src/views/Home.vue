<template>

  <a-layout>
    <a-layout-header class="headtext">论文在做了，在做了</a-layout-header>
    <a-layout-header class="homemain"></a-layout-header>
    <a-layout-content >
    <div class="homemain">
      <div style="height:64px"/>
      <div class="img"></div>
      <!-- <a-button @click="showInfo">test</a-button> -->
      <div class="search"  style="margin-bottom:24px">
        <a-input-group compact>
          <a-select v-model="searchType" style="width: 120px;" size="large" @change="handleChange">
            <a-select-option value="主题">
              主题
            </a-select-option>
            <a-select-option value="摘要">
              摘要
            </a-select-option>
            <a-select-option value="关键词">
              关键词
            </a-select-option>
            <a-select-option value="篇名">
              篇名
            </a-select-option>
            <a-select-option value="全文">
              全文
            </a-select-option>
            <a-select-option value="作者">
              作者
            </a-select-option>
            <a-select-option value="分类号">
              分类号
            </a-select-option>
            <a-select-option value="学术领域">
              学术领域
            </a-select-option>
          </a-select>
          <a-input placeholder="搜索你想要的" style="width: 40%" size="large" v-model="searchContent" />
          <!--a-input style="width: 40%;background-color: #3A585F;border-color:#3A585F;" placeholder="搜索你想要的" size="large" v-model="searchContent" /-->
          <a-button class="searchbutton" size="large" @click="onSearch">搜索
          </a-button>
        </a-input-group>
      </div>
      <div class="keywords">
        <a-button type="link" class="keyword" @click="searchKeyword(0)">{{keywords[0]}}</a-button>
        <a-button type="link" class="keyword" @click="searchKeyword(1)">{{keywords[1]}}</a-button>
        <a-button type="link" class="keyword" @click="searchKeyword(2)">{{keywords[2]}}</a-button>
        <a-button type="link" class="keyword" @click="searchKeyword(3)">{{keywords[3]}}</a-button>
        <a-button type="link" class="keyword" @click="searchKeyword(4)">{{keywords[4]}}</a-button>
        <a-button type="link" class="keyword" @click="searchKeyword(5)">{{keywords[5]}}</a-button>
      </div>
      <div class="keywords">
        <a-button type="link" class="keyword" @click="searchKeyword(6)">{{keywords[6]}}</a-button>
        <a-button type="link" class="keyword" @click="searchKeyword(7)">{{keywords[7]}}</a-button>
        <a-button type="link" class="keyword" @click="searchKeyword(8)">{{keywords[8]}}</a-button>
        <a-button type="link" class="keyword" @click="searchKeyword(9)">{{keywords[9]}}</a-button>
      </div>
      <div class="keywords">
        <a-button type="link" class="keyword" @click="searchKeyword(10)">{{keywords[10]}}</a-button>
        <a-button type="link" class="keyword" @click="searchKeyword(11)">{{keywords[11]}}</a-button>
        <a-button type="link" class="keyword" @click="searchKeyword(12)">{{keywords[12]}}</a-button>
        <a-button type="link" class="keyword" @click="searchKeyword(13)">{{keywords[13]}}</a-button>
        <a-button type="link" class="keyword" @click="searchKeyword(14)">{{keywords[14]}}</a-button>
      </div>
      <div style="height:64px"/>
    </div>
    <div>
      <!--首页展示的内容-->
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
        memberName: "",
        searchType: "abstract",
        searchContent: "",
        keywords: [
          "关键词1",
          "关键词2",
          "关键词3",
          "关键词4",
          "关键词5",
          "关键词6",
          "关键词7",
          "关键词8",
          "关键词9",
          "关键词10",
          "关键词11",
          "关键词12",
          "关键词13",
          "关键词14",
          "关键词15",
        ]
      };
    },
    watch: {

    },
    updated() {},
    mounted() {

    },
    methods: {
      showInfo(){
        console.log(this.$store.state.token)
      },
      handleChange(value) {
        this.searchType = value;
      },
      onSearch() {
        console.log(this.searchContent);
        if (this.searchContent != "") {
          this.$router.push({
            name: "search",
            query: {
              searchType: this.searchType,
              searchContent: this.searchContent,
            }
          });
        }
      },
      searchKeyword(num) {
        this.$router.push({
          name: "search",
          query: {
            searchType: '关键词',
            searchContent: this.keywords[num],
          }
        });
      }
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
    background-color: #2f3141;
  }

  .homemain .img {
    width: 250px;
    height: 250px;
    margin: 0 auto 40px;
    background: url(../assets/logo_s.png) no-repeat;
  }

  .homemain .search {
    width: 100%;
    height: 50px;
    margin: 0 auto;
  }

  .keywords {
    color: #9feaf9;
  }

  .keywords .keyword {
    margin: 0 3px;
  }

  .searchbutton {
    width: 80px;
    font-size: 14px;
  }

  .searchbutton_old {
    width: 80px;
    font-size: 14px;
    color:white;
    background-color: #3A585F;
    border-color:#3A585F; 
  }
</style>