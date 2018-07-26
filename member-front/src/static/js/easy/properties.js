const cfg = require('./config/easy-cfg');
const env = cfg.EASYCFG.CONFIG.language;
const language = require('./lang/language_'+env+'.json');
const $template = require("./bin/template.json");
const $stringUtil = require("./lib/StringUtil");
const httpService = require('../../../api/HttpService');
import {Indicator, MessageBox,Toast} from "mint-ui";
var objId;
!function(){

  const position_x = language.EASY_PROPERTIES.position_x;

  const position_y = language.EASY_PROPERTIES.position_y;

  const position_w = language.EASY_PROPERTIES.position_w;

  const position_h = language.EASY_PROPERTIES.position_h;

  const label_title = language.EASY_PROPERTIES.title;

  const example_title = language.EASY_PROPERTIES.example;

  const submit_type_title = language.EASY_PROPERTIES.submit_type;

  const submit_inside_title = language.EASY_PROPERTIES.submit_inside;

  const submit_external_title = language.EASY_PROPERTIES.submit_external;

  const submit_address_title = language.EASY_PROPERTIES.submit_address;

  const describe_title = language.EASY_PROPERTIES.describe;

  const hint_title = language.EASY_PROPERTIES.hint;

  const disable_title = language.EASY_PROPERTIES.disable;

  const disable_yes_title = language.EASY_PROPERTIES.disable_yes;

  const disable_no_title = language.EASY_PROPERTIES.disable_no;

  const value_title = language.EASY_PROPERTIES.value;

  const field_title = language.EASY_PROPERTIES.field;

  const select_title = language.EASY_PROPERTIES.select;

  const select_code = language.EASY_PROPERTIES.select_code;

  const select_value = language.EASY_PROPERTIES.select_value;

  const confirm_title = language.EASY_PROPERTIES.confirm;

  const cancel = language.EASY_ASSEMBLY.chancel;

  const switch_value1 = language.EASY_ASSEMBLY.switch_value1;

  const switch_value2 = language.EASY_ASSEMBLY.switch_value2;

  const display_title = language.EASY_PROPERTIES.display;

  /**
   * 位置设置
   */
  function position(event){
    var $event = event;
    var title = $event.find(".label-text").length > 0?$event.find(".label-text"):$event.find("div").eq(1);
    var input = $event.find("input").length > 0 ?$event.find("input"):$event.find("textarea");
    var $x = title.css("marginLeft").replace("px","");
    var $y = $event.css("marginTop").replace("px","");
    var $w = input.width().toFixed(0);
    var $h = input.height().toFixed(0);
    var $insert = $(".nature .assembly-content");
    //***********>> x位置 <<***********
    var $li_x = $stringUtil.replace($template.EASY_PROPERTIES.nature_li,position_x);
    var elm_x = $($li_x).appendTo($insert).addClass("column2");
    $($template.EASY_PROPERTIES.nature_number).bind('change',(e)=>{
      var $this = $(e.target);
      title.css("margin-left",$this.val()+"px");
    }).appendTo(elm_x).addClass('input40').val($x);
    $($template.EASY_PROPERTIES.nature_span).appendTo(elm_x);
    //***********>> y位置 <<***********
    var $li_y = $stringUtil.replace($template.EASY_PROPERTIES.nature_li,position_y);
    var elm_y = $($li_y).appendTo($insert).addClass("column2");
    $($template.EASY_PROPERTIES.nature_number).bind('change',(e)=>{
      var $this = $(e.target);
      event.css("margin-top",$this.val()+"px");
    }).appendTo(elm_y).addClass('input40').val($y);
    $($template.EASY_PROPERTIES.nature_span).appendTo(elm_y);
    //************>> width <<***********
    var $li_w = $stringUtil.replace($template.EASY_PROPERTIES.nature_li,position_w);
    var elm_w = $($li_w).appendTo($insert).addClass("column2");
    $($template.EASY_PROPERTIES.nature_number).bind('change',(e)=>{
      var $this = $(e.target);
      input.width($this.val());
    }).appendTo(elm_w).addClass('input40').val($w);
    $($template.EASY_PROPERTIES.nature_span).appendTo(elm_w);
    //*************>> height <<***********
    var $li_h = $stringUtil.replace($template.EASY_PROPERTIES.nature_li,position_h);
    var elm_h = $($li_h).appendTo($insert).addClass("column2");
    $($template.EASY_PROPERTIES.nature_number).bind('change',(e)=>{
      var $this = $(e.target);
      input.height($this.val());
    }).appendTo(elm_h).addClass('input40').val($h);
    $($template.EASY_PROPERTIES.nature_span).appendTo(elm_h);
  }

  /**
   * 提示语
   * @param event
   */
  function hint(event){
    var content = $(".assembly-content");
    var $hint = $stringUtil.replace($template.EASY_PROPERTIES.nature_li,hint_title);
    var eml = $($hint).appendTo(content).addClass("rows");
    var input = event.find("input");
    var placeholder = input.attr("placeholder");
    $($template.EASY_PROPERTIES.nature_text).bind('change',(e)=>{
      var $this = $(e.target);
      input.attr("placeholder",$this.val());
    }).appendTo(eml).val(placeholder).addClass("when");
  }

  /**
   * 禁用启用
   * @param event
   */
  function disable(event){
    var content = $(".assembly-content");
    var $disable = $stringUtil.replace($template.EASY_PROPERTIES.nature_li,disable_title);
    var eml = $($disable).appendTo(content).addClass("rows");
    var input = event.find("input");
    var check = input.prop("disabled");
    var array = [];
    array.push(disable_yes_title);
    array.push(disable_no_title)
    var $radio = $stringUtil.replace($template.EASY_TAGS.radio,array);
    var $switch = $($radio).bind('click',(e)=>{
      var $this = $(e.target);
      var value = $this.val()
      if(value == '0'){
        input.prop("disabled",false);
      }else if(value == '1'){
        input.prop("disabled","disabled");
      }
    }).appendTo(eml);
    !check ? $switch.find("input").eq(0).prop("checked","checked"):$switch.find("input").eq(1).prop("checked","checked");
  }

  /**
   * 是否显示
   * @param event
   */
  function display(event){
    var content = $(".assembly-content");
    var $display = $stringUtil.replace($template.EASY_PROPERTIES.nature_li,display_title);
    var eml = $($display).appendTo(content).addClass("rows");
    var checkbox = $template.EASY_TAGS.checkbox;
    $(checkbox).bind("click",(e)=>{
      var checked = $(e.target).find("input");
      console.log(checked);
    }).appendTo(eml);
  }

  /**
   * 值设置
   * @param event
   */
  function value(event){
    var content = $(".assembly-content");
    var $value = $stringUtil.replace($template.EASY_PROPERTIES.nature_li,value_title);
    var eml = $($value).appendTo(content).addClass("rows");
    var input = event.find("input");
    var value = input.val();
    $($template.EASY_PROPERTIES.nature_text).bind('change',(e)=>{
      var $this = $(e.target);
      input.val($this.val());
    }).appendTo(eml).val(value).addClass("when");
  }

  /**
   * 关联字段
   * @param event
   */
  function field(event){
    var content = $(".assembly-content");
    var $field = $stringUtil.replace($template.EASY_PROPERTIES.nature_li,field_title);
    var eml = $($field).appendTo(content).addClass("rows");
    var select = $($template.EASY_TAGS.select).appendTo(eml);
    var input = event.find("input,textarea,select").not(".filter-box input[type='text']");
    var bindId = input.attr("bind-id");
    // TODO 测试数据
    if(objId){
      var param = {};
      param['objId'] = objId;
      httpService.getObjTabFieldList(param).then((res)=>{
        if(res.code == '2000'){
          var array = [];
          var lists = res.data;
          for(var i=0,len=lists.length;i<len;i++){
            var list = lists[i];
            var json = {};
            json['id'] = list.objTabFieldId;
            json['name'] = list.fieldComment;
            array.push(json);
          }
        }
        $stringUtil._setOption({
          list: array,
          select: select,
          onselect: true,
          value: bindId,
          change: (val)=>{
            var inputs = event.parents("form").find("input,textarea,select");
            var bindIds = [];
            for(var i =0,len=inputs.length; i<len; i++){
              var inpt = $(inputs[i]);
              if(!inpt.is(input)){bindIds.push(inpt.attr("bind-id"))}
            }
            if(bindIds.indexOf(val) >= 0){
              Toast({
                duration: 1500,
                message: '此字段已经绑定过元素不能重复绑定'
              });
              Indicator.close();
              return;
            }
            input.attr("bind-id",val);
          }
        });
      })
    }
  }

  /**
   * 下拉菜单值设置
   * @param event
   */
  function setSelectValue(event){
    var content = $(".assembly-content");
    var $select = $stringUtil.replace($template.EASY_PROPERTIES.nature_li,select_title);
    var eml = $($select).appendTo(content).addClass("rows");
    $($template.EASY_TAGS.select_add).bind('click',(e)=>{var $this = $(e.target);callPopup(event);}).appendTo(eml);
  }

  /**
   * 调出弹窗
   */
  function callPopup($this){
    var $popup = $stringUtil.replace($template.EASY_TAGS.popup,select_title);
    var eml = $($popup).prependTo($("body"));
    $($template.EASY_TAGS.popup_close).bind('click',(e)=>{
      eml.find(".popup-window").css({"transform":"scale(0)"})
      setTimeout(()=>{
        eml.remove();
      },400);
    }).appendTo(eml.find('.title'));
    $($template.EASY_PROPERTIES.option).appendTo($(".popup-content"));
    setTimeout(()=>{
      eml.find(".popup-window").css({"transform":"scale(1)"})
    },50)
    var lists = $this.find("option");
    if(lists.length == 0){
      getOptions("","");
    }else{
      for(var i=0,len=lists.length;i<len;i++){
        var list = $(lists[i]);
        var code = list.attr("value");
        var value = list.text();
        getOptions(code,value);
      }
    }
    var btnsCancel = $stringUtil.replace($template.EASY_TAGS.chancel,cancel);
    $(btnsCancel).bind('click',(e)=>{$(".popup").remove();}).appendTo($(".popup-button")).addClass("btns-channel");
    var btnsConfirm = $stringUtil.replace($template.EASY_TAGS.save,confirm_title);
    $(btnsConfirm).bind('click',(e)=>{confirm($this)}).appendTo($(".popup-button")).addClass("btns-confirm").find("input[type='button']").removeAttr("onclick");
  }

  /**
   * 确认
   */
  function confirm($this){
    var select = $this.find(".filter-box");
    select.find("select option").remove();
    select.find("ul").remove();
    // TODO
    var array = [];
    var lists = $(".option-setting li");
    for(var i=0,len=lists.length;i<len;i++){
      var list = $(lists[i]);
      var json = {};
      json['id'] = list.find("input[type='text']").eq(0).val();
      json['name'] = list.find("input[type='text']").eq(1).val();
      array.push(json);
    }
    $stringUtil._setOption({
      list: array,
      select: select,
      change: (val)=>{
        console.log("值=>"+val);
      }
    });
   $(".popup").remove();
  }

  /**
   * 获取option列表
   */
  function getOptions(code,value){
    var array = [];
    array.push(select_code);
    array.push(select_value)
    var optionList = $stringUtil.replace($template.EASY_PROPERTIES.option_li,array);
    var option = $(optionList).appendTo($(".option-setting ul"));
    option.find("input").eq(0).val(code);
    option.find("input").eq(1).val(value);
    $($template.EASY_PROPERTIES.option_add).bind('click',(e)=>{ getOptions();}).appendTo(option.find(".operate"));
    $($template.EASY_PROPERTIES.option_sub).bind('click',(e)=>{$(e.target).parents("li").remove()}).appendTo(option.find(".operate"));
  }
  //***************>> start 共通属性 <<***************************

  /**
   * 设置单选按钮的值
   */
  function setRadioValue($event){
    var radio1 = $stringUtil.replace($template.EASY_PROPERTIES.nature_li,switch_value1);
    var radio2 = $stringUtil.replace($template.EASY_PROPERTIES.nature_li,switch_value2);
    var input = $template.EASY_PROPERTIES.nature_text;
    var $insert = $(".nature .assembly-content");
    var emlRadio1 = $(radio1).appendTo($insert).addClass("column2");
    var emlRadio2 = $(radio2).appendTo($insert).addClass("column2");
    $(input).bind('change',(e)=>{
      var val = $(e.target).val();
      $event.find(".values1").text(val)
    }).appendTo(emlRadio1).addClass("input60");
    $(input).bind('change',(e)=>{
      var val = $(e.target).val();
      $event.find(".values2").text(val)
    }).appendTo(emlRadio2).addClass("input60");
  }

  /**
   * 设置属性标题
   */
  function title(param={}){
    var content = param.content ? param.content : 'assembly-content';
    var event = param.event;
    var title = param.title;
    var $insert = $(".nature ."+content);
    var $title = $stringUtil.replace($template.EASY_PROPERTIES.nature_li,label_title);
    var elm_t = $($title).bind().prependTo($insert).addClass('rows');
    var $tagTitle = title ? title : event.find(".label-text");
    var val = $tagTitle.text().replace("：","") || event.find("input").val();
    $($template.EASY_PROPERTIES.nature_text).bind('change',(e)=>{
        var $that = $(e.target);
        var value = $that.val();
        value = title ?  value:  value + "：";
        $tagTitle.text(value);
    }).appendTo(elm_t).val(val).addClass('when');
  }

  /**
   * 描述
   */
  function describe(param={}){
    var content = param.content ? param.content : 'assembly-content';
    var $insert = $(".nature ."+content);
    var $text = $stringUtil.replace($template.EASY_PROPERTIES.nature_li,describe_title);
    var elm = $($text).bind().appendTo($insert).addClass('rows');
    $($template.EASY_PROPERTIES.nature_textarea).appendTo(elm).addClass("describe");
  }
  //***************>> end 共通属性 <<***************************

  //******************>> start 以下内容是表单属性 <<*********************
  /**
   * 表单标题
   */
  function formTitle(event){
    title({
      content: 'content',
      event: event,
      title: event.find(".form-title"),
    })
  }

  /**
   * 表单描述
   * @param event
   */
  function formDescribe(event){
    describe({
      content: 'content',
      event: event,
    })
  }

  /**
   * 选择实例
   */
  function example(event){
    var $insert = $(".nature .content");
    var $example = $stringUtil.replace($template.EASY_PROPERTIES.nature_li,example_title);
    var eml = $($example).appendTo($insert).addClass('rows');
    var select = $($template.EASY_TAGS.select).appendTo(eml).css("width","62%");
    // 获取所有对象
    httpService.getObjAll().then((res)=>{
      var list = res.data;
      var array = [];
      for(var i=0,len=list.length;i<len;i++){
        var json = {};
        var data = list[i];
        json['id'] =data.objId;
        json['name'] = data.objName;
        array.push(json);
      }
      $stringUtil._setOption({
        list: array,
        select: select,
        onselect: true,
        change: (val)=>{
          console.log("值=>"+val);
          objId = val;
          event.find("form").attr("bind-id",val)
        }
      });
    })
  }

  /**
   * 提交方式
   * @param param
   */
  function submitType(event){
    var $insert = $(".nature .content");
    var $submitType = $stringUtil.replace($template.EASY_PROPERTIES.nature_li,submit_type_title);
    var eml = $($submitType).appendTo($insert).addClass('rows');
    var array = [];
    array.push(submit_inside_title);
    array.push(submit_external_title);
    var html = $stringUtil.replace($template.EASY_TAGS.radio,array);
    var radio = $(html).bind('change',(e)=>{
      var $this = $(e.target);
      var $val = $this.val()
      if($val == '1'){
        var $address = $stringUtil.replace($template.EASY_PROPERTIES.nature_li,submit_address_title);
        var $addEml = $($address).insertAfter($this.parents(".rows")).addClass('rows');
        $($template.EASY_PROPERTIES.nature_text).appendTo($addEml).addClass("when");
      }else if($val == '0'){
        $this.parents(".rows").next().remove();
      }
    }).appendTo(eml);
    radio.find("input").eq(0).prop("checked","checked");
  }
  //******************>> end 以下内容是表单属性 <<*********************

  /**
   * 删除属性面板元素
   */
  function removeProperties(){
    $(".nature .assembly-content li").remove();
  }

  var Last = function(){};
  Last.prototype = {
    /**
     * 表单属性
     * @param $this
     */
    getForm: function ($this) {
      formTitle($this);
      example($this);
      submitType($this);
      formDescribe($this);
    },

    /**
     * 输入框属性
     * @param $this
     */
    getInput: function($this){
      removeProperties($this);
      title({event:$this});
      field($this);
      position($this);
      hint($this);
      disable($this);
      display($this);
      value($this);
    },

    /**
     * 单选按钮
     * @param $this
     */
    getRadio: function($this){
      removeProperties($this);
      title({event:$this});
      field($this);
      position($this);
      setRadioValue($this);
    },

    /**
     * 复选框
     * @param $this
     */
    getCheckbox: function($this){
      removeProperties($this);
      title({event:$this});
      field($this);
      position($this);
    },

    /**
     * 下拉菜单
     * @param $this
     */
    getSelect: function($this){
      removeProperties($this);
      title({event:$this});
      field($this);
      position($this);
      setSelectValue($this);
    },

    /**
     * 上传按钮
     * @param $this
     */
    getFile: function($this){
      removeProperties($this);
      title({event:$this});
      field($this);
      position($this);
    },

    /**
     * 按钮控制
     * @param $this
     */
    getButton: function ($this) {
      removeProperties($this);
      title({event:$this});
      position($this);
    }
  }
  window.onLast = new Last();
}(window);
