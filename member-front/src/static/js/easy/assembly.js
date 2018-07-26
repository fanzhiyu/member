/**
 * 工具箱
 */
const cfg = require('./config/easy-cfg');
const env = cfg.EASYCFG.CONFIG.language;
const language = require('./lang/language_'+env+'.json');
const $template = require("./bin/template.json");
const icon = require("./bin/icon.json");
const $stringUtil = require("./lib/StringUtil");
import './lib/selectFilter'
import './easy-date'
!function(){

  const textTitle = language.EASY_ASSEMBLY.text_title;
  const textareaTitle = language.EASY_ASSEMBLY.textarea_title;
  const switchTitle = language.EASY_ASSEMBLY.switch_title;
  const checkboxTitle = language.EASY_ASSEMBLY.checkbox_title;
  const selectTitle = language.EASY_ASSEMBLY.select_title;
  const dateTitle = language.EASY_ASSEMBLY.date_title;
  const numberTitle = language.EASY_ASSEMBLY.number_title;
  const moneyTitle = language.EASY_ASSEMBLY.money_title;
  const emailTitle = language.EASY_ASSEMBLY.email_title;
  const mobileTitle = language.EASY_ASSEMBLY.mobile_title;
  const fileTitle = language.EASY_ASSEMBLY.file_title;
  const saveTitle = language.EASY_ASSEMBLY.save_title;
  const chancelTitle = language.EASY_ASSEMBLY.chancel_title;
  const lineTitle = language.EASY_ASSEMBLY.line_title;
  const columnTitle2 = language.EASY_ASSEMBLY.layout2_column;
  const columnTitle3 = language.EASY_ASSEMBLY.layout3_column;
  const layout_delete = language.EASY_ASSEMBLY.layout_delete;

  var assembly = [],layout = [];

  /**
   * 控件btn
   * @param params
   */
  function setAssembly(params){
    var array = [];
    array.push(params.icon);
    array.push(params.title);
    var buttonType = params.buttonType == false ? params.buttonType : true;
    var $button = buttonType ? $stringUtil.replace($template.EASY_ASSEMBLY.button,array) : $stringUtil.replace($template.EASY_ASSEMBLY.layout_button,array);
    $($button).bind("mousedown",(e)=>{
      var $html = buttonType ? e.target.outerHTML.toString() : $(e.target).parent().html();
      setMouseMove($html,buttonType);
      $(document).bind("mouseup",function(e){
        var $this = $(e.target);
        if($this.closest($(".canvas")).length > 0){
          if(typeof params.mouseout == "function"){params.mouseout($this)}
        }
        removeBindEvent(this,buttonType);
      });
    }).appendTo($(".assembly ul"))
  }

  /**
   * 解绑元素
   * @param $this
   */
  function removeBindEvent($this,buttonType) {
    $($this).unbind("mousemove")
    $($this).unbind("mouseup");
    var shadow = buttonType ? $(".shadow") : $(".layout-shadow");
    shadow.remove();
  }

  /**
   * 鼠标拖动效果
   * @param $html
   */
  function setMouseMove($html,button) {
    // 鼠标拖动
    $(document).bind("mousemove",(event)=>{
      var offsetX = event.pageX;
      var offsetY = event.pageY;
      if($("body .shadow").length == 0){
        var html = button ? $template.EASY_ASSEMBLY.shadow : $template.EASY_ASSEMBLY.layout_shadow;
        $("body").prepend($stringUtil.replace(html,$html)) ;
      }
      var shadow = button ? $(".shadow") : $(".layout-shadow");
      shadow.css({"top":offsetY-25+"px",left:offsetX-25+"px"});
    });
  }

  /**
   * 设置标签
   */
  function setTags(params){
    var $title = params.title;
    var $assembly = params.assembly;
    var $event =  params.event;
    var $tags = $stringUtil.replace($template.EASY_TAGS.tags,$title);
    var position = $event.hasClass('layout-column') ? $event : $event.find("form");
    var elm = $($tags).bind({
      click: (e)=>{
        var $this = $(e.target);
        if($this.is($(".tags"))&& typeof params.click == "function"){params.click($this)}
      },
      mouseover: (e)=>{
        var $this = $(e.target);
        if($this.is($(".tags"))){$this.css({"border":"1px dashed #000000"})}
      },
      mouseout: (e)=>{
        var $this = $(e.target);
        if($this.is($(".tags"))){$this.css({"border":"0px"});}
      }
    }).appendTo(position);
    var doc = $($assembly).insertAfter(elm.find("label"));
    if(!$title){elm.find(".label-text").remove()}
  }

  /**
   * 设置文本框样式
   * @param $this
   */
  function setTextBox($this) {
    $(".tags").removeClass("tags-box");
    $(".remove-tags").remove();
    if($this.find(".remove-tags").length == 0){
      $this.addClass("tags-box");
      $($template.EASY_TAGS.remove_tags).bind('click',(e)=>{$this.remove()}).prependTo($this);
    }
  }

  /**
   * 文本框组件按钮
   */
  var text = function(){
    setAssembly({
      icon: icon.EASY_ICON.text,
      title: textTitle,
      mouseout:($this)=>{
        setTags({
          title:textTitle,
          assembly: $template.EASY_TAGS.input,
          event: $this,
          click: ($that)=>{
            setTextBox($that);
            onLast.getInput($that);
          }
        });
      }
    })
  }

  /**
   * 多行文本输入框
   */
  var textarea = function(){
    setAssembly({
      icon: icon.EASY_ICON.textarea,
      title: textareaTitle,
      mouseout:($this)=>{
        setTags({
          title: textareaTitle,
          assembly: $template.EASY_TAGS.textarea,
          event: $this,
          click:($that)=>{
            setTextBox($that);
            onLast.getInput($that);
          }
        });
      }
    })
  }

  /**
   * 单选框
   */
  var radio = function(){
    setAssembly({
      icon: icon.EASY_ICON.switch,
      title: switchTitle,
      mouseout:($this)=>{
        var array = [];
        array.push(language.EASY_ASSEMBLY.switch_value1);
        array.push(language.EASY_ASSEMBLY.switch_value2);
        var radio = $stringUtil.replace($template.EASY_TAGS.radio,array)
        setTags({
          title: switchTitle,
          assembly: radio,
          event: $this,
          click:($that)=>{
            setTextBox($that);
            onLast.getRadio($that);
          }
        });
      }
    })
  }

  /**
   * 复选框
   */
  var checkbox = function(){
    setAssembly({
      icon: icon.EASY_ICON.checkbox,
      title: checkboxTitle,
      mouseout:($this)=>{
        setTags({
          title: checkboxTitle,
          assembly: $template.EASY_TAGS.checkbox,
          event: $this,
          click:($that)=>{
            setTextBox($that);
            onLast.getCheckbox($that);
          }
        });
      }
    })
  }

  /**
   * 下拉菜单
   */
  var select = function(){
    setAssembly({
      icon: icon.EASY_ICON.select,
      title: selectTitle,
      mouseout:($this)=>{
        setTags({
          title: selectTitle,
          assembly: $template.EASY_TAGS.select,
          event: $this,
          click:($that)=>{
            setTextBox($that);
            onLast.getSelect($that);
          }
        });
      }
    })
  }

  /**
   * 日期框
   */
  var date = function(){
    setAssembly({
      icon: icon.EASY_ICON.date,
      title: dateTitle,
      mouseout:($this)=>{
        setTags({
          title: dateTitle,
          assembly: $template.EASY_TAGS.date,
          event: $this,
          click: ($that)=>{
            setTextBox($that);
            onLast.getInput($that);
          }
        });
      }
    });
  }

  /**
   * 数字输入框
   */
  var number = function(){
    setAssembly({
      icon: icon.EASY_ICON.number,
      title: numberTitle,
      mouseout:($this)=>{
        setTags({
          title: numberTitle,
          assembly: $template.EASY_TAGS.number,
          event: $this,
          click: ($that)=>{
            setTextBox($that);
            onLast.getInput($that);
          }
        });
      }
    });
  }

  /**
   * 金额输入框
   */
  var money = function(){
    setAssembly({
      icon: icon.EASY_ICON.money,
      title: moneyTitle,
      mouseout:($this)=>{
        setTags({
          title: moneyTitle,
          assembly: $template.EASY_TAGS.money,
          event: $this,
          click: ($that)=>{
            setTextBox($that);
            onLast.getInput($that);
          }
        });
      }
    });
  }

  /**
   * 邮箱输入框
   */
  var email = function(){
    setAssembly({
      icon: icon.EASY_ICON.email,
      title: emailTitle,
      mouseout:($this)=>{
        setTags({
          title: emailTitle,
          assembly: $template.EASY_TAGS.email,
          event: $this,
          click: ($that)=>{
            setTextBox($that);
            onLast.getInput($that);
          }
        });
      }
    });
  }

  /**
   * 手机输入框
   */
  var mobile = function(){
    setAssembly({
      icon: icon.EASY_ICON.mobile,
      title: mobileTitle,
      mouseout:($this)=>{
        setTags({
          title: mobileTitle,
          assembly: $template.EASY_TAGS.mobile,
          event: $this,
          click: ($that)=>{
            setTextBox($that);
            onLast.getInput($that);
          }
        });
      }
    });
  }

  /**
   * 文件选择按钮
   */
  var file = function(){
    setAssembly({
      icon: icon.EASY_ICON.file,
      title: fileTitle,
      mouseout:($this)=>{
        setTags({
          title: fileTitle,
          assembly: $stringUtil.replace($template.EASY_TAGS.file,language.EASY_ASSEMBLY.file),
          event: $this,
          click:($that)=>{
            setTextBox($that);
            onLast.getFile($that);
          }
        });
      }
    });
  }

  /**
   * 保存按钮
   */
  var save = function(){
    setAssembly({
      icon: icon.EASY_ICON.save,
      title: saveTitle,
      mouseout:($this)=>{
        setTags({
          assembly: $stringUtil.replace($template.EASY_TAGS.save,language.EASY_ASSEMBLY.save),
          event: $this,
          click:($that)=>{
            setTextBox($that);
            onLast.getButton($that);
          }
        });
      }
    });
  }

  /**
   * 取消按钮
   */
  var chancel = function () {
    setAssembly({
      icon: icon.EASY_ICON.chancel,
      title: chancelTitle,
      mouseout:($this)=>{
        setTags({
          assembly: $stringUtil.replace($template.EASY_TAGS.chancel,language.EASY_ASSEMBLY.chancel),
          event: $this,
          click:($that)=>{
            setTextBox($that);
            onLast.getButton($that);
          }
        });
      }
    });
  }

  /**
   * 分割线
   */
  var line = function(){
    setAssembly({
      icon: icon.EASY_ICON.line,
      title: lineTitle,
      mouseout:($this)=>{
        setTags({
          assembly: $template.EASY_TAGS.line,
          event: $this,
          click:($that)=>{
            setTextBox($that);
          }
        });
      }
    });
  }

  /**
   * 两列布局
   */
  var layout2Button = function(){
    setAssembly({
      icon: icon.EASY_ICON.layout_th,
      title: columnTitle2,
      buttonType: false,
      mouseout: ($this)=>{
        layoutPage(2);
      }
    })
  }

  /**
   * 三列布局
   */
  var layout3Button = function(){
    setAssembly({
      icon: icon.EASY_ICON.layout_list,
      title: columnTitle3,
      buttonType: false,
      mouseout: ($this)=>{
        layoutPage(3);
      }
    })
  }

  /**
   * 布局页面
   */
  function layoutPage($index){
    var html = $template.EASY_TAGS.layout;
    var elm = $(html).bind("mouseover",(e)=>{
      var $this = $(e.target)
      setLayoutStyle($this);
    }).appendTo($(".canvas form"));
    var width = (100/$index).toFixed(1);
    var $cloumn = "";
    for(var i=0; i<$index; i++){
      $cloumn += $stringUtil.replace($template.EASY_TAGS.layout_column,width);
    }
    $($cloumn).appendTo(elm);
  }

  /**
   * 设置layout样式
   */
  function setLayoutStyle($this){
    if($this.parents(".layout").find(".layout-delete").length == 0){
      var html = $stringUtil.replace($template.EASY_TAGS.layout_delete,layout_delete);
      $(html).bind('click',(e)=>{
        var $this = $(e.target);
        $this.parents(".layout").remove();
      }).appendTo($this.parents(".layout"));
    }
  }



  assembly.push(text);
  assembly.push(textarea);
  assembly.push(radio);
  assembly.push(checkbox);
  assembly.push(select);
  assembly.push(date);
  assembly.push(number);
  assembly.push(money);
  assembly.push(email);
  assembly.push(mobile);
  assembly.push(file);
  assembly.push(save);
  assembly.push(chancel);
  assembly.push(line);

  layout.push(layout2Button);
  layout.push(layout3Button);

  window.onloadBtns = {
    /**
     * 初始化组件
     */
    initBtns: function(){
      $(".assembly ul li").remove();
      for(var i=0,len=assembly.length; i<len; i++){
        if(typeof assembly[i] == "function"){assembly[i]()}
      }
    },

    /**
     * 初始化布局
     */
    initLayout: function(){
      $(".assembly ul li").remove();
      for(var i=0,len=layout.length; i<len; i++){
        if(typeof layout[i] == "function"){layout[i]()}
      }
    }
  };
}(window);

