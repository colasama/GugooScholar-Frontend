<template>
  <a-layout id="components-layout-demo-fixed-sider" style="min-height:1200px"><!--这里有些微妙，理论上可以自适应来着-->

    <a-layout-content style="padding: 50px 100px" >
      <a-layout class="profileBox">
        <a-layout-sider width="250" style="background: #fff">
          <div style="margin:auto; height: 55px">
            <span style="margin:auto; font-size:20px; height:20%"><b>用户管理</b></span>
          </div>
          <a-menu
            mode="inline"
            :default-selected-keys="['1']"
            :default-open-keys="['1']"
            style="height: 100%"
            @click="handleClick"
          >
            <a-menu-item key="1">
                <span><a-icon type="user" />用户信息</span>
            </a-menu-item>
            
            <a-menu-item key="2">
                <span><a-icon type="key" />密码修改</span>
            </a-menu-item>
          </a-menu>
        </a-layout-sider>

        <!-- 个人信息的页面 -->
        <a-layout-content :style="{ padding: '0 24px', minHeight: '280px', }" v-if="sider_status==1">

        <a-breadcrumb style="margin:0px 0 0px -730px;">
            <a-breadcrumb-item href="" :style="{ padding: '0px'}">
                <a-icon type="home" />
                <span>主页</span>
            </a-breadcrumb-item>
            <a-breadcrumb-item>
                <a-icon type="user" />
                <span>用户管理</span>
            </a-breadcrumb-item>
            <a-breadcrumb-item>
                用户信息
            </a-breadcrumb-item>
        </a-breadcrumb>
        <span style="font-size:40px; "><b>用户信息</b></span>
        <br>
        <span style="font-size:15px">您在Gugoo学术的个人信息，例如名字和电话</span>
        <br>
        <br>
        <br>
        <a-card class="infoCard">
          <div>
            <span class="cardTitle">基本资料</span>
          </div>
          <br>
          <a-row style="margin-top:24px">
            <a-col :span="8" class="profile_col_title">
              <b>
                <a-icon type="idcard"/> 账号
              </b>
            </a-col>
            <a-col :span="14" class="profile_col_content"><span style="font-size: 20px;">{{userInfo.userId}}</span></a-col>
          </a-row>
          <a-divider />
          <a-row style="margin-top:24px">
            <a-col :span="8" class="profile_col_title">
              <b>
                <a-icon type="user"/> 名字
              </b>
            </a-col>
            <a-col :span="14" class="profile_col_content"><span style="font-size: 20px;">{{userInfo.userName}}</span></a-col>
            <a-col :span="1" class="profile_col_edit"><a-button shape="circle" icon="edit" @click="set_modal_visible(2)"/></a-col>
            <a-modal
              title="修改名字"
              :visible="modal_visible==2"
              :confirm-loading="confirmLoading"
              okText="提交"
              cancelText="取消"
              @ok="submit"
              @cancel="handleCancel"
            >
            <a-form-model >
              <a-form-item>
                <a-icon type="user"/> 名字:<a-input v-model="userInfo.userName" />
              </a-form-item>
            </a-form-model>
            </a-modal>
          </a-row>
          <a-divider />
          <a-row style="margin-top:24px">
            <a-col :span="8" class="profile_col_title">
              <b>
                <a-icon type="man"/> 性别
              </b>
            </a-col>
            <a-col :span="14" class="profile_col_content"><span style="font-size: 20px;">{{userInfo.userSex}}</span></a-col>
            <a-col :span="1" class="profile_col_edit"><a-button shape="circle" icon="edit" @click="set_modal_visible(3)"/></a-col>
            <a-modal
              title="修改性别"
              :visible="modal_visible==3"
              :confirm-loading="confirmLoading"
              okText="提交"
              cancelText="取消"
              @ok="submit"
              @cancel="handleCancel"
            >
                  <a-form-item>
                    <a-icon type="man" /> 性别:<br>
                    <a-radio-group defaultValue="男" v-decorator="['radio-group']" v-model="userInfo.userSex">
                      <a-radio value="男">
                        男
                      </a-radio>
                      <a-radio value="女">
                        女
                      </a-radio>
                    </a-radio-group>
                  </a-form-item>
            </a-modal>
          </a-row>
          <a-divider />
          <a-row style="margin-top:24px">
            <a-col :span="8" class="profile_col_title">
              <b>
                <a-icon type="gift" /> 生日
              </b>
            </a-col>
            <a-col :span="14" class="profile_col_content"><span style="font-size: 20px;">{{userInfo.userBirth}}</span></a-col>
            <a-col :span="1" class="profile_col_edit"><a-button shape="circle" icon="edit" @click="set_modal_visible(4)"/></a-col>
            <a-modal
              title="修改生日"
              :visible="modal_visible==4"
              :confirm-loading="confirmLoading"
              okText="提交"
              cancelText="取消"
              @ok="handleOk"
              @cancel="handleCancel"
            >
            <div :style="{ margin:auto, border: '1px solid #d9d9d9', borderRadius: '4px' }">
              <a-calendar :fullscreen="false" style="margin:auto;"/>
            </div>
            </a-modal>
          </a-row>
        </a-card>

        <br>

        <a-card class='infoCard'>
          <div>
            <span class="cardTitle">联系方式</span>
          </div>
          <br>
          <br>
          <a-row style="margin-top:24px">
            <a-col :span="8" class="profile_col_title">
              <b>
                <a-icon type="mail"/> 邮箱
              </b>
            </a-col>
            <a-col :span="14" class="profile_col_content"><span style="font-size: 20px;">{{userInfo.userEmail}}</span></a-col>
            <a-col :span="1" class="profile_col_edit"><a-button shape="circle" icon="edit" @click="set_modal_visible(5)"/></a-col>
            <a-modal
              title="修改邮箱"
              :visible="modal_visible==5"
              :confirm-loading="confirmLoading"
              okText="提交"
              cancelText="取消"
              @ok="handleOk"
              @cancel="handleCancel"
            >
            <a-form-model >
              <a-form-item>
                <a-icon type="mail" /> 邮箱:<a-input v-model="userInfo.userEmail" />
              </a-form-item>
            </a-form-model>
            </a-modal>
          </a-row>
        </a-card>

        <br>

        <a-card class="infoCard">
          <div>
            <span class="cardTitle">个人简介</span>
          </div>
          <br>
          <br>
          <transition name="slide-fade">
          <a-row v-if="modal_visible==0">
          <a-col :span="22">
            <div style=" work-break: keep-all; max-width:90%; margin:auto; text-align:left;">{{userInfo.description}}</div>
          </a-col>
          <a-col :span="2" class="profile_col_edit"><a-button shape="circle" icon="edit" @click="set_modal_visible(6)"/></a-col>
          </a-row>
          </transition>
          <transition name="slide-fade">
          <a-row v-if="modal_visible==6">
          <a-col :span="20">
            <a-form-model-item style="work-break: keep-all; max-width:90%; margin:auto; text-align:left;">
              <a-input v-model="userInfo.description" type="textarea" />
            </a-form-model-item>
          </a-col>
          <a-col :span="2" class="profile_col_edit"><a-button v-if="loading_visible==0" shape="circle" icon="check" @click="submit($event)"/><a-button v-if="loading_visible==1" shape="circle" icon="loading"/></a-col>
          <a-col :span="2" class="profile_col_edit"><a-button shape="circle" icon="close" @click="handleCancel($event)"/></a-col>
          </a-row>
          </transition>
          <!-- <a-modal
              title="修改个人简介"
              :visible="modal_visible==6"
              :confirm-loading="confirmLoading"
              okText="提交"
              cancelText="取消"
              @ok="handleOk"
              @cancel="handleCancel"
            >
            </a-modal> -->
        </a-card>

        </a-layout-content>


        <!-- 修改密码的页面 -->
        <a-layout-content :style="{ overflow: 'initial', padding: '0 24px', minHeight: '280px'}" v-if="sider_status==2">

        <a-breadcrumb style="margin:0px 0 0px -730px;">
            <a-breadcrumb-item href="" :style="{ padding: '0px'}">
                <a-icon type="home" />
                <span>主页</span>
            </a-breadcrumb-item>
            <a-breadcrumb-item >
                <a-icon type="user" />
                <span>用户管理</span>
            </a-breadcrumb-item>
            <a-breadcrumb-item>
                密码修改
            </a-breadcrumb-item>
        </a-breadcrumb>
        <br>
        <span style="font-size:40px; "><b>密码修改</b></span>
          <br>
        <span style="font-size:15px">修改您用于登陆Gugoo学术的密码</span>
        <br>
        <br>
        <br>
        <a-card class="infoCard">
          <a-form-item label="Success" has-feedback validate-status="" class="formInput">
            <a-input id="success" placeholder="I'm the content" />
          </a-form-item>
              <a-input
                v-decorator="[
                  'userName',
                  { rules: [{ required: true, message: 'Please input your username!' }] },
                ]"
                placeholder="请输入原密码"
                class="formInput"
              >
                <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
              </a-input>
              <a-input
                v-decorator="[
                  'password',
                  { rules: [{ required: true, message: 'Please input your Password!' }] },
                ]"
                type="password"
                placeholder="请输入新密码"
                class="formInput"
              >
                <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25);" />
              </a-input>
              <a-input
                v-decorator="[
                  'password',
                  { rules: [{ required: true, message: 'Please input your Password!' }] },
                ]"
                type="password"
                placeholder="确认新密码"
                class="formInput"
              >
                <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
              </a-input>
              <a-button type="primary"  @click="modifyPwd">
                确认修改
              </a-button>
        </a-card>
        
        </a-layout-content>


      </a-layout>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      咕鸽学术 ©2020 Created by Gugoo-scholar team
    </a-layout-footer>
  </a-layout>
</template>

<style>

#components-layout-demo-fixed-sider .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.infoCard{
  width: 80%; 
  margin: auto;
}

.cardTitle{
  font-size: 25px; 
  margin-left:-80%;
}

.formInput{
  margin: auto;
  width: 40%;
  height: 60px
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
      sider_status: 1,
      modal_visible: 0,
      loading_visible: 0,
      userInfo:{
        userId:0,
        userName:"wzk",
        password:"asdfasdfasfd",
        userBirth:"",
        userSex:"男",
        userEmail:"869693441@qq.com",
        description:"阿斯顿发水电费水电费水电费水电费水电费水电费水电费水电费水电费水电费asdfasfasdfasdf水电费水电费水电费",
      },
    }
  },
  methods:{
    handleClick(e) {
      console.log("click", e);
      this.sider_status = e.key;
    },
    set_modal_visible(e){
      this.modal_visible=e;
    },
    submit(e) {
      console.log(e);
      this.$message.success('提交成功',1);
      this.confirmLoading = true;
      this.loading_visible = 1;
      setTimeout(() => {
        this.modal_visible = 0;
        this.confirmLoading = false;
        this.loading_visible = 0;
      }, 1000);
    },
    handleCancel() {
      console.log('Clicked cancel button');
      this.modal_visible = 0;
    },
    modifyPwd() {
      console.log("Modify pwd");
    }
  }
  
}


</script>
