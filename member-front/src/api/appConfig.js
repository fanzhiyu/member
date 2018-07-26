/**
 * Created by Admin on 2017/4/5.
 */

import constants from "../constants/index";

var API_PREFIX = constants.apiHost;
var API = {

  LOGIN: [
    API_PREFIX + '/user/login'
  ],

  VALIDATE: [
    API_PREFIX + '/user/getValidate'
  ],

  GETMEMBERPAGER: [
    API_PREFIX + '/member/getMemberPager'
  ],

  SAVEMEMBER: [
    API_PREFIX + '/member/saveMember'
  ],

  GETMEMBERDETAILS: [
    API_PREFIX + '/member/getMemberDetails'
  ],

  REMOVEMEMBER: [
    API_PREFIX + '/member/removeMember'
  ],

  RECHARGEMEMBER: [
    API_PREFIX + '/member/rechargeMember'
  ],

  GETUSER: [
    API_PREFIX + '/user/getUser'
  ],

  SAVEUSER: [
    API_PREFIX + '/user/saveUser'
  ],

  GETRULEPAGER: [
    API_PREFIX + '/rule/getRulePager'
  ],

  SAVERULE: [
    API_PREFIX + '/rule/saveRule'
  ],

  REMOVERULE: [
    API_PREFIX + '/rule/removeRule'
  ],

  GETRULEDETAILS: [
    API_PREFIX + '/rule/getRuleDetails'
  ],

  ENABLERULE: [
    API_PREFIX + '/rule/enableRule'
  ],

  GETIMPULSEPAGER: [
    API_PREFIX + '/impulse/getImpulsePager'
  ],

  SUBMIT: [
    API_PREFIX + '/translate/submit'
  ],

  GETCONSUMEPAGER: [
    API_PREFIX + '/translate/getConsumePager'
  ]
};
export {
  API,
  API_PREFIX
};
