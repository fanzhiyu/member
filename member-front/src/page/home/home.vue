<template>
  <div name="home" class="home">
    <div class="custom-widgets">
      <div class="row-one">
        <div class="widget">
          <div class="stats-left ">
            <h5>Today</h5>
            <h4> Users</h4>
          </div>
          <div class="stats-right">
            <label>90</label>
          </div>
          <div class="clearfix"> </div>
        </div>
        <div class="widget states-mdl">
          <div class="stats-left">
            <h5>Today</h5>
            <h4>Visitors</h4>
          </div>
          <div class="stats-right">
            <label> 85</label>
          </div>
          <div class="clearfix"> </div>
        </div>
        <div class="widget states-thrd">
          <div class="stats-left">
            <h5>Today</h5>
            <h4>Tasks</h4>
          </div>
          <div class="stats-right">
            <label>51</label>
          </div>
          <div class="clearfix"> </div>
        </div>
        <div class="widget states-last">
          <div class="stats-left">
            <h5>Today</h5>
            <h4>Alerts</h4>
          </div>
          <div class="stats-right">
            <label>30</label>
          </div>
          <div class="clearfix"> </div>
        </div>
        <div class="clearfix"> </div>
      </div>
    </div>
    <div class="graph-visualization">
      <div class="col-md-6 map-1">
        <h3 class="calendar-tittle">日历</h3>
        <div class="calendar-main">
          <ul>
            <li>星期日</li>
            <li>星期一</li>
            <li>星期二</li>
            <li>星期三</li>
            <li>星期四</li>
            <li>星期五</li>
            <li>星期六</li>
          </ul>
        </div>
      </div>
      <div class="col-md-6 map-2">
        <div class="profile-nav alt">
          <section class="panel">
            <div class="user-heading alt clock-row terques-bg">
              <h3 class="sub-tittle clock">Easy Clock </h3>
            </div>
            <ul id="clock">
              <li id="sec"></li>
              <li id="hour"></li>
              <li id="min"></li>
            </ul>

            <ul class="clock-category">
              <li>
                <a href="#" class="active">
                  <img src="../../static/images/time.png" alt="">
                  <span>Clock</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="../../static/images/alarm.png" alt="">
                  <span>Alarm</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="../../static/images/watch.png" alt="">
                  <span>Stop watch</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="../../static/images/timer.png" alt="">
                  <span>Timer</span>
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
      <div class="clearfix"> </div>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'home',
    data(){
      return {
        today: {},
        future: [],
      }
    },
    mounted(){
      this.init();
    },
    methods:{
      /**
       * 页面初始化
       */
      init(){
        this.setDays();
      },

      /**
       * 设置日历
       */
      setDays(){
        var now = new Date();
        var month = new Date().getMonth()+1;
        var week = this.getWeek(now.getFullYear(), month);
        var days = this.getDays(now.getFullYear(), month);
        var lastDays = this.getDays(now.getFullYear(), month-1);
        var today = now.getDate();
        var array = [];
        for(var j=lastDays; j>lastDays-week; j--){
          array.push(j);
        }
        for(var k=array.length;k > 0; k--){
          var day = array[k-1];
          day = day < 10 ? "0" + day : day;
          $("<li><div class='home-last'>"+day+"</div></li>").appendTo($(".calendar-main ul"));
        }
        for(var i=1,len=days+1; i<len; i++){
          var day = i < 10 ? "0" + i : i;
          if(today == i){
            $("<li><div class='home-day home-today'>"+day+"</div></li>").appendTo($(".calendar-main ul"));;
          }else{
            $("<li><div class='home-day'>"+day+"</div></li>").appendTo($(".calendar-main ul"));;
          }
        }
      },

      getDays($year,$month){
        var $days = new Date($year, $month, 0);
        return $days.getDate();
      },

      /**
       * 获取周
       */
      getWeek($year,$month) {
        var $date = new Date($year,$month,0);
        $date = new Date($date.setDate(1));
        return $date.getDay();
      }
    }
  }
</script>
<style>
.home{
  width: 100%;
  height: 100%;
  margin-top: 70px;
}
</style>
