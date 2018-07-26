<template>
  <div name="left">
    <div class="sidebar-menu">
      <header class="logo">
        <a href="javascript:;" @click="sidebar()" class="sidebar-icon"> <span class="fa fa-bars"></span> </a> <a href="index"> <span id="logo"> <h1>会员管理</h1></span>
      </a>
      </header>
      <div style="border-top:1px solid rgba(69, 74, 84, 0.7)"></div>
      <div class="down">
        <router-link to="/home"><img v-if="headerImg != ''" :src="headerImg" width="70" height="70"><img v-if="headerImg == ''" src="../static/images/headerImg.jpg" width="70" height="70"></router-link>
        <router-link to="/home"><span class=" name-caret">{{username}}</span></router-link>
        <p v-if="roleId == 2">管理员</p>
        <p v-if="roleId == 1">普通会员</p>
        <ul>
          <li><router-link class="tooltips" to="/profile"><span>个人中心</span><i class="fa fa-user"></i></router-link></li>
          <li><a class="tooltips" href="javascript:;" @click="logOut()"><span>退出</span><i class="fa fa-power-off"></i></a></li>
        </ul>
      </div>
      <!--//down-->
      <div class="menu">
        <ul id="menu" >
          <li v-if="roleId == '2'"><a href="javascript:;" class="list-li"><i class="fa fa-users"></i> <span>会员管理</span> <span class="fa fa-angle-right" style="float: right"></span></a>
            <ul>
              <li><router-link to="/member">会员列表</router-link></li>
            </ul>
          </li>
          <li ><a href="javascript:;" class="list-li"><i class="fa fa-file-text-o"></i> <span>翻译管理</span> <span class="fa fa-angle-right" style="float: right"></span></a>
            <ul>
              <li><router-link to="/translate">开始翻译</router-link></li>
              <li><router-link to="/history">翻译历史</router-link></li>
            </ul>
          </li>
          <li ><a href="javascript:;" class="list-li"><i class="fa fa-user"></i> <span>个人中心</span> <span class="fa fa-angle-right" style="float: right"></span></a>
            <ul>
              <li><router-link to="/recharge">充值记录</router-link></li>
              <li><router-link to="/profile">个人信息</router-link></li>
            </ul>
          </li>
          <li v-if="roleId == '2'"><a href="javascript:;" class="list-li"><i class="fa fa-cog"></i> <span>系统设置</span> <span class="fa fa-angle-right" style="float: right"></span></a>
            <ul>
              <li><router-link to="/rule">规则设置</router-link></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'left',
    data(){
      return {
        roleId: '',
        headerImg: '',
        username: '',
      }
    },
    mounted(){
      this.init();
    },
    methods:{

      init(){
        var user = JSON.parse(localStorage.getItem("user"));
        this.roleId = user.roleId;
        this.headerImg = user.headerImg == null ? "" : user.headerImg;
        this.username = user.username;
      },
      /**
       * 左侧菜单显示和隐藏
       */
      sidebar(){
        this.$parent.$data.toggle = !this.$parent.$data.toggle;
        if(!this.$parent.$data.toggle){
          $("#menu .list-li").css({"padding-right":"20px","padding-bottom":"13px"});
        }else{
          $("#menu .list-li").css({"padding-right":"0","padding-bottom":"0"});
        }
      },

      /**
       * 退出
       */
      logOut(){
        localStorage.clear();
        this.$router.push({path:'/'})
      }
    }
  }
</script>
<style>

</style>
