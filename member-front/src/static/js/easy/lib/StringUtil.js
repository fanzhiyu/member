const $template = require("../bin/template.json");
export default {

  /**
   * 字符替换
   * @param $elem
   * @param array
   */
  replace($elem,array){
    if(array instanceof Array){
      for(var i=0,len=array.length; i<len; i++){
        $elem = $elem.replace("${"+i+"}",array[i]);
      }
    }else{
      $elem = $elem.replace("${0}",array);
    }
    return $elem;
  },

  /**
   * 填写下拉菜单数据
   * @param param
   * @private
   */
  _setOption(param={}){
    var lists = param.list;
    var select = param.select;
    var value = param.value;
    var html = "";
    for(var i=0,len=lists.length;i<len;i++){
      var list = lists[i];
      var str = [];
      str.push(list.id);
      str.push(value == list.id?'selected':'');
      str.push(list.name);
      html += this.replace($template.EASY_TAGS.select_option,str);
    }

    console.log(html);
    $(html).appendTo(select.find('select'));
    if(param.onselect){
      select.selectFilter({
        callBack : function (val){
          if(typeof param.change == 'function'){param.change(val)}
        }
      });
    }
  }
}
