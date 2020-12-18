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

            <a-input-group compact class="searchInput">
            <a-select size="large" default-value="title" style="width:100px">
                <a-select-option value="title">
                篇名
                </a-select-option>
                <a-select-option value="keyword">
                关键词
                </a-select-option>
                <a-select-option value="abstract">
                摘要
                </a-select-option>
            </a-select>
            <a-input-search style="width: 80%" placeholder="检索论文" size="large" enter-button @search="onSearch" />
            </a-input-group>

            <a-list style="margin-top:50px" item-layout="vertical" size="large" :data-source="[]">
                
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

            <a-input-group compact class="searchInput">
            <a-select size="large" default-value="title" style="width:100px">
                <a-select-option value="title">
                    作者
                </a-select-option>
            </a-select>
            <a-input-search style="width: 80%" placeholder="检索此作者的所有论文" size="large" enter-button @search="onSearch" />
            </a-input-group>

            <a-list style="margin-top:50px" item-layout="vertical" size="large" :data-source="[]">
                
            </a-list>


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




            

            <!-- 删除论文页面 -->
            
        </a-layout>
    </a-layout-content>
</a-layout>
</template>


<style>
#components-layout-demo-fixed-sider .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
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

.searchInput{
    text-align: center;
    margin-top: 50px;
}

</style>

<script>
export default {
    name: 'Admin',
    data(){
        return{
            sider_status: 1,
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
            paper_list:[]
        }
    },
    methods:{
        handleClick(e) {
            console.log("click", e);
            this.sider_status = e.key;
        }
    }

}
</script>