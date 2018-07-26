import './easy-date'
import httpService from '../../../api/HttpService';
import stringUtil from '../../../util/stringUtil';
const cfg = require('./config/easy-cfg');
const env = cfg.EASYCFG.CONFIG.language;
const language = require('./lang/'+env+'.json');
import './canvas';
import './assembly'

const API_PREFIX = cfg.EASYCFG.CONFIG.contextRoot;


!function ($global) {
  var $obj,$color;
  var $checkbox = "<label class='checkbox00' style='float: left'><input type='checkbox' name='checkbox' style='display: none'><span></span></label>";

  /**
   * 工具箱class
   */
  var $toolClass = function(){};
  $toolClass.prototype = {

    /**
     * 文本输入框按钮
     */
    textFieldTool: function () {
      var param = {};
      param.title = "文本输入框";
      param.icon = 'file-text-o';
      param.success = ($this)=>{
        new $tagClass().textFieldTag($this);
      }
      this.setTool(param);
    },

    /**
     * 多行文本输入框按钮
     */
    textAreaTool: function () {
      var param = {};
      param.title = "多行文本输入框";
      param.icon = 'files-o';
      param.success = ($this)=>{
        new $tagClass().textareaFiledTag($this);
      }
      this.setTool(param);
    },

    /**
     * 单选按钮
     */
    switchTool: function(){
      var param = {};
      param.title = "单选框";
      param.icon = 'dot-circle-o';
      param.success = ($this)=>{
        new $tagClass().radioTag($this);
      }
      this.setTool(param);
    },

    /**
     * 多选按钮
     */
    checkBoxTool: function () {
      var param = {};
      param.title = "多选框";
      param.icon = 'check-square-o';
      param.success = ($this)=>{
        new $tagClass().checkboxTag($this);
      }
      this.setTool(param);
    },

    /**
     * 下拉菜单
     */
    selectTool: function () {
      var param = {};
      param.title = "下拉菜单";
      param.icon = 'chevron-circle-down';
      param.success = ($this)=>{
        new $tagClass().selectTag($this);
      }
      this.setTool(param);
    },

    /**
     * 日期控件按钮
     */
    dateFieldTool: function () {
      var param = {};
      param.title = "日期输入框";
      param.icon = 'calendar';
      param.success = ($this)=>{
        new $tagClass().dateTag($this);
      }
      this.setTool(param);
    },

    /**
     * 数字输入框
     */
    numberFieldTool: function(){
      $("<li class='btns'><div class='icons'><div class='number' title='数字输入框'>123</div></div></li>").bind('mousedown',(e)=>{
        var $self = this;
        $self.mouseMove(e.target.outerHTML.toString());
        // 左键松开
        $(document).bind("mouseup",function(e){
          var $this = $(e.target);
          if($this.closest($(".make-panel")).length > 0){
            var tag = new $tagClass();
            tag.numberTag($this);
          }
          $self.unbindEvent(this);
        });
      }).appendTo($(".iconBtn ul"));
    },

    /**
     * 金额输入框
     */
    moneyFieldTool: function(){
      var param = {};
      param.title = "金额输入框";
      param.icon = 'dollar';
      param.success = ($this)=>{
        new $tagClass().moneyTag($this);
      }
      this.setTool(param);
    },

    /**
     * 邮箱输入框
     */
    emailFieldTool: function () {
      var param = {};
      param.title = "邮箱";
      param.icon = 'envelope-o';
      param.success = ($this)=>{
        new $tagClass().emailTag($this);
      }
      this.setTool(param);
    },

    /**
     * 手机输入框
     */
    telFieldTool: function () {
      var param = {};
      param.title = "手机";
      param.icon = 'mobile';
      param.success = ($this)=>{
        new $tagClass().telTag($this);
      }
      this.setTool(param);
    },

    /**
     * 附件输入框
     */
    fileFieldTool: function(){
      var param = {};
      param.title = "附件";
      param.icon = 'paperclip';
      param.success = ($this)=>{
        new $tagClass().fileTag($this);
      }
      this.setTool(param);
    },

    /**
     * 保存按钮
     */
    saveBtnTool: function(){
      var param = {};
      param.title = '保存按钮';
      param.icon = 'save';
      param.success = ($this)=>{
        new $tagClass().saveBtnTag($this);
      }
      this.setTool(param);
    },

    /**
     * 取消
     */
    chancelBtnTool: function(){
      var param = {};
      param.title = '取消按钮';
      param.icon = 'share';
      param.success = ($this)=>{
      }
      this.setTool(param);
    },

    /**
     * 分割线
     */
    lineFieldTool: function(){
      var param = {};
      param.title = "分割线";
      param.icon = 'ellipsis-h';
      param.success = ($this)=>{
        new $tagClass().lineTag($this);
      }
      this.setTool(param);
    },

    /**
     * 设置工具按钮
     */
    setTool: function(params){
      var $title = params.title;
      var $icon = params.icon;
      $("<li class='btns'><div class='icons'><i class='fa fa-"+$icon+"' title='"+$title+"'></i></div></li>").bind('mousedown',(e)=>{
        var $self = this;
        $self.mouseMove(e.target.outerHTML.toString());
        // 左键松开
        $(document).bind("mouseup",function(e){
          var $this = $(e.target);
          if($this.closest($(".make-panel")).length > 0){
            if(typeof params.success == 'function'){params.success($this)}
          }
          $self.unbindEvent(this);
        });
      }).appendTo($(".iconBtn ul"));
    },

    /**
     * 解绑元素
     * @param $this
     */
    unbindEvent: function ($this) {
      $($this).unbind("mousemove")
      $($this).unbind("mouseup");
      $(".overDown").remove();
    },

    /**
     * 鼠标拖动效果
     */
    mouseMove: function ($html) {
      // 鼠标拖动
      $(document).bind("mousemove",(event)=>{
        var offsetX = event.pageX;
        var offsetY = event.pageY;
        if($("body .overDown").length == 0){
          $("body").prepend("<div class='overDown'>"+$html+"</div>");
        }
        $(".overDown").css({"top":offsetY-25+"px",left:offsetX-25+"px"});
      });
    },
  }


  /**
   * 属性class
   */
  var $attributeClass = function(){};
  $attributeClass.prototype = {

    /**
     * 画板属性
     */
    panelAttribute: function () {
      var $self = this;
      this.getAttribute({
        title: '表单属性',
        event: $(".make-panel"),
        disabel:true,
        success: (res)=>{
          $self.setFormTitleAttibute(res);
          $self.setFormRequestUrlAttribute(res);
          $self.setFormProcessAttribute(res);
        }
      });
    },

    /**
     * 文本输入框属性
     */
    textFieldAttribute: function($this){
      var $self = this ? this : new $attributeClass();
      $self.getAttribute({
        title:'文本框属性',
        event: $this,
        success: (res)=>{
          $self.setTitleAttribute(res);
          $self.setPointAttibute(res);
          $self.setNameAttribute(res);
          $self.setValueAttribute(res);
          $self.setReadAttribute(res);
          $self.setRequiredAttribute(res);
        }
      });
    },

    /**
     * 多行文本输入框属性
     */
    textareaFieldAttribute: function ($this) {
      var $self = this ? this : new $attributeClass();
      $self.getAttribute({
        title:'多行文本框属性',
        event: $this,
        success: (res)=>{
          $self.setTitleAttribute(res);
          $self.setNameAttribute(res)
          $self.setPointAttibute(res);
          $self.setReadAttribute(res);
          $self.setRequiredAttribute(res);
        }
      });
    },

    /**
     * 单选按钮属性
     * @param $this
     */
    radioAttribute: function($this) {
      var $self = this ? this : new $attributeClass();
      $self.getAttribute({
        title:'单选按钮属性',
        event: $this,
        success: (res)=>{
          $self.setTitleAttribute(res);
          $self.setRadioAttribute(res);
          $self.setNameAttribute(res)
        }
      });
    },

    /**
     * 多选按钮属性
     * @param $this
     */
    checkboxAttribute: function ($this) {
      var $self = this ? this : new $attributeClass();
      $self.getAttribute({
        title:'多选按钮',
        event: $this,
        success: (res)=>{
          $self.setTitleAttribute(res);
          $self.setNameAttribute(res)
        }
      });
    },

    /**
     * 日期控件属性
     */
    dateAttribute: function ($this) {
      var $self = this ? this : new $attributeClass();
      $self.getAttribute({
        title:'日期属性',
        event: $this,
        success: (res)=>{
          $self.setTitleAttribute(res);
          $self.setPointAttibute(res);
          $self.setNameAttribute(res)
          $self.setReadAttribute(res);
          $self.setRequiredAttribute(res);
        }
      });
    },

    /**
     * 下拉菜单属性
     * @param $this
     */
    selectAttribute: function($this){
      var $self = this ? this : new $attributeClass();
      this.getAttribute({
        title:'下拉菜单属性',
        event: $this,
        success: (res)=>{
          $self.setTitleAttribute(res);
          $self.setNameAttribute(res)
        }
      });
    },

    /**
     * 数字输入框属性
     */
    numberAttribute: function($this){
      var $self = this ? this : new $attributeClass();
      $self.getAttribute({
        title:'数字输入框属性',
        event: $this,
        success: (res)=>{
          $self.setTitleAttribute(res);
          $self.setPointAttibute(res);
          $self.setNameAttribute(res)
          $self.setReadAttribute(res);
          $self.setRequiredAttribute(res);
        }
      });
    },

    /**
     * 金额输入框属性
     * @param $this
     */
    moneyAttribute: function ($this) {
      var $self = this ? this : new $attributeClass();
      $self.getAttribute({
        title:'手机输入框属性',
        event: $this,
        success: (res)=>{
          $self.setTitleAttribute(res);
          $self.setPointAttibute(res);
          $self.setNameAttribute(res)
          $self.setReadAttribute(res);
          $self.setRequiredAttribute(res);
        }
      });
    },

    /**
     * 邮箱输入框属性
     * @param $this
     */
    emailAttribute: function ($this) {
      var $self = this ? this : new $attributeClass();
      $self.getAttribute({
        title:'邮箱输入框属性',
        event: $this,
        success: (res)=>{
          $self.setTitleAttribute(res);
          $self.setPointAttibute(res);
          $self.setNameAttribute(res);
          $self.setReadAttribute(res);
          $self.setRequiredAttribute(res);
        }
      });
    },

    /**
     * 手机输入框属性
     * @param $this
     */
    telAttribute: function($this){
      var $self = this ? this : new $attributeClass();
      $self.getAttribute({
        title:'手机输入框属性',
        event: $this,
        success: (res)=>{
          $self.setTitleAttribute(res);
          $self.setPointAttibute(res);
          $self.setNameAttribute(res)
          $self.setReadAttribute(res);
          $self.setRequiredAttribute(res);
        }
      });
    },

    /**
     * 附件上传
     * @param $this
     */
    fileAttribute: function ($this) {
      var $self = this ? this : new $attributeClass();
      $self.getAttribute({
        title:'附件上传属性',
        event: $this,
        success: (res)=>{
          $self.setTitleAttribute(res);
          $self.setNameAttribute(res)
        }
      });
    },

    /**
     * 分割线属性
     */
    lineAttribute: function($this){
      var $self = this ? this : new $attributeClass();
      $self.getAttribute({
        title:'分割线属性',
        event: $this,
      });
    },

    /**
     * 设置保存按钮属性
     */
    setSaveBtnAttribute: function ($this) {
      var $self = this ? this : new $attributeClass();
      $self.getAttribute({
        title: '保存按钮属性',
        event: $this
      })
    },

    /**
     * 表单标题属性
     * @param $this
     */
    formTitleAttribute: function($this){
      var $self = this ? this : new $attributeClass();
      $self.getAttribute({
        title:'表单标题属性',
        event: $this,
        success:(e)=>{
          var $doc = $("<li><label class='labels'>对齐方式：</label></li>").appendTo(e.ul);
          var $event = e.event;

          $("<div class='position left'><i class='fa fa-align-left' title='左对齐' ></i></div>").bind('click',(e)=>{
            var $this = $(e.target);
            $self.setAlignColor($this,'left',$event);
          }).appendTo($doc);
          $("<div class='position center'><i class='fa fa-align-center'  title='居中'></i></div>").bind('click',(e)=>{
            var $this = $(e.target);
            $self.setAlignColor($this,'center',$event);
          }).appendTo($doc);
          $("<div class='position right'><i class='fa fa-align-right' title='右对齐'></i></div>").bind('click',(e)=>{
            var $this = $(e.target);
            $self.setAlignColor($this,'right',$event);
          }).appendTo($doc);
          var $position = $event.find(".form-title").attr('align')?$event.find(".form-title").attr('align'):'left';
          var $left = e.ul.find("."+$position);
          $left.css({"color":'#00C6D7'});
          $color = $left;
          $("<li><label class='labels'>字号大小：</label></li><div class='clearfix'></div>").click('change',(e)=>{

          }).appendTo(e.ul);
        }
      });
    },

    /**
     * 设置图标颜色
     * @param $this
     */
    setAlignColor: function($this,$position,$event){
      if($color && $color !== $this){
        $color.css({"color":"#000000"});
      }
      $this.css({"color":'#00C6D7'});
      $event.find(".form-title").attr("align",$position);
      $color = $this;
    },

    /**
     * 获取属性
     * @param $this
     * @param $title
     */
    getAttribute(params){
      this.removeEvent();
      this.setTitle(params.title);
      var $event = params.event;
      var $html = "<div class='panel-property'><ul></ul></div>";
      this.appendPropertyEvent($html);
      var $ul = $(".panel-property ul");
      var $label = $event.find(".labels");
      var $input = $event.find("input").length > 0 ? $event.find("input") : $event.find("textarea").length > 0 ? $event.find("textarea"):$event.find("select");
      var param = {};
      param['ul'] = $ul;
      param['input'] = $input;
      param['label'] = $label;
      param['event'] = $event;
      param['disabel'] = params.disabel ? params.disabel : false;
      this.setAttribute(param);
      if(typeof params.success == 'function'){
          params.success(param);
      }
    },

    /**
     * 设置form标题属性
     * @param params
     */
    setFormTitleAttibute: function (params) {
      var $ul = params.ul;
      var $event = params.event;
      var $text =  $event.find(".form-title").text()?$event.find(".form-title").text():'';
      $("<li><label class='labels'>表单标题：</label><input type='text' class='input00' value='"+$text+"' /></li><div class='clearfix'></div>").bind('change',(e)=>{
          var $this = $(e.target);
          new $tagClass().formTitleTag($event,$this);
      }).prependTo($ul);
    },

    /**
     * 设置表单提交的地址
     */
    setFormRequestUrlAttribute: function (params) {
      var $event = params.event;
      var $ul = params.ul;
      var $requestUrl = $event.find("form").attr("action");
      $("<li><label class='labels'>请求地址：</label><input type='text' class='input00' value='"+$requestUrl+"' /></li><div class='clearfix'></div>").bind('change',(e)=>{
        var $this = $(e.target);
        var $val = $this.val();
        $event.find("form").attr("action",$val);
      }).appendTo($ul);
    },

    /**
     * 设置流程
     * @param params
     */
    setFormProcessAttribute: function(params){
      var $event = params.event;
      var $ul = params.ul;
      var $process = $event.find("input[name='process']").val();
      $("<li><label class='labels'>审批流：</label><select class='process' name='process'><option value='0'>请假申请</option></select></li><div class='clearfix'></div>").bind('change',(e)=>{

      }).appendTo($ul);
    },

    /**
     * 设置标题属性
     */
    setTitleAttribute: function (params) {
      var $ul = params.ul;
      var $input = params.input;
      var $label = params.label;
      var $text = $label.text().replace("：","");
      $("<li><label class='labels'>标&nbsp;&nbsp;题：</label><input type='text' class='input00' value='"+$text+"' /></li><div class='clearfix'></div>").bind('change',(e)=>{
        var $this = $(e.target);
        if($input.attr("check")){$input.attr("message",$this.val())}
        $label.text($this.val()?$this.val()+"：":'');
      }).prependTo($ul);
    },

    /**
     * 设置提示语
     */
    setPointAttibute: function (params) {
      var $ul = params.ul;
      var $input = params.input;
      var $placeholder = $input.attr("placeholder")?$input.attr("placeholder"):'';
      $("<li><label class='labels'>提示语：</label><input type='text' class='input00' value='"+$placeholder+"' /></li><div class='clearfix'></div>").bind('change',(e)=>{
        var $this = $(e.target);
        $input.attr('placeholder',$this.val());
      }).appendTo($ul);
    },

    /**
     * 设置只读
     * @param params
     */
    setReadAttribute: function (params) {
      var $ul = params.ul;
      var $input = params.input;
      $("<li class='read'><label class='labels'>只&nbsp;&nbsp;读：</label>"+$checkbox+"</li><div class='clearfix'></div>").bind('change',(e)=>{
            var $this = $(e.target);
            $this.prop("checked")?$input.attr("disabled","disabled"):$input.attr("disabled",false);
      }).appendTo($ul);
      if($input.prop("disabled")){$(".read input").attr("checked","checked")}
    },

    /**
     * 设置是否必填
     * @param params
     */
    setRequiredAttribute: function (params) {
      var $ul = params.ul;
      var $input = params.input;
      var $label = params.label;
      var $text = $label.text().replace("：","");
      $("<li class='required'><label class='labels'>是否必填：</label>"+$checkbox+"</li></li><div class='clearfix'></div>").bind('change',(e)=>{
        var $this = $(e.target);
        $this.prop("checked")?$input.attr("check","isNull"):$input.removeAttr("check");
        $this.prop("checked")?$input.attr("message",$text):$input.removeAttr("message");
      }).appendTo($ul);
      if($input.attr("check") == 'isNull'){$(".required input").attr("checked","checked")}
    },

    /**
     * 设置值
     * @param params
     */
    setRadioAttribute: function (params) {
      var $ul = params.ul;
      var $input = params.input;
      var $event = params.event;
      var $val1 = $event.find(".value1");
      var $val2 = $event.find(".value2");
      $("<li class='tow-column'><label class='labels'>值1：</label><input type='text'  class='input40' value='"+$val1.text()+"'/></li>").bind('change',(e)=>{
        var $this = $(e.target);
        var $value = $this.val();
        $val1.text($value);
      }).appendTo($ul);

      $("<li class='tow-column'><label class='labels'>值2：</label><input type='text'  class='input40' value='"+$val2.text()+"'/></li>").bind('change',(e)=>{
        var $this = $(e.target);
        var $value = $this.val();
        $val2.text($value);
      }).appendTo($ul);

    },

    /**
     * 设置属性名
     */
    setNameAttribute: function (params) {
      var $ul = params.ul;
      var $input = params.input;
      var name = $input.length > 0 ? $($input[0]).attr("name"):$input.attr('name');
      $("<li><label class='labels'>属性名：</label><input type='text' class='input00' value='"+name+"' /></li><div class='clearfix'></div>").bind('change',(e)=>{
        var $this = $(e.target);
        var $value = $this.val();
        if($input.length > 0){
          $($input[0]).attr('name',$value);
          $($input[1]).attr('name',$value);
        }else{
          $($input).attr('name',$value);
        }
      }).appendTo($ul)
    },

    /**
     * 设置属性
     */
    setAttribute: function(params){
        var $ul = params.ul;
        var $event = params.event;
        var $input = params.input.length > 0 ? params.input : $event.find(".form-title").length > 0 ? $event.find(".form-title"): $event;
        var $label = params.label.length > 0 ? params.label : $event.find(".form-title").length > 0 ? $event.find(".form-title"): $event;
        // $label = $event.find(".btn-saves").length > 0 ? $event.find(".btn-saves"): $event;
        var $disabel = params.disabel;
        var $left = parseInt($label.css("marginLeft"));
        var $top = parseInt($event.css("marginTop"));
        var $width = parseInt($input.width());
        var $height = parseInt($input.height());

        $("<li class='tow-column'><label class='labels'>位置X：</label><input type='number'  class='input40' value='"+$left+"'/><span>px</span></li>").bind('change',(e)=>{
          var $this = $(e.target);
          var $x = $this.val();
          $label.css({'margin-left':$x+"px"});
        }).appendTo($ul);

        $("<li class='tow-column'><label class='labels'>位置Y：</label><input type='number' class='input40' value='"+$top+"'/><span>px</span></li><div class='clearfix'></div>").bind('change',(e)=>{
          var $this = $(e.target);
          var $y = $this.val();
          $event.css({'margin-top':$y+"px"});
        }).appendTo($ul);

        $("<li class='tow-column'><label class='labels'>宽&nbsp;&nbsp;度：</label><input type='number' class='input40' value='"+$width+"'/><span>px</span></li>").bind('change',(e)=>{
          var $this = $(e.target);
          var $w = $this.val();
          $input.css({'width':$w+"px"});
        }).appendTo($ul);

        $("<li class='tow-column'><label class='labels'>高&nbsp;&nbsp;度：</label><input type='number' class='input40' value='"+$height+"'/><span>px</span></li><div class='clearfix'></div>").bind('change',(e)=>{
          var $this = $(e.target);
          var $h = $this.val();
          $input.css({'height':$h+"px"});
        }).appendTo($ul);
        if($disabel){
          var $lis = $ul.find("li");
          for(var i=0,len=$lis.length;i<len;i++){
            var $li = $($lis[i]).find("input");
            $li.prop("readonly",true);
          }
        }
    },

    /**
     * 设置默认值
     * @param $title
     */
    setValueAttribute: function(params){
      var $ul = params.ul;
      var $input = params.input;
      $("<li><label class='labels'>默认值：</label><input type='text' class='input00' value='"+$input.val()+"' /></li><div class='clearfix'></div>").bind('change',(e)=>{
        var $this = $(e.target);
        var $value = $this.val();
        $input.val($value);
      }).appendTo($ul)
    },

    /**
     * 设置标题
     * @param $title
     */
    setTitle: function($title){
      $(".property .title").text($title);
    },

    /**
     * 删除属性元素
     */
    removeEvent: function () {
      $(".panel-property").remove();
    },

    /**
     * 插入属性元素
     * @param $html
     */
    appendPropertyEvent: function ($html) {
      $(".property").append($html);
    }
  }

  /**
   * 标签class
   */
  var $tagClass = function(){};
  $tagClass.prototype = {

    /**
     *表单标题
     */
    formTitleTag: function($event,$this){
      if($event.find(".form-title").length > 0){
        $event.find(".form-title").text($this.val());
        return;
      }
      var $html = "<div class='tags' properties='formTitleAttribute' style='width: 100%; height: 50px;padding:10px;text-indent: 10px;'>";
            $html += "<div class='form-title' style='width: 200px;height: 30px;'>"+$this.val()+"</div>";
          $html += "</div>";
      $($html).bind('click',(e)=>{
        var $this = $(e.target);
        this.setTags($this);
        new $attributeClass().formTitleAttribute($this);
      }).prependTo($event.find("form"));
    },

    /**
     * 绘制文本框
     */
    textFieldTag: function ($event) {
      var $elm = $event.hasClass('table-th-tow') || $event.hasClass('table-th-three') ? $event : $event.find("form");
      var $html = "<div class='tags' properties='textFieldAttribute' style='width: 100%;line-height: 50px; min-height: 50px;text-indent: 10px;'>";
            $html += "<label class='labels' style='float:left;font-size: 13px;min-width:100px;text-align: right'>文本输入框：</label>";
            $html += "<input type='text' name='textField' style='width: 150px;height:30px;line-height:30px;text-indent:5px;border-radius:5px;border: 1px solid #efefef;'/>";
          $html += "</div>";
      $($html).bind('click',(e)=>{
        var $this = $(e.target);
        if($this.is($(".tags"))){
          this.setTags($this);
          new $attributeClass().textFieldAttribute($this);
        }
      }).appendTo($elm);
    },

    /**
     * 多行文本框
     * @param $event
     */
    textareaFiledTag: function ($event) {
      var $elm = $event.hasClass('table-th-tow') || $event.hasClass('table-th-three') ? $event : $event.find("form");
      var $html = "<div class='tags' properties='textareaFieldAttribute' style='width: 100%;line-height: 50px; min-height: 50px;text-indent: 10px;'>";
            $html += "<label class='labels' style='float:left;font-size: 13px;min-width:100px;text-align: right'>多行文本输入框：</label>";
            $html += "<textarea name='textareaFiled' style='float:left;width: 150px;height:50px;text-indent:5px;border-radius:5px;border: 1px solid #efefef;' ></textarea><div class='clearfix'></div>";
          $html += "</div> ";
      $($html).bind('click',(e)=>{
        var $this = $(e.target);
        if($this.is($(".tags"))){
          this.setTags($this);
          new $attributeClass().textareaFieldAttribute($this);
        }
      }).appendTo($elm)
    },

    /**
     * 单选按钮
     */
    radioTag: function ($event) {
      var $elm = $event.hasClass('table-th-tow') || $event.hasClass('table-th-three') ? $event : $event.find("form");
      var $html = "<div class='tags' properties='radioAttribute' style='width: 100%;line-height: 50px; min-height: 50px;text-indent: 10px;'>";
            $html += "<label class='labels' style='float:left;font-size: 13px;min-width:100px;text-align: right'>单选按钮：</label>";
            $html += "<div style='min-width: 70px;float: left'><label class='radios'><input type='radio' name='radio' style='display: none' /><span></span></label><span class='value1' style='font-size:13px;margin-left: 30px;'>值1</span></div>";
            $html += "<div style='min-width: 70px;float: left'><label class='radios'><input type='radio' name='radio' style='display: none' /><span></span></label><span class='value2' style='font-size:13px;margin-left: 30px;'>值2</span></div>";
            $html += "<div class='clearfix'></div>";
          $html += "</div>";
      $($html).bind('click',(e)=>{
        var $this = $(e.target);
        if($this.is($(".tags"))){
          this.setTags($this);
          new $attributeClass().radioAttribute($this);
        }
      }).appendTo($elm)
    },

    /**
     * 多选按钮标签
     */
    checkboxTag: function ($event) {
      var $elm = $event.hasClass('table-th-tow') || $event.hasClass('table-th-three') ? $event : $event.find("form");
      var $html = "<div class='tags' properties='checkboxAttribute' style='width: 100%;line-height: 50px; min-height: 50px;text-indent: 10px;'>";
            $html += "<label class='labels' style='float:left;font-size: 13px;min-width:100px;text-align: right'>多选按钮：</label>";
              $html += "<label class='checkbox00' style='float: left'>";
                $html += "<input type='checkbox' name='checkbox' style='display: none'><span></span>";
              $html += "</label>";
            $html += "<div class='clearfix'></div>";
          $html += "</div>";
      $($html).bind('click',(e)=>{
        var $this = $(e.target);
        if($this.is($(".tags"))){
          this.setTags($this);
          new $attributeClass().checkboxAttribute($this);
        }
      }).appendTo($elm)
    },

    /**
     * 日期
     */
    dateTag: function ($event) {
      var $elm = $event.hasClass('table-th-tow') || $event.hasClass('table-th-three') ? $event : $event.find("form");
      var $html = "<div class='tags' properties='dateAttribute' style='width: 100%;line-height: 50px; min-height: 50px;text-indent: 10px;'>";
            $html += "<label class='labels' style='float:left;font-size: 13px;min-width:100px;text-align: right'>日期：</label>";
            $html += "<input type='text' name='date' class='date' readonly='true' style='width: 150px;height:30px;line-height:30px;text-indent:5px;border-radius:5px;border: 1px solid #efefef;'/>";
            $html += "<div class='clearfix'></div>";
          $html += "</div>";
      $($html).bind('click',(e)=>{
        var $this = $(e.target);
        if($this.is($(".tags"))){
          this.setTags($this);
          new $attributeClass().dateAttribute($this);
        }
      }).appendTo($elm);
      DateUtil.init();
    },

    /**
     * 设置下拉菜单
     */
    selectTag: function($event){
      var $elm = $event.hasClass('table-th-tow') || $event.hasClass('table-th-three') ? $event : $event.find("form");
      var $html = "<div class='tags' properties='selectAttribute' style='width: 100%;line-height: 50px; min-height: 50px;text-indent: 10px;'>";
            $html += "<label class='labels' style='float:left;font-size: 13px;min-width:100px;text-align: right'>下拉菜单：</label>";
              $html += "<select name='select' style='width: 150px;height:30px;line-height:30px;text-indent:5px;border-radius:5px;border: 1px solid #efefef;'><option>下拉菜单</option></select>";
            $html += "<div class='clearfix'></div>";
          $html += "</div>";
      $($html).bind('click',(e)=>{
        var $this = $(e.target);
        if($this.is($(".tags"))){
          this.setTags($this);
          new $attributeClass().selectAttribute($this);
        }
      }).appendTo($elm);
    },

    /**
     * 数字输入框
     * @param $event
     */
    numberTag: function ($event) {
      var $elm = $event.hasClass('table-th-tow') || $event.hasClass('table-th-three') ? $event : $event.find("form");
      var $html = "<div class='tags' properties='numberAttribute' style='width: 100%;line-height: 50px; min-height: 50px;text-indent: 10px;'>";
          $html += "<label class='labels' style='float:left;font-size: 13px;min-width:100px;text-align: right'>数字输入框：</label>";
          $html += "<input name='number' type='number' style='width: 150px;height:30px;line-height:30px;text-indent:5px;border-radius:5px;border: 1px solid #efefef;'/>";
          $html += "<div class='clearfix'></div>";
          $html += "</div>";
      $($html).bind('click',(e)=>{
        var $this = $(e.target);
        if($this.is($(".tags"))){
          this.setTags($this);
          new $attributeClass().numberAttribute($this);
        }
      }).appendTo($elm);
    },

    /**
     * 金额输入框
     */
    moneyTag: function($event){
      var $elm = $event.hasClass('table-th-tow') || $event.hasClass('table-th-three') ? $event : $event.find("form");
      var $html = "<div class='tags' properties='moneyAttribute' style='width: 100%;line-height: 50px; min-height: 50px;text-indent: 10px;'>";
          $html += "<label class='labels' style='float:left;font-size: 13px;min-width:100px;text-align: right'>金额输入框：</label>";
          $html += "<input name='money' type='number' style='width: 150px;height:30px;line-height:30px;text-indent:5px;border-radius:5px;border: 1px solid #efefef;'/>";
          $html += "<div class='clearfix'></div>";
          $html += "</div>";
      $($html).bind('click',(e)=>{
        var $this = $(e.target);
        if($this.is($(".tags"))){
          this.setTags($this);
          new $attributeClass().moneyAttribute($this);
        }
      }).appendTo($elm);
    },

    /**
     * 邮箱输入框
     */
    emailTag: function($event){
      var $elm = $event.hasClass('table-th-tow') || $event.hasClass('table-th-three') ? $event : $event.find("form");
      var $html = "<div class='tags' properties='emailAttribute' style='width: 100%;line-height: 50px; min-height: 50px;text-indent: 10px;'>";
          $html += "<label class='labels' style='float:left;font-size: 13px;min-width:100px;text-align: right'>邮箱输入框：</label>";
          $html += "<input name='email' type='text' check='ckEmail' style='width: 150px;height:30px;line-height:30px;text-indent:5px;border-radius:5px;border: 1px solid #efefef;'/>";
          $html += "<div class='clearfix'></div>";
          $html += "</div>";
      $($html).bind('click',(e)=>{
        var $this = $(e.target);
        if($this.is($(".tags"))){
          this.setTags($this);
          new $attributeClass().emailAttribute($this);
        }
      }).appendTo($elm);
    },

    /**
     * 手机输入框
     * @param $event
     */
    telTag: function ($event) {
      var $elm = $event.hasClass('table-th-tow') || $event.hasClass('table-th-three') ? $event : $event.find("form");
      var $html = "<div class='tags' properties='telAttribute' style='width: 100%;line-height: 50px; min-height: 50px;text-indent: 10px;'>";
          $html += "<label class='labels' style='float:left;font-size: 13px;min-width:100px;text-align: right'>手机输入框：</label>";
          $html += "<input name='tel' type='text' check='ckTel' style='width: 150px;height:30px;line-height:30px;text-indent:5px;border-radius:5px;border: 1px solid #efefef;'/>";
          $html += "<div class='clearfix'></div>";
          $html += "</div>";
      $($html).bind('click',(e)=>{
        var $this = $(e.target);
        if($this.is($(".tags"))){
          this.setTags($this);
          new $attributeClass().telAttribute($this);
        }
      }).appendTo($elm);
    },

    /**
     * 附件输入框
     */
    fileTag: function($event){
      var $elm = $event.hasClass('table-th-tow') || $event.hasClass('table-th-three') ? $event : $event.find("form");
      var $html = "<div class='tags' properties='fileAttribute' style='width: 100%;line-height: 50px; min-height: 50px;text-indent: 10px;'>";
          $html += "<label class='labels' style='float:left;font-size: 13px;min-width:100px;text-align: right'>附件上传：</label>";
          $html += "<input name='file' type='file' style='display: none'/>";
          $html += "<div style='margin-top:10px;float:left;cursor:pointer;width: 50px;height: 30px;border: 1px solid #1a1a1a;line-height: 30px;border-radius: 5px;'>";
          $html +=   "<a href='javascript:;' style='font-size: 13px;display: block'>选择</a>";
          $html += "</div>";
          $html += "<div class='clearfix'></div>";
          $html += "</div>";
      $($html).bind('click',(e)=>{
        var $this = $(e.target);
        if($this.is($(".tags"))){
          this.setTags($this);
          new $attributeClass().fileAttribute($this);
        }
        if($this.is("a")){
          var $file = $this.parent().parent().find("input[type='file']");
          $file.click();
        }
      }).appendTo($elm);
    },

    /**
     * 保存按钮
     * @param $event
     */
    saveBtnTag: function ($event) {
      var $elm = $event.hasClass('table-th-tow') || $event.hasClass('table-th-three') ? $event : $event.find("form");
      var $html = "<div class='tags' style='width: 100%;line-height: 50px; min-height: 50px;text-indent: 10px;'>";
            $html += "<div class='btn-saves'></div>";
          $html += "</div>";
      var $self = this;
      var $doc = $($html).bind('click',function (e) {
        var $this = $(e.target);
        $self.setTags($this);
        new $attributeClass().setSaveBtnAttribute($this);
      }).appendTo($elm);
      $("<input type='button' class='fa fa-save' value='' />").bind('click',function(){
      }).appendTo($doc.find(".btn-saves"));
      var $script = "<script> ";
          $script += "function save(){";
              $script += "var $data={};";
              $script += "var $items = $('form').find('input');";
              $script += "$items.push($('form').find('textarea'));";
              $script += "$items.push($('form').find('select'));";
              $script += "for(var i=0,len=$items.length;i<len;i++){ var item = $($items[i]); var $key = item.attr('name'); var $val = item.val();if($key){$data[$key]=$val}}"
              $script+= "$.ajax({url:'"+API_PREFIX+"/forms/save',type:'post',data:{formParams:JSON.stringify($data)},success:(e)=>{}})";
            $script+=  "}";
          $script += "</script>";
      $($elm).append($script);
    },

    /**
     * 分割线
     */
    lineTag: function($event){
      var $html = "<div class='tags' properties='lineAttribute' style='width: 100%;line-height: 50px; min-height: 50px;text-indent: 10px;'>";
          $html += "<div style='height: 25px;border-bottom: 1px solid #efefef;width: 100%'></div>";
          $html += "<div class='clearfix'></div>";
          $html += "</div>";
      $($html).bind('click',(e)=>{
        var $this = $(e.target);
        this.setTags($this);
        new $attributeClass().lineAttribute($this);
      }).appendTo($event.find("form"));
    },

    /**
     * 设置tags选中样式
     * @param $this
     */
    setTags: function ($this) {
      if(($obj && $this !== $obj)){
        $obj.css({"background":""});
        $obj.find(".del").remove();
      }
      if($this.is($(".tags")) && $this.find(".del").length == 0){
        $("<div class='del'><i class='fa fa-close'></i></div>").bind('click',()=>{
          $this.remove();
        }).prependTo($this);
        $this.css({"background":"#00b0df"});
      }
      $obj = $this;
    }
  }

  /**
   * 页面布局
   */
  var $pageLayoutClass = function(){};
  $pageLayoutClass.prototype = {

    /**
     * 鼠标拖动
     * @param $html
     */
    mouseMove: function ($html) {
      $(document).bind("mousemove",(event)=>{
        var offsetX = event.pageX;
        var offsetY = event.pageY;
        if($("body .layoutDown").length == 0){
          $("body").prepend("<div class='layoutDown'>"+$html+"</div>");
        }
        $(".layoutDown").css({"top":offsetY-25+"px",left:offsetX-130+"px"});
      });
    },

    /**
     * 解绑元素
     * @param $this
     */
    unbindEvent: function ($this) {
      $($this).unbind("mousemove")
      $($this).unbind("mouseup");
      $(".layoutDown").remove();
    },

    /**
     * 一行两列布局
     */
    layoutItemTow: function () {
      $("<li class='layout'><label>一行两列布局</label><i class='fa fa-th'></i><div class='clearfix'></div></li>").bind('mousedown',(e)=>{
        var $self = this;
        var $html = $(e.target).parent().html();
        $self.mouseMove($html);
        // 左键松开
        $(document).bind("mouseup",function(e){
          var $this = $(e.target);
          if($this.closest($(".make-panel")).length > 0){
            $self.layoutItemTwoTag($this);
          }
          $self.unbindEvent(this);
        });
      }).appendTo($(".iconBtn ul"));
    },

    /**
     * 一行三列布局
     */
    layoutItemThree: function () {
      $("<li class='layout'><label>一行三列布局</label><i class='fa fa-list'></i><div class='clearfix'></div></li>").bind('mousedown',(e)=>{
        var $self = this;
        var $html = $(e.target).parent().html();
        $self.mouseMove($html);
        // 左键松开
        $(document).bind("mouseup",function(e){
          var $this = $(e.target);
          if($this.closest($(".make-panel")).length > 0){
            $self.layoutItemThreeTag($this);
          }
          $self.unbindEvent(this);
        });
      }).appendTo($(".iconBtn ul"));
    },

    /**
     * 绘制两列标签
     */
    layoutItemTwoTag: function ($this) {
      var $html = "<div class='table' style='width: 100%; min-height: 50px;'>";
          $html += "<div class='table-th-tow' style='width: 50%;float: left;  min-height: 50px;'></div>";
          $html += "<div class='table-th-tow' style='width: 45%;float: left;  min-height: 50px;'></div>";
          $html += "<div class='clearfix'></div>";
          $html += "</div>";
      var $doc = $($html).appendTo($this.find('form'));
      $("<div class='table-delete'><i class='fa fa-trash-o'></i>&nbsp;&nbsp;删除</div>").bind('click',function(e){
        $doc.remove();
      }).prependTo($doc);
    },

    /**
     * 绘制三列标签
     * @param $this
     */
    layoutItemThreeTag: function ($this) {
      var $html = "<div class='table' style='width: 100%; min-height: 50px;'>";
          $html += "<div class='table-th-three' style='width: 33.3%; float:left;min-height: 50px;'></div>";
          $html += "<div class='table-th-three' style='width: 33.3%; float:left;min-height: 50px;'></div>";
          $html += "<div class='table-th-three' style='width: 28.3%; float:left;min-height: 50px;'></div>";
          $html += "<div class='clearfix'></div></div>";
      var $doc = $($html).appendTo($this.find('form'));
      $("<div class='table-delete'><i class='fa fa-trash-o'></i>&nbsp;&nbsp;删除</div>").bind('click',function(e){
        $doc.remove();
      }).prependTo($doc);
    },

    /**
     * 设置layout样式
     * @param $this
     */
    setLayoutTag: function($this){
      if(($obj && $this !== $obj)){
        $obj.find(".table-delete").remove();
      }
      if($this.find(".table-delete").length == 0){
        var $y = $this.offset().top;
        $y = parseInt($y)-23;
        $("<div class='table-delete' style='top:"+$y+"px'><i class='fa fa-trash-o'></i>&nbsp;&nbsp;删除</div>").bind('click',function(){
          $this.remove();
        }).prependTo($($this));
      }
      $obj = $this;
    }
  }

  /**
   * 绘制
   */
  var start = function(){}
  start.prototype = {

    /**
     * 初始化
     */
    init: function () {
      // this.setMakePanel();
      // this.setTool();
      new tags().init();
    },

    // /**
    //  * 绘制画板
    //  */
    // setMakePanel: function () {
    //   $(".preview").remove();
    //   var $canvas = $("#make");
    //   $("<div class='make-panel'><div style='height: 40px;'><div class='title'>表单编辑区</div></div><div class='form'></div></div>").bind('click',(e)=>{
    //     var $this = $(e.target);
    //     if($this.is($(".make-panel"))){
    //       new $attributeClass().panelAttribute();
    //     }
    //   }).appendTo($canvas);
    //
    //   var formId = stringUtil.getUrlkey("formId");
    //   if(formId){
    //     $.ajax({
    //       url: API_PREFIX + '/forms/getFormsDetails',
    //       type: 'GET',
    //       data: {
    //         formId: formId,
    //       },
    //       success: (res)=>{
    //         if(res.code = '2000'){
    //           var data = res.data;
    //           $(".make-panel .form").append(data.html);
    //           $(".tags").bind('click',(e)=>{
    //             var $this = $(e.target);
    //             var $tag = new $tagClass();
    //             $tag.setTags($this);
    //             var $properties = $this.attr('properties');
    //             new $attributeClass()[$properties]($this);
    //           });
    //           $("<input type='hidden' value='"+formId+"' name='formId' />").appendTo($(".make-panel form"));
    //         }
    //       }
    //     })
    //   }else{
    //     $(".make-panel .form").append("<form action='"+API_PREFIX+"' method='post'><input type='hidden' name='proccess' /></form>");
    //   }
    //
    //
    //   $("<div class='btn-preview'><ul></ul></div>").prependTo($canvas);
    //   $("<li><a href='javascript:;'>预览</a></li>").bind('click',(e)=>{
    //     $("#make").hide();
    //     $("<div class='preview'></div>").appendTo($("#make").parent());
    //     var $form = $(".make-panel .form").html();
    //     $($form).appendTo($(".preview"));
    //     $(".preview .tags .del").remove();
    //     $(".preview .tags").css('background','');
    //     $(".preview .table").removeClass("table");
    //     $(".preview .tags").removeClass("tags");
    //   }).appendTo($(".btn-preview ul"));
    //
    //   $("<li><a href='javascript:;'>保存</a></li>").bind('click',(e)=>{
    //     $(".make-panel .tags").css({"background":''});
    //     var $html = $(".make-panel .form").html();
    //     var param = {};
    //     param['html'] = $html;
    //     param['title'] = $(".make-panel .form .form-title").text();
    //     param['action'] = $(".make-panel .form form").attr("action");
    //     param['processId'] = $(".form input[name='proccess']").val();
    //     param['formId'] = $(".make-panel input[name='formId']").val();
    //     httpService.saveForms(param).then((res)=>{
    //       if(res.code = '2000'){
    //         alert('保存成功');
    //       }
    //     })
    //   }).appendTo($(".btn-preview ul"));
    // },
    //
    // /**
    //  * 绘制工具箱
    //  */
    // setTool: function () {
    //   var $height = document.documentElement.clientHeight-60;
    //   var $tool = "<div class='tool' style='height: "+$height+"px;'><div class='property'><div class='title'>属性</div></div><div class='iconBtn'><div class='title'></div><ul></ul></div></div>";
    //   $("#make").prepend($tool);
    //   if($(".iconBtn ul li").length == 0){this.fieldTool()}
    //   $("<label class='label-focus'>字段控制</label>").bind('click',(e)=>{
    //     var $this = $(e.target);
    //     this.setLabel($this);
    //     $this.parent().parent().find("li").remove();
    //     this.fieldTool();
    //   }).appendTo($(".iconBtn .title"));
    //   $("<label>页面布局</label>").bind('click',(e)=>{
    //     var $this = $(e.target);
    //     this.setLabel($this);
    //     $this.parent().parent().find("li").remove();
    //     var $layout = new $pageLayoutClass()
    //     $layout.layoutItemTow();
    //     $layout.layoutItemThree();
    //   }).appendTo($(".iconBtn .title"));
    // },
    //
    // /**
    //  * 字段控制
    //  */
    // fieldTool: function(){
    //   var t = new $toolClass();
    //   new $attributeClass().panelAttribute();
    //   //文本输入框按钮
    //   t.textFieldTool();
    //   t.textAreaTool();
    //   t.switchTool();
    //   t.checkBoxTool();
    //   t.dateFieldTool();
    //   t.selectTool();
    //   t.numberFieldTool();
    //   t.moneyFieldTool();
    //   t.emailFieldTool();
    //   t.telFieldTool();
    //   t.fileFieldTool();
    //   t.lineFieldTool();
    //   t.saveBtnTool();
    //   t.chancelBtnTool();
    // },
    //
    // /**
    //  * 设置label样式
    //  */
    // setLabel: function ($this) {
    //   $this.parent().find("label").removeClass("label-focus");
    //   $this.addClass("label-focus");
    // }
  }

  // window.easy = start;
}(window)
