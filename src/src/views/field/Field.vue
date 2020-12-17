<template>
    <div id="field_page">
        <a-layout>
            <a-layout-header class="ant-layout-header">
                <div class="ant-layout-header-title">
                    科研领域详细介绍
                </div>
                <a-input-group compact class="ant-layout-header-search">
                    <a-select default-value="主题" style="width: 120px;" size="large" @change="passSearchType">
                        <a-select-option value="主题">
                            主题
                        </a-select-option>
                        <a-select-option value="关键词">
                            关键词
                        </a-select-option>
                        <a-select-option value="篇名">
                            篇名
                        </a-select-option>
                        <a-select-option value="专家">
                            专家
                        </a-select-option>
                    </a-select>
                    <a-input style="width: 30%;" placeholder="搜索你想要的" size="large" v-model="searchContent"/>
                    <a-button style="width: 80px;background-color: #9feaf9; font-size: 14px;" size="large"
                              @click="onSearch">搜索
                    </a-button>
                </a-input-group>
            </a-layout-header>

            <a-layout-content class="ant-layout-content">
                <a-menu mode="horizontal" class="ant-layout-content-classify" >
                    <a-menu-item style="width:180px;" value="论文" @click="findTriChoice('论文')">
                        <a-icon type="book"/>
                        论文
                    </a-menu-item>
                    <a-menu-item style="width:180px" value="专利" @click="findTriChoice('专利')">
                        <a-icon type="reconciliation"/>
                        专利
                    </a-menu-item>
                    <a-menu-item style="width:180px" value="科研人员" @click="findTriChoice('科研人员')">
                        <a-icon type="user"/>
                        科研人员
                    </a-menu-item>
                </a-menu>

                <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="currentData">
                    <a-list-item slot="renderItem" slot-scope="essayData, index" :key="index">
<!--                        <template v-for="{ type, text } in actions" slot="actions">-->
<!--                            <span :key="type">-->
<!--                                <a-icon :type="type" style="margin-right: 8px"/>-->
<!--                                {{ text }}-->
<!--                            </span>-->
<!--                        </template>-->
                        <a-card class="hippoCard-middle" size="default" >
                            <div style="text-align:left">
                                <p style="font-weight:700;">
                                    <a-icon type="book" />&#12288;
                                    {{essayData.title}}
                                    <template>
                                        <div style="float:right">{{essayData.SubscribeTime}}{{'  stars'}}<a-icon type="star" /></div>
                                    </template>
                                </p>
                                <p style="font-family:Times New Roman;font-weight:100;margin-top:8px">{{essayData.sources}}</p>
                                <p style="font-family:Times New Roman;font-weight:100;margin-top:8px">{{essayData.age}}</p>
                                <p style="font-family:Times New Roman;font-weight:100;margin-top:8px">{{essayData.createTime}}</p>
                                <p style="margin-top:3px;font-weight:100;font-family:Times New Roman;font-size:14px">
                                    {{essayData.author}}
                                </p>
                                <p style="margin-top:3px;font-family:Georgia;font-weight:200;">
                                    <template v-for="(field,fieldIndex) in essayData.Fields">
                                        <a-button style="height:25px;width:auto;padding-left:5px;padding-right:5px" :key="fieldIndex">
                                            <a-icon style="padding-left:5px" type="experiment" />{{field}}
                                        </a-button>
                                        <template v-if="fieldIndex < essayData.Fields.length-1">{{'，'}}</template>
                                    </template>
                                </p>
                                <p style="font-family:Book Antiqua;margin-top:3px;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 4;overflow: hidden;">
                                    <template>
                                        {{essayData.description}}
                                    </template>
                                </p>
                            </div>
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
    // const essayData = [];
    // const patentData = [];
    // const researcherData = [];

    export default {
        data() {
            return {
                searchType: "主题",
                searchContent: "",
                currentData:[],
                essayData:[],
                patentData:[],
                researcherData:[],
                Tri_choi: "论文",
                pagination: {
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 6,
                },
            }
        },
        mounted() {

            for (let i = 0; i < 10; i++) {
                this.essayData.push({
                    href: `http://localhost:8080/field/` + `${i + 1}`,
                    title: `文章NO. ${i + 1}`,
                    //avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    description:
                        `Simple description for research Field ${i + 1}`,
                    content:
                        `Content for research Field ${i + 1}`,
                    author:
                        `Boy next door` + `${i + 1}`,
                    SubscribeTime:
                        `100` + `${i + 1}`,
                    Fields:
                        ['Field1', 'Field2'],
                    sources:
                        `source ` + `${i + 1}`,
                });
            }
            for (let i = 0; i < 10; i++) {
                this.patentData.push({
                    href: `http://localhost:8080/field/` + `${i + 1}`,
                    title: `专利 ${i + 1}`,
                    //avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    createTime:
                        `${i+1} years ago`,
                    Fields:
                        ['Field1', 'Field2'],
                    description:
                        `Simple description for patent ${i + 1}`,
                    content:
                        `Content for patent ${i + 1}`,
                    author:
                        `Boy next door` + `${i + 1}`,
                    SubscribeTime:
                        `100` + `${i + 1}`,
                });
            }
            for (let i = 0; i < 10; i++) {
                this.researcherData.push({
                    href: `http://localhost:8080/field/` + `${i + 1}`,
                    title: `专家 ${i + 1}`,
                    //avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    description:
                        `Simple description for researcher ${i + 1}`,
                    content:
                        `Content for researcher ${i + 1}`,
                    Fields:
                        ['Field1', 'Field2'],
                    age:
                        `${i + 1}` + `岁，是研究人员`,
                    SubscribeTime:
                        `100` + `${i + 1}`,
                });
            }
            this.currentData = this.essayData;
        },
        methods: {
            // decideTriChoice(){
            //     if(this.Tri_choi.equals("论文")){
            //         return this.essayData;
            //     }else if(this.Tri_choi.equals("专利")){
            //         return this.patentData;
            //     }else if(this.Tri_choi.equals("科研人员")){
            //         return this.researcherData;
            //     }
            // },

            findTriChoice(value){
                this.Tri_choi=value;
                if(this.Tri_choi=="论文"){
                    this.currentData= this.essayData;
                    this.$forceUpdate();
                }else if(this.Tri_choi=="专利"){
                    this.currentData= this.patentData;
                    this.$forceUpdate();
                }else if(this.Tri_choi=="科研人员"){
                    this.currentData= this.researcherData;
                    this.$forceUpdate();
                }
                this.reload();
            },
            passSearchType(value) {
                this.searchType = value;
            },
            onSearch() {
                console.log(this.searchContent);
                if (this.searchContent != "") {
                    this.$router.push("/search?searchType=" +
                        this.searchType +
                        "&searchContent=" +
                        this.searchContent
                    );
                }
            },
        },
    }


</script>

<style scoped>
    #field_page {
        margin-top: 0px;
    }

    .search {
        width: 100%;
        height: 50px;
        margin: 0 auto;
        margin-top: 35px;
    }

    .ant-layout-footer {
        background: #ffffff;
        color: #fff;

    }

    .ant-layout-header {
        width: 100%;
        height: 150px;
        line-height: 80px;
        color: #9feaf9;
        background-color: black;
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

    .ant-layout-content-classify {
        background: #fff;
        color: #2F3241;
        height: 50px;
    }

    .hippoCard-middle {
        width: 700px;
        margin: 0px auto;
        margin-bottom: 10px
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