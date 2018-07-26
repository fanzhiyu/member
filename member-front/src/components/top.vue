<template>
  <div name="top" class="top">
    <div class="header-section">
      <!--menu-right-->
      <div class="top_menu">
        <div class="profile_details_left">
          <ul class="nofitications-dropdown" style="margin-right: 20%;">
            <li class="dropdown note dra-down">
              <div @click="downLoadUser()" id="dropdownthree" :class="active ? 'wrapper-dropdown-3 active' : 'wrapper-dropdown-3'" tabindex="1">
                {{username}}
                <ul class="dropdown">
                  <li><router-link to="/profile" class="deutsch">个人中心</router-link></li>
                  <li><a class="deutsch" @click="logOut()">退出</a></li>
                </ul>
              </div>
            </li>
            <div class="clear"></div>
          </ul>
        </div>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>
<script>
  var obj;
  export default{
    name: 'top',
    data(){
      return {
        toggle: true,
        active: false,
        username: '',
      }
    },
    mounted(){
      this.searchUser();
    },
    methods: {

      /**
       * 查找用户
       */
      searchUser(){
        var user = JSON.parse(localStorage.getItem("user"));
        this.username = user.username;
      },
      /**
       * 头部下拉菜单user
       * @param $event
       */
      downLoadUser(){
        this.active = !this.active;
      },

      /**
       * 下拉
       * @param $event
       */
      download($event){
        var li = $event.target.parentNode.tagName == "A" ? $event.target.parentNode.parentNode : $event.target.parentNode;
        if(obj && obj != li){obj.classList.remove("open")};
        var classList = li.classList;
        for(var i=0,len=classList.length;i<len;i++){
          var classed = classList[i];
          if(classed == 'open'){
            classList.remove("open");
          }else{
            classList.add("open");
          }
        }
        obj = li;
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
  .profile_details_left{
    width: 100%;
  }
  .nofitications-dropdown{
    width: 100px;
    float: right;
  }
  .top_menu{
    height: 67px;
  }
</style>
