<template>
  <div name="ruleEdit" class="rule-edit">
    <section class="group">
      <div class="titles"><h3>设置规则</h3></div>
      <div class="control">
        规则名称<span class="required">*</span>：
        <input type="text" v-model="ruleName" message="规则名称" check="ckNull" placeholder="请输入规则名称" />
      </div>
      <div class="control">
        金&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;额<span class="required">*</span>：
        <input type="number" v-model="ruleAmount" message="金额" check="ckNull" placeholder="请输入金额"/>
      </div>
      <div class="control">
        字&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;数<span class="required">*</span>：
        <input type="number" v-model="ruleNumber" message="字数" check="ckEmail" placeholder="请输入字数"/>
      </div>
    </section>
    <div class="submit-btn">
      <ul>
        <li class="btn-cancel"><a href="javascript:;" @click="cancel()">取消</a></li>
        <li class="btn-confirm"><a href="javascript:;" @click="save()">确认</a></li>
        <div class="clear"></div>
      </ul>
    </div>
  </div>
</template>
<script>
  import {Indicator, MessageBox, Toast} from "mint-ui";
  export default{
      name: 'ruleEdit',
      data(){
          return {
            ruleId: '',
            ruleName: '',
            ruleAmount: '',
            ruleNumber: ''
          }
      },
      mounted(){

      },
      watch:{
        change(){}
      },
      computed: {
        change() {
          this.ruleId = this.$parent.$parent.ruleId;
          this.searchDetails();
          return this.ruleId;
        }
      },
      methods: {

        /**
         * 保存
         */
        save(){
          var param = {};
          param['ruleId'] = this.ruleId;
          param['ruleName'] = this.ruleName;
          param['ruleAmount'] = this.ruleAmount;
          param['ruleNumber'] = this.ruleNumber;
          this.$httpService.saveRule(param).then((res)=>{
            if(res.code == '2000'){
              Toast("规则保存成功");
              this.$parent.$parent.$parent.hidePanel();
            }
          });
        },

        /**
         * 查找详细
         */
        searchDetails(){
          var param = {};
          this.clear();
          var ruleId = this.ruleId;
          if(ruleId){
            param['ruleId'] = ruleId;
            this.$httpService.getRuleDetails(param).then((res)=>{
              if(res.code == '2000' && res.data){
                var data = res.data;
                this.ruleName = data.ruleName;
                this.ruleNumber= data.ruleNo;
                this.ruleAmount = data.ruleAmount;
              }
            })
          }
        },

        /**
         * 清楚
         */
        clear(){
            this.ruleName = "";
            this.ruleNumber = "";
            this.ruleAmount = "";
        },

        /**
         * 取消
         */
        cancel(){
          this.$parent.$parent.$parent.hidePanel();
        }
      }
  }
</script>
<style>
  .rule-edit{
    padding: 10px;
  }
</style>
