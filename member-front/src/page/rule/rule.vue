<template>
  <div name="rule">
    <my-panel styles="width:30%"></my-panel>
    <div class="titles" style="margin-top:50px">
      <div class="title1 border-bottom">规则设置</div>
    </div>
    <div class="process-table">
      <div class="search">
        <div class="control-inputs">
          <label>规&nbsp;&nbsp;则&nbsp;&nbsp;名：</label>
          <input type="text" v-model="ruleName"/>
        </div>
        <div class="control-inputs">
          <label>创建时间：</label>
          <input type="text" @click="startTime($event)" placeholder="开始时间" class="date" readonly="true" style="width: 32%" />
          - - <input type="text" class="date" @click="endTime($event)"  placeholder="结束时间" readonly="true" style="width: 32%" />
        </div>
        <div class="search-btn"><a href="javascript:;" @click="search()">查询</a></div>
        <div class="clear"></div>
      </div>
      <div class="user-table">
        <div class="toolbar">
          <ul>
            <div class="control-btn" >
              <a href="javascript:;" class="btns" @click="show()">添加规则</a>
            </div>
            <li>
              <a href="javascript:;" :class="active ? 'btns' : ''" :style="active ? 'color: #00C6D7' : ''" @click.sync="active ? modRule() : ''">修改</a>
            </li>
            <li>
              <a href="javascript:;" :style="active ? 'color: #00C6D7' : ''" @click.sync="active ? delRule() : ''">删除</a>
            </li>
            <li>
              <a href="javascript:;" :style="active ? 'color: #00C6D7' : ''" @click.sync="active ? enableRule() : ''">启用</a>
            </li>
          </ul>
        </div>
        <div class="tables">
          <table class="table table-bordered">
            <thead>
            <tr>
              <th width="5%">选择</th>
              <th width="10%">规则名称</th>
              <th width="10%">金额</th>
              <th width="10%">字数</th>
              <th width="10%">状态</th>
              <th width="10%">创建时间</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in ruleList">
              <td>
                <label class="checkbox00">
                  <input type="checkbox" v-model="checked" @click="selectOne($event)" :value="item.ruleId" name="checkbox"><span></span>
                </label>
              </td>
              <td>
                {{item.ruleName}}
              </td>
              <td>
                {{item.ruleAmount}}
              </td>
              <td>
                {{item.ruleNo}}
              </td>
              <td>
                <div v-if="item.ruleStatus == '1'">启用</div>
                <div v-if="item.ruleStatus == '2'">禁用</div>
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
  import {Indicator, MessageBox, Toast} from "mint-ui";
  export default{
      name: 'rule',
      data(){
          return {
            currentPage: 1,
            count: 0,
            pageSize: 10,
            ruleName: '',
            ruleList: [],
            checked: [],
            active: false,
            startDate: '',
            endDate: '',
            ruleId: '',
          }
      },
      mounted(){
        this.init();
      },
      methods: {

        /**
         * 页面初始化
         */
        init(){
          this.searchRule();
        },

        /**
         * 查找规则列表
         */
        searchRule(){
            var param = {};
            param['pageSize'] = this.pageSize;
            param['pageNo'] = this.currentPage;
            param['ruleName'] = this.ruleName;
            param['startDate'] = this.startDate;
            param['endDate'] = this.endDate;
            this.$httpService.getRulePager(param).then((res)=>{
              if(res.code == '2000'){
                  this.ruleList = res.rows;
                  this.count = res.count;
              }
            })
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
         * 单选
         */
        selectOne($event){
          this.checked = [];
          var checked = $($event.target).parents("table").find("tbody input[type='checkbox']:checked");
          if(checked.length == 0){
            this.active = false;
          }else{
            this.active = true;
            var val = $($event.target).val();
            this.checked.push(val);
          }
        },

        /**
         * 修改规则
         */
        modRule(){
          this.ruleId = this.checked[0];
          this.$router.push({path:'/ruleEdit'})
          this.$parent.showPanel();
        },

        /**
         * 删除规则
         */
        delRule(){
          var $this = this;
          $this.$parent.warning = true;
          $this.$parent.msg = "确定要删除么？"
          $this.$parent.callback = function(){
            var param = {};
            param['ruleId'] = $this.checked[0];
            $this.$httpService.removeRule(param).then((res)=>{
              if(res.code == '2000'){
                Toast("删除成功");
                $this.init();
              }
            })
          }
        },

        /**
         * 启用规则
         */
        enableRule(){
          var $this = this;
          $this.$parent.warning = true;
          $this.$parent.msg = "确定要启动规则么？"
          $this.$parent.callback = function(){
            var param = {};
            param['ruleId'] = $this.checked[0];
            $this.$httpService.enableRule(param).then((res)=>{
              Toast("规则启用成功");
              $this.init();
            })

          }
        },

        /**
         * 显示面板
         */
        show(){
          this.ruleId = "";
          this.$router.push({path:'/ruleEdit'})
          this.$parent.showPanel();
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
