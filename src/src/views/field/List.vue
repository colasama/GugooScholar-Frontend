<template>
    <div id="whole_page">
        <a-layout>
            <a-layout-header class="ant-layout-header">
                <div class="ant-layout-header-title">
                    科研领域
                </div>
                <a-input-group compact class="ant-layout-header-search">
                    <a-input style="width: 30%;" placeholder="搜索目标科研领域" size="large" v-model="searchContent" @keyup.enter="SearchField"/>
                    <a-button style="width: 80px;background-color: #9feaf9; font-size: 14px;" size="large"
                              @click="SearchField">搜索
                    </a-button>
                </a-input-group>
            </a-layout-header>

            <a-layout-content class="ant-layout-content">
                <a-list size="small" bordered :grid="{ gutter: 16, column: 1 }" :pagination="pagination" :data-source="listData">
                <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
                        <div @click="Field(item.content)" class="hippoCard-middle" style="font-size: 30px;">
                            {{item.content}}
                        </div>
                </a-list-item>
            </a-list>

            </a-layout-content>

            <a-layout-footer class="ant-layout-footer">

            </a-layout-footer>
        </a-layout>
    </div>
</template>


<script>
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
                    pageSize: 6,
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
                    url: 'https://gugooscholar-k5yn3ahzxq-df.a.run.app/field',
                    params: {}
                }).then(
                    response => {
                        this.fieldReturn = response.data.data;
                        // that.rankData[that.rankType] = list;
                        //that.$set(that.rankData, 1, list);
                        this.dataInput();
                        this.fieldSaver=this.fieldReturn;
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

            Field(a){
                this.$router.push({
                    path:'/field',
                    query:{
                        FieldName:a
                    }
                })

                console.log(a);
            },

            SearchField(){
                console.log(this.fieldReturn.length);
                if(this.searchContent!=""){
                    this.listData=[];
                    for(let i=0;i<this.fieldSaver.length;i++){
                        console.log(this.fieldSaver[i]);
                        if(this.fieldSaver[i].search(this.searchContent)!=-1){
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
        text-align: left;
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

    .gutter-box {
        margin: 48px 0;
        height: 180px;
        width: 1231px;
        display:inline-block;
        cursor: pointer;
    }

    .in-box {
        margin: 48px 0;
        height: 180px;
        width: 1231px;
        display:inline-block;
        cursor: pointer;
        opacity: 100%;
        padding-left: 5%;
        line-height: 100px;
        font-family: Roboto-Bold,Roboto;
        font-weight: 700;
        transition: all .2s;
        text-align: left;
    }
    .box-paper {
        background: url("https://i.loli.net/2020/12/23/lLved2O1BmHZSx9.png");
        display:inline-block;
    }
    .hippoCard-middle {
        margin: 20px 0;
        height: 180px;
        width: 1231px;
        display:inline-block;
        cursor: pointer;
        opacity: 100%;
        padding-left: 5%;
        line-height: 100px;
        font-family: Roboto-Bold,Roboto;
        font-weight: 700;
        transition: all .2s;
        text-align: left;
        background: url("https://i.loli.net/2020/12/23/lLved2O1BmHZSx9.png");
        font-size: 60px;
        color: #ffffff;
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