/**
 * Created by apple on 17/12/27.
 */
import * as cfg from './message';
import {Indicator, MessageBox, Toast} from "mint-ui";

let version = '0.0.1',
  _CONST = cfg.COMMON.CONST,
  _MESSAGE = cfg.COMMON.MESSAGE;

export default {

  /**
   * null转换
   * @param str
   * @returns {string}
   */
  isNull : function (str) {
    return str == null || str == undefined ? "" : str;
  },

  /**
   * 获取缴费期间
   * @param startDate
   * @param endDate
   */
  getTaxationDate: function (startDate, endDate) {
    if(!startDate || !endDate){return "";}
    var startYear,startMonth,endYear,endMonth;
    startYear = startDate.substring(0, startDate.length-2);
    startMonth = startDate.substring(startDate.length-2, startDate.length);
    endYear = endDate.substring(0, endDate.length-2);
    endMonth = endDate.substring(endDate.length-2, endDate.length);
    return startYear +"年"+ startMonth +"月 - "+ endYear +"年"+endMonth+"月";
  },

  /**
   * 验证是否是pc还是移动
   * @returns {boolean}
   */
  isPC: function() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
      "SymbianOS", "Windows Phone",
      "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false;
        break;
      }
    }
    return flag;
  },


  /**
   * 表单验证
   */
  validation : function (formId) {
    var _inputs = document.getElementById(formId).querySelectorAll("input,textarea");
    var flag = true;
    outer:
      for(var i = 0,len = _inputs.length; i < len; i++){
        //******>> start 定义变量 <<***********
        var _input = _inputs[i],
          _check = _input.getAttribute("check"),
          _message = _input.getAttribute("message"),
          _val = _input.value,
          _maxLen = _input.getAttribute("maxLength"),
          _minLen = _input.getAttribute("minLength"),
          _msg;
        //******>> end 定义变量 <<***********
        //*******>> start 验证开始 <<*******
        if(_check){
          var _checks = _check.split(",");
          for(var j = 0,ckLen = _checks.length; j < ckLen ; j++){
            var _type = _checks[j];
            // 空验证
            if(_type == _CONST.CK_TYPE_NULL){
              if(_val == _CONST.EMPTY){
                _msg = this.getMessage(_MESSAGE.MSG1001, _message);
                Toast(_msg);
                flag = false;
                break outer;
              }
            }
            // 手机号码验证
            if(_type == _CONST.CK_TYPE_TEL){
              if(!_CONST.REG_TEL.test(_val)){
                _msg = this.getMessage(_MESSAGE.MSG1004, _message);
                Toast(_msg);
                flag = false;
                break outer;
              }
            }
            // 电子邮箱验证
            if(_type == _CONST.CK_TYPE_EMAIL){
              if(!_CONST.REG_EMAIL.test(_val)){
                _msg = this.getMessage(_MESSAGE.MSG1006, _message);
                Toast(_msg);
                flag = false;
                break outer;
              }
            }
            // 验证是否是数字
            if(_type == _CONST.CK_TYPE_NUMBER){
              if(!_CONST.REG_NUMBER.test(_val)){
                _msg = this.getMessage(_MESSAGE.MSG1005, _message);
                Toast(_msg);
                flag = false;
                break outer;
              }
            }
            // 验证身份证号
            if(_type == _CONST.CK_TYPE_IDEN){
              if(!_CONST.REG_IDEN.test(_val)){
                _msg = this.getMessage(_MESSAGE.MSG1004, _message);
                Toast(_msg);
                flag = false;
                break outer;
              }
            }
          }
        }
        //*******>> end 验证结束 <<*******

        //******>> start 验证长度 <<********
        if(_maxLen){
          if(_val && _val.length > _maxLen){
            _msg = this.getMessage(_MESSAGE.MSG1002, _message, _maxLen);
            flag = false;
            Toast(_msg);
          }
        }
        if(_minLen){
          if(_val && _val.length < _minLen){
            _msg = this.getMessage(_MESSAGE.MSG1003, _message, _minLen);
            flag = false;
            Toast(_msg);
          }
        }
        //******>> end 验证长度 <<********
      }
    return flag;
  },

  /**
   * 获取message补位
   * @param msgId
   * @param array
   * @returns {*}
   */
  getMessage : function(msgId , ...array){
    array =  array instanceof Array ? array : [];
    if(array && array.length > 0){
      for(var i = 0,len = array.length; i < len; i++){
        msgId = msgId.replace("{"+i+"}",array[i]);
      }
    }
    return msgId;
  },

  /**
   * 两个数组合并
   * @param object1
   * @param object2
   * @returns {Array}
   */
  concatArray : function(object1,object2){
    var array = [];
    for(var i=0,len=object1.length; i<len; i++){
      array.push(object1[i]);
    }
    for(var i=0,len=object2.length; i<len; i++){
      array.push(object2[i]);
    }
    return array;
  },

  /**
   * 设置cookie
   * @param name
   * @param value
   */
  setCookie : function(name, value,time) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + time);//过期时间 2分钟
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
  },

  /**
   * 获取cookie
   * @param name
   * @returns {*}
   */
  getCookie:function (name)  {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
      var j = i + alen;
      if (document.cookie.substring(i, j) == arg) return this.getCookieVal(j);
      i = document.cookie.indexOf(" ", i) + 1;
      if (i == 0) break;
    }
    return null;
  },

  /**
   * 获取cookie的值
   * @param offset
   */
  getCookieVal: function(offset) {
    var endstr = document.cookie.indexOf(";", offset);
    if (endstr == -1) endstr = document.cookie.length;
    return unescape(document.cookie.substring(offset, endstr));
  },

  getUrlkey: function (name) {
    var url = (new RegExp('[?|&]'+ name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href) || [''])[1];
    return decodeURIComponent(url?url.replace(/\+/g,'%20'):'') || null
  },

  /**
   * 全选
   */
  // checkedAll: function($event){
  //   var $this = $event.target;
  //   var ischecked = $($this).prop("checked");
  //   var inputs = $($this).parents("table").find("tbody input[type='checkbox']");
  //   for(var i=0,len=inputs.length;i<len;i++){
  //     var input = $(inputs[i]);
  //     input.prop("checked",ischecked);
  //   }
  // },
}

!function(){

  /**
   * 全选
   * @param $this
   */
  window.checkAll = function($this){
    // var $this = $event.target;
    var ischecked = $($this).prop("checked");
    var inputs = $($this).parents("table").find("tbody input[type='checkbox']");
    for(var i=0,len=inputs.length;i<len;i++){
      var input = $(inputs[i]);
      input.attr("checked",ischecked);
    }
  }

}(window);
