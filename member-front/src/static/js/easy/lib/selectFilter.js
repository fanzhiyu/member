/**
 * selectFilter  --v1.1
 *
 * author： 840399345@qq.com
 *
 * $(el).selectFilter(options);
 *
 * options={
 *  callBack : function (res){}  // 返回选中的值 进行事件操作
 * }
 *
 * 也可以放在表单直接获取  select标签的 值
 *
 **/

;jQuery.fn.selectFilter = function (options){
	var defaults = {
		callBack : function (res){}
	};
	var ops = $.extend({}, defaults, options);
  $(this).find("input").val("");
  $(this).find("ul").remove();
	var selectList = $(this).find('select option');
	var that = this;
	var html = '';

	// 读取select 标签的值
	html += '<ul class="filter-list">';

	$(selectList).each(function (idx, item){
		var val = $(item).val();
		var valText = $(item).html();
		var selected = $(item).prop('selected');
		var disabled = $(item).prop('disabled');
		var isSelected = selected ? 'filter-selected' : '';
		var isDisabled = disabled ? 'filter-disabled' : '';
		if(selected) {
			html += '<li class="'+ isSelected +'" data-value="'+val+'"><a title="'+valText+'">'+valText+'</a></li>';
			$(that).find('.filter-title').val(valText);
		}else if (disabled){
			html += '<li class="'+ isDisabled +'" data-value="'+val+'"><a>'+valText+'</a></li>';
		}else {
			html += '<li data-value="'+val+'"><a title="'+valText+'">'+valText+'</a></li>';
		};
	});

	html += '</ul>';
	$(that).append(html);
	$(that).find('select').hide();

	//点击选择
  $(that).unbind('click');
	$(that).on('click', '.filter-text', function (){
		$(that).find('.filter-list').slideToggle(100);
		$(that).find('.filter-list').toggleClass('filter-open');
		var span = $(that).find('.filter-text span');
    if(span.attr("class") == 'icon-arrow'){
      $(that).find('.filter-text span').toggleClass('filter-show');
      span.removeClass('icon-arrow');
    }else{
      $(that).find('.filter-text span').toggleClass('icon-arrow');
      span.removeClass('filter-show');
    }
	});

	//点击选择列表
  $(that).find('.filter-list li').unbind('click');
	$(that).find('.filter-list li').not('.filter-disabled').on('click', function (){
		var val = $(this).data('value');
		var valText =  $(this).find('a').html();
		$(that).find('.filter-title').val(valText);
		$(that).find('.filter-text span').toggleClass('filter-show');
    $(that).find('.filter-text span').addClass('icon-arrow');
		$(this).addClass('filter-selected').siblings().removeClass('filter-selected');
		$(this).parent().slideToggle(50);
		for(var i=0; i<selectList.length; i++){
			var selectVal = selectList.eq(i).val();
			if(val == selectVal) {
				$(that).find('select').val(val);
			};
		};
		ops.callBack(val); //返回值
	});

	//其他元素被点击则收起选择
	$(document).on('mousedown', function(e){
		closeSelect(that, e);
	});
	$(document).on('touchstart', function(e){
		closeSelect(that, e);
	});

	function closeSelect(that, e) {
		var filter = $(that).find('.filter-list'),
			filterEl = $(that).find('.filter-list')[0];
		var filterBoxEl = $(that)[0];
		var target = e.target;
		if(filterEl !== target && !$.contains(filterEl, target) && !$.contains(filterBoxEl, target)) {
			filter.slideUp(50);
			$(that).find('.filter-list').removeClass('filter-open');
			$(that).find('.filter-text span').removeClass('filter-show');
      $(that).find('.filter-text span').addClass('icon-arrow');
		};
	}
};
