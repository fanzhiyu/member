/**
 * http工具类
 */
import {Indicator, MessageBox,Toast} from "mint-ui";
import axios from "axios";
var qs = require('qs');
import stringUtil from '../util/stringUtil'
/* axios 配置 */
axios.defaults.timeout = 500000;
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;

axios.interceptors.request.use(
  config => {
    config.headers.common['token'] = localStorage.getItem("token");
    config.headers.common['refreshToken'] = localStorage.getItem("refreshToken");
    config.headers.common['validToken'] = localStorage.getItem("validToken");
    let loading = config.loading == false ? config.loading : true;
    if(loading){
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
    }
    return config
  },
  err => {
    return Promise.reject(err)
  });
axios.interceptors.response.use(
  response => {
    Indicator.close();
    var config = response.config;
    if(response.data.code == "2001"){
      console.info("******>>> token refresh")
      var token = response.data.token;
      var refreshToken = response.data.refreshToken;
      console.log("token===>>"+token);
      console.log("refreshToken===>>"+refreshToken);
      response.config.headers.token = token;
      response.config.headers.refreshToken = refreshToken;
      localStorage.setItem("token",token);
      localStorage.setItem("refreshToken",refreshToken);
      var backoff = new Promise(function(resolve) {
        setTimeout(function() {
          resolve();
        }, config.retryDelay || 1);
      });
      return backoff.then(function() {
        return axios(config);
      });
    }
    return response;
  },
  error => {
    if (error.response) {
      var err = error.response.data;
      if(err.code == '1000'){
        Toast({
          duration: 1500,
          message: err.message
        });
        Indicator.close();
      }
      if(!stringUtil.isPC()){
        if(err.message == '账号已经被禁用请联系管理员'){
          setTimeout(function(){
            //这个可以关闭安卓系统的手机
            document.addEventListener('WeixinJSBridgeReady', function(){ WeixinJSBridge.call('closeWindow'); }, false);
            //这个可以关闭ios系统的手机
            WeixinJSBridge.call('closeWindow');
          }, 1500)
        }
      }
      console.log(error.response)
    }
    return Promise.reject(error.response.data)   // 返回接口返回的错误信息
  });

const handleStatus = ({status, data = {}}) => {
  if (status === 200) {
    // if (data.msg && data.msg != '未授权') {
    //   MessageBox('提示', data.msg);
    // }
    return data
  } else {
    Indicator.close();
    if (data.msg == '未授权') {
      return data
    }
    return Promise.reject(data.message)
  }
};

const handleResponse = (result) => {
  //if (!result.message) {
  return Promise.resolve(result)
  //} else {
  //MessageBox('提示', result.message)
  //}
};

export default {

  get(url, params = {}) {
    let queryString = [];
    console.log(params);
    //Object.keys(params).forEach(key => params[key] && queryString.push(`${key}=${params[key]}`))
    for (let key in params) {
      queryString.push(`${key}=${params[key]}`);
    }
    if (queryString.length > 0) {
      queryString = queryString.join('&');
      queryString = encodeURI(queryString);
      url += `?${queryString}`
    }
    console.info('GET请求地址：' + url);
    return axios
      .get(url)
      .then(handleStatus)
      .then(handleResponse)
   /*   .catch(error => {
        console.log(error);
        Indicator.close();
        return
      })*/
  },

  post(url, params = {}) {
    //console.info('post请求地址：' + url, 'post请求参数' + JSON.stringify(params))
    //Indicator.open({
    //  text: '加载中...',
    //  spinnerType: 'fading-circle'
    //});
    //let queryString = new URLSearchParams();
    //let queryString = new FormData();
    //for (let key in params) {
    //  queryString.append(key,params[key]);
    //}
    //alert(queryString)
    return axios
      .post(url,qs.stringify(params))
      .then(handleStatus)
      .then(handleResponse)
      //.catch(error => {
      //  console.log(error);
      //  Indicator.close();
      //})
  },

  put(url, params = {}) {
    // Indicator.open({
    //   text: '加载中...',
    //   spinnerType: 'fading-circle'
    // });
    return axios
      .put(url, params)
      .then(handleStatus)
      .then(handleResponse)
      .catch(error => {
        console.log(error);
        Indicator.close();
      })
  },

  delete(url, params = {}) {
    // Indicator.open({
    //   text: '加载中...',
    //   spinnerType: 'fading-circle'
    // });
    let queryString = new URLSearchParams();
    for (let key in params) {
      queryString.append(key,params[key]);
    }
    return axios
      .delete(url, queryString)
      .then(handleStatus)
      .then(handleResponse)
      .catch(error => {
        console.log(error);
        // Indicator.close();
      })
  },

}
