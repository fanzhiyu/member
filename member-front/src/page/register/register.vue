<template>
  <div name="register">
    <section id="getintouch" class="fadeInDownBig animated">
      <div class="container" style="border-bottom: 0;">
        <h1>
          <span>新会员注册</span>
        </h1>
      </div>
      <div class="container">
        <form class="contact" action="javascript:;" method="post" id="form">
          <div class="row">
            <div class="lbl">
              <label>姓名</label>
            </div>
            <div class="ctrl">
              <input type="text" name="memberName" v-model="memberName" check="ckNull" message="姓名" placeholder="请输入姓名">
            </div>
          </div>
          <div class="row">
            <div class="lbl">
              <label>电话</label>
            </div>
            <div class="ctrl">
              <input type="text" name="memberTel" v-model="memberTel" check="ckNull" message="电话" placeholder="请输入电话">
            </div>
          </div>
          <div class="clear"></div>
          <div class="row">
            <div class="lbl">
              <label >密码</label>
            </div>
            <div class="ctrl">
              <input type="password" name="password" v-model="password" check="ckNull" message="密码" placeholder="请输入密码">
            </div>
          </div>
          <div class="clear"></div>
          <div class="row">
            <div class="lbl">
              <label>重复密码</label>
            </div>
            <div class="ctrl">
              <input type="password" name="confirmPass" v-model="confirmPass" check="ckNull" message="重复密码" placeholder="重复密码">
            </div>
          </div>
          <div class="clear"></div>
          <div class="row">
            <div class="span10 offset2">
              <input type="button" name="submit" id="submit" @click="save()" class="submit" value="保存">
            </div>
          </div>
        </form>
        <div id="validation">
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import '../../static/js/jquery-ui';
  import '../../static/js/jquery.ffform';
  import {Indicator, MessageBox, Toast} from "mint-ui";
  export default{
      name: 'register',
      data(){
          return{
            memberName: '',
            memberTel: '',
            password: '',
            confirmPass: '',
          }
      },
      mounted(){
        this.init();
      },
      methods: {
        init(){
        },

        /**
         * 保存
         */
        save(){
            if(this.$stringUtil.validation("form")){
              if(this.password != this.confirmPass){
                Toast("两次密码不一致");
                return;
              }
              var param = {};
              param['memberName'] = this.memberName;
              param['memberTel'] = this.memberTel;
              param['memberPassword'] = this.password;
              this.$httpService.saveMember(param).then((res)=>{
                if(res.code == '2000'){
                  Toast("注册成功");
                  window.location.href = "/"
//                  this.$router.push({path: '/'})
                }
              })
            }
        }
      }
  }
</script>
<style>
  @import '../../static/css/demo.css';
  .container span{
    color: #00C6D7;
  }
</style>
