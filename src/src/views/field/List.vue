<template>
    <div id="whole_page">
        <a-layout>
            <a-layout-header class="ant-layout-header">
                <div>
                    学科领域
                </div>
            </a-layout-header>

            <a-layout-content class="ant-layout-content">
                <a-list size="small" bordered :grid="{ gutter: 16, column: 3 }" :pagination="pagination" :data-source="listData">
                <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
                    <a-list-item-meta :description="item.description">
                    </a-list-item-meta>
                    <a-card size="default" class="hippoCard-middle" >
                        <a slot="actions" :href="item.href">more</a>
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

    const listData = [];
    for (let i = 0; i < 24; i++) {
        listData.push({
            href: `http://localhost:8080/#/field/`,
            //title: `研究领域 ${i+1}`,
            //avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            description:
                `Simple description for research Field ${i+1}`,
            content:
                `Content for research Field ${i+1}`,
        });
    }
    export default {
        data() {
            return {
                listData,
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
          Field(){
              this.$router.push("/Field");
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
        font-size: 25px;
        flex-wrap: nowrap;
        justify-content: flex-start;
        text-align: left;
    }
    .ant-layout-content {
        background: #fff;
        color: #fff;
        min-height: 120px;
        line-height: 120px;
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