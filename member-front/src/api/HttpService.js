/**
 * Created by majun on 2017/3/31.
 */

import http from "../util/http";
import {API} from "./appConfig";


export default {

  /**
   * 获取验证
   * @param param
   */
  getValidate: function(){
    return GET(API.VALIDATE);
  },

  /**
   * 登陆
   * @param param
   */
  login: function (param) {
    return GET(API.LOGIN,param)
  },

  /**
   * 获取会员列表
   * @param param
   */
  getMemberPager: function (param) {
    return GET(API.GETMEMBERPAGER,param)
  },

  /**
   * 保存会员
   * @param param
   */
  saveMember: function (param) {
    return POST(API.SAVEMEMBER,param)
  },

  /**
   * 查找会员详细
   * @param param
   */
  getMemberDetails: function(param){
    return GET(API.GETMEMBERDETAILS,param)
  },

  /**
   * 删除会员
   * @param param
   */
  removeMember: function (param) {
    return POST(API.REMOVEMEMBER,param)
  },

  /**
   * 会员充值
   * @param param
   */
  rechargeMember: function (param) {
    return POST(API.RECHARGEMEMBER,param);
  },

  /**
   * 获取用户信息
   */
  getUser: function () {
    return GET(API.GETUSER)
  },

  /**
   * 保存用户
   * @param param
   */
  saveUser: function(param){
    return POST(API.SAVEUSER,param)
  },

  /**
   * 获取规则列表
   * @param param
   */
  getRulePager: function (param) {
    return GET(API.GETRULEPAGER,param)
  },

  /**
   * 添加规则
   * @param param
   */
  saveRule: function (param) {
    return POST(API.SAVERULE,param)
  },

  /**
   * 删除规则
   * @param param
   */
  removeRule: function (param) {
    return POST(API.REMOVERULE,param)
  },

  /**
   * 获取规则详细
   * @param param
   */
  getRuleDetails: function (param) {
    return GET(API.GETRULEDETAILS,param)
  },

  /**
   * 启动规则
   * @param param
   */
  enableRule: function (param) {
    return POST(API.ENABLERULE,param)
  },

  /**
   * 获取充值记录
   * @param param
   */
  getImpulsePager: function (param) {
    return GET(API.GETIMPULSEPAGER,param)
  },

  /**
   * 翻译
   * @param param
   */
  submit: function (param) {
    return POST(API.SUBMIT,param)
  },

  /**
   * 获取翻译历史
   * @param param
   */
  getConsumePager: function (param) {
    return GET(API.GETCONSUMEPAGER,param)
  }
}

const GET = (url, param) => {
  return http.get(url, param)
};

const POST = (url, param) => {
  if (typeof(param) != undefined) {
    return http.post(url, param)
  }
  else {
    return http.post(url);
  }
};

const PUT = (url, param) => {
  return http.post(url, param)
};

const DELETE = (url, param) => {
  return http.delete(url, param)
};
