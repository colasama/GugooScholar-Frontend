<template>
<a-layout>
    <a-layout-content style="padding: 50px 100px 50px 100px ">
        <a-layout class="profileBox">
            <a-layout-sider width="250" style="background: #fff">
                <div style="margin:auto; height: 55px">
                <span style="margin:auto; font-size:20px; height:20%"><b>管理面板</b></span>
                </div>
                <a-menu
                    mode="inline"
                    :default-selected-keys="['1']"
                    :default-open-keys="['sub1']"
                    style="height: 100%"
                    @click="handleClick"
                >
                <a-sub-menu key="sub1">
                <span slot="title"><a-icon type="file" />论文管理</span>
                <a-menu-item key="1">
                    所有论文
                </a-menu-item>
                <a-menu-item key="2">
                    个人论文
                </a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="sub2">
                <span slot="title"><a-icon type="user" />用户管理</span>
                <a-menu-item key="3">
                    所有用户
                </a-menu-item>
                <a-menu-item key="4">
                    删除用户
                </a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="sub3">
                <span slot="title"><a-icon type="laptop" />专利管理</span>
                <a-menu-item key="5">
                    option5
                </a-menu-item>
                <a-menu-item key="6">
                    option6
                </a-menu-item>
                <a-menu-item key="7">
                    option7
                </a-menu-item>
                <a-menu-item key="8">
                    option8
                </a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="sub4">
                <span slot="title"><a-icon type="audit" />门户审核</span>
                <a-menu-item key="9">
                    申诉
                </a-menu-item>
                <a-menu-item key="10">
                    取消认证
                </a-menu-item>
                </a-sub-menu>
                </a-menu>
            </a-layout-sider >

            <!-- 所有论文页面 -->
            <a-layout-content v-if="sider_status==1">
            <a-breadcrumb style="margin:0px 0 0px 0px;">
            <div style="text-align:left">
            <a-breadcrumb-item href="" style="margin-left:30px">
                <a-icon type="home" />
                <span>主页</span>
            </a-breadcrumb-item>
            <a-breadcrumb-item >
                <a-icon type="file" />
                <span>论文管理</span>
            </a-breadcrumb-item>
            <a-breadcrumb-item>
                所有论文
            </a-breadcrumb-item>
            </div>
            </a-breadcrumb>

            <a-input-group compact class="paperSearchInput">
            <a-select size="large" default-value="title" style="width:100px" v-model="searchPaperType">
                <a-select-option value="title">
                篇名
                </a-select-option>
                <a-select-option value="keywords">
                关键词
                </a-select-option>
                <a-select-option value="abstract">
                摘要
                </a-select-option>
            </a-select>
            <a-input-search v-model="searchPaperValue" style="width: 80%" placeholder="检索论文" size="large" enter-button @search="searchPaper" />
            </a-input-group>

            <a-divider style="margin-bottom:0px"/>
            <a-spin tip="Loading..." style = "margin:auto" v-if="loading==true"></a-spin>
            <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="paper_list">
                <a-list-item slot="renderItem" slot-scope="paper_list, index" :key="index">
                    <!-- <a-card class="hippoCard-middle"> -->
                        <div name="aaa" style="text-align:left; width:80%; padding:0px 0px 0px 60px;" >
                                <p style="font-weight:700;">
                                    <a-icon type="book" />&#12288;
                                    {{paper_list.title}}
                                </p>
                                <!-- <p style="font-family:Times New Roman;font-weight:100;">{{paper_list.venue.name}}</p> -->
                                <p style="margin-top:3px;font-weight:100;font-family:Times New Roman;font-size:14px">
                                    <template v-for="(author,authorIndex) in paper_list.authors">
                                        {{author.name}}
                                        <template v-if="authorIndex < paper_list.authors.length-1">{{', '}}</template>
                                    </template>
                                </p>
                        </div>
                        <div slot="extra" style="width:200px;  margin-top:25px">
                            <a-button type="danger" icon="delete" shape="circle" :size="size"></a-button>
                        </div>
                    <!-- </a-card> -->
                    
            </a-list-item>
            </a-list>

                
            </a-layout-content>

            <!--  个人论文页面 -->
            <a-layout-content v-if="sider_status==2">
            <a-breadcrumb style="margin:0px 0 0px 0px;">
            <div style="text-align:left">
            <a-breadcrumb-item href="" style="margin-left:30px">
                <a-icon type="home" />
                <span>主页</span>
            </a-breadcrumb-item>
            <a-breadcrumb-item >
                <a-icon type="file" />
                <span>论文管理</span>
            </a-breadcrumb-item>
            <a-breadcrumb-item>
                个人论文
            </a-breadcrumb-item>
            </div>
            </a-breadcrumb>

            <a-input-group compact class="paperSearchInput">
            <a-select size="large" default-value="title" style="width:100px">
                <a-select-option value="title">
                    作者
                </a-select-option>
            </a-select>
            <a-input-search style="width: 80%" placeholder="检索此作者的所有论文" size="large" enter-button @search="onSearch" />
            </a-input-group>

            <a-divider style="margin-bottom:0px"/>

            <!-- <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="paper_list">
                <a-list-item slot="renderItem" slot-scope="paper_list, index" :key="index">
                        <div name="aaa" style="text-align:left; width:80%; padding:0px 0px 0px 60px;" >
                                <p style="font-weight:700;">
                                    <a-icon type="book" />&#12288;
                                    {{paper_list.title}}
                                </p>
                                <p style="font-family:Times New Roman;font-weight:100;">{{paper_list.venue.name}}</p>
                                <p style="margin:0px 0px 0px 0px;font-weight:100;font-family:Times New Roman;font-size:14px">
                                    {{paper_list.authors}}
                                </p>
                        </div>
                        <div slot="extra" style="width:200px;  margin-top:25px">
                            <a-button type="danger" icon="delete" shape="circle" :size="size"></a-button>
                        </div>
                    
                </a-list-item>
            </a-list> -->


            </a-layout-content>


            <a-layout-content v-if="sider_status==3">

            <a-breadcrumb style="margin:0px 0 0px 0px;">
                <div style="text-align:left">
                <a-breadcrumb-item href="" style="margin-left:30px">
                    <a-icon type="home" />
                    <span>主页</span>
                </a-breadcrumb-item>
                <a-breadcrumb-item >
                    <a-icon type="user" />
                    <span>用户管理</span>
                </a-breadcrumb-item>
                <a-breadcrumb-item>
                    所有用户
                </a-breadcrumb-item>
                </div>
            </a-breadcrumb>

            <div style="text-align:left">
                <a-input-search style="margin: 30px 0 0px 20px; width:35%" placeholder="搜索用户" enter-button @search="onSearch" />
            </div>
            <a-divider style="width:80% " />

                
            </a-layout-content>


            <a-layout-content v-if="sider_status==4">

            <a-breadcrumb style="margin:0px 0 0px 0px;">
                <div style="text-align:left">
                <a-breadcrumb-item href="" style="margin-left:30px">
                    <a-icon type="home" />
                    <span>主页</span>
                </a-breadcrumb-item>
                <a-breadcrumb-item >
                    <a-icon type="user" />
                    <span>用户管理</span>
                </a-breadcrumb-item>
                <a-breadcrumb-item>
                    删除用户
                </a-breadcrumb-item>
                </div>
            </a-breadcrumb>
                
            </a-layout-content>


            
        </a-layout>
    </a-layout-content>
</a-layout>
</template>


<style>
#components-layout-demo-fixed-sider .logo {
  height: 32px;
  /* background: rgba(255, 255, 255, 0.2); */
  margin: 16px;
}

.profileBox{
  padding: 24px 0; 
  background: #fff;
  box-shadow: 0 0 5px hsla(0, 0%, 0%, 0.1);
}

.profile_col_title{
  margin-left:20px;
  text-align: left;
  vertical-align:middle;
}

.profile_col_content{
  text-align: left;
  vertical-align: middle;
}

.paperSearchInput{
    text-align: center;
    margin-top: 50px;
}

.hippoCard-middle {
    width: 700px;
    margin: 0px auto;
    margin-bottom: 10px
}

</style>

<script>
export default {
    name: 'Admin',
    data(){
        return{
            sider_status: 1,
            searchPaperType: "title",
            searchPaperValue: "",
            paper_info:{
                title:"",
                abstract:"",
                key_words:"",
                doi:"",
                pdf:"",
                venue:"",
                year:"",
                volume:"",
                issue:"",
                page_start:"",
                page_end:"",
                issn:"",
                isbn:"",
                lang:""
            },
            paper_list:[],
            pagination: {
                onChange: page => {
                    console.log(page);
                },
                pageSize: 10 ,
            },
            loading: false,
        }
    },
    methods:{
        handleClick(e) {
            console.log("click", e);
            this.sider_status = e.key;
        },
        searchPaper() {
            console.log(this.searchPaperValue);
            console.log(this.searchPaperType);
            this.loading = true;
            this.$axios({
                method: 'get',
                url: 'https://gugooscholar-k5yn3ahzxq-df.a.run.app/paper/search',
                params: {
                    words: this.searchPaperValue,
                    type: this.searchPaperType
                }
            }).then((res) => {
                console.log(res.data);
                this.loading = false;
                this.paper_list = res.data.data;
                console.log(this.paper_list);
                console.log(this.loading)
                
            })
        }
    },
    mounted() {
    }

}
</script>