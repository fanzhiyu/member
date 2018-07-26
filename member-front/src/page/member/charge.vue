<template>
  <div name="recharge">
    <div class="charge-right">
      <h3 class="inner-tittle">会员充值</h3>
      <div class="main-grid3" style="height: 200px; width: 100%">
        <div class="p-20">
          <div class="form-group">
            <label class="control-label">充值金额</label>
            <div class="">
              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-dollar"></i></span>
                <input type="number" v-model="amount" class="form-control1 icon" placeholder="充值金额">
              </div>
            </div>
          </div>
          <div class="bts">
            <a href="javascript:;" @click="charge()">充值</a>
          </div>
          <div class="clear"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
     name: 'recharge',
     data(){
         return {
            amount: ''
         }
     },
     mounted(){

     },
     methods: {

       /**
        * 充值
        */
       charge(){
          var param = {};
          var memberId = this.$parent.params.memberId;
          param['amount'] = this.amount;
          param['memberId'] = memberId ? memberId : '';
          this.$httpService.rechargeMember(param).then((res)=>{
            if(res.code == '2000'){
              this.$parent.close();
              this.$parent.callback();
//              this.$parent.$parent.$parent.init();
            }
          })
       }
     }
  }
</script>
<style>
  .control-label{
    height: 30px;
    line-height: 30px;
    font-size: 14px;
  }
  .bts{
    width: 80px;
    height: 30px;
    line-height: 30px;
    background: #00C6D7;
    cursor: pointer;
    text-align: center;
    border: 5px;
    font-size: 14px;
    border-radius: 5px;
    float: right;
  }
  .bts a{
    display: block;
    color: #ffffff;
  }
  .input-group{
    width: 80%;
  }
  .input-group input{
    border-radius: 0px;
    width: 100%;
    border: 1px solid #CCCCCC;
  }
  .input-group input:focus{
    border: 1px solid #CCCCCC;
  }
</style>
