<template>
  <a-layout style="minHeight:auto">

    <a-layout-content style="padding: 50px 0 50px 0" >
      <a-layout class="profileBox">
        <a-layout-sider width="250" style="background: #fff">

          <div style="margin:auto; height: 55px">
            <span style="margin:auto; font-size:20px; height:20%"><b>用户管理</b></span>
          </div>
          <a-menu
            mode="inline"
            :default-selected-keys="['1']"
            :default-open-keys="['1']"
            style="height: 90%"
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
        <a-spin tip="加载中..." style = "margin:auto" v-if="sider_status==0"></a-spin>
        <!-- 个人信息的页面 -->
        <a-layout-content :style="{ padding: '0px', minHeight: '280px', }" v-if="sider_status==1">

        <a-breadcrumb style="margin:0px 0 0px 0px;">
          <div style="text-align:left">
            <a-breadcrumb-item href="" style="margin-left:30px">
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
          </div>
        </a-breadcrumb>
        <br>
        <span style="font-size:40px; "><b>用户信息</b></span>
        <br>
        <span style="font-size:15px">您在咕鸽学术的个人信息，例如名字和电话</span>
        <br>
        <br>
        <br>
        <!-- <a-card class="infoCard">
          <div class="cardTitle">
            <span >头像</span>
            <div>
              <span style="font-size: 15px">上传头像来个性化您的信息</span>
            </div>
          </div>
          <a-avatar :size="128" icon="user" :src="userInfo.avatarSrc"></a-avatar>
          <a-upload
            style="margin:0 auto"
            name="image"
            :show-upload-list="false"
            action="http://182.92.57.178:5000/pictures/add"
          >
          <a-avatar :size="128" class="avatarStyle" v-if="userInfo.avatarSrc!=null" :src="userInfo_orig.avatarSrc" />

          <avatar
            :size="128"
            class="avatarStyle"
            v-if="userInfo.avatarSrc==null"
            :username="`${userInfo.userName}`"
          ></avatar>
        </a-upload>
        </a-card>
        <br> -->
        <a-card class="infoCard">
          <div class="cardTitle">
            <span >基本资料</span>
          </div>
          <br>
          <br>
          <a-row style="margin-top:0px">
            <a-col :span="8" class="profile_col_title">
              <b style="font-size: 16px;">
                <a-icon type="idcard"/> 账号
              </b>
            </a-col>
            <a-col :span="14" class="profile_col_content"><span >{{userInfo_orig.userId}}</span></a-col>
          </a-row>
          <a-divider class="divider"/>
          <a-row style="margin-top:0px; vertical-align:middle">
            <a-col :span="8" class="profile_col_title">
              <b style="font-size: 16px;">
                <a-icon type="user"/> 名字
              </b>
            </a-col>
            <a-col :span="14" class="profile_col_content"><span style="font-size: 16px;">{{userInfo_orig.userName}}</span></a-col>
            <a-col :span="1" class="profile_col_edit"><a-button type="link" style="color:#74b1be;margin-left:-15px" @click="set_modal_visible(2)">编辑</a-button></a-col>
            <a-modal
              title="修改名字"
              :visible="modal_visible==2"
              :confirm-loading="confirmLoading"
              okText="提交"
              cancelText="取消"
              @ok="modifyUserInfo('name')"
              @cancel="handleCancel"
            >
            <a-form-model >
              <a-form-item>
                <a-icon type="user"/> 名字:<a-input v-model="userInfo.userName" />
              </a-form-item>
            </a-form-model>
            </a-modal>
          </a-row>
          <!-- <a-divider class="divider"/> -->
          <!-- <a-row style="margin-top:0px;" >
            <a-col :span="8" class="profile_col_title">
              <b>
                <a-icon type="man"/> 性别
              </b>
            </a-col>
            <a-col :span="14" class="profile_col_content"><span style="font-size: 16px;">{{userInfo_orig.userSex}}</span></a-col>
            <a-col :span="1" class="profile_col_edit"><a-button type="link" style="color:#74b1be" icon="edit" @click="set_modal_visible(3)"/></a-col>
            <a-modal
              title="修改性别"
              :visible="modal_visible==3"
              :confirm-loading="confirmLoading"
              okText="提交"
              cancelText="取消"
              @ok="modifyUserInfo"
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
          <a-divider class="divider"/>
          <a-row style="margin-top:0px">
            <a-col :span="8" class="profile_col_title">
              <b>
                <a-icon type="gift" /> 生日
              </b>
            </a-col>
            <a-col :span="14" class="profile_col_content"><span style="font-size: 16px;">{{userInfo_orig.userBirth}}</span></a-col>
            <a-col :span="1" class="profile_col_edit"><a-button type="link" style="color:#74b1be" icon="edit" @click="set_modal_visible(4)"/></a-col>
            <a-modal
              title="修改生日"
              :visible="modal_visible==4"
              :confirm-loading="confirmLoading"
              okText="提交"
              cancelText="取消"
              @ok="submit"
              @cancel="handleCancel"
            >
            <div :style="{ margin:auto, border: '1px solid #d9d9d9', borderRadius: '4px' }">
              <a-calendar :fullscreen="false" style="margin:auto;"/>
            </div>
            </a-modal>
          </a-row> -->
        </a-card>

        <br>

        <a-card class='infoCard'>
          <div class="cardTitle">
            <span>联系方式</span>
          </div>
          <br>
          <br>
          <a-row style="margin-top:24px">
            <a-col :span="8" class="profile_col_title">
              <b style="font-size: 16px;">
                <a-icon type="mail"/> 邮箱
                <a-tooltip v-if="!userInfo_orig.isActive">
                  <template slot="title">
                    邮箱未激活
                  </template>
                  <a-icon type="exclamation-circle" style="color:red; height:0.8em; width:0.8em"/>
                </a-tooltip>
              </b>
            </a-col>
            <a-col :span="14" class="profile_col_content"><span style="font-size: 16px;">{{userInfo_orig.userEmail}}<span v-if="!userInfo_orig.isActive" style="color:red">[未激活]</span></span></a-col>
            <a-col v-if="userInfo_orig.isActive" :span="1" class="profile_col_edit"><a-button type="link" style="color:#74b1be;margin-left:-15px" @click="changeMail(5)">编辑</a-button></a-col>
            <a-col v-if="!userInfo_orig.isActive" :span="1" class="profile_col_edit">
              <a-button type="link" style="color:#74b1be;margin-left:-15px" @click="activeUser">
                激活
              </a-button>
            </a-col>
            <a-modal
              title="修改邮箱"
              :visible="modal_visible==5&&mailsended==true"
              :confirm-loading="confirmLoading"
              okText="确定"
              cancelText="关闭"
              @ok="handleCancel"
              @cancel="handleCancel"
            >
              <div v-if="mailsended==true">
                  <a-result
                    status="success"
                    title="一封修改邮件已发送!"
                    sub-title="请您查看您原来邮箱，根据邮件中的步骤完成邮箱修改最后一步操作。"
                  >
                  </a-result>
              </div>
            </a-modal>
            <a-modal
              title="激活邮箱"
              :visible="modal_visible==5&&activeModel==true"
              :confirm-loading="confirmLoading"
              okText="确定"
              cancelText="关闭"
              @ok="handleCancel"
              @cancel="handleCancel"
            >
              <div v-if="activeModel==true">
                  <a-result
                    status="success"
                    title="一封激活邮件已发送!"
                    sub-title="请查看邮箱来激活您的邮箱"
                  >
                  </a-result>
              </div>
            </a-modal>
          </a-row>
          <a-divider class="divider"/>
          <a-row style="margin-top:0px">
            <a-col :span="8" class="profile_col_title">
              <b style="font-size: 16px;">
                <a-icon type="environment"/> 住址
              </b>
            </a-col>
            <a-col :span="14" class="profile_col_content"><span style="font-size: 16px;">{{userInfo_orig.location}}</span></a-col>
            <a-col :span="1" class="profile_col_edit"><a-button type="link" style="color:#74b1be;margin-left:-15px" @click="set_modal_visible(7)">编辑</a-button></a-col>
            <a-modal
              title="修改住址"
              :visible="modal_visible==7"
              :confirm-loading="confirmLoading"
              okText="提交"
              cancelText="取消"
              @ok="modifyUserInfo('location')"
              @cancel="handleCancel"
            >
            <a-form-model >
              <a-form-item>
                <a-icon type="environment" /> 住址:<a-input v-model="userInfo.location" />
              </a-form-item>
            </a-form-model>
            </a-modal>
          </a-row>
        </a-card>

        <br>

        <a-card class="infoCard" style="margin-bottom:48px">
          <div class="cardTitle">
            <span>个人简介</span>
          </div>
          <br>
          <br>
          <a-row style="margin-top:24px">
          <a-col :span="22">
            <div style=" work-break: keep-all; max-width:90%; margin:auto; text-align:left;font-size:16px">{{userInfo_orig.description}}</div>
          </a-col>
          <a-col :span="2" class="profile_col_edit"><a-button type="link" style="color:#74b1be;margin-left:-15px" @click="set_modal_visible(6)">编辑</a-button></a-col>
          </a-row>
          <a-modal
              title="修改个人简介"
              :visible="modal_visible==6"
              :confirm-loading="confirmLoading"
              okText="提交"
              cancelText="取消"
              @ok="modifyUserInfo('description')"
              @cancel="handleCancel"
            >
            <a-input v-model="userInfo.description" type="textarea" :rows="5"/>
            </a-modal>
        </a-card>
        </a-layout-content>


        <!-- 修改密码的页面 -->
        <a-layout-content :style="{ overflow: 'initial', padding: '0px', minHeight: '280px'}" v-if="sider_status==2">

        <a-breadcrumb style="margin:0px 0 0px 0px;">
          <div style="text-align:left">
            <a-breadcrumb-item href="/" style="margin-left:30px">
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
          </div>
        </a-breadcrumb>
        <br>
        <span style="font-size:40px; "><b>密码修改</b></span>
          <br>
        <span style="font-size:15px">修改您用于登陆咕鸽学术的密码</span>
        <br>
        <br>
        <br>
        <a-card class="infoCard" style="margin-bottom:48px">
              <div><a-input
                v-decorator="[
                  'oldpassword',
                  { rules: [{ required: true, message: '原密码不能为空' }] },
                ]"
                type="password"
                placeholder="请输入原密码"
                class="formInput"
                size="large"
                v-model="userInfo_orig.password"
              >
                <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
              </a-input></div>
              <div><a-input
                v-decorator="[
                  'newpassword',
                  { rules: [{ required: true, message: '新密码不能为空' }] },
                ]"
                type="password"
                placeholder="请输入新密码"
                class="formInput"
                size="large"
                v-model="userInfo.password"
              >
                <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
              </a-input></div>
              <div><a-input
                v-decorator="[
                  'checkpassword',
                  { rules: [{ required: true, message: '确认密码不能为空' }] },
                ]"
                type="password"
                placeholder="确认新密码"
                class="formInput"
                size="large"
                :required="true"
                v-model="userInfo.checkPassword"
              >
                <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
              </a-input></div>
              <a-button type="primary"  @click="modifyPwd" size="large" style="width:40%;margin-top:12px">
                确认修改
              </a-button>
        </a-card>
        </a-layout-content>
      </a-layout>
    </a-layout-content>
    <div>
    <a-back-top style="margin-right:30px"/>
    <strong style="color: rgba(64, 64, 64, 0.6);"> </strong>
    </div>
  </a-layout>
</template>

<style scoped>

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
  max-width:68%;
  margin: 0 16% 0 16%;
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

.divider {
  margin: 10px 0px 10px 0px;
}


</style>

<script>
export default {
  name: 'Home',
  data(){
    return{
		sider_status: 1,
		layoutHeight: {"min-height":"1120px"},
		modal_visible: 0,
		loading_visible: 0,
    confirmLoading: false,
    mailsended: false,
    activeModel: false,
		userInfo:{
      isActive:"",
			userId:"",
			userName:"",
			password:"",
      checkPassword:"",
			avatarSrc:"",
			userBirth:"",
			userSex:"",
			userEmail:"",
			description:"",
			location:"",
		},
		userInfo_orig:{
      isActive:"",
			userId:"",
			userName:"",
			password:"",
			avatarSrc:"",
			userBirth:"",
			userSex:"",
			userEmail:"",
			description:"",
			location:"",
		}
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
		handleCancel() {
			console.log('Clicked cancel button');
			this.userInfo.userName = "";
			this.userInfo.password = "";
			this.userInfo.avatarSrc = "";
			this.userInfo.userBirth = "";
			this.userInfo.userSex = "";
			this.userInfo.userEmail = "";
			this.userInfo.description = "";
      this.modal_visible = 0;
      this.mailsended = false;
      this.activeModel = false;
		},
		modifyPwd() {
      console.log("Modify pwd");
      console.log(this.userInfo_orig.password);
      console.log(this.userInfo.password);
      console.log(this.userInfo.checkPassword);
      if(this.userInfo.password!=this.userInfo.checkPassword){
        this.$message.error("两次密码不一致");
        return;
      }
      this.$axios({
        headers: {
                    'token': window.sessionStorage.getItem('token')
                },
        method: 'post',
        url: 'https://gugooscholar-k5yn3ahzxq-df.a.run.app/user/changepassword',
        params: {
          old_password: this.userInfo_orig.password,
          new_password: this.userInfo.password
        }
      }).then((res)=>{
        console.log(res);
        this.$message.success("修改密码成功");
      }).catch((res)=>{
        console.log(res);
        this.$message.error("原密码不正确，修改密码失败");
      })

		},
		modifyUserInfo(type) {
			console.log(type);
			console.log(window.sessionStorage.getItem('token'));
			this.confirmLoading = true;
			var paramsTemp = {};
			if(type=='name'){
				paramsTemp = {name: this.userInfo.userName}
				console.log(this.userInfo.userName);
			}
			if(type=='location') {
				paramsTemp = {location: this.userInfo.location}
				console.log(this.userInfo.location);
			}
			if(type=='description') {
				paramsTemp = {introduction: this.userInfo.description}
				console.log(this.userInfo.description);
			}
			this.$axios({
				headers: {
                    'token': window.sessionStorage.getItem('token')
                },
				method: 'post',
				url: 'https://gugooscholar-k5yn3ahzxq-df.a.run.app/user/modifyinfo',
				params: paramsTemp
			}).then((res) => {
				console.log(res);
				this.userTemp = res.data.data
        let user = res.data.data;
        this.userInfo_orig.isActive = user.activate;
				this.userInfo_orig.userId = user.username;
				this.userInfo_orig.userName = user.name==null? "": user.name;
				this.userInfo_orig.userEmail = user.email==null? "": user.email;
				this.userInfo_orig.description = user.introduction==null? "":user.introduction;
				this.userInfo_orig.location = user.location==null? "":user.location;
				this.modal_visible = 0;
				this.confirmLoading = false;
				this.$message.success("更新成功",1);
				return;
			}).catch((error) => {
				console.log(error);
				this.modal_visible = 0;
				this.confirmLoading = false;
				this.$message.error("更新失败",1);
			})
		},
		changeMail() {
      console.log(this.userInfo_orig.userId);
      console.log(this.userInfo.userEmail);
			this.$axios({
				method:'post',
        url:'https://gugooscholar-k5yn3ahzxq-df.a.run.app/user/sendmail',
        params: {
          username: this.userInfo_orig.userId,
          email: this.userInfo_orig.userEmail,
          url: "https://gugoo.fewings.xyz/#/changeMail",
        }
			}).then((res)=> {
        this.modal_visible = 5;
        this.mailsended = true;
        console.log(res);
      }).catch(()=>{
        this.$message.error("发送验证邮件失败")
      })
    },
    activeUser() {
      this.modal_visible = 5;
      console.log(this.userInfo_orig.userEmail);
      this.$axios({
        method: "post",
        url: "https://gugooscholar-k5yn3ahzxq-df.a.run.app/user/sendmail",
        data: {
          username: this.userInfo_orig.userId,
          email: this.userInfo_orig.userEmail,
          url: "https://gugoo.fewings.xyz/#/auth",
        },
      }).then((res) => {
        console.log(res);
        this.activeModel = true;
      }).catch((res) => {
        console.log(res);
        this.$message.error("发送验证邮件失败");
      })
    }
	},
	mounted() {
		this.sider_status = 0;
		let username=window.sessionStorage.getItem("username");
		console.log('https://gugooscholar-k5yn3ahzxq-df.a.run.app/user/'+username+'info');
		if(username==null) {
			this.$message.error("用户名不存在,获取信息失败");
		}
		this.$axios({
			method: 'get',
			url: 'https://gugooscholar-k5yn3ahzxq-df.a.run.app/user/'+username+'/info',
		}).then((res) => {
			console.log(res.data);
			this.sider_status = 1;
			this.loading = false;
      let user = res.data.data;
      this.userInfo_orig.isActive = user.activate;
			this.userInfo_orig.userId = user.username;
			this.userInfo_orig.userName = user.name==null? "": user.name;
			this.userInfo_orig.userEmail = user.email==null? "": user.email;
			this.userInfo_orig.description = user.introduction==null? "":user.introduction;
			this.userInfo_orig.location = user.location==null? "":user.location;
		})
	}
}


</script>
