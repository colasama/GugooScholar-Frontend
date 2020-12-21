<template>
  <a-layout :style="layoutHeight">

    <a-layout-content style="padding: 50px 100px 50px 100px" >
      <a-layout class="profileBox">
        <a-layout-sider width="200" style="background: #fff">

          <div style="margin:auto; height: 55px">
            <span style="margin:auto; font-size:20px; height:20%"><b>科研人员管理</b></span>
          </div>
          <a-menu
            mode="inline"
            :default-selected-keys="['1']"
            :default-open-keys="['1']"
            style="height: 80%"
            @click="handleClick"
          >
            <a-menu-item key="1">
                <span><a-icon type="user" />查找现有科研人员</span>
            </a-menu-item>
            
            <a-menu-item key="2">
                <span><a-icon type="edit" />新增科研人员</span>
            </a-menu-item>
            
          </a-menu>
        </a-layout-sider>

        <!-- 现有科研人员信息的页面 -->
        <a-layout-content :style="{ padding: '0 24px', minHeight: '280px', }" v-if="sider_status==1">

        <a-breadcrumb style="margin:0px 0 0px -730px;">
            <a-breadcrumb-item href="" :style="{ padding: '0px'}">
                <a-icon type="home" />
                <span>主页</span>
            </a-breadcrumb-item>
            <a-breadcrumb-item>
                <a-icon type="user" />
                <span>科研人员管理</span>
            </a-breadcrumb-item>
            <a-breadcrumb-item>
                现有科研人员信息
            </a-breadcrumb-item>
        </a-breadcrumb>
        <span style="font-size:40px; "><b>查找现有科研人员信息</b></span>
        <br>
        <span style="font-size:15px">已存在的科学家</span>
        <br>
        <br>
        <div>
        <a-input-search
          placeholder="请输入科研人员id"
          enter-button="查找"
          size="large"
          v-model="searchAuthorid"
          @search="handleSearch"
          />
        <br /><br />
        </div>
        <div>
    <a-card v-if="findAuthor==false">
      没有查找结果
    </a-card>
    <a-card 
      v-if="findAuthor==true"
      style="width:100%"
      title="查找结果"
    >
    <a-row>
    <a-col :span="3" ><b>名字</b></a-col>
    <a-col :span="18"><span style="font-size: 20px;">{{scientisitInfo.name}}</span></a-col>
    <a-col :span="2"><a-button   @click="showModal(1)" >
      修改
    </a-button></a-col>
    <a-modal
      title="修改姓名"
      :visible="visible==1"
      :confirm-loading="confirmLoading"
      okText="提交"
      cancelText="取消"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form-model >
        <a-form-item>
        <a-icon type="user"/> 姓名:<a-input v-model="scientisitInfo.name" />
        </a-form-item>
      </a-form-model>
    </a-modal>
    </a-row>
    <a-divider />
    <a-row>
    <a-col :span="3" ><b>被引用数</b></a-col>
    <a-col :span="18"><span style="font-size: 20px;">{{scientisitInfo.citation}}</span></a-col>
    <a-col :span="2"><a-button   @click="showModal(2)" >
      修改
    </a-button></a-col>
    <a-modal
      title="修改被引用"
      :visible="visible==2"
      :confirm-loading="confirmLoading"
      okText="提交"
      cancelText="取消"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form-model >
        <a-form-item>
        <a-icon type="user"/> 被引用数:<a-input v-model="scientisitInfo.citation" />
        </a-form-item>
      </a-form-model>
    </a-modal>
    </a-row>
    <a-divider />
    <a-row>
    <a-col :span="3" ><b>发表数</b></a-col>
    <a-col :span="18"><span style="font-size: 20px;">{{scientisitInfo.pubs}}</span></a-col>
    <a-col :span="2"><a-button   @click="showModal(3)" >
      修改
    </a-button></a-col>
    <a-modal
      title="修改发表数"
      :visible="visible==3"
      :confirm-loading="confirmLoading"
      okText="提交"
      cancelText="取消"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form-model >
        <a-form-item>
        <a-icon type="user"/> 发表数:<a-input v-model="scientisitInfo.pubs" />
        </a-form-item>
      </a-form-model>
    </a-modal>
    </a-row>
    <a-divider />
    <a-row>
    <a-col :span="3" ><b>所属科研机构</b></a-col>
    <a-col :span="18"><span style="font-size: 20px;">{{scientisitInfo.orgs}}</span></a-col>
    <a-col :span="2"><a-button   @click="showModal(4)" >
      修改
    </a-button></a-col>
    <a-modal
      title="修改所属科研机构"
      :visible="visible==4"
      :confirm-loading="confirmLoading"
      okText="提交"
      cancelText="取消"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form-model >
        <a-form-item>
        <a-icon type="user"/> 所属科研机构:<a-input v-model="scientisitInfo.orgs" />
        </a-form-item>
      </a-form-model>
    </a-modal>
    </a-row>
    <a-divider />
    <a-row>
    <a-col :span="3" ><b>专业学术领域</b></a-col>
    <a-col :span="18"><span style="font-size: 20px;">{{scientisitInfo.field}}</span></a-col>
    <a-col :span="2"><a-button   @click="showModal(5)" >
      修改
    </a-button></a-col>
    <a-modal
      title="修改专业学术领域"
      :visible="visible==5"
      :confirm-loading="confirmLoading"
      okText="提交"
      cancelText="取消"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form-model >
        <a-form-item>
        <a-icon type="user"/> 专业学术领域:<a-input v-model="scientisitInfo.field" />
        </a-form-item>
      </a-form-model>
    </a-modal>
    </a-row>
    <a-divider />
    <a-row>
      <a-col :span="8">
        <a-button @click="handleSubmit">
          确认修改
        </a-button>
      </a-col>
      <a-col :span="8">
        <a-button @click="handleSearch">
          取消修改
        </a-button>
      </a-col>
      <a-col :span="8">
        <a-button @click="handleDelete">
          删除该科研人员
        </a-button>
      </a-col>
    </a-row>
    <a-divider />
    </a-card>
    <br /><br />
  </div>
  </a-layout-content>





        <!--增加新科研人员-->
        <a-layout-content :style="{ overflow: 'initial', padding: '0 24px', minHeight: '280px'}" v-if="sider_status==2">

        <a-breadcrumb style="margin:0px 0 0px -730px;">
            <a-breadcrumb-item href="" :style="{ padding: '0px'}">
                <a-icon type="home" />
                <span>主页</span>
            </a-breadcrumb-item>
            <a-breadcrumb-item >
                <a-icon type="user" />
                <span>科研人员管理</span>
            </a-breadcrumb-item>
            <a-breadcrumb-item>
                新增科研人员
            </a-breadcrumb-item>
        </a-breadcrumb>
        <a-form :form="form" @submit="handleCreateNewScientist">
          <a-form-item v-bind="formItemLayout" label="姓名">
            <a-input
              placeholder="请输入"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="所属科研机构">
            <a-input
              placeholder="请输入"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="专业学术领域">
            <a-input
              placeholder="请输入"
            />
          </a-form-item>
          <a-form-item v-bind="tailFormItemLayout">
            <a-button type="primary" html-type="submit">
            添加
            </a-button>
          </a-form-item>
    
    
    
    
    
    
        </a-form>
        <br>
        <br>
        
        </a-layout-content>
      </a-layout>
    </a-layout-content>
    <div>
    <a-back-top style="margin-right:30px"/>
    <strong style="color: rgba(64, 64, 64, 0.6);"> </strong>
    </div>
  </a-layout>
</template>

<style>

#components-layout-demo-fixed-sider .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
  text-align: center;
  margin: auto;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
  margin: auto;
  text-align: center;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px 0 0 0;
  color: #666;
  text-align: center;
}

.infoCard{
  width: 80%; 
  margin: auto;
}

.cardTitle{
  font-size: 25px;
  text-align: left;
  width: 95%;
  margin: auto;
}

.formInput{
  margin: 12px 0;
  width: 40%;
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
  vertical-align:middle;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .0s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}


</style>

<script>
export default {
  name: 'Home',
  data(){
    return{
      searchAuthorid:-1,
      findAuthor:false,
      current:1,
      sider_status: 1,
      ModalText: 'Content of the modal',
      visible: 0,
      confirmLoading: false,
      layoutHeight: {"min-height":"1120px"},
      scientisitInfo:{
        author_id:0,
        citation:999,
        pubs:55,
        name:"cxc",
        orgs:"New-North 15-408",
        field:"touch fish",
      },
      modal_visible: 0,
      loading_visible: 0,
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      },
    }
  },
  methods:{
    handleDelete(){
      console.log("delete scientist:%d",this.searchAuthorid);
    },
    handleSearch(){
      if(isNaN(this.searchAuthorid)){
        this.$message.info("请输入数字ID");
        this.searchAuthorid=-1;
        return;
      }

      /*测试用*/
      if(this.searchAuthorid==-1){
        this.findAuthor=true;
      }
      
      console.log("search scientist:%s",this.searchAuthorid);
    },
    handleClick(e) {
      console.log("click", e);
      this.sider_status = e.key;
    },
    showModal(e) {
      this.visible = e;
    },
    handleOk() {
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = 0;
        this.confirmLoading = false;
      }, 500);
    },
    handleCancel() {
      console.log('Clicked cancel button');
      this.visible = 0;
    },
  }
}


</script>
