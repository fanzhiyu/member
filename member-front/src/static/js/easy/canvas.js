/**
 * 组件实例
 */
const cfg = require('./config/easy-cfg');
const env = cfg.EASYCFG.CONFIG.language;
const language = require('./lang/language_'+env+'.json');
const $template = require("./bin/template.json");
const $stringUtil = require("./lib/StringUtil");
const httpService = require('../../../api/HttpService');
import './assembly';
import './properties';
import {Indicator, MessageBox,Toast} from "mint-ui";
!function($global){

  // 画布标题
  const canvasTitle = language.EASY_CANVAS.title;
  // 预览按钮
  const previewBtn = language.EASY_CANVAS.btn_preview;
  // 保存按钮
  const saveBtn = language.EASY_CANVAS.btn_save;
  // 属性
  const nature = language.EASY_CANVAS.nature_setting;
  // 组件
  const field = language.EASY_CANVAS.field;
  // 页面布局
  const layout = language.EASY_CANVAS.layout;
  // 表单标题
  const formTitle = language.EASY_CANVAS.form_title;
  /// 组件设置
  const ass = language.EASY_CANVAS.assembly_setting;
  // 选择属性
  const selectPro = language.EASY_PROPERTIES.select_properties;


  /**
   * 绘制画布区域
   */
  function setCanvas(){
    //**************>> 设置画布 <<**********
    var $canvas = $stringUtil.replace($template.EASY_TAGS.canvas,canvasTitle);
    $($canvas).bind("click",(e)=>{

    }).appendTo($("#canvas"));
    // 设置表单标题
    var html = $stringUtil.replace($template.EASY_TAGS.form_title,formTitle);
    $(html).appendTo($(".canvas form"));
    //*********>> 预览事件 <<*************
    var $preview = $stringUtil.replace($template.EASY_TAGS.button,previewBtn);
    $($preview).bind("click",(e)=>{
      preview();
    }).appendTo($(".canvas-header ul"));
    //*********>> 保存事件 <<*************
    var $save = $stringUtil.replace($template.EASY_TAGS.button,saveBtn);
    $($save).bind("click",(e)=>{
      save();
    }).appendTo($(".canvas-header ul"));
  }

  /**
   * 预览
   */
  function preview(){
    var canvas = $(".canvas").find(".form").html();
    var $popup = $stringUtil.replace($template.EASY_TAGS.popup,"表单预览");
    var eml = $($popup).prependTo($("body"));
    eml.find(".popup-window").css({"width":"50%","min-height":"400px"});
    setTimeout(()=>{
      eml.find(".popup-window").css({"transform":"scale(1)"})
    },50)
    $($template.EASY_TAGS.popup_close).bind('click',(e)=>{
      eml.find(".popup-window").css({"transform":"scale(0)"})
      setTimeout(()=>{
        eml.remove();
      },400);
    }).appendTo(eml.find('.title'));
    var body = $(canvas).appendTo($(".popup-content"));
    body.find(".tags").removeClass("tags-box");
    body.find(".layout .layout-delete").remove();
    body.find(".layout").removeClass("layout");
    body.find(".layout-column").css("border","0px")
    body.find("i").remove();
    var selects = body.find(".filter-box");
    for(var i=0,len=selects.length;i<len;i++){
      var select = $(selects[i]);
      select.selectFilter({
        callBack : function (val){
          select.find("input[type=hidden]").val(val);
        }
      });
    }
  }

  /**
   * 保存
   */
  function save(){
    var form = $(".canvas").find(".form");
    form.find(".tags").removeClass("tags-box");
    form.find(".layout").removeClass("layout");
    form.find(".layout-column").css("border","0px")
    form.find("i").remove();
    var html = form.html();
    var objId = form.find("form").attr("bind-id");
    if(!objId){
      Toast({
        duration: 1500,
        message: '您还未选择绑定对象'
      });
      Indicator.close();
      return;
    }
    var param = {};
    param['objId'] = objId;
    param['formHtml'] = html;
    param['formTitle'] = form.find(".form-title").text();
    httpService.saveForms(param).then((res)=>{
      if(res.code == '2000'){
        Toast({
          duration: 1500,
          message: '表单保存成功'
        });
        Indicator.close();
      }
    })
  }

  /**
   * 绘制画布右面区域
   */
  function setCanvasLeft(){
    var $height = document.documentElement.clientHeight-25;
    $($template.EASY_TAGS.left).appendTo($("#canvas"));
    var formSetting = $stringUtil.replace($template.EASY_TAGS.form_setting,nature);
    $(formSetting).bind('click',(e)=>{setBottomBox(e);setFormContent();}).appendTo($(".nature .title")).addClass("box-bottom");
    var assemblySetting = $stringUtil.replace($template.EASY_TAGS.form_setting,ass);
    $(assemblySetting).bind('click',(e)=>{setBottomBox(e);setAssemblyContent();}).appendTo($(".nature .title"));
    // $(".canvas-left").css({height: $height+"px"});
    //*************>> 组件tag <<***********
    var $field =$stringUtil.replace($template.EASY_TAGS.assembly,field);
    $($field).bind("click",(e)=>{
      var $this = $(e.target);
      setLabel($this);
      if($(".assembly .btns").length == 0){
        onloadBtns.initBtns();
      }
    }).appendTo($(".assembly .title"));
    $(".assembly .title label").eq(0).addClass("label-focus");
    //*************>> 页面布局 <<***********
    var $layout =$stringUtil.replace($template.EASY_TAGS.assembly,layout);
    $($layout).bind("click",(e)=>{
      var $this = $(e.target);
      setLabel($this);
      onloadBtns.initLayout();
    }).appendTo($(".assembly .title"));
    onloadBtns.initBtns();
  }

  /**
   * 设置底边样式
   * @param $this
   */
  function setBottomBox(e){
    var $this = $(e.target);
    $(".nature .title .setting").removeClass("box-bottom");
    $this.addClass("box-bottom");
  }

  /**
   * 设置表单属性内容
   */
  function setFormContent(){
    $(".nature .content").show();
    $(".nature .assembly-content").hide();
  }

  /**
   * 设置控件属性内容
   */
  function setAssemblyContent(){
    var $assContent = $(".nature .assembly-content");
    $assContent.show();
    $(".nature .content").hide();
    $(".waring").remove();
    if($(".canvas form .tags").length == 0){
      var $li = $stringUtil.replace($template.EASY_PROPERTIES.nature_li,selectPro).replace("：","");
      $($li).appendTo($assContent).addClass("waring").find("label").removeClass("labels");
      return;
    }
  }

  /**
   * 设置控件按钮样式
   * @param $this
   */
  function setLabel($this) {
    $this.parent().find("label").removeClass("label-focus");
    $this.addClass("label-focus");
  }

  window.startCanvas = function(){
    setCanvasLeft();
    setCanvas();
    onLast.getForm($(".canvas"));
  };
}(window);
