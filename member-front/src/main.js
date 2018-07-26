// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'


import vuex from "vuex";
import store from "./store/index";

//上传附件

import "./static/js/lrz";
import "./static/js/scale.js";
import "./static/js/rem.js";
import './static/js/easy/canvas'
import './static/js/easy/event'
// import './static/js/jstree'
// import './static/js/jstree.min'
import httpService from './api/HttpService'
import stringUtil from './util/stringUtil'
import router from './router/index';
import './static/font-awesome-4.7.0/css/font-awesome.css'
import "./static/css/bootstrap.min.css";
import './static/css/style.css'
import './static/css/main.css'
import "./static/css/scale.css"
import './static/css/common.css'
import './static/css/reset.css'
import './static/js/easy/css/easy-soft.css'
import './static/js/easy/css/selectFilter.css'
import "mint-ui/lib/style.css";
import top from './components/top.vue';
import left from './components/left.vue';
import pager from './components/pager.vue';
import popup from './components/popup.vue';
import panel from './components/panel.vue';
import confirm from './components/confirm.vue'
Vue.prototype.$httpService = httpService;
Vue.prototype.$stringUtil = stringUtil;
//
//
import {
    Checklist,
    DatetimePicker,
    Indicator,
    InfiniteScroll,
    Loadmore,
    MessageBox,
    Picker,
    Popup,
    Progress,
    Radio,
    Swipe,
    SwipeItem,
    Switch,
    TabContainer,
    TabContainerItem,
    Field
} from "mint-ui";

Vue.use(vuex);
Vue.use(InfiniteScroll);
Vue.component(Picker.name, Picker);
Vue.component(Switch.name, Switch);
Vue.component(Progress.name, Progress);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Popup.name, Popup);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Checklist.name, Checklist);
Vue.component(Loadmore.name, Loadmore);
Vue.component(Radio.name, Radio);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Field.name, Field);
Vue.component("my-top",top);
Vue.component("my-left",left);
Vue.component("my-pager",pager);
Vue.component("my-popup",popup);
Vue.component("my-panel",panel);
Vue.component("my-confirm",confirm)
Vue.config.productionTip = false

var ruleAdmin = ["/home","/member","/translate","/history","/recharge","/profile","/rule","/memberEdit","/ruleEdit"];
var ruleMember = ["/home","/translate","/history","/recharge","/profile"];

router.beforeEach((to, from, next) => {
  if(to.path == "/" || to.path == "/register"){
    next();
  }else{
    // 获取用户信息
    httpService.getUser().then((res)=>{
      if(res.code == '2000'){
        var data = res.data;
        if(data.roleId == '1'){
          if(ruleMember.indexOf(to.path) >= 0){
            next();
          }
        }else if(data.roleId == '2'){
          if(ruleAdmin.indexOf(to.path) >= 0){
            next();
          }
        }
        localStorage.setItem("user", JSON.stringify(data));
      }
    })
  }
});

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})


