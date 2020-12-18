<template>
    <div id="whole_page">
        <a-layout>
            <a-layout-header class="ant-layout-header">
                <div class="ant-layout-header-title">
                科研领域
            </div>
                <a-input-group compact class="ant-layout-header-search">
                    <a-input style="width: 30%;" placeholder="搜索目标科研领域" size="large" v-model="searchContent"/>
                    <a-button style="width: 80px;background-color: #9feaf9; font-size: 14px;" size="large"
                              @click="SearchField">搜索
                    </a-button>
                </a-input-group>
            </a-layout-header>

            <a-layout-content class="ant-layout-content">
                <a-list size="small" bordered :grid="{ gutter: 16, column: 3 }" :pagination="pagination" :data-source="listData">
                <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
                    <a-list-item-meta :description="item.description">
                    </a-list-item-meta>
                    <a-card @click="Field" size="default" class="hippoCard-middle" >
                        {{item.content}}
                    </a-card>
                </a-list-item>
            </a-list>

            </a-layout-content>

            <a-layout-footer class="ant-layout-footer">

            </a-layout-footer>
        </a-layout>
    </div>
</template>


<script>
    import Vue from "vue";
    import { List } from "ant-design-vue";
    import "ant-design-vue/dist/antd.css";

    Vue.use(List);


    export default {
        mounted(){
            this.getField();
            //console.log(this.fieldReturn.length);
        },

        data() {
            return {
                searchContent: "",
                fieldReturn:[],
                fieldSaver:[],
                listData:[],
                pagination: {
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 9,
                },
                actions: [
                    { type: 'star-o', text: '156' },
                    { type: 'like-o', text: '156' },
                    { type: 'message', text: '2' },
                ],
            };
        },
        components: {

        },
        methods:{
          getField(){
              var that = this;
              this.loading = true;
              this.$axios({
                  method: 'get',
                  url: 'https://gugooscholar-k5yn3ahzxq-df.a.run.app/paper/field',
                  params: {}
              }).then(
                  response => {
                      this.fieldReturn = response.data.data;
                      // that.rankData[that.rankType] = list;
                      //that.$set(that.rankData, 1, list);
                      this.dataInput();
                      this.fieldSaver=this.listData;
                      console.log(this.fieldReturn);
                      console.log(this.fieldReturn.length);
                      that.loading = false;
                  },
                  err => {
                      console.log(err);
                  }).catch((error) => {
                  console.log(error);
              });
          },

          dataInput(){
              for (let i = 0; i < this.fieldReturn.length; i++) {
                  this.listData.push({
                      href: `http://localhost:8080/#/field/`,
                      //title: `研究领域 ${i+1}`,
                      //avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                      description:
                          this.fieldReturn[i],
                      content:
                          this.fieldReturn[i],
                  });
              }
          },

          Field(){
              this.$router.push("/Field");
          },

          SearchField(){
              console.log(this.fieldReturn.length);
              if(this.searchContent!=""){
                  this.listData=[];
                  for(let i=0;i<this.fieldSaver;i++){
                      if(this.fieldSaver[i].content.search(this.searchContent)!=-1){
                          this.listData.push({
                              href: `http://localhost:8080/#/field/`,
                              //title: `研究领域 ${i+1}`,
                              //avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                              description:
                                  this.fieldReturn[i].content,
                              content:
                                  this.fieldReturn[i].content,
                          });
                      }
                  }
                  this.$forceUpdate();
                  this.reload();
              }else {
                  this.$forceUpdate();
                  this.reload();
              }
          },

        },
    }
</script>

<style scoped>
    #whole_page {
        margin-top: 0px ;
    }
    .ant-layout-footer {
        background: #ffffff;
        color: #fff;

    }
    .ant-layout-header {
        background: rgb(3, 3, 3);
        color: #fff;
        height: 120px;
        font-size: 25px;
        flex-wrap: nowrap;
        justify-content: flex-start;
        text-align: center;
    }

    .ant-layout-header-title {
        font-size: 25px;
        color: #ffffff;
        background-color: black;
    }
    .ant-layout-content {
        background: #fff;
        color: #fff;
        min-height: 120px;
        line-height: 120px;
    }
    .ant-layout-header-search {
        width: 100%;
        height: 50px;
        margin: auto;

    }
    .ant-layout-content {
        background: #fff;
        color: #fff;
        min-height: 120px;
        line-height: 120px;
    }

    .hippoCard-slot{

    }

    .hippoCard-middle {
        background: rgb(47 50 65);
        padding: 10%;
        /*margin-top: 20px;*/
        /*margin-bottom: 20px;*/
        margin:auto;
        font-size: 20px;
        color: #ffffff;
        width: 400px;
        height: 200px;
    }

    .ant-col {
        background: #ffffff;
        margin-top: 20px;
    }
    .ant-row {
        padding: 8px !important;
        margin: auto;
    }

</style>