<template>
  <div name="history">
    <div class="titles" style="margin-top:50px">
      <div class="title1 border-bottom">翻译历史</div>
    </div>
    <div class="process-table">
      <div class="search">
        <div class="control-inputs">
          <label>翻译时间：</label>
          <input type="text" @click="startTime($event)" placeholder="开始时间" class="date" readonly="true" style="width: 32%" />
          - - <input type="text" class="date" @click="endTime($event)"  placeholder="结束时间" readonly="true" style="width: 32%" />
        </div>
        <div class="search-btn"><a href="javascript:;" @click="search()">查询</a></div>
        <div class="clear"></div>
      </div>
      <div class="user-table">
        <div class="tables">
          <table class="table table-bordered">
            <thead>
            <tr>
              <th width="10%" v-if="roleId == 2">会员名</th>
              <th width="10%">金额</th>
              <th width="10%">字数</th>
              <th width="10%">翻译时间</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in consumeList">
              <td v-if="roleId == 2">{{item.memberName}}</td>
              <td>{{item.consumeAmount}}</td>
              <td>{{item.consumeNum}}</td>
              <td>{{item.createTime}}</td>
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
      name: 'history',
      data(){
          return {
            consumeList: [],
            currentPage: 1,
            pageSize: 10,
            count: 0,
            startDate: '',
            endDate: '',
            roleId: '',
          }
      },
      mounted(){
        this.init();
        this.searchUser();
      },
      methods: {

        /**
         * 初始化
         */
        init(){
           var param = {};
           param['pageNo'] = this.currentPage;
           param['pageSize'] = this.pageSize;
           param['startDate'] = this.startDate;
           param['endDate'] = this.endDate;
           this.$httpService.getConsumePager(param).then((res)=>{
               if(res.code == '2000'){
                 this.consumeList = res.rows;
                 this.count = res.total;
               }
           });
        },

        /**
         * 查找用户
         */
        searchUser(){
            var user = JSON.parse(localStorage.getItem("user"));
            console.log(user);
            this.roleId = user.roleId;
        },

        /**
         * 查询
         */
        search(){
            this.init();
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
              $this.endDate = "";
            }
          })
        },
      }
  }
</script>
<style>
</style>
