<template>
    <div id="field_page">
        <a-layout>
            <a-layout-header class="ant-layout-header">
                <div class="ant-layout-header-title">
                    领域 / {{this.fieldName}}
                </div>
                <a-input-group compact class="ant-layout-header-search">
                    <a-cascader :options="options" :allowClear="false" trigger="hover" v-model="searchClassify" change-on-select
                                expand-trigger="hover" style="width: 120px;" size="large" @change="passSearchType" />
<!--                    <a-select default-value="全部" style="width: 120px;" size="lar ge" @change="passSearchType">-->
<!--                        <a-select-option value="all">-->
<!--                            全部-->
<!--                        </a-select-option>-->
<!--                        <a-select-option value="paer">-->
<!--                            论文-->
<!--                        </a-select-option>-->
<!--                        <a-select-option value="fund">-->
<!--                            项目-->
<!--                        </a-select-option>-->
<!--                        <a-select-option value="author">-->
<!--                            作者-->
<!--                        </a-select-option>-->
<!--                    </a-select>-->
                    <a-input v-on:keyup.enter.native="onSearch2()" placeholder="请输入搜索内容" style="width: 30%;" size="large"
                             v-model="searchContent" />
                    <a-button style="width: 80px; font-size: 14px;" size="large"
                              @click="onSearch2(searchContent)">搜索
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
                        项目
                    </a-menu-item>
                    <a-menu-item style="width:180px" value="科研人员" @click="findTriChoice('科研人员')">
                        <a-icon type="user"/>
                        科研人员
                    </a-menu-item>
                </a-menu>

                <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="currentData">
                    <a-list-item slot="renderItem" slot-scope="essayData, index" :key="index">
                        <a-card class="hippoCard-middle" :hoverable="true" size="default" @click="toContent(essayData.id,Tri_choi)">
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
                                            <a-button color="#BDD9E1" type="primary" style="height:25px;width:auto;padding-left:5px;padding-right:5px;margin-top:3px" :key="fieldIndex">
                                                <div class="test" style="text-overflow:ellipsis;"><a-icon style="padding-right:3px" type="experiment" />
                                                    {{field}}
                                                </div>
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
                            <div style="text-align:left" v-if="Tri_choi == '专利'">
                                <p style="font-weight:700;">
                                    <a-icon type="reconciliation" />&#12288;
                                    {{essayData.title}}
                                </p>
                                <p style="font-family:Times New Roman;font-weight:100;margin-top:8px">{{'项目时间：'+essayData.start_year+'--'+essayData.end_year}}</p>
                                <p style="font-family:Times New Roman;font-weight:100;margin-top:8px">{{'资料来源：'+essayData.src}}</p>
                                <p style="margin-top:3px;font-weight:100;font-family:Times New Roman;font-size:14px">
                                    <template v-for="(author,authorIndex) in essayData.author">
                                        {{author.name}}
                                        <template v-if="authorIndex < essayData.author.length-1">{{'，'}}</template>
                                    </template>
                                </p>
                                <p style="font-family:Book Antiqua;margin-top:3px;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 4;overflow: hidden;">
                                    <template>
                                        {{'概述：'}}
                                        {{essayData.abstract}}
                                    </template>
                                </p>
                            </div>
                            <div style="text-align:left" v-if="Tri_choi == '科研人员'">
                                    <p style="font-weight:700;">
                                        <a-icon type="user" />&#12288;
                                        {{essayData.name}}
                                        <template>
                                            <div style="float:right">{{essayData.n_citation}}{{'  citations'}}<a-icon type="star" /></div>
                                        </template>
                                    </p>
<!--                                <p style="font-family:Times New Roman;font-weight:700;margin-top:8px">-->
<!--                                    <template>-->
<!--                                        <div  style="display:inline-block;text-align:center;border-style:none;border-width:1px;border-color:#66CCCC;border-radius:0px;width:70px;height:auto">-->
<!--                                            <a-row >-->
<!--                                                <a-col :span="8" style="background-color:#66CCCC;color:white">-->
<!--                                                    {{"H"}}-->
<!--                                                </a-col>-->
<!--                                                <a-col :span="16" style="background-color:#B0B0B0;color:white">-->
<!--                                                    {{essayData.h_index}}-->
<!--                                                </a-col>-->
<!--                                            </a-row>-->
<!--                                        </div>-->
<!--                                        <div  style="display:inline-block;margin-left:10px;text-align:center;border-style:none;border-width:1px;border-color:	#D8D8D8;border-radius:3px;width:70px">-->
<!--                                            <a-row>-->
<!--                                                <a-col :span="8" style="background-color:#B0B0B0;color:white">-->
<!--                                                    {{"P"}}-->
<!--                                                </a-col>-->
<!--                                                <a-col :span="16" style="background-color:#66CCCC;color:white">-->
<!--                                                    {{essayData.n_pubs}}-->
<!--                                                </a-col>-->
<!--                                            </a-row>-->
<!--                                        </div>-->
<!--                                    </template>-->
<!--                                </p>-->
                                <p style="font-family:Times New Roman;font-weight:100;margin-top:8px">论文数：{{essayData.n_pubs}}</p>
                                <p style="font-family:Times New Roman;font-weight:100;margin-top:8px">H指数：{{essayData.h_index}}</p>
                                <p style="font-family:Times New Roman;font-weight:100;margin-top:8px">所属机构：{{essayData.orgs}}</p>
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
                searchClassify: ['all'],
                fieldName:"",
                searchType: "all",
                searchContent: "",
                currentData:[],
                essayData:[],
                fundData:[],
                researcherData:[],
                Paper:[],
                Researcher:[],
                Fund:[],
                Tri_choi: "论文",
                pagination: {
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 6,
                },
                options: [{
                    value: 'all',
                    label: '全部'
                }, {
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
            }
        },
        mounted() {
            this.fieldName=this.$route.query.FieldName;
            console.log(this.fieldName);
            this.searchPaper(this.fieldName);
            //this.searchPatent();
            this.searchFund(this.fieldName);
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

            searchFund(fundName) {
                this.$axios({
                    method: 'get',
                    url: 'https://gugooscholar-k5yn3ahzxq-df.a.run.app/fund/search',
                    params: {
                        words: fundName,
                        type:"abstract",
                        offset: 0
                    }
                }).then((res)=>{
                    this.Fund = res.data.data
                    this.Fundloding();
                    console.log(this.Fund.length);
                    console.log(this.Fund);
                }).catch((e)=>{
                    console.log(e);
                });
            },

            Fundloding() {
                for (let i = 0; i < this.Fund.length; i++) {
                    const { id,title,author,abstract,start_year,end_year,src,type } =this.Fund[i];
                    this.fundData.push({
                        id,
                        title,
                        author,
                        abstract,
                        start_year,
                        end_year,
                        src,
                        type,
                    });
                }
                console.log('123123');
                console.log(this.fundData);
            },

            toContent(id,type){
              if(type=='论文'){
                  this.toPaper(id);
              }else if(type=='科研人员'){
                  this.toScientist(id);
              }else if(type=='专利'){
                  this.toFund(id);
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
                    path: '/paper',
                    query: {
                        id: paperid,
                    }
                })
                window.open(routeData.href, '_blank')
            },

            toScientist(scientistId) {
                let routeData = this.$router.resolve({
                    path: '/scientist/show/'+scientistId,
                })
                window.open(routeData.href, '_blank')
            },

            toFund(fundId) {
                let routeData = this.$router.resolve({
                    path: '/fund',
                    query: {
                        id: fundId,
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
                    console.log(that.Researcher);
                }).catch((e)=>{
                    console.log(e);
                });
            },

            ResearcherLoading(){
                for (let i = 0; i < this.Researcher.length; i++) {
                    const { name, orgs,h_index,n_pubs, n_citation,id } =this.Researcher[i];
                    this.researcherData.push({
                        name,
                        n_citation,
                        orgs,
                        h_index,
                        n_pubs,
                        id
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
                    this.currentData= this.fundData;
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
                        name: "search",
                        query: {
                            searchClassify: this.searchClassify,
                            searchContent: this.searchContent
                        }
                    });
                } else
                    this.$router.push('/search');
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
        background: black;
        color: #fff;
        height: 180px;
        font-size: 25px;
        flex-wrap: nowrap;
        justify-content: flex-start;
        text-align: left;
        text-align: center;
    }

    .ant-layout-header-title {
        margin-top: 24px;
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