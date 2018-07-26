<template>
  <div name="profile" class="profile">
    <h3 class="sub-tittle pro">个人信息</h3>
    <div class="profile-widget">
      <input type="file" id="headerImg" style="display: none" @change="uploadHeaderImg($event)" />
      <a href="javascript:;" @click="selectHeaderImg()"><img v-if="headerImg != ''" :src="headerImg" width="70" height="70" /><img v-if="headerImg == ''" src="../../static/images/headerImg.jpg" width="70" height="70" /></a>
      <h2>{{username}}</h2>
      <p v-if="roleId == 2">管理员</p>
      <p v-if="roleId == 1">普通会员</p>
    </div>
    <div class="profile-section-inner">
      <div class="col-md-6 profile-info">
        <h3 class="inner-tittle">基本信息 <div class="edit"><a href="javascript:;" @click="edit()">编辑</a> </div> </h3>
        <form action="javascript:;" id="userInfoForm">
          <div class="main-grid3" style="min-height:250px;">
          <div class="p-20">
            <div class="form-group">
              <label class="control-label">姓名</label>
              <div>
                <div class="input-group">
                  <span class="input-group-addon" v-if="editShow"><i class="fa fa-user" style="font-size: 17px;"></i></span>
                  <input type="text" v-if="editShow" v-model="username" check="ckNull" message="姓名" class="form-control1 icon" placeholder="姓名">
                  <div v-if="!editShow">
                    <p><i class="fa fa-user"></i>&nbsp;{{username}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group" v-if="roleId == 1">
              <label class="control-label">账号余额</label>
              <div>
                <p><i class="fa fa-cny"></i>&nbsp;{{amount}}&nbsp;&nbsp;&nbsp;<a href="javascript:;" style="color:#61a7f2;"  @click="recharge()">充值</a> </p>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label">电话号</label>
              <div>
                <div class="input-group">
                  <span class="input-group-addon" v-if="editShow"><i class="fa fa-mobile-phone" style="font-size: 25px;"></i></span>
                  <input type="text" v-if="editShow" v-model="tel" check="ckNull,ckTel" message="电话号" class="form-control1 icon" placeholder="电话号">
                  <div v-if="!editShow">
                    <p><i class="fa fa-mobile-phone" style="font-size: 20px;"></i>&nbsp;{{tel}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label">邮箱</label>
              <div>
                <div class="input-group">
                  <span class="input-group-addon" v-if="editShow"><i class="fa fa-envelope-o"></i></span>
                  <input type="text" v-if="editShow" v-model="email" check="ckNull,ckEmail" message="个人邮箱" class="form-control1 icon" placeholder="邮箱">
                  <div v-if="!editShow">
                    <p><i class="fa fa-envelope-o"></i>&nbsp;{{email}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group" v-if="roleId == 1">
              <label class="control-label">性别</label>
              <div>
                <div class="input-group">
                  <div style="float:left;width: 50px;" v-if="editShow">
                    <input type="radio" v-model="sex" value="1"  id="recmoned-yes" name="recmoned-set" class="regular-radio"/>
                    <label for="recmoned-yes"></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;男
                  </div>
                  <div style="float:left;width: 50px;" v-if="editShow">
                    <input type="radio" id="recmoned-no" v-model="sex" value="2" name="recmoned-set" class="regular-radio"/>
                    <label for="recmoned-no"></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;女
                  </div>
                  <div v-if="!editShow">
                    <p><i class="fa fa-intersex"></i>&nbsp;<span v-if="sex == 1" >男</span><span v-if="sex == 2">女</span></p>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group" v-if="roleId == 1">
              <label class="control-label">年龄</label>
              <div class="">
                <div class="input-group">
                  <span class="input-group-addon" v-if="editShow"><i class="fa fa-eye"></i></span>
                  <input type="text" v-if="editShow" v-model="age" class="form-control1 icon" placeholder="年龄">
                  <div v-if="!editShow">
                    <p><i class="fa fa-eye"></i>&nbsp;{{age}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-group" v-if="roleId == 1">
              <label class="control-label">生日</label>
              <div class="">
                <div class="input-group">
                  <span class="input-group-addon" v-if="editShow"><i class="fa fa-birthday-cake"></i></span>
                  <input type="text" v-if="editShow" v-model="birthday" @click="birthdayTime($event)" position="top" readonly="true" class="form-control1 icon date"  placeholder="生日">
                  <div v-if="!editShow">
                    <p><i class="fa fa-birthday-cake"></i>&nbsp;{{birthday}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="bts" v-if="editShow">
              <a href="javascript:;" @click="saveInfo()">保存</a>
            </div>
            <div class="clear" style="margin-bottom: 20px;"></div>
          </div>
        </div>
        </form>
      </div>
      <div class="profile-right">
        <h3 class="inner-tittle">设置密码</h3>
        <div class="main-grid3">
          <div class="p-20">
            <div class="form-group">
              <label class="control-label">原密码</label>
              <div class="">
                <div class="input-group">
									<span class="input-group-addon"><i class="fa fa-key"></i></span>
                  <input type="password" v-model="oldPassword" class="form-control1 icon" placeholder="原密码">
                </div>
              </div>
            </div>
            <div class="clear"></div>
            <div class="form-group">
              <label class="control-label">新密码</label>
              <div class="">
                <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-key"></i></span>
                  <input type="password" v-model="password" class="form-control1 icon" placeholder="新密码">
                </div>
              </div>
            </div>
            <div class="clear"></div>
            <div class="form-group">
              <label class="control-label">确认密码</label>
              <div class="">
                <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-key"></i></span>
                  <input type="password" v-model="confirmPass" class="form-control1 icon" placeholder="确认密码">
                </div>
              </div>
            </div>
            <div class="bts">
              <a href="javascript:;">保存</a>
            </div>
            <div class="clear"></div>
          </div>
        </div>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>
<script>
  import {Indicator, MessageBox, Toast} from "mint-ui";
  import charge from '../member/charge.vue';
  export default{
      name: 'profile',
      data(){
          return {
            username: '',
            tel: '',
            email: '',
            sex: '',
            age: '',
            birthday: '',
            oldPassword: '',
            password: '',
            confirmPass: '',
            headerImg: '',
            roleId: '',
            id: '',
            amount: '',
            editShow: false,
          }
      },
      mounted(){
        this.init();
      },
      methods: {

        /**
         * 初始化
         */
        init(){
            this.searchUser();
        },

        /**
         * 查找用户
         */
        searchUser(){
          this.$httpService.getUser().then((res)=>{
              if(res.code == '2000' && res.data){
                  var data = res.data;
                  this.username =  data.username;
                  this.tel = data.mobile;
                  this.roleId = data.roleId;
                  this.headerImg = data.headerImg ? data.headerImg : '';
                  this.tel = data.mobile;
                  this.email = data.email;
                  this.sex = data.sex;
                  this.age = data.age;
                  this.id = data.id;
                  this.amount = data.amount;
                  this.birthday = data.birthday;
              }
          })
        },

        /**
         * 生日
         */
        birthdayTime($event){
          var $this = this;
          window.onTime($event.target,{
            confirm: (val)=>{
              $this.birthday = val;
            },
            clear: ()=>{
              $this.birthday = "";
            }
          })
        },

        /**
         * 保存信息
         */
        saveInfo(){
          if(this.$stringUtil.validation("userInfoForm")){
            var param = {};
            if(this.roleId == '1'){
              param['memberId'] = this.id;
              param['memberName'] = this.username;
              param['memberTel'] = this.tel;
              param['memberEmail'] = this.email;
              param['memberSex'] = this.sex;
              param['memberAge'] = this.age;
              param['memberBirthday'] = this.birthday;
              param['memberHeaderImg'] = this.headerImg;
              this.$httpService.saveMember(param).then((res)=>{
                if(res.code == '2000'){
                  Toast("修改成功");
                }
              })
            }else if(this.roleId == '2'){
              param['userId'] = this.id;
              param['tel'] = this.tel;
              param['username'] = this.username;
              param['email'] = this.email;
              param['headerImg'] = this.headerImg;
              this.$httpService.saveUser(param).then((res)=>{
                if(res.code == '2000'){
                  Toast("修改成功");
                }
              })
            }
          }
        },

        /**
         * 选择头像
         */
        selectHeaderImg(){
          document.getElementById("headerImg").click();
        },

        /**
         * 上传头像
         */
        uploadHeaderImg($event){
          var file = $event.target.files[0];
          var $this = this;
          lrz(file, {width: 1000}, function (resFile) {      //width图片压缩像素比例
            $this.headerImg = resFile.base64
          });
        },

        /**
         * 编辑
         */
        edit(){
          this.editShow = !this.editShow;
        },

        /**
         * 充值
         */
        recharge(){
          var $this = this;
          $this.$parent.popshow = true;
          $this.$parent.message = "充值";
          $this.$parent.content = charge;
          $this.$parent.style = "width:700px;";
          $this.$parent.call = function(){
            $this.init();
          }
        },
      }
  }
</script>
<style>
.profile{
  margin-top: 70px;
}
  .main-grid3{
    width: 100%;
  }
  .profile-right{
    float: left;
    width: 49%;
  }
  .control-label{
    /*padding-left: 15px;*/
    height: 30px;
    line-height: 30px;
    font-size: 14px;
  }
  .bts{
    width: 80px;
    height: 30px;
    line-height: 30px;
    background: #00C6D7;
    cursor: pointer;
    text-align: center;
    border: 5px;
    font-size: 14px;
    border-radius: 5px;
    float: right;
  }
  .bts a{
    display: block;
    color: #ffffff;
  }
  .input-group{
    width: 80%;
  }
  .profile-section-inner{
    margin-bottom: 20px;
  }
  .edit{
    float: right;
    font-size: 16px;
    line-height: 50px;
    margin-right: 10px;
  }
.form-group{
  margin: 0px;
}
</style>
