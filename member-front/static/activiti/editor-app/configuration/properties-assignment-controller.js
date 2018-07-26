/*
 * Activiti Modeler component part of the Activiti project
 * Copyright 2005-2014 Alfresco Software, Ltd. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.

 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
 */

/*
 * Assignment
 */
var KisBpmAssignmentCtrl = [ '$scope', '$modal', function($scope, $modal) {

    // Config for the modal window
    var opts = {
        template:  '/static/activiti/editor-app/configuration/properties/assignment-popup.html?version=' + Date.now(),
        scope: $scope
    };

    // Open the dialog
    $modal(opts);
}];
var selectIds = [];
var KisBpmAssignmentPopupCtrl = [ '$scope', function($scope) {

    // Put json representing assignment on scope
    if ($scope.property.value !== undefined && $scope.property.value !== null
        && $scope.property.value.assignment !== undefined
        && $scope.property.value.assignment !== null)
    {
        $scope.assignment = $scope.property.value.assignment;
    } else {
        $scope.assignment = {};
    }

    if ($scope.assignment.candidateUsers == undefined || $scope.assignment.candidateUsers.length == 0)
    {
    	//$scope.assignment.candidateUsers = [{value: ''}];
		$scope.assignment.candidateUsers = [{value: '', name: ''}];
    }

    // Click handler for + button after enum value
    var userValueIndex = 1;
    $scope.addCandidateUserValue = function(index) {
        $scope.assignment.candidateUsers.splice(index + 1, 0, {value: 'value ' + userValueIndex++});
    };

    // Click handler for -       button after enum value
    $scope.removeCandidateUserValue = function(index) {
        $scope.assignment.candidateUsers.splice(index, 1);
    };

    if ($scope.assignment.candidateGroups == undefined || $scope.assignment.candidateGroups.length == 0)
    {
    	//$scope.assignment.candidateGroups = [{value: ''}];
		$scope.assignment.candidateGroups = [{value: '', name: ''}];
	}

    var groupValueIndex = 1;
    $scope.addCandidateGroupValue = function(index) {
        $scope.assignment.candidateGroups.splice(index + 1, 0, {value: 'value ' + groupValueIndex++});
    };

    // Click handler for - button after enum value
    $scope.removeCandidateGroupValue = function(index) {
        $scope.assignment.candidateGroups.splice(index, 1);
    };

    $scope.save = function() {
        $scope.property.value = {};
        handleAssignmentInput($scope);
        $scope.property.value.assignment = $scope.assignment;
		console.log($scope.property.value.assignment)
        $scope.updatePropertyInModel($scope.property);
        $scope.close();
    };

    // Close button handler
    $scope.close = function() {
    	handleAssignmentInput($scope);
    	$scope.property.mode = 'read';
    	$scope.$hide();
    };

	$scope.assignChagn = function($this){
		$scope.assignment.assignee = $this;
	}

	// 选择代理人
	$scope.selctAssignment = function(){
		var _table = document.createElement("table");
		_table.setAttribute("data-toggle","table");
		_table.setAttribute("id","tableAssign");
		dialog({
			search:function(){
				jQuery("#tableAssign").bootstrapTable('refresh');
			},
			confirm: function(){
				var trs = jQuery("#selectAssign").find("tbody tr");
				var username,usercode;
				for(var i=0; i<trs.length; i++){
					var _tr = trs[i];
					if(jQuery(_tr).find("input[type='radio']").is(":checked")){
						var td = jQuery(_tr).find("td")
						usercode = td.eq(1).text();
						username = td.eq(-1).text();
					}
				}
				$scope.assignment.assignee = usercode;
				$scope.assignment.assigneeName = username;
				$scope.$apply();
			},
			table: _table,
		});
		searchUser({
			id: "tableAssign",
			field:	[
				{
					title: '选择',
					field: 'radio',
					align: 'center',
					valign: 'middle',
					radio : true
				},
				{
					title: '编号',
					field: 'usercode',
					align: 'center',
					valign: 'middle'
				},
				{
					title: '姓名',
					field: 'username',
					align: 'center',
					valign: 'middle'
				},
			]
		});
	}

	// 选择候选人
	$scope.selctCandidateUser =  function(){
		var _table = document.createElement("table");
		_table.setAttribute("data-toggle","table");
		_table.setAttribute("id","tableCandidateUser");
		dialog({
			search:function(){
				jQuery("#tableCandidateUser").bootstrapTable('refresh');
			},
			confirm: function(){
				var users = [];
				for(var i=0; i<selectIds.length; i++){
					var userObject = {};
					userObject["value"] = selectIds[i].usercode;
					userObject["name"] = selectIds[i].username;
					users.push(userObject);
				}
				$scope.assignment.candidateUsers = users;
				$scope.$apply();
			},
			table: _table,
		});
		searchUser({
			id: "tableCandidateUser",
			field:	[
				{
					title: '选择',
					field: 'checkStatus',
					align: 'center',
					valign: 'middle',
					checkbox : true
				},
				{
					title: '编号',
					field: 'usercode',
					align: 'center',
					valign: 'middle'
				},
				{
					title: '姓名',
					field: 'username',
					align: 'center',
					valign: 'middle'
				},
			]
		});
	}

    var handleAssignmentInput = function($scope) {
    	if ($scope.assignment.candidateUsers)
    	{
	    	var emptyUsers = true;
	    	var toRemoveIndexes = [];
	        for (var i = 0; i < $scope.assignment.candidateUsers.length; i++)
	        {
	        	if ($scope.assignment.candidateUsers[i].value != '')
	        	{
	        		emptyUsers = false;
	        	}
	        	else
	        	{
	        		toRemoveIndexes[toRemoveIndexes.length] = i;
	        	}
	        }

	        for (var i = 0; i < toRemoveIndexes.length; i++)
	        {
	        	$scope.assignment.candidateUsers.splice(toRemoveIndexes[i], 1);
	        }

	        if (emptyUsers)
	        {
	        	$scope.assignment.candidateUsers = undefined;
	        }
    	}

    	if ($scope.assignment.candidateGroups)
    	{
	        var emptyGroups = true;
	        var toRemoveIndexes = [];
	        for (var i = 0; i < $scope.assignment.candidateGroups.length; i++)
	        {
	        	if ($scope.assignment.candidateGroups[i].value != '')
	        	{
	        		emptyGroups = false;
	        	}
	        	else
	        	{
	        		toRemoveIndexes[toRemoveIndexes.length] = i;
	        	}
	        }

	        for (var i = 0; i < toRemoveIndexes.length; i++)
	        {
	        	$scope.assignment.candidateGroups.splice(toRemoveIndexes[i], 1);
	        }

	        if (emptyGroups)
	        {
	        	$scope.assignment.candidateGroups = undefined;
	        }
    	}
    };

	var searchUser = function(option){
		var $table = jQuery("#"+option.id);
		$table.bootstrapTable({
			url: "user/getUserPager",
			dataType: "json",
			method: 'get',
			striped: true,
			pageSize: 10,
			clickToSelect:true,     //是否选中
			maintainSelected:true,
			search: false,  //是否启用查询
			pageNumber:1, //当前第几页
			pageList: [10, 25, 50, 100],
			queryParamsType : "undefined",
			idField:"usercode",
			responseHandler:responseHandler,
			queryParams: function queryParams(params) {
				var param = {
					pageNo: params.pageNumber,
					pageSize: params.pageSize,
					token: getParam().token,
					username: jQuery("#userName").val()
				};
				return param;
			},
			pagination: true, //分页
			singleSelect: false,
			search: false, //显示搜索框
			sidePagination: "server", //服务端处理分页
			onCheck: function (arg1,arg2) {
				console.log(arg1);
			},
			onLoadSuccess: function(data){
				console.log(data);
			},
			columns: option.field
		});

		$table.on('check.bs.table check-all.bs.table uncheck.bs.table uncheck-all.bs.table', function (e, rows) {
			var jsonArray = jQuery.map(!jQuery.isArray(rows) ? [rows] : rows, function (row) {
				var json = {};
				json['usercode'] = row.usercode;
				json['username'] = row.username;
				return json;
			});
			func = jQuery.inArray(e.type, ['check', 'check-all']) > -1 ? 'union' : 'difference';
			selectIds = _[func](selectIds, jsonArray);
			console.log(selectIds);
		});
	}

	var dialog = function(option){
		var _dialog = document.createElement("div");
		_dialog.setAttribute("class","modal ng-scope top am-fade");
		_dialog.setAttribute("id","selectAssign");
		_dialog.setAttribute("style","display: block;");
		var _dialogRoot = document.createElement("div");
		_dialogRoot.setAttribute("class","modal-dialog");
		var _dialogContext = document.createElement("div");
		_dialogContext.setAttribute("class","modal-content");
		var _head = document.createElement("div");
		_head.setAttribute("class","modal-header");
		var _close = document.createElement("button");
		_close.setAttribute("type","button");
		_close.setAttribute("class","close");
		_close.setAttribute("id","close");
		_close.setAttribute("data-dismiss","modal");
		_close.setAttribute("aria-hidden","true");
		_close.addEventListener("click",function(){
			jQuery("#selectAssign").remove();
		})
		var _h2 = document.createElement("h2");
		_h2.appendChild(document.createTextNode("人员列表"));
		_head.appendChild(_close);
		_head.appendChild(_h2);
		var _body = document.createElement("div");
		_body.setAttribute("class","modal-body");
		var _search = document.createElement("div");
		_search.setAttribute("style","height:50px;font-size:20px;")
		var _searchUserName = document.createElement("input");
		_searchUserName.setAttribute("style","width:70%;height:40px;");
		_searchUserName.setAttribute("id","userName");
		_searchUserName.setAttribute("class","form-control");
		var _searchButton = document.createElement("button");
		_searchButton.appendChild(document.createTextNode("查询"));
		_searchButton.setAttribute("class","btn")
		_searchButton.addEventListener("click",function(){
			if(typeof option.search === "function"){
				option.search();
			}
		})
		var _labelUserName = document.createElement("label");
		_labelUserName.appendChild(document.createTextNode("姓名："))
		_search.appendChild(_labelUserName);
		_search.appendChild(_searchUserName);
		_search.appendChild(_searchButton);
		_body.appendChild(_search);
		_body.appendChild(option.table);
		var _footer = document.createElement("div");
		_footer.setAttribute("class","modal-footer");
		var _cancel = document.createElement("button");
		_cancel.setAttribute("class","btn btn-primary ng-scope");
		_cancel.appendChild(document.createTextNode("取消"));
		_cancel.addEventListener("click",function(){
			jQuery("#selectAssign").remove();
		});
		_footer.appendChild(_cancel);
		var _confirm = document.createElement("button");
		_confirm.setAttribute("class","btn btn-primary ng-scope");
		_confirm.appendChild(document.createTextNode("确认"));
		_confirm.addEventListener("click",function(){
			if(typeof option.confirm === "function"){
				option.confirm();
			}
			jQuery("#selectAssign").remove();
		})
		_footer.appendChild(_confirm);
		var _elementRoot = document.body.appendChild(_dialog).appendChild(_dialogRoot).appendChild(_dialogContext);
		_elementRoot.appendChild(_head);
		_elementRoot.appendChild(_body);
		_elementRoot.appendChild(_footer);
	}

	var union = function(array,jsonArray){
		jQuery.each(jsonArray, function (i, json) {
			array.push(json);
		});
		return array;
	};


	var difference = function(array,jsonArray){
		jQuery.each(jsonArray, function (i, json) {
			console.log(json)
			//var index = jQuery.inArray(json,array);
			var usercode = json.usercode;
			for(var j=0;j<array.length;j++){
				if(usercode == array[j].usercode){
					array.splice(j, 1);
				}
			}
		});
		return array;
	};

	function responseHandler(res) {
		jQuery.each(res.rows, function (i, row) {
			var usercode = row.usercode;
			for(var j=0;j<selectIds.length;j++){
				if(usercode == selectIds[j].usercode){
					row.checkStatus = true;
				}
			}
		});
		return res;
	}

	var _ = {"union":union,"difference":difference};

	/**
	 * 获取地址栏参数
	 * @returns {Array}
	 */
	var getParam = function () {
		var url = window.location.href;
		var cs = decodeURIComponent(url).split("?");
		var cs3 = new Array();
		if (cs.length > 1) {
			var cs2 = cs[1].split("&");
			for (var i = 0; i < cs2.length; i++) {
				cs3[i] = cs2[i].split("=");
			}
		}
		return paramJson(cs3);
	}

	/**
	 * 参数转换json
	 * @param param
	 * @returns {*}
	 */
	var paramJson = function(param) {
		var str = {};
		for ( var i = 0; i < param.length; i++) {
			var params = param[i];
			str[params[0]] = params[1];
		}
		return str;
	}

}];
