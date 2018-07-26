<template>
  <div name="translate">
    <div class="forms-main">
      <h2 class="inner-tittle">翻译</h2>
      <div class="graph-form">
        <div class="form-body">
          <form>
            <div class="form-group">
              <div class="left input-content">
                <textarea class="trans-content" v-model="content"></textarea>
              </div>
              <div class="left out-content overflow">
                {{result}}
              </div>
              <div class="clear"></div>
            </div>
            <button type="button" class="btn btn-default right" @click="submit()">开始翻译</button> </form>
            <div class="clear"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
      name: 'translate',
      data(){
        return {
          content: '',
          result: ''
        }
      },
      mounted(){

      },
      methods: {

          submit(){
              var param = {};
              param['content'] = this.content;
              this.$httpService.submit(param).then((res)=>{
                  if(res.code == '2000'){
                    this.result = res.data;
                  }
              })
          },
      }
  }
</script>
<style>
.forms-main{
  margin-top: 70px;
}
  .trans-content{
    height: 150px;
    border: 1px solid #cccccc;
    font-size: 14px;
    text-indent: 5px;
    padding: 10px;
  }
  .input-content{
    width: 50%;
  }
  .out-content{
    width: 50%;
    padding: 10px;
    height: 150px;
    background: #efefef;
  }
  .right{
    float: right;
  }
</style>
