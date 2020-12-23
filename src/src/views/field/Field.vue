<template>
    <div id="field_page">
        <a-layout>
            <a-layout-header class="ant-layout-header">
                <div class="ant-layout-header-title">
                    {{this.fieldName}}详细介绍
                </div>
                <a-input-group compact class="ant-layout-header-search">
                    <a-select default-value="篇名" style="width: 120px;" size="large" @change="passSearchType">
                        <a-select-option value="篇名">
                            篇名
                        </a-select-option>
                        <a-select-option value="摘要">
                            摘要
                        </a-select-option>
                        <a-select-option value="关键词">
                            关键词
                        </a-select-option>
                        <a-select-option value="作者">
                            作者
                        </a-select-option>
                    </a-select>
                    <a-input style="width: 30%;" placeholder="搜索你想要的" size="large" v-model="searchContent"/>
                    <a-button style="width: 80px;background-color: #9feaf9; font-size: 14px;" size="large"
                              @click="onSearch(searchContent)">搜索
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
                        科研成果
                    </a-menu-item>
                    <a-menu-item style="width:180px" value="科研人员" @click="findTriChoice('科研人员')">
                        <a-icon type="user"/>
                        科研人员
                    </a-menu-item>
                </a-menu>

                <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="currentData">
                    <a-list-item slot="renderItem" slot-scope="essayData, index" :key="index">
                        <a-card class="hippoCard-middle" :hoverable="true" size="default" @click="toPaper(essayData.id)">
                            <div style="text-align:left" v-if="Tri_choi == '论文'">
                                    <p style="font-weight:700;">
                                        <a-icon type="book" />&#12288;
                                        {{essayData.title}}
                                        <template>
                                            <div style="float:right">{{essayData.SubscribeTime}}{{'  citations'}}<a-icon type="star" /></div>
                                        </template>
                                    </p>
                                    <p style="font-family:Times New Roman;font-weight:100;margin-top:8px">{{essayData.createTime}}</p>
                                    <p style="font-family:Times New Roman;font-weight:100;margin-top:8px">{{essayData.source.name}}</p>
                                    <p style="margin-top:3px;font-weight:100;font-family:Times New Roman;font-size:14px">
                                        <template v-for="(author,authorIndex) in essayData.author">
                                            {{author.name}}
                                            <template v-if="authorIndex < essayData.author.length-1">{{'，'}}</template>
                                        </template>
                                    </p>
                                    <p style="margin-top:3px;font-family:Georgia;font-weight:200;">
                                        <template v-for="(field,fieldIndex) in essayData.Fields">
                                            <a-button type="primary" style="height:25px;width:auto;padding-left:5px;padding-right:5px" :key="fieldIndex">
                                                {{field}}
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
                            <div style="text-align:left" v-if="Tri_choi == '科研人员'">
                                    <p style="font-weight:700;">
                                        <a-icon type="book" />&#12288;
                                        {{essayData.name}}
                                        <template>
                                            <div style="float:right">{{essayData.n_citation}}{{'  citations'}}<a-icon type="star" /></div>
                                        </template>
                                    </p>
                                    <p style="font-family:Times New Roman;font-weight:100;margin-top:8px">所属机构：{{essayData.orgs}}</p>
                                    <p style="font-family:Times New Roman;font-weight:100;margin-top:8px">H指数：{{essayData.h_index}}</p>
                                    <p style="font-family:Times New Roman;font-weight:100;margin-top:8px">论文数：{{essayData.n_pubs}}</p>
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
                fieldName:"",
                searchType: "篇名",
                searchContent: "",
                currentData:[],
                essayData:[],
                patentData:[],
                researcherData:[],
                Paper:[],
                Researcher:[],
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
            this.fieldName=this.$route.query.FieldName;
            console.log(this.fieldName);
            this.searchPaper(this.fieldName);
            //this.searchPatent();
            this.searchAuthor(this.fieldName);
            //this.researcherTester();
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

            contextSearch(){

            },

            searchPaper(searchName) {
                this.$axios({
                    method: 'get',
                    url: 'https://gugooscholar-k5yn3ahzxq-df.a.run.app/paper/search',
                    params: {
                        words: searchName,
                        type:"keywords",
                        offset: 0
                    }
                }).then((res)=>{
                    this.Paper = res.data.data
                    this.Paperloding();
                    console.log(this.Paper.length);
                    console.log(this.Paper);
                }).catch((e)=>{
                    console.log(e);
                });
            },

            Paperloding() {
                for (let i = 0; i < this.Paper.length; i++) {

                    this.essayData.push({
                        id: this.Paper[i].id,
                        title: this.Paper[i].title,
                        //avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                        description:
                            this.Paper[i].abstract,
                        content:
                            this.Paper[i].abstract,
                        author:
                            this.Paper[i].authors,
                        SubscribeTime:
                            this.Paper[i].n_citation,
                        Fields:
                            this.Paper[i].keywords,
                        createTime:
                            this.Paper[i].year,
                        source:
                            this.Paper[i].venue,
                    });

                }
            },

            toPaper(paperid) {
                /*this.$router.push({
                    name: "Paper",
                    query: {
                      paperId: paperid,
                    }
                  });*/
                let routeData = this.$router.resolve({
                    path: '/paper*',
                    query: {
                        paperId: paperid,
                    }
                })
                window.open(routeData.href, '_blank')
            },

            searchAuthor(authorName) {
                var that=this;
                this.$axios({
                    method: 'get',
                    url: 'https://gugooscholar-k5yn3ahzxq-df.a.run.app/field/'+authorName+'/author',
                    params: {
                    }
                }).then((res)=>{
                    that.Researcher = res.data.data;
                    that.ResearcherLoading();
                }).catch((e)=>{
                    console.log(e);
                });
            },

            ResearcherLoading(){
                for (let i = 0; i < this.Researcher.length; i++) {
                    const { name, orgs,h_index,n_pubs, n_citation } =this.Researcher[i];
                    this.researcherData.push({
                        name,
                        n_citation,
                        orgs,
                        h_index,
                        n_pubs,
                    });
                }
            },

            essayTester(){
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
            },

            patentTester(){
                for (let i = 0; i < 10; i++) {
                    this.patentData.push({
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
            },

            researcherTester(){
                for (let i = 0; i < 10; i++) {
                    this.researcherData.push({
                        name: `专家 ${i + 1}`,
                        //avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                        n_citation:
                            `${i + 1}`,
                        orgs:
                            `Content for researcher ${i + 1}`,
                        h_index:
                            `${i + 1}` + `岁，是研究人员`,
                        n_pubs:
                            `100` + `${i + 1}`,
                    });
                }
            },

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
                //this.reload();
            },
            passSearchType(value) {
                this.searchType = value;
            },
            onSearch(content) {
                console.log(content);
                if (content != "") {
                    this.fieldName=content;
                    this.clearData();
                    this.searchPaper(content);
                    //this.searchPatent();
                    this.searchAuthor(content);
                    //this.researcherTester();
                    this.currentData = this.essayData;
                    this.$forceUpdate();
                }
            },
            clearData(){
                this.currentData=[];
                this.essayData=[];
                this.patentData=[];
                this.researcherData=[];
                this.Paper=[];
                this.Researcher=[];
            },
            onSearch2() {
                console.log(this.searchContent);
                if (this.searchContent != "") {
                    this.$router.push({
                        path:'/search',
                        query:{
                            searchType: this.searchType,
                            searchContent: this.searchContent
                        }
                    })
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