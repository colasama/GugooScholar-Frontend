<template>
  <a-layout>
    <a-layout-header class="headtext">
      <a-icon type="arrow-left" @click="toRankList" />&nbsp;&nbsp;{{rankNameList[rankType]}}</a-layout-header>
    <a-layout-content>
      <a-table :columns="rankColumns[rankType]" :data-source="rankData[rankType]" :loading="loading"
        class="rank-content">
        <div slot="url" slot-scope="url">
          <div style="width: 100px; margin: 0 auto;" v-if="url[0]==='null'">无全文链接</div>
          <div v-else>
            <div v-for="link in url" :key="link">
              <a-button style="width: 100px;margin: 10px auto;" v-if="getArrayIndex(url,link) < 3"
                @click="download(link)">全文链接{{1+getArrayIndex(url,link)}}</a-button>
            </div>
          </div>
        </div>
      </a-table>
      <!-- <a-button @click="magic">点击有惊喜</a-button> -->
      <!-- <a-button @click="getAuthorRank">getAuthorRank</a-button> -->
    </a-layout-content>
  </a-layout>
</template>
<script>
  // @ is an alias to /src
  export default {
    name: "Rank",
    components: {

    },
    data() {
      return {
        loading: false,
        rankType: 0,
        rankNameList: [
          "科研人员排行榜",
          "论文排行榜",
        ],
        rankColumns: [
          [{
              dataIndex: 'name',
              key: 'name',
              title: '姓名'
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
            },
            {
              title: '论文数',
              key: 'n_pubs',
              dataIndex: 'n_pubs',
            },
            {
              title: '被引量',
              key: 'n_citation',
              dataIndex: 'n_citation'
            },
          ],
          [{
              title: '标题',
              dataIndex: 'title',
              key: 'title',
            },
            {
              title: '作者',
              dataIndex: 'author',
              key: 'author',
            },
            {
              title: '来源',
              dataIndex: 'venue',
              key: 'venue',
            },
            {
              title: '发表年份',
              key: 'year',
              dataIndex: 'year',
            },
            {
              title: '被引量',
              key: 'n_citation',
              dataIndex: 'n_citation'
            },
            {
              title: '下载',
              key: 'url',
              dataIndex: 'url',
              scopedSlots: {
                customRender: 'url'
              },
            },
          ],
        ],
        rankData: [
          [
            // {
            //   "key": '1',
            //   "name": 'Donald Trump',
            //   // orgs: 'White House bunker',
            //   "h_index": 2000,
            //   "n_pubs": 200,
            //   "n_citation": 12,
            // },
            // {
            //   "key": '2',
            //   "name": 'Joe Biden',
            //   // orgs: 'The White House',
            //   "h_index": 0,
            //   "n_pubs": 0,
            //   "n_citation": 0,
            // }, {
            //   "key": '3',
            //   "name": '马保国',
            //   // orgs: '浑元形意太极门',
            //   "h_index": 2000000,
            //   "n_pubs": 20,
            //   "n_citation": 12000000,
            // },
          ],
          [
            // {
            //   key: '1',
            //   title: '论武德',
            //   author: "马保国",
            //   venue: '不知名期刊',
            //   year: 2020,
            //   n_citation: 12,
            //   pdf: "https://www.baidu.com",
            // },
            // {
            //   key: '2',
            //   title: '耗子尾汁',
            //   author: "马保国",
            //   venue: '不知名期刊',
            //   year: 2020,
            //   n_citation: 12,
            //   pdf: "https://www.bilibili.com",
            // },
            // {
            //   key: '3',
            //   title: '原来是昨天',
            //   author: "马保国",
            //   venue: '不知名期刊',
            //   year: 2020,
            //   n_citation: 12,
            //   pdf: "https://www.weibo.com",
            // },
          ],

        ]

      };
    },
    watch: {

    },
    created() {

    },
    updated() {},
    mounted() {
      this.rankType = this.$route.query.rankType - 1;
      if (this.rankType == 0)
        this.getAuthorRank();
      else if (this.rankType == 1)
        this.getPaperRank();
    },
    methods: {
      download(link) {
        window.open(link);
      },
      getArrayIndex(arr, obj) {
        var i = arr.length;
        while (i--) {
          if (arr[i] === obj) {
            return i;
          }
        }
        return -1;
      },
      toRankList() {
        this.$router.push("/ranklist");
      },
      magic() {
        this.rankType = 1 - this.rankType;
      },
      getAuthorRank() {
        var that = this;
        this.loading = true;
        this.$axios({
          method: 'get',
          url: 'https://gugooscholar-k5yn3ahzxq-df.a.run.app/author/rank',
          params: {
            order_by: "n_citation"
          }
        }).then(
          response => {
            var list = response.data["data"];
            for (let index = 0; index < list.length; index++) {
              list[index]["key"] = index + 1;
            }
            // that.rankData[that.rankType] = list;
            that.$set(that.rankData, 0, list);
            console.log("authorList!");
            that.loading = false;
          },
          err => {
            console.log(err);
          }).catch((error) => {
          console.log(error);
        });
      },
      getPaperRank() {
        var that = this;
        this.loading = true;
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
            // that.rankData[that.rankType] = list;
            that.$set(that.rankData, 1, list);
            console.log("paperList!");
            that.loading = false;
          },
          err => {
            console.log(err);
          }).catch((error) => {
          console.log(error);
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

  .ant-layout .headtext {
    width: 100%;
    height: 100px;
    line-height: 100px;
    color: #cae8ef;
    background-color: black;
    font-size: 30px;
    font-weight: 500;
    text-align: left;
    text-indent: 4em;
  }

  .ant-layout-content .rank-content {
    width: 1200px;
    margin: 0 auto;
  }
</style>