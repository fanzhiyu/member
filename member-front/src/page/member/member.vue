<template>
  <div name="member" >
    <my-panel styles="width:30%"></my-panel>
    <div class="titles" style="margin-top:50px">
      <div class="title1 border-bottom">会员管理</div>
    </div>
    <div class="process-table">
      <div class="search">
        <div class="control-inputs">
          <label>会&nbsp;&nbsp;员&nbsp;&nbsp;名：</label>
          <input type="text" v-model="memberName"/>
        </div>
        <div class="control-inputs">
          <label>电话号码：</label>
          <input type="text" v-model="memberTel"/>
        </div>
        <div class="control-inputs">
          <label>邮箱：</label>
          <input type="text" v-model="memberEmail"/>
        </div>
        <div class="clear"></div>
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
              <a href="javascript:;" class="btns" @click="show()">添加会员</a>
            </div>
            <li>
              <a href="javascript:;" :class="active ? 'btns' : ''" :style="active ? 'color: #00C6D7' : ''" @click.sync="active ? modMember() : ''">修改</a>
            </li>
            <li>
              <a href="javascript:;" :style="active ? 'color: #00C6D7' : ''" @click.sync="active ? delMember() : ''">删除</a>
            </li>
            <li>
              <a href="javascript:;" :style="active ? 'color: #00C6D7' : ''" @click.sync="active ? reCharge() : ''">充值</a>
            </li>
          </ul>
        </div>
        <div class="tables">
          <table class="table table-bordered">
            <thead>
            <tr>
              <th width="5%">选择</th>
              <th width="10%">会员名称</th>
              <th width="10%">会员邮箱</th>
              <th width="10%">会员电话</th>
              <th width="10%">账号金额</th>
              <th width="10%">会员年龄</th>
              <th width="5%">会员性别</th>
              <th width="10%">会员生日</th>
              <th width="10%">创建时间</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in memberList">
                <td>
                  <label class="checkbox00" >
                    <input type="checkbox" v-model="checked" @click="selectOne($event)" :value="item.memberId" name="checkbox"><span></span>
                  </label>
                </td>
                <td>
                  {{item.memberName}}
                </td>
                <td>
                  {{item.memberEmail}}
                </td>
                <td>
                  {{item.memberTel}}
                </td>
                <td>
                  {{item.memberAmount}}
                </td>
                <td>
                  {{item.memberAge}}
                </td>
                <td>
                  <div v-if="item.memberSex == '1'">男</div>
                  <div v-if="item.memberSex == '2'">女</div>
                </td>
                <td>
                  {{item.memberBirthday}}
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
  import charge from './charge.vue';
  export default{
      name: '',
      data(){
        return {
          pageSize : 10 , //每页显示20条数据
          currentPage : 1, //当前页码
          count : 0, //总记录数
          memberName: '',
          memberTel: '',
          memberEmail: '',
          startDate: '',
          memberId: '',
          endDate: '',
          active: '',
          memberList: [],
          checked: [],
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
          this.searchMember();
        },

        /**
         * 查找会员列表
         */
        searchMember(){
          var $this = this;
          var param = {};
          param['pageSize'] = $this.pageSize;
          param['pageNo'] = $this.currentPage;
          param['memberName'] = $this.memberName;
          param['memberTel'] = $this.memberTel;
          param['memberEmail'] = $this.memberEmail;
          param['startDate'] = $this.startDate;
          param['endDate'] = $this.endDate;
          $this.$httpService.getMemberPager(param).then((res)=>{
              if(res.code == '2000'){
                  $this.memberList = res.rows;
                  $this.count = res.total;
              }
          })
        },

        /**
         * 显示面板
         */
        show(){
          this.memberId = "";
          this.$router.push({path:'/memberEdit'})
          this.$parent.showPanel();
        },

        /**
         * 修改会员
         */
        modMember(){
          this.memberId = this.checked[0];
          console.log(this.memberId);
          this.$router.push({path:'/memberEdit'})
          this.$parent.showPanel();
        },

        /**
         * 删除会员
         */
        delMember(){
          var $this = this;
          $this.$parent.warning = true;
          $this.$parent.msg = "确定要删除么？"
          $this.$parent.callback = function(){
              var param = {};
              param['memberId'] = $this.checked[0];
              $this.$httpService.removeMember(param).then((res)=>{
                if(res.code == '2000'){
                  Toast("删除成功");
                  $this.init();
                }
              })
          }
        },

        /**
         * 查询
         */
        search(){
          this.searchMember();
        },

        /**
         * 充值
         */
        reCharge(){
          var $this = this;
          $this.$parent.popshow = true;
          $this.$parent.message = "充值";
          $this.$parent.content = charge;
          $this.$parent.style = "width:700px;";
          $this.$parent.params = {"memberId": this.checked[0]};
          $this.$parent.call = function(){
            $this.init();
          }
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
      }
  }
</script>
<style>
</style>
