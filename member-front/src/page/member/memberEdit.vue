<template>
  <div class="memberEdit">
    <form action="javascript:;" id="memberForm">
      <section class="group border-bottom-gray">
        <div class="titles"><h3>会员信息</h3></div>
        <div class="control">
          头&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;像&nbsp;：
          <input type="file" id="headerImg" style="display: none" @change="uploadHeaderImg($event)" />
          <div class="btn" @click="selectHeaderImg()" >选择</div>
        </div>
        <div class="control">
          姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名<span class="required">*</span>：
          <input type="text" v-model="memberName" message="姓名" check="ckNull" placeholder="请输入姓名" />
        </div>
        <div class="control">
          手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机<span class="required">*</span>：
          <input type="text" v-model="memberTel" message="手机号" check="ckTel" placeholder="请输入手机号"/>
        </div>
        <div class="control">
          邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱&nbsp;：
          <input type="text" v-model="memberEmail" message="邮箱" check="ckEmail" placeholder="请输入邮箱"/>
        </div>
      </section>
      <section class="group">
        <div class="control">
          <div style="float: left">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别&nbsp;：</div>
          <div style="float:left;width: 50px;">
            <input type="radio" v-model="memberSex" value="1"  id="recmoned-yes" name="recmoned-set" class="regular-radio"/>
            <label for="recmoned-yes"></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;男
          </div>
          <div style="float:left;width: 50px;">
            <input type="radio" id="recmoned-no" v-model="memberSex" value="2" name="recmoned-set" class="regular-radio"/>
            <label for="recmoned-no"></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;女
          </div>
        </div>
        <div class="control">
          年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄&nbsp;：
          <input type="text" placeholder="请输入年龄" message="年龄"  v-model="memberAge"/>
        </div>
        <div class="control">
          生&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日&nbsp;：
          <input type="text" @click="birthday($event)" id="birthday" class="date" position="top" readonly="true" placeholder="选择生日"/>
        </div>
        <div class="control" v-if="memberId == ''">
          登陆密码&nbsp;：
          <input type="password" v-model="password" message="登陆密码" check="ckNull" placeholder="请输入登陆密码"/>
        </div>
        <div class="control" v-if="memberId == ''">
          确认密码&nbsp;：
          <input type="password" v-model="confirmPass" message="确认密码" check="ckNull" placeholder="请确认密码"/>
        </div>
      </section>
    </form>
    <div class="submit-btn">
      <ul>
        <li class="btn-cancel"><a href="javascript:;" @click="cancel()">取消</a></li>
        <li class="btn-confirm"><a href="javascript:;" @click="save()">确认</a></li>
        <div class="clear"></div>
      </ul>
    </div>
  </div>
</template>
<script>
  import {Indicator, MessageBox, Toast} from "mint-ui";
  export default{
      name: 'memberEdit',
      data(){
        return {
          memberId: '',
          memberName: '',
          memberTel: '',
          memberEmail: '',
          memberSex: '1',
          memberAge: '',
          memberBirthday: '',
          password: '',
          confirmPass: '',
          headerImg: '',
        }
      },
      watch:{
        change(){}
      },
      computed: {
        change() {
          this.memberId = this.$parent.$parent.memberId;
          this.searchDetails();
          return this.memberId;
        }
      },
      mounted(){
      },
      methods: {

        /**
         * 生日
         */
        birthday($event){
          var $this = this;
          window.onTime($event.target,function(val){
            $this.memberBirthday = val;
          })
        },

        /**
         * 查找详细
         */
        searchDetails(){
          var $this = this;
          var param = {};
          $this.clear();
          if(this.memberId){
            param['memberId'] = this.memberId;
            $this.$httpService.getMemberDetails(param).then((res)=>{
              if(res.code == '2000' && res.data){
                var data = res.data;
                $this.memberName = data.memberName;
                $this.memberTel = data.memberTel;
                $this.memberEmail = data.memberEmail;
                $this.memberSex = data.memberSex;
                $this.memberAge = data.memberAge;
                $this.memberBirthday = data.memberBirthday;
                $("#birthday").val(data.memberBirthday);
              }
            })
          }
        },

        /**
         * 清空
         */
        clear(){
          this.memberName = "";
          this.memberTel = "";
          this.memberEmail = "";
          this.memberSex = "1";
          this.memberAge = "";
          this.memberBirthday = "";
          $("#birthday").val("");
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
         * 选择头像
         */
        selectHeaderImg(){
          document.getElementById("headerImg").click();
        },

        /**
         * 保存
         */
        save(){
          var $this = this;
          if($this.$stringUtil.validation("memberForm")){
            if($this.password != $this.confirmPass){
                Toast("两次密码不一致");
                return;
            }
            var param = {};
            param['memberId'] = $this.memberId;
            param['memberName'] = $this.memberName;
            param['memberTel'] = $this.memberTel;
            param['memberEmail'] = $this.memberEmail;
            param['memberSex'] = $this.memberSex;
            param['memberAge'] = $this.memberAge;
            param['memberBirthday'] = $this.memberBirthday;
            param['memberHeaderImg'] = $this.headerImg;
            param['memberPassword'] = $this.confirmPass;
            $this.$httpService.saveMember(param).then((res)=>{
              if(res.code == '2000'){
                Toast("保存成功");
                $this.cancel();
                $this.$parent.$parent.searchMember();
              }
            })
          }
        },

        /**
         * 取消
         */
        cancel(){
          this.$parent.$parent.$parent.hidePanel();
        },
      },
  }
</script>
<style>
  .memberEdit{
    padding: 10px;
  }
</style>
