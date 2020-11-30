<template>

  <a-layout>
    <a-layout-header class="headtext">
      <div class="search">
          <a-input-group compact>
            <a-select default-value="主题" style="width: 120px;" size="large">
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
          <a-input style="width: 30%;" placeholder="搜索你想要的" size="large" />
          <a-button style="width: 80px;background-color: #9feaf9; font-size: 14px;" size="large">搜索</a-button>
        </a-input-group>
      </div>
    </a-layout-header>
    <a-layout-content class="homemain">
        <div class="classify" style="margin-top:10px">
            <a-menu v-model="current" mode="horizontal">
              <a-menu-item style="width:180px;"> <a-icon type="mail" />论文 </a-menu-item>
              <a-menu-item style="width:180px"> <a-icon type="appstore" />专利 </a-menu-item>
              <a-menu-item style="width:180px"><a-icon type="appstore" />科研人员</a-menu-item>
            </a-menu>
        </div>
        <div class="content" style="margin-top:20px">
            <a-card hoverable="true" title="Default size card" style="width: 700px;margin:0px auto;margin-bottom:10px">
                <a slot="extra" href="#">more</a>
                <p>card content</p>
                <p>card content</p>
                <p>card content</p>
            </a-card>
            <a-card title="Small size card" style="width:700px;margin:0px auto">
                <a slot="extra" href="#">more</a>
                <p>card content</p>
                <p>card content</p>
                <p>card content</p>
            </a-card>
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
        memberName: "",
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
      onSearch() {
        this.$router.push("/404");
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
  
</style>