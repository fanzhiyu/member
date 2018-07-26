<template>
  <div class="popup" v-if="warning">
    <div class="confirm-window">
      <div class="title">提示<div class="close" @click="close()"><i class="fa fa-close"></i></div></div>
      <div class="content">
        {{message}}
      </div>
      <div class="confirm-btns">
        <ul>
          <li>
            <a href="javascript:;" @click="close()">取消</a>
          </li>
          <li>
            <a href="javascript:;" @click="confirm()">确认</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
      name: '',
      data(){
          return {

          }
      },
      props: {
        message: {
          type: String,
          default: '标题'
        },
        warning: {
          type: Boolean,
          default: false,
        },
        styles: {
          type: String,
          default: "width:500px"
        },
        callback: {}
      },
      mounted(){

      },
      updated(){
        if(!$(".pupup").is(":hidden")){
          setTimeout(()=>{
            $(".confirm-window").css({"transform":"scale(1)"})
          },50)
        }
      },
      methods:{

        confirm(){
          if(typeof this.callback === "function"){
            this.callback();
          }
          this.close();
        },

        close(){
          $(".confirm-window").css({"transform":"scale(0)"})
          setTimeout(()=>{
            this.$parent.$data.warning = false;
          },400)
        }
      }
  }
</script>
