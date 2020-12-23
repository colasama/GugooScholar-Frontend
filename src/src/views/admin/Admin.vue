<template>
<a-layout  style="minHeight:auto">
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
                    style="height: 90%"
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
                <!-- <a-menu-item key="4">
                    删除用户
                </a-menu-item> -->
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
            <a-layout-content :style="{ padding: '0px', minHeight: '280px', }" v-if="sider_status==1">
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
            <a-spin tip="加载中..." style = "margin:auto" v-if="loading==true"></a-spin>
            <a-list style="margin:0px 30px 0 30px" item-layout="vertical" size="large" :pagination="pagination" :data-source="paper_list">
                <a-list-item slot="renderItem" slot-scope="paper_list, index" :key="index">
                    <!-- <a-card class="hippoCard-middle"> -->
                        <div name="aaa" style="text-align:left; width:80%; padding:0px 0px 0px 20px;" >
                                <p style="font-weight:700;">
                                    <a-icon type="book" />&#12288;
                                    <span class="paperLink" v-if="paper_list.hasOwnProperty('url')" @click="paperLink(paper_list.url[0])">{{paper_list.title}}</span>
                                    <span v-if="paper_list.hasOwnProperty('url')==false">{{paper_list.title}}</span>
                                </p>
                                <p v-if="paper_list.hasOwnProperty('venue')" style="font-family:Times New Roman;font-weight:100;">{{paper_list.venue.name}}</p>
                                <p style="margin-top:3px;font-weight:100;font-family:Times New Roman;font-size:14px">
                                    <template v-for="(author,authorIndex) in paper_list.authors">
                                        {{author.name}}
                                        <template v-if="authorIndex < paper_list.authors.length-1">{{', '}}</template>
                                    </template>
                                </p>
                        </div>
                        <div slot="extra" style="width:200px;  margin-top:25px">
                            <a-button type="danger" icon="delete" shape="circle" ></a-button>
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
            <a-select v-model="searchPaperType" size="large" default-value="title" style="width:100px">
                <a-select-option value="title">
                    作者
                </a-select-option>
            </a-select>
            <a-input-search v-model="searchAuthorPaperValue" style="width: 80%" placeholder="检索此作者的所有论文" size="large" enter-button @search="searchAuthorPaper" />
            </a-input-group>

            <a-divider style="margin-bottom:0px"/>
            <a-spin tip="加载中..." style = "margin:auto" v-if="loading==true"></a-spin>
            <a-list style="margin:0px 30px 0 30px" item-layout="vertical" size="large" :pagination="pagination" :data-source="paper_author_list">
                <a-list-item slot="renderItem" slot-scope="paper_author_list, index" :key="index">
                        <div name="aaa" style="text-align:left; width:80%; padding:0px 0px 0px 20px;" >
                                <p style="font-weight:700;">
                                    <a-icon type="book" />&#12288;
                                    <span class="paperLink" v-if="paper_author_list.hasOwnProperty('url')" @click="paperLink(paper_author_list.url[0])">{{paper_author_list.title}}</span>
                                    <span v-if="paper_author_list.hasOwnProperty('url')==false">{{paper_author_list.title}}</span>
                                </p>
                                <p v-if="paper_author_list.hasOwnProperty('venue')" style="font-family:Times New Roman;font-weight:100;">{{paper_author_list.venue.name}}</p>
                                <p style="margin-top:3px;font-weight:100;font-family:Times New Roman;font-size:14px">
                                    <template v-for="(author,authorIndex) in paper_author_list.authors">
                                        {{author.name}}
                                        <template v-if="authorIndex < paper_author_list.authors.length-1">{{', '}}</template>
                                    </template>
                                </p>
                        </div>
                        <div slot="extra" style="width:200px;  margin-top:25px">
                            <a-button type="danger" icon="delete" shape="circle" :size="size"></a-button>
                        </div>
            </a-list-item>
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

            <div style="text-align:left">
                <a-input-search style="margin: 30px 0 0px 20px; width:35%" placeholder="搜索用户" enter-button @search="searchUser" />
            </div>
            <a-divider style="width:80%; margin-bottom:0px" />
            <div style="text-align:center">
            <a-table :columns="columns" :data-source="user_list">
                <a class="usernameLink" slot="username" slot-scope="username" @click="goToUser">{{ username }}</a>
                <span slot="customTitle"><a-icon type="user" /> 用户名</span>
                <span slot="name" slot-scope="name">{{name}}</span>
                <span slot="email" slot-scope="email">{{email}}</span>
                <span slot="action" slot-scope="user, key, index,">
                    <a-popconfirm
                        title="是否确定删除此用户,身份信息或许会全部丢失"
                        ok-text="Yes"
                        cancel-text="No"
                        @confirm="deleteUser(user,index)"
                    >
                    <a-button type="danger" shape="circle" icon="delete"></a-button>
                    </a-popconfirm>
                </span>
            </a-table>
            </div>

                
            </a-layout-content>


            <!-- <a-layout-content v-if="sider_status==4">

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

            <div style="text-align:left">
                <a-input-search style="margin: 30px 0 0px 20px; width:35%" placeholder="搜索用户" enter-button @search="searchUser" />
            </div>
            <a-divider style="width:80% " />
                
            </a-layout-content> -->

            <a-layout-content v-if="sider_status==9">
                <a-breadcrumb style="margin:0px 0 0px 0px;">
                <div style="text-align:left">
                <a-breadcrumb-item href="" style="margin-left:30px">
                    <a-icon type="home" />
                    <span>主页</span>
                </a-breadcrumb-item>
                <a-breadcrumb-item >
                    <a-icon type="audit" />
                    <span>门户审核</span>
                </a-breadcrumb-item>
                <a-breadcrumb-item>
                    申诉
                </a-breadcrumb-item>
                </div>
                </a-breadcrumb>

                <div style="margin:20px">
                    <a-tabs default-active-key="1" @change="callback">
                        <a-tab-pane key="1" tab="未处理申诉">
                            <a-table :columns="report_columns" :data-source="report_list">
                                <a class="usernameLink" slot="username" slot-scope="username">{{ username }}</a>
                                <span slot="customTitle"><a-icon type="user" /> 用户名</span>
                                <span slot="description" slot-scope="description">{{description}}</span>
                                <span slot="status" slot-scope="status">{{status}}</span>
                                <span slot="action" slot-scope="report">
                                    <a-popconfirm
                                        title="通过此条申诉？通过后此用户将会与此作者绑定"
                                        ok-text="确认"
                                        cancel-text="取消"
                                        @confirm="passReport(report)"
                                        @cancel="cancel"
                                    >
                                        <a-button type="primary" shape="circle" icon="check"></a-button>
                                    </a-popconfirm>
                                    <a-divider type="vertical"/>
                                    <a-popconfirm
                                        title="拒绝此条申诉？"
                                        ok-text="确认"
                                        cancel-text="取消"
                                        @confirm="denyReport(report)"
                                        @cancel="cancel"
                                    >
                                        <a-button type="danger" shape="circle" icon="close"></a-button>
                                    </a-popconfirm>
                                </span>
                            </a-table>
                        </a-tab-pane>
                        <a-tab-pane key="2" tab="所有申诉" force-render>
                            <a-table :columns="report_columns" :data-source="report_all_list">
                                <a class="usernameLink" slot="username" slot-scope="username">{{ username }}</a>
                                <span slot="customTitle"><a-icon type="user" /> 用户名</span>
                                <span slot="description" slot-scope="description">{{description}}</span>
                                <span slot="status" slot-scope="status">{{status}}</span>
                                <span slot="action">
                                    <a-button type="dashed" shape="circle" icon="check" disabled></a-button>
                                    <a-divider type="vertical"/>
                                    <a-button type="dashed" shape="circle" icon="close" disabled></a-button>
                                </span>
                            </a-table>
                        </a-tab-pane>
                    </a-tabs>
                </div>

            </a-layout-content>

            <a-layout-content v-if="sider_status==10">
                <a-breadcrumb style="margin:0px 0 0px 0px;">
                <div style="text-align:left">
                <a-breadcrumb-item href="" style="margin-left:30px">
                    <a-icon type="home" />
                    <span>主页</span>
                </a-breadcrumb-item>
                <a-breadcrumb-item >
                    <a-icon type="audit" />
                    <span>门户审核</span>
                </a-breadcrumb-item>
                <a-breadcrumb-item>
                    取消认证
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

.paperSearchInput{
    text-align: center;
    margin-top: 50px;
}

.hippoCard-middle {
    width: 700px;
    margin: 0px auto;
    margin-bottom: 10px
}

.paperLink:hover {
    color: #20bcdb;
    cursor: pointer;
}


.usernameLink:hover {
    color: #20bcdb;
    cursor: pointer;
}

.usernameLink{
    color:black;
}

.ant-tabs-nav-scroll {
    overflow: hidden;
    white-space: nowrap;
    text-align: left;
}

.ant-tabs-bar {
    margin: 0 0 0px 0;
    border-bottom: 1px solid #e8e8e8;
    outline: none;
    transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.ant-divider-vertical {
    position: relative;
    top: -0.06em;
    display: inline-block;
    width: 1px;
    height: 2em;
    margin: 0 8px;
    vertical-align: middle;
}

</style>

<script>
const columns = [
  {
    dataIndex: 'username',
    key: 'username',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'username' },
    align:'center',
  },
  {
    title: '昵称',
    dataIndex: 'name',
    key: 'name',
    align:'center',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
    align:'center',
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' },
    align:'center',
  },
];
const report_columns = [
  {
    dataIndex: 'username',
    key: 'username',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'username' },
    align:'center',
  },
  {
    title: '描述',
    dataIndex: 'description',
    key: 'description',
    align:'center',
  },
  {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align:'center',
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' },
    align:'center',
  },
];
const key = 'updatable';
export default {
    name: 'Admin',
    data(){
        return{
            sider_status: 1,
            searchPaperType: "title",
            searchPaperValue: "",
            searchAuthorPaperValue: "",
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
            paper_author_list:[],
            paper_list:[],
            user_list:[],
            report_list:[],
            report_all_list:[],
            pagination: {
                onChange: page => {
                    console.log(page);
                },
                pageSize: 10 ,
            },
            loading: false,
            columns,
            report_columns,
            not_handled:'未处理',
            handled:'已处理'
        }
    },
    methods:{
        handleClick(e) {
            console.log("click", e);
            this.sider_status = e.key;
            this.$axios({
                headers: {
                    'token': window.sessionStorage.getItem('token')
                },
                method: 'post',
                url:'https://gugooscholar-k5yn3ahzxq-df.a.run.app/admin/test'
            }).then((res)=>{
                console.log(res);
            }).catch((res) =>{
                console.log(res);
                this.$message.error("不是管理员，请使用管理员账号",1);
                this.$router.push({
                    path: 'Home'
                })
            });

            if(this.sider_status == 3) {    //如果是所有用户，则要将所有查询出所有用户
                this.loading == true;
                console.log(window.sessionStorage.getItem('token'));
                this.$axios({
                    headers: {
                        'token': window.sessionStorage.getItem('token')
                    },
                    method: 'post',
                    url: 'https://gugooscholar-k5yn3ahzxq-df.a.run.app/admin/user/all'
                }).then((res)=>{
                    this.loading == false;
                    console.log(res);
                    this.user_list = res.data.data; 
                })
            }
            else if(this.sider_status==9) {
                this.loading == true;
                this.$axios({
                    headers: {
                        'token': window.sessionStorage.getItem('token')
                    },
                    method: 'post',
                    url: 'https://gugooscholar-k5yn3ahzxq-df.a.run.app/admin/report/unhandle'
                }).then((res)=>{
                    this.loading == false;
                    this.report_list = res.data.data;
                    for(var i =0;i <this.report_list.length;i++) {
                        this.report_list[i]['status']=this.report_list[i]['status']==0? "未处理":"已处理";
                    }
                    console.log(res);
                }).catch((error)=>{
                    console.log(error);
                    this.$message.erorr("加载失败");
                });
                console.log("wzkwzk");
                this.$axios({
                    headers: {
                        'token': window.sessionStorage.getItem('token')
                    },
                    method: 'post',
                    url: 'https://gugooscholar-k5yn3ahzxq-df.a.run.app/admin/report/all'
                }).then((res)=>{
                    this.loading == false;
                    this.report_all_list = res.data.data;
                    for(var i =0;i <this.report_all_list.length;i++) {
                        this.report_all_list[i]['status']=this.report_all_list[i]['status']==0? "未处理":"已处理";
                    }
                    console.log(res);
                }).catch((error)=>{
                    console.log(error);
                    this.$message.erorr("加载失败");
                });
            }
        },
        searchPaper() {
            console.log(this.searchPaperValue);
            console.log(this.searchPaperType);
            if(this.searchPaperValue=="") {
                this.$message.error("搜索不能为空");
                return;
            }
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
        },
        searchAuthorPaper() {
            console.log(this.searchAuthorPaperValue);
            console.log(this.searchPaperType);
            if(this.searchAuthorPaperValue=="") {
                this.$message.error("搜索不能为空");
                return;
            }
            this.loading = true;
            this.$axios({
                method: 'get',
                url: 'https://gugooscholar-k5yn3ahzxq-df.a.run.app/author/paper',
            }).then((res) => {
                console.log(res.data);
                this.loading = false;
                this.paper_author_list = res.data.data;
                console.log(this.paper_author_list);
            })
        },
        deleteUser(user,index) {
            console.log(user.username);
            console.log(index);
            this.$message.loading({ content: '删除中', key });
            this.$axios({
                headers: {
                    'token': window.sessionStorage.getItem('token')
                },
                method: 'post',
                url: 'https://gugooscholar-k5yn3ahzxq-df.a.run.app/admin/user/delete',
                params: {
                    username: user.username
                }
            }).then((res)=>{
                this.loading = false;
                console.log(res);
                this.$message.success({ content: '删除用户成功', key, duration: 2 });
                this.user_list.splice(index, 1); 
                return;
            }).catch(()=> {
                this.$message.error({ content: '删除用户失败', key, duration: 2 })
            })
        },
        goToUser() {
            console.log(1);
        },
        passReport(report){
            console.log(report);
            this.$axios({
                headers: {
                    'token': window.sessionStorage.getItem('token')
                },
                method: 'post',
                url: 'https://gugooscholar-k5yn3ahzxq-df.a.run.app/admin/report/pass',
                params: {
                    report_id : report.report_id,
                }
            }).then(() => {
                this.$message.success("已成功通过此申诉");
            }).catch(()=> {
                this.$message.error("操作失败，请重新登录");
            }) 
        },
        denyReport(report){
            console.log(report);
            this.$axios({
                headers: {
                    'token': window.sessionStorage.getItem('token')
                },
                method: 'post',
                url: 'https://gugooscholar-k5yn3ahzxq-df.a.run.app/admin/report/deny',
                params: {
                    report_id : report.report_id,
                }
            }).then(() => {
                this.$message.success("已成功拒绝此申诉");
            }).catch(()=> {
                this.$message.error("操作失败，请重新登录");
            }) 
        },
        searchUser() {
            
        },
        paperLink(url) {
            console.log(url);
            window.location.href=url;
        },
        callback(key) {
            console.log(key);
        },
    },
    beforeCreate() {
        this.$axios({
            headers: {
                'token': window.sessionStorage.getItem('token')
            },
            method: 'post',
            url:'https://gugooscholar-k5yn3ahzxq-df.a.run.app/admin/test'
        }).then((res)=>{
            console.log(res);
            if(res.data.success==false) {
                this.$message.error("请以管理员身份操作",1);
                this.$router.push({
                    path: '../'
                });
                return;
            }
            else {
                this.loading = true;
                this.$axios({
                    method: 'get',
                    url: 'https://gugooscholar-k5yn3ahzxq-df.a.run.app/paper/search',
                    params: {
                        words: "a",
                        type: "title"
                    }
                }).then((res) => {
                    console.log(res.data);
                    this.loading = false;
                    this.paper_list = res.data.data;
                })
            }
        }).catch((res) =>{
            console.log(res);
            console.log("wzkwzk");
            this.$message.error("验证失败",1);
            this.$router.push({
                path: '../'
            })
        });
    }
}
</script>