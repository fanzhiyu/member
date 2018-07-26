<template>
  <div class="login">
    <div class="error_page">
      <!--/login-top-->
      <div class="error-top">
        <h2 class="inner-tittle page">会员系统</h2>
        <div class="login">
          <h3 class="inner-tittle t-inner">Login</h3>
          <div class="buttons login">
          </div>
          <form action="javascript:;" id="loginForm">
            <input type="text" v-model="username" check="ckNull" message="用户账号" class="text" placeholder="电话号码">
            <input type="password" v-model="password" check="ckNull" message="密码" placeholder="密码">
            <div class="valida">
              <input type="text" check="ckNull" message="验证码" v-model="valicode" placeholder="验证码" /><img :src="codeImg"/>
              <div class="change"><a href="javascript:;" @click="getValidate()">换一换</a></div>
            </div>
            <div class="submit"><input type="button" @click="login()" value="Login" ></div>
            <div class="clearfix"></div>
            <div class="new">
              <div>
                <a href="/register">注册会员</a>
              </div>
              <div class="clearfix"></div>
            </div>
          </form>
        </div>
      </div>
      <!--//login-top-->
    </div>
  </div>
</template>
<script>
  export default{
      name: 'login',
      data(){
        return{
          username: '',
          password: '',
          codeImg: '',
          valicode: '',
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
            this.getValidate();
        },
        /**
         * 登陆
         */
        login(){
          if(this.$stringUtil.validation("loginForm")){
            var param = {};
            param['username'] = this.username;
            param['password'] = this.password;
            param['valicode'] = this.valicode;
            this.$httpService.login(param).then((res)=>{
              if(res.code == '2000'){
                var data = res.data;
                localStorage.setItem("token",data.token);
                localStorage.setItem("refreshToken",data.refreshToken);
                this.$router.push({path:'/index'})
              }
            })
          }
        },

        /**
         * 获取验证码
         */
        getValidate(){
          var $this = this;
          $this.$httpService.getValidate().then((res)=>{
              if(res.code == '2000'){
                  $this.codeImg = "data:image/png;base64,"+res.data.codeImg;
                  localStorage.setItem("validToken",res.data.validateToken);
              }
          })
        },
      }
  }
</script>
<style>

</style>
