<template>

  <a-layout>
    <a-layout-header class="headtext">Gugu lives matter!</a-layout-header>
    <a-layout-content class="homemain">
      <div class="img"></div>
      <div class="search">
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
          <a-input style="width: 40%;" placeholder="搜索你想要的" size="large" v-model="searchContent" />
          <a-button style="width: 80px;background-color: #9feaf9; font-size: 14px;" size="large" @click="onSearch">搜索
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
        searchType: "摘要",
        searchContent: "haha",
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
    margin: 40px auto 40px;
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
</style>