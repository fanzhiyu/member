<template>
  <div name="recharge">
    <div class="titles" style="margin-top:50px">
      <div class="title1 border-bottom">充值记录</div>
    </div>
    <div class="process-table">
      <div class="search">
        <div class="control-inputs" v-if="roleId == '2'">
          <label>会&nbsp;&nbsp;员&nbsp;&nbsp;名：</label>
          <input type="text" v-model="memberName"/>
        </div>
        <div class="control-inputs">
          <label>充值时间：</label>
          <input type="text" @click="startTime($event)" placeholder="开始时间" class="date" readonly="true" style="width: 32%" />
          - - <input type="text" class="date" @click="endTime($event)"  placeholder="结束时间" readonly="true" style="width: 32%" />
        </div>
        <div class="control-inputs">
          <div style="float: left">
            <label>付款类型：</label>
          </div>
          <div class='filter-box' id="pay-type" style="width: 72%">
            <div class='filter-text'>
              <input class='filter-title' type='text' readonly placeholder='选择付款类型' />
              <span class='icon-arrow'></span>
            </div>
            <select class='inputs' name='select' v-model="payType">
              <option value="">全部</option>
              <option value="1">微信支付</option>
              <option value="2">支付宝支付</option>
            </select>
          </div>
        </div>
        <!--<div class="clear"></div>-->
        <!--<div class="control-inputs">-->
          <!--<div style="float: left">-->
            <!--<label>支付类型&nbsp;：</label>-->
          <!--</div>-->
          <!--<div class='filter-box' id="impulse-type" style="width: 72%">-->
            <!--<div class='filter-text'>-->
              <!--<input class='filter-title' type='text' readonly placeholder='选择支付类型' />-->
              <!--<span class='icon-arrow'></span>-->
            <!--</div>-->
            <!--<select class='inputs' name='select' v-model="impulseType">-->
              <!--<option value="1">自付</option>-->
              <!--<option value="2">代付</option>-->
            <!--</select>-->
          <!--</div>-->
        <!--</div>-->
        <div class="search-btn"><a href="javascript:;" @click="search()">查询</a></div>
        <div class="clear"></div>
      </div>
      <div class="user-table">
        <div class="tables">
          <table class="table table-bordered">
            <thead>
            <tr>
              <th width="10%" v-if="roleId == '2'">会员名称</th>
              <th width="10%">充值金额</th>
              <th width="10%">充值类型</th>
              <th width="10%">支付方式</th>
              <th width="10%">充值时间</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="item in chargeList">
                <td v-if="roleId == '2'">{{item.memberName}}</td>
                <td>{{item.impulseAmount}}</td>
                <td>
                  <div v-if="item.impulseType == 1">自付</div>
                  <div v-if="item.impulseType == 2">代付</div>
                </td>
                <td>
                  <div v-if="item.payType == '1'">微信支付</div>
                  <div v-if="item.payType == '2'">支付宝支付</div>
                </td>
                <td>
                  {{item.createTime}}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <my-pager :page-index="currentPage" :total="count" :page-size="pageSize" @change="pageChange"></my-pager>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
      name: 'recharge',
      data(){
        return {
          currentPage: 1,
          pageSize: 10,
          count: 0,
          checked: [],
          memberName: '',
          startDate: '',
          endDate: '',
          chargeList: [],
          payType: '',
          impulseType:'',
          ruleId: '',
          roleId: '',
        }
      },
      mounted(){
        this.init();
      },
      methods: {

        /**
         * 初始化
         */
        init(){
          this.searchImpulse();
          this.setPayType();
//          this.setImpulseType();
          this.searchUser();
        },

        /**
         * 查找用户信息
         */
        searchUser(){
            var user = JSON.parse(localStorage.getItem("user"));
            this.roleId = user.roleId;
        },

        /**
         * 支付类型
         */
        setPayType(){
            var $this = this;
            $("#pay-type").selectFilter({
              callBack: function (val) {
                $this.payType = val;
              }
            });
        },

        /**
         * 设置付款类型
         */
        setImpulseType(){
          var $this = this;
          $("#impulse-type").selectFilter({
            callBack: function (val) {
              $this.impulseType = val;
            }
          });
        },

        /**
         * 查找付款历史
         */
        searchImpulse(){
            var param= {};
            param['pageSize'] = this.pageSize;
            param['pageNo'] = this.currentPage;
            this.$httpService.getImpulsePager(param).then((res)=>{
                if(res.code == '2000'){
                    this.chargeList = res.rows;
                    this.count = res.count;
                }
            })
        },

        /**
         * 查询
         */
        search(){

        },


        /**
         * 页面数据发生改变
         * @param page
         */
        pageChange (page) {
          this.currentPage = page
          this.init()
        },

        /**
         * 开始时间
         */
        startTime($event){
          var $this = this;
          window.onTime($event.target,{
            confirm: (val)=>{
              $this.startDate = val;
            },
            clear: ()=>{
              $this.startDate = "";
            }
          })
        },

        /**
         * 结束时间
         */
        endTime($event){
          var $this = this;
          window.onTime($event.target,{
            confirm: (val)=>{
              $this.endDate = val;
            },
            clear: ()=>{
              $this.startDate = "";
            }
          })
        },
      }
  }
</script>
<style>

</style>
