<template>
  <div id="app">
    <!--<keep-alive include="index">-->
    <router-view/>
    <!--</keep-alive>-->
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style lang="scss">
    /* 去掉选择日 */
    .onlineTax>.mint-format-date>.mint-popup>.picker>.picker-items>.picker-slot:nth-child(3){
        display: none !important;
    }
</style>
