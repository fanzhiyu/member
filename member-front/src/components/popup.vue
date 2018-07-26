<template>
  <div class="popup" v-if="popshow">
    <div class="popup-window" :style="styles">
      <div class="title">{{message}}<div class="close" @click="close()"><i class="fa fa-close"></i></div></div>
      <div class="popup-content" :is="content">
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'popup',
    data(){
      return {
      }
    },
    props: {
      message: {
        type: String,
        default: '标题'
      },
      popshow: {
        type: Boolean,
        default: false,
      },
      params:{
      },
      content: {
      },
      styles: {
        type: String,
        default: "width:500px"
      },
      call: {
      }
    },
    mounted(){
    },
    updated(){
      if(!$(".pupup").is(":hidden")){
          setTimeout(()=>{
              $(".popup-window").css({"transform":"scale(1)"})
          },50)
      }
    },
    methods: {

      /**
       * 关闭
       */
      close(){
        $(".popup-window").css({"transform":"scale(0)"})
        setTimeout(()=>{
          this.$parent.$data.popshow = false;
        },400)
      },

      /**
       * 回调
       */
      callback(){
        if(typeof this.call == "function"){
            this.call();
        }
      },
    }
  }
</script>
<style>
</style>
