<template>
  <div class="panels" :style="styles" id="panel">
    <router-view></router-view>
  </div>
</template>
<script>
  export default{
    name:'',
    data(){
      return {

      }
    },
    mounted(){
      var width = $(".panels").width();
      $(".panels").css("right",-width);
    },
    props: {
      styles: {
        type: String,
        default: 'width:50%'
      }
    },
    methods: {
    }
  }
</script>
<style>
  .panels{
    width: 30%;
    overflow: hidden;
    height: 100%;
    position: fixed;
    z-index: 999;
    background-color: #FFFFFF;
    top: 67px;
    right: -30%;
    -moz-box-shadow:2px 2px 5px #00C6D7;
    -webkit-box-shadow:2px 2px 5px #00C6D7;
    box-shadow:2px 2px 15px #00C6D7;
    overflow-y:scroll;
  }
</style>
