const httpService = require('../../../api/HttpService');
!function(){
  /**
   * 保存事件
   * @param $this
   */
  function onSave($this){
    var form = $($this).parents("form");
    var objId = form.attr("bind-id");
    var inputs = form.find("input,textarea,select").not("input[type='radio'],.filter-box input[type='text']");
    var radios = form.find("input[type='radio']")
    for(var i=0,len=radios.length;i<len;i++){
      var radio = $(radios[i]);
      if(radio.is(":checked")){
        inputs.push(radio);
      }
    }
    var array = [];
    for(var i=0,len=inputs.length; i<len; i++){
      var json = {};
      var input = $(inputs[i]);
      if(!input.is($this)){
        var key = input.attr("bind-id");
        if(key){
          var val = input.val();
          json[key] = val;
          array.push(json);
        }
      }
    }
    var object = {"objId":objId,"list":array};
    var param = {};
    param['params'] = JSON.stringify(object);
    httpService.saveEvent(param).then((res)=>{
      console.log(res);
    })
  }

  window.onSave = function($this){
    onSave($this);
  };

}(window)
