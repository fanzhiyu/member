<template>
  <div class="index">
    <my-popup :popshow="popshow" :styles="style" :content="content" :message="message" :params="params" :call="call"></my-popup>
    <my-confirm :warning="warning" :message="msg" :callback="callback"></my-confirm>
    <div :class="toggle ? 'page-container sidebar-collapsed' : 'page-container sidebar-collapsed-back'" >
      <div class="left-content">
        <div class="inner-content">
          <my-top></my-top>
          <div class="outter-wp">
            <router-view></router-view>
          </div>
        </div>
      </div>
      <my-left></my-left>
      <div class="clearfix"></div>
    </div>
  </div>
</template>
<script>
  var obj;
  import '../../static/js/css3clock'
  export default{
      name: 'index',
      data(){
          return {
            toggle: true,
            active: false,
            today: {},
            future: [],
            popshow: false,
            content: '<p>this is content</p>',
            message: '提示',
            params: '',
            style: "width:500px;",
            warning: false,
            msg : '',
            callback: '',
            call: ''
          }
      },
      mounted(){
      },
      methods: {

        /**
         * 左侧菜单显示和隐藏
         */
        sidebar(){
          this.toggle = !this.toggle;
        },

        /**
         * 头部下拉菜单user
         * @param $event
         */
        downLoadUser(){
          this.active = !this.active;
        },

        /**
         * 显示面板
         */
        showPanel(){
          var $panel = document.getElementById("panel");
          $panel = $($panel);
          var $right = $panel.css("right").replace("px","");
          if($right >= 0){
            var $width = $panel.width();
            $panel.animate({"right":-$width},500);
          }
          $panel.animate({"right":0},500);
        },

        /**
         * 隐藏面板
         */
        hidePanel(){
          var $panel = document.getElementById("panel");
          $panel = $($panel);
          var $right = $panel.css("right").replace("px","");
          if($right >= 0){
            var $width = $panel.width()+10;
            $panel.animate({"right":-$width},500);
          }
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
        }
      }
  }
</script>
<style>
</style>
