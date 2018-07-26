var obj, obj2,obj3;
// 初始化时间
var now = new Date();
var nowYear = now.getFullYear();
var nowMonth = now.getMonth() + 1;
var nowDate = now.getDate();
var yearData = function (callback) {
    callback(jsFun.formatYear(nowYear))
};
var monthData = function (year, callback) {
    callback(jsFun.formatMonth());
};
var dateData = function (year, month, callback) {
    if (/^1|3|5|7|8|10|12$/.test(month)) {
        callback(jsFun.formatDate(31));
    }
    else if (/^4|6|9|11$/.test(month)) {
        callback(jsFun.formatDate(30));
    }
    else if (/^2$/.test(month)) {
        if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
            callback(jsFun.formatDate(29));
        }
        else {
            callback(jsFun.formatDate(28));
        }
    }
    else {
        throw new Error('month is illegal');
    }
};
var httpUrl = "http://192.168.0.100:8091/";
var jsFun = {
    ajax: function (params) {
        var param = params.data ? params.data : "";
        $.ajax({
            url: httpUrl + params.url,
            type: params.type ? params.type : "post",
            async: params.async == false ? params.async : true,
            data: params.data,
            beforeSend: function () {
                if (params.loading) {
                    jsFun.loading();
                }
                if (params.appLoading) {
                    jsFun.appLoading();
                }
            },
            success: function (data) {
                if (data && typeof data != "object") {
                    data = eval("(" + data + ")");
                }
                if (params.formId) {
                    // 如果想直接赋值的话 请把json对象放到modelkey下面
                    var inputs = $("#" + params.formId).find("input[type='text'],input[type='date'],input[type='password'],input[type='hidden']");
                    var textAreas = $("#" + params.formId).find("textarea");
                    var selects = $("#" + params.formId).find("select");
                    var ps = $("#" + params.formId).find("span");
                    for (var item in data.model) {
                        for (var i = 0; i < inputs.length; i++) {
                            var inputId = $(inputs[i]).attr("id");
                            if (item == inputId) {
                                $("#" + inputId).val(data.model[item]);
                            }
                        }
                        for (var i = 0; i < textAreas.length; i++) {
                            var textAreaId = $(textAreas[i]).attr("id");
                            if (item == textAreaId) {
                                $("#" + textAreaId).val(data.model[item]);
                            }
                        }
                        for (var i = 0; i < selects.length; i++) {
                            var selectId = $(selects[i]).attr("id");
                            if (item == selectId) {
                                $(selects[i]).find("option[value='" + data.model[item] + "']").attr("selected", true);
                            }
                        }
                        for (var i = 0; i < ps.length; i++) {
                            var p = $(ps[i]).attr("id");
                            if (item == p) {
                                $(ps[i]).text(data.model[item]);
                                $(ps[i]).css("color","#000");
                            }
                        }
                    }
                }
                // 执行回调函数
                if (data.errorMessage) {
                    var msg = data.errorMessage;
                    console.error(msg);
                    if (typeof params.infoMessage === "function") {
                        params.infoMessage(msg);
                    }
                } else {
                    if (typeof params.success === "function") {
                        params.success(data);
                    }
                }
            },
            complete: function () {
                if (params.loading) {
                    setTimeout("jsFun.removeLoading()", 600);
                }
                if (params.appLoading) {
                    setTimeout("jsFun.removeAppLogind()", 600);
                }
                if (params.scroll) {
                    $('html,body').animate({qqi: 0}, 1000)
                }
                if (typeof params.complete === "function") {
                    params.complete();
                }
            },
            error: function (data) {
                console.error(data);
                //if(data.status == "500"){
                //    location.href = httpUrl+"error/500.html"
                //}
                //if(data.status == "404"){
                //    location.href = httpUrl+"error/404.html"
                //}
            }
        })
    },

    loadData: function (params) {
        if (params.tableId) {
            var tableTbody = $("#" + params.tableId + " tbody");
            tableTbody.find("tr").remove();
            var tableThead = $("#" + params.tableId + " thead");
            var theadTh = tableThead.find("th");
            var str = "";
            for (var j = 0; j < params.rows.length; j++) {
                str += "<tr class='alt'>";
                for (var i = 0; i < theadTh.length; i++) {

                    var filed = theadTh.eq(i).attr("filed");
                    if (filed == 'serialNumber') {
                        str += "<td>";
                        str += j + 1;
                        str += "</td>";
                    }
                    for (var item in params.rows[j]) {
                        if (item == filed) {
                            if (typeof params.formatters === "function") {
                                str += "<td><div style='overflow: hidden;display: -webkit-box;-webkit-line-clamp:1;-webkit-box-orient: vertical;word-break: break-all;word-wrap: break-word;text-overflow:ellipsis;'>";
                                str += params.formatters(params.rows[j][item], params.rows[j], item);
                                str += "</div></td>";
                            } else {
                                str += "<td>" + params.rows[j][item] + "</td>";
                            }
                        }
                    }
                    if (filed == "checkbox") {
                        str += "<td ><div style='text-align: center'><input type='checkbox' onclick='jsFun.simpleClickCheckBox(this)'/></div></td>";
                    }
                    if (filed == "radio") {
                        str += "<td ><div style='text-align: center'><input type='radio' name='table-radio' /></div></td>";
                    }
                    if (filed == "operation") {
                        str += "<td>";
                        if (typeof params.formatters === "function") {
                            str += params.formatters(j, params.rows[j], "operation");
                        }
                        str += "</td>";
                    }
                }
                str += "</tr>";
            }
            $("#" + params.tableId).append(str);
        }
    },

    search: function (params) {
        params.data['pageNo'] = params.data['pageNo'] ? params.data['pageNo'] : 1;
        params.data['pageSize'] = params.data['pageSize'] ? params.data['pageSize'] : 10;
        jsFun.ajax({
            url: params.url,
            loading: params.loading,
            data: params.data,
            type: params.type,
            success: function (data) {
                console.log(data);
                params['rows'] = data.resultList ? data.resultList : data.model;
                console.log(params)
                jsFun.loadData(params);
                if (params.pager) {
                    params['model'] = data.model;
                    jsFun.loadPage(params);
                }
                if (typeof params.onLoadSuccess === "function") {
                    params.onLoadSuccess(data);
                }
            },
            infoMessage: function () {
                var tableTbody = $("#" + params.tableId + " tbody");
                tableTbody.find("tr").remove();
                jsFun.loadPage(params)
            }
        })
    },

    loadPage: function (data) {
        var result = data.model;
        var pageId = data['pageId'] ? data['pageId'] : 'page';
        jsFun.markPage({
            pageId: pageId,
            data: result,
            onLoadSuccess: function (pageNumber) {
                data.data['pageNo'] = pageNumber;
                jsFun.search(data)
            }
        });
    },

    /**
     * 画分页
     */
    markPage: function (params) {
        var page = $("#" + params.pageId);
        page.find("div").remove();
        page.find("input").remove();
        page.append("<div class='sit_pagbd' ></div>");
        var pagbd = page.find(".sit_pagbd");
        var data = params.data;
        if (!data) {
            console.error("加载分页错误，没有数据，无法计算。")
            return;
        }
        if (!data.count || !data.pageSize) {
            console.error("数据总数和要分的页数为必传参数。");
            return;
        }
        var pageNo = data.pageNo ? data.pageNo : 1;
        var totalPage = jsFun.getTotalPage(data.count, data.pageSize);
        if (pageNo == "1") {
            $("<a href='javascript:;' class='sit_last' style='border: none;'>上一页</a>").appendTo(pagbd);
        } else {
            $("<a href='javascript:;' class='sit_last' style='border: none;'>上一页</a>").bind("click", {pageNumber: pageNo - 1}, function (event) {
                var pageNumber = event.data['pageNumber'];
                if (typeof params.onLoadSuccess === "function") {
                    params.onLoadSuccess(pageNumber);
                }
            }).appendTo(pagbd);
        }
        var pageNum = 1;
        var min = 4;
        if (pageNo >= 4) {
            pageNum = pageNo - 3;
            min = pageNo + 1;
        }
        for (var i = pageNum; i <= totalPage; i++) {
            if (i == pageNo) {
                $("<a href='javascript:;' class='sit_num sit_num_color'>" + i + "</a>").appendTo(pagbd);
            } else {
                if (i <= min) {
                    $("<a href='javascript:;' class='sit_num'>" + i + "</a>").bind("click", {pageNumber: i}, function (event) {
                        var pageNumber = event.data['pageNumber'];
                        if (typeof params.onLoadSuccess === "function") {
                            params.onLoadSuccess(pageNumber);
                        }
                    }).appendTo(pagbd);
                } else {
                    break;
                }
            }
        }
        var flag = false;
        if (totalPage > 4 && pageNo < totalPage) {
            flag = true;
            $("<div class='sit_omit'> <span>...</span></div>").appendTo(page);
        }
        var nextPageElement = "";
        var appendElement = "";
        if (flag) {
            nextPageElement = "<div class='sit_pagbd'><a href='javascript:;' style='border:none;' class='sit_next'>下一页</a></div>";
            appendElement = page;
        } else {
            nextPageElement = "<a href='javascript:;' class='sit_next'>下一页</a>";
            appendElement = pagbd;
        }
        if (pageNo == totalPage) {
            $(nextPageElement).appendTo(appendElement);
        } else {
            $(nextPageElement).bind("click", {pageNumber: pageNo + 1}, function (event) {
                var pageNumber = event.data['pageNumber'];
                if (typeof params.onLoadSuccess === "function") {
                    params.onLoadSuccess(pageNumber);
                }
            }).appendTo(appendElement);
        }
        page.append("<div class='sit_txt'><span>共" + totalPage + "页，到第</span></div><div class='sit_pagbd' id='inPage'>");
        page.append("</div><div class='sit_txt'><span>页</span></div>");
        var inPage = page.find("#inPage");
        $("<input type='text' value='" + pageNo + "' />").bind("keydown", {total: totalPage}, function (event) {
            if (event.keyCode == 13) {
                if (typeof params.onLoadSuccess === "function") {
                    var pageNumber = $(this).val();
                    var total = event.data['total'];
                    pageNumber = !isNaN(pageNumber) && pageNumber > 0 && pageNumber <= total ? pageNumber : 1;
                    params.onLoadSuccess(pageNumber);
                }
            }
        }).appendTo(inPage);

    },

    /**
     * 获取总页数
     */
    getTotalPage: function (count, pageSize) {
        if (count % pageSize == 0) {
            return count / pageSize;
        } else {
            return Math.ceil(count / pageSize);
        }
    },

    setCookie: function (params) {
        if (params.data) {
            var Days = 1;
            var exp = new Date();
            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
            var url = "";
            for (var item in params.data) {
                var str = item + "=" + escape(params.data[item]) + ";expires=" + exp.toGMTString();
                str += "; path=/";//红色标记必须加上(之前漏写就出现了问题)
                document.cookie = str;
            }
        }
        if (params.url) {
            location.href = httpUrl + params.url; //接收页面.
        }
    },

    getCookie: function (key) {
        var arr = document.cookie.match(new RegExp("(^| )" + key + "=([^;]*)(;|$)"));
        if (arr != null) return unescape(arr[2]);
        return null;
    },

    loading: function () {
        var body = $("body");
        var w = document.documentElement.clientWidth;
        var h = document.documentElement.clientHeight;
        body.prepend("<div class='loading'><img src='/images/loading(190kb).gif' /></div><div class='mask'></div>");
        body.find(".loading").css({"left": (w / 2 - 150)});
        body.find(".loading").css({"top": (h / 2 - 150)}, 1000);
    },

    removeLoading: function () {
        var body = $("body");
        if (body.find(".loading").is(":visible")) {
            body.find(".loading").remove();
            body.find(".mask").remove();
        }
    },

    appLoading: function () {
        var body = $("body");
        var str = "<div class='det_anibox'>";
        str += "<div class='spinner det_lod_ani'>";
        str += "<div class='rect1'></div>";
        str += "<div class='rect2'></div>";
        str += "<div class='rect3'></div>";
        str += "<div class='rect4'></div>";
        str += "<div class='rect5'></div>";
        str += "</div>";
        str += "</div>";
        body.prepend(str);
    },

    removeAppLogind: function () {
        var body = $("body");
        if (body.find(".det_anibox").is(":visible")) {
            body.find(".det_anibox").remove();
        }
    },

    /**
     * 上传文件
     * @param params
     */
    uploadFile: function (params) {
        Qiniu.uploader({
            runtimes: 'html5,flash,html4',
            browse_button: params.buttonId,
            uptoken_url: httpUrl + params.tokenUrl,
            unique_names: true,
            save_key: true,
            domain: 'http://qiniu-plupload.qiniudn.com/',
            get_new_uptoken: false,
            container: params.container,
            max_file_size: params.fileSize ? params.fileSize + "mb" : "100mb",
            max_retries: params.reloadSize ? params.reloadSize : "1",
            dragdrop: true,
            drop_element: params.container,
            chunk_size: '1000mb',
            auto_start: true,
            init: {
                'FilesAdded': function(up, files) {
                    plupload.each(files, function(file) {
                        if (params.loading) {
                            jsFun.loading()
                        }
                        if (params.appLoading) {
                            jsFun.appLoading();
                        }
                        if (typeof params.filesAdded === "function") {
                            // 列队
                            params.filesAdded(up, files);
                        }
                    });
                },
                'BeforeUpload': function (up, file) {
                    // 每个文件上传前,处理相关的事情
                    if (typeof params.BeforeUpload === "function") {
                        params.BeforeUpload(up, file);
                    }

                },
                'UploadProgress': function (up, file) {
                    // 每个文件上传时,处理相关的事情
                    if (typeof params.UploadProgress === "function") {
                        params.UploadProgress(up, file);
                    }
                },
                'FileUploaded': function (up, file, info) {
                    if (typeof params.success === "function") {
                        params.success(info, up, file);
                    }
                },
                'Error': function (up, err, errTip) {
                    console.error(err);
                },
                'UploadComplete': function() {
                    if(params.loading){
                        setTimeout("jsFun.removeLoading()",600);
                    }
                    if(params.appLoading){
                        setTimeout("jsFun.removeAppLogind()",600);
                    }
                    if(typeof params.UploadComplete === "function"){
                        params.UploadComplete();
                    }
                },
                'Key': function (up, file) {
                    if (typeof params.Key === "function") {
                        params.Key(up, file);
                    }
                }
            }
        });
    },

    alert: function (msg) {
        //params.alert = true;
        //jsFun.confirm(params);
        var html = [];
        html.push("<div class='hint'>");
        html.push("<div class='hintTop'></div>");
        html.push("<p class='hintBot'>"+msg+"</p>");
        html.push("</div>");
        $("body").prepend(html.join(""));
        $(".hint").show("fast",function(){
            setTimeout("jsFun.removeHint()",2500);
        });
    },

    removeHint : function(){
        $('.hint').fadeOut("600",function(){
            this.remove();
        })
    },

    confirm: function (params) {
        var body = $("body");
        //var flag = false;
        //var str = "<div class='cd-popup'>";
        //str += "<div class='cd-popup-container' id='popup-container'>";
        //str += "<p>" + params.message + "</p>";
        //str += "<ul class='cd-buttons' id='buttons'>";
        //if (params.alert) {
        //    str += "<li ><a href='javascript:;' id='yes' >确认</a></li>";
        //} else {
        //    str += "<li ><a href='javascript:;' id='yes' >确认</a></li>";
        //}
        //if (!params.alert) {
        //    str += "<li ><a href='javascript:;' onclick='jsFun.confirmClose()'>取消</a></li>";
        //} else {
        //    str += "<li></li>";
        //}
        //str += "</ul>";
        ////str += "<a href='javascript:;' onclick='jsFun.confirmClose()' class='cd-popup-close img-replace'></a>"
        //str += "</div>";
        //str += "</div>";
        //body.prepend(str);
        //var w = document.documentElement.clientWidth;
        //var h = document.documentElement.clientHeight;
        //$(".cd-popup-container").css({'left': (w / 2) - 100});
        //$(".cd-popup-container").animate({'top': (h / 2) - ($(".cd-popup-container").height() / 2)}, 500);
        //$("#yes").click(function () {
        //    if (typeof params.success === "function") {
        //        params.success();
        //    }
        //    jsFun.confirmClose();
        //})


        var html = []
        html.push("<section class='checkdecue'>");
        html.push("<div class='checkBox'>");
        html.push("<p class='tip'>"+params.msg+"</p>");
        html.push("<p class='yes' id='yes'>确定</p>");
        html.push("<p class='no' onclick='jsFun.confirmClose()'>取消</p>");
        html.push("</div>")
        html.push("<div class='mask'></div>");
        html.push("</section>");
        body.append(html.join(""));
        $("#yes").click(function(){
            if(typeof params.success === "function"){
                params.success();
            }
            jsFun.confirmClose();
        });
    },


    confirmClose: function () {
        $(".checkdecue").remove();
    },

    formReload: function (params) {
        if (params.formId) {
            var inputs = $("#" + params.formId).find("input");
            var textareas = $("#" + params.formId).find("textarea");
            for (var i = 0; i < inputs.length; i++) {
                $(inputs[i]).val("");
            }
            for (var j = 0; j < textareas.length; j++) {
                $(textareas[j]).val("");
            }
            if (inputs.length > 0 || textareas.length > 0) {
                var input = inputs.length > 0 ? $(inputs[0]) : $(textareas[0]);
                var h = input.offset().top - 125;
                $('html,body').animate({scrollTop: h}, 1000);
                input.select();
            }
            if (typeof params.success === "function") {
                params.success();
            }
        }
    },

    replaceWrap: function (str) {
        if (!str) {
            return;
        }
        str = str.replace(/\ +/g, ""); //去掉空格
        str = str.replace(/[ ]/g, "");    //去掉空格
        str = str.replace(/[\r\n]/g, ""); //去掉回车换行
        return str;
    },

    replaceHtml: function (str) {
        if (!str) {
            return;
        }
        str = str.replace(/(\n)/g, "")
        str = str.replace(/(\n)/g, "");
        str = str.replace(/(\t)/g, "");
        str = str.replace(/(\r)/g, "");
        str = str.replace(/<\/?[^>]*>/g, "");
        str = str.replace(/\s*/g, "");
        str = str.replace(/&nbsp;/g, '');
        str = str.replace(/&NBSP;/g, '');
        return str;
    },

    /**
     * 获取地址栏参数
     * @returns {Array}
     */
    getParam: function () {
        var url = window.location.href;
        var cs = decodeURIComponent(url).split("?");
        var cs3 = new Array();
        if (cs.length > 1) {
            var cs2 = cs[1].split("&");
            for (var i = 0; i < cs2.length; i++) {
                cs3[i] = cs2[i].split("=");
            }
        }
        return jsFun.paramJson(cs3);
    },

    /**
     * 参数转换json
     * @param param
     * @returns {*}
     */
    paramJson : function(param) {
        var str = {};
        for ( var i = 0; i < param.length; i++) {
            var params = param[i];
            str[params[0]] = params[1];
        }
        return str;
    },

    clickCheckBox: function ($this) {
        if ($($this).is(':checked') == true) {
            $($this).parent().parent().parent().parent().children("tbody")
                .find("input[type='checkbox']").attr("checked", true);
        } else {
            $($this).parent().parent().parent().parent().children("tbody")
                .find("input[type='checkbox']").attr("checked", false);
        }
    },
    simpleClickCheckBox: function ($this) {
        if ($($this).is(':checked') == true) {
            $($this).attr("checked", true);
        } else {
            $($this).attr("checked", false);
        }
    },
    sort: function (params) {
        if (obj && obj != params.this) {
            $(obj).attr("class", "");
            $(obj).addClass("sorting");
        }
        var $this = $(params.this);
        var cls = $this.attr("class");
        var sort = $this.attr("sort");
        $this.attr("class", "");
        if (cls == "sorting") {
            $this.addClass("sorting_asc");
            if (typeof params.onLoadSuccess === "function") {
                params.onLoadSuccess({
                    sortName: sort,
                    sortType: "asc",
                });
            }
        } else if (cls == "sorting_asc") {
            $this.addClass("sorting_desc");
            if (typeof params.onLoadSuccess === "function") {
                params.onLoadSuccess({
                    sortName: sort,
                    sortType: "desc",
                });
            }
        } else if (cls == "sorting_desc") {
            $this.addClass("sorting_asc");
            if (typeof params.onLoadSuccess === "function") {
                params.onLoadSuccess({
                    sortName: sort,
                    sortType: "asc",
                });
            }
        }
        obj = params.this;
    },

    formEdit: function (params) {
        if (params.formId) {
            var ps = $("#" + params.formId).find("span");
            for (var i = 0; i < ps.length; i++) {
                var p = $(ps[i]);
                var id = p.attr("id");
                var text = p.text()=="未填写"?"":p.text();
                p.text("");
                p.removeAttr("id");
                var str = p.parent().parent().find("h3").text().replace("*", "");
                p.append("<input type='text' id='" + id + "' value='" + text + "'  placeholder='请输入" + str + "' />");
                if (typeof params.success === "function") {
                    params.success(id, p, text);
                }
            }
        }
    },

    // 数据初始化
    formatYear: function (nowYear) {
        var arr = [];
        for (var i = nowYear - 40; i <= nowYear + 5; i++) {
            arr.push({
                id: i + '',
                value: i + '年'
            });
        }
        return arr;
    },

    formatMonth: function () {
        var arr = [];
        for (var i = 1; i <= 12; i++) {
            arr.push({
                id: i + '',
                value: i + '月'
            });
        }
        return arr;
    },

    formatDate: function (count) {
        var arr = [];
        for (var i = 1; i <= count; i++) {
            arr.push({
                id: i + '',
                value: i + '日'
            });
        }
        return arr;
    },

    selectDate: function (_this,callback) {
        //解决iphone6s适配问题
        document.body.style.position='static';
        document.body.ontouchmove=function (e) {
            e.preventDefault();
        }
        var now = new Date();
        var nowYear = now.getFullYear();
        var nowMonth = now.getMonth() + 1;
        var nowDate = now.getDate();
        var oneLevelId = $(_this).attr('data-year')?$(_this).attr('data-year'):nowYear;
        var twoLevelId = $(_this).attr('data-month')?$(_this).attr('data-month'):nowMonth;
        var threeLevelId = $(_this).attr('data-date')?$(_this).attr('data-date'):nowDate;
        var iosSelect = new IosSelect(3, [yearData, monthData, dateData],
            {
                title: ' ',
                itemHeight: 35,
                oneLevelId: oneLevelId,
                twoLevelId: twoLevelId,
                threeLevelId: threeLevelId,
                callback: function (selectOneObj, selectTwoObj, selectThreeObj) {
                    $(_this).attr('data-year', selectOneObj.id);
                    $(_this).attr('data-month', selectTwoObj.id);
                    $(_this).attr('data-date', selectThreeObj.id);
                    var m = new Number(selectTwoObj.id) >= 10?selectTwoObj.id:"0"+selectTwoObj.id;
                    var d = new Number(selectThreeObj.id) >=10?selectThreeObj.id:"0"+selectThreeObj.id;
                    var showDate = selectOneObj.id + '-' + m + '-' + d;
                    $(_this).find("input[type='hidden']").val(showDate);
                    $(_this).find("span").eq(-1).text(showDate);
                    $(_this).find("span").eq(-1).css("color","#000");
                    if(typeof callback === "function"){
                        callback();
                    }
                }
            });
    },

    // 下拉菜单
    select: function (params) {
        //解决iphone6s适配问题
        document.body.style.position='static';
        document.body.ontouchmove=function (e) {
            e.preventDefault();
        }
        var _this = $(params._this);
        var data = params.data;
        var id = _this.attr("code")?_this.attr("code"):params.data[0].id;
        var customerSelect = new IosSelect(1,
            [data],
            {
                title: ' ',
                itemHeight: 50,
                itemShowCount: 3,
                oneLevelId: id,
                callback: function (selectOneObj) {
                    _this.attr("code",selectOneObj.id);
                    _this.find("input[type='hidden']").val(selectOneObj.id);
                    _this.find("span").eq(-1).text(selectOneObj.value);
                    _this.find("span").eq(-1).css("color","#000");
                    if(typeof params.confirm === "function"){
                        params.confirm();
                    }
                }
            });
    },

    radio: function (_this) {
        if ($(_this).attr("radio")) {
            if (!obj2 || obj2 != _this) {
                $(obj2).attr("checked", false);
            }
        }
        obj2 = _this;
    },

    removeCookie : function(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval=jsFun.getCookie(name);
        if(cval!=null){
            document.cookie= name + "="+cval+";expires="+exp.toGMTString()+"; path=/";
        }
    },

    loadcss: function(path) {
        if (!path || path.length === 0) {
            throw new Error('css path argument error!');
        }
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.href = path;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        head.appendChild(link);
    },

    loadjs: function(path) {
        if (!path || path.length === 0) {
            throw new Error('js path argument error!');
        }
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.src = path;
        script.type = 'text/javascript';
        head.appendChild(script);
    },

    setForm: function(params){
        if(params.formId){
            var els = $("#"+params.formId).find("p,span,input,textarea");
            var elements = params.element;
            if(elements){
                var pArray;
                for(var i= 0, len=elements.length;i<len;i++){
                    pArray = [];
                    var elem = elements[i];
                    var parentId =elem.parentId;
                    var child = elem.child;
                    if(parentId && child) {
                        var ps = $("#" + params.formId + " #" + parentId).find(child);
                        for (var j = 0, leg = ps.length; j < leg; j++) {
                            var p = $(ps[j]);
                            var classed = p.attr("class");
                            if (classed) {
                                pArray.push("<" + child + " class='" + classed + "'>");
                            } else {
                                pArray.push("<" + child + ">");
                            }
                            pArray.push(p.html());
                            pArray.push("</" + child + ">");
                        }
                        sessionStorage.setItem(parentId, pArray.join(""));
                    }
                }
            }
            for(var i= 0, len=els.length; i<len; i++){
                var el = els[i];
                var id = $(el).attr("id");
                var v = $(el).is("input") || $(el).is("textarea")?$(el).val() : $(el).text();
                if(id && v && !$(el).is("input[type='file']")){
                    sessionStorage.setItem(id,v);
                }
                var checkbox = $(el).is("input[type='checkbox']");
                if(checkbox){
                    var checked = $(el).attr("checked");
                    if(checked){
                        sessionStorage.setItem(id,true);
                    }else{
                        sessionStorage.setItem(id,false);
                    }
                }
            }
        }
    },

    getForm: function(params){
        if(params.formId){
            var els = $("#"+params.formId).find("p,span,input,textarea");
            for(var i= 0, len=els.length; i<len; i++){
                var el = els[i];
                var id = $(el).attr("id");
                var val = sessionStorage.getItem(id);
                if(val && !$(el).is("input[type='file']")){
                    var checkbox = $(el).is("input[type='checkbox']");
                    if(checkbox && val == "true"){
                        $(el).attr("checked",true);
                    }else{
                        $(el).val(val);
                        $(el).text(val);
                    }
                    sessionStorage.removeItem(id);
                }
                var hideVal = $(el).is("input[type='hidden']")?$(el).val():"";
                if(hideVal){
                    $(el).parent().find("span").css({"color":"#000"});
                }

            }
            var elements = params.element;
            if(elements){
                for(var i= 0, len=elements.length;i<len;i++){
                    var elem = elements[i];
                    var parentId =elem.parentId;
                    if(parentId){
                        var p = sessionStorage.getItem(parentId);
                        $("#"+parentId).append(p);
                        sessionStorage.removeItem(parentId);
                    }
                }
            }
        }
    },

    requiredCheck: function(params){
        if(params.formId){
            var inputs = $("#"+params.formId).find("input,textarea");
            var flag = true;
            for(var i= 0,len=inputs.length; i<len; i++){
                var input = $(inputs[i]);
                var required = input.attr("required");
                if(required){
                    var v = input.is("input") || input.is("textarea")? input.val() : input.text();
                    // var events = jQuery._data($(input[0])[0])["events"]
                    // if(!events || !events["change"]){
                    //     input.bind("change.checkFrom",function(){
                    //         jsFun.requiredCheck(params);
                    //     });
                    // }else{
                    //     var havecheckFrom = false;
                    //     $.each(events["change"], function(index,value){
                    //         if(value.namespace == "checkFrom"){
                    //             havecheckFrom = true;
                    //         }
                    //     })
                    //     if(!havecheckFrom)
                    //         input.bind("change.checkFrom",function(){
                    //             jsFun.requiredCheck(params);
                    //         });
                    // }
                    //
                    // if(!events||!events["keyup"]){
                    //     input.bind("keyup.checkFrom",function(){
                    //         jsFun.requiredCheck(params);
                    //     });
                    // }else{
                    //     var havecheckFrom = false;
                    //     $.each(events["keyup"], function(index,value){
                    //         if(value.namespace == "checkFrom"){
                    //             havecheckFrom = true;
                    //         }
                    //     })
                    //     if(!havecheckFrom)
                    //         input.bind("keyup.checkFrom",function(){
                    //             jsFun.requiredCheck(params);
                    //         });
                    // }
                    if(!v){
                        // if(input.is("textarea")){
                        //     alert(input.prev().text().replace("*", "") + "不能为空");
                        // }else {
                        //     alert(input.parent().prev().text().replace("*", "") + "不能为空");
                        // }
                        jsFun.alert(input.attr("placeholder"));
                        flag = false;
                        return flag;
                    }
                }
            }
            return true;
            // params['flag'] = flag;
            // jsFun.setButtonStyle(params);
        }
    },

    setButtonStyle: function(params){
        var button = $("#"+params.buttonId);
        if(params.flag){
            var events = jQuery._data(button[0])["events"];
            if(!events || !events['click']){
                button.click(function(){
                    if(typeof params.buttonClick === "function"){
                        params.buttonClick();
                    }
                });
            }
            button.removeAttr("style");
        }else{
            button.unbind("click");
            button.css({"color":"#bbd6f9"});
        }
    },

    setFormVal : function(params){
        var data = params.data;
        var formId= params.formId
        if(formId && data){
            var elements = $("#"+formId).find("span,input,textarea")
            for (var item in data) {
                for(var i= 0,len=elements.length; i<len; i++){
                    var element = $(elements[i]);
                    if(item == element.attr("id") && data[item]){
                        element.is("input") || element.is("textarea")?element.val(data[item]):element.text(data[item]);
                        element.css("color","#000");
                        var hedVal = element.is("input[type='hidden']")?element.val():"";
                        if(hedVal && hedVal != "未填写"){
                            element.parent().find("span").css("color","#000");
                        }
                    }
                }
            }
        }
    },

    ajaxUpload : function(params){
        $.ajaxFileUpload({
            url: httpUrl + params.url,
            secureuri: false,
            fileElementId: params.fileId,
            dataType:'text',
            beforeSend:function()
            {
                jsFun.appLoading();
            },
            success: function(data, status){
                if(typeof params.success === "function"){
                    params.success(data);
                }
            },
            complete: function(){
                jsFun.removeAppLogind();
            }
        })
    },

    getErrorHtml : function(msg){
        var html = [];
        html.push("<div class='err-con'>");
        html.push("<div class='error-con-bg'>");
        html.push("<div class='error-con-bg'>");
        html.push("<img src='/images/errorBg.png' alt=''/>");
        html.push("</div>");
        html.push("<p class='error-con-p'>"+msg+"</p>");
        html.push("</div>");
        return html.join("");
    },

    setTextArea : function(_this){
        $(_this).css({"height":_this.scrollHeight,"overflow-y":"hidden"})
    },


    fmoney: function(s, n) {
        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
        t = "";
        for (i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return t.split("").reverse().join("") + "." + r;
    },
    foamMessage:function (params) {
        var html = [];
        html.push("<div class='hintb'>");
        html.push("<p class='hintTopb'><img src='/images/wokCheckMark.png'/></p>");
        html.push("<p class='hintBotb'>"+params.msg+"</p>");
        html.push("</div>");
        $("body").append(html.join(""));
        $('.hintb').fadeIn(1000).fadeOut(1500);
        //返回源页面
        setTimeout(function(){
            jsFun.setCookie({
                   url:params.url
            })
        },1500);
    },
    phoneCheck:function(params) {
        var isMobile=/(^(13|14|15|17|18)\d{9}$)|(^0(([1,2]\d)|([3-9]\d{2}))\d{7,8}$)/;
        return isMobile.test(params);
    },
    iosAndroidBack : function () {
        var state = {
            title: "title",
            url: "#"
        };
        window.history.pushState(state, "title", "#");
        window.addEventListener("popstate", function (e) {
            //alert("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能
            dd.biz.navigation.setLeft({
                show: true,//控制按钮显示， true 显示， false 隐藏， 默认true
                control: false,//是否控制点击事件，true 控制，false 不控制， 默认false
                showIcon: true,//是否显示icon，true 显示， false 不显示，默认true； 注：具体UI以客户端为准
                text: '',//控制显示文本，空字符串表示显示默认文本
                onSuccess: function (result) {
                },
                onFail: function (err) {
                }
            });
        }, false);
        //安卓返回事件
        dd.ready(function () {
            document.addEventListener('backbutton', function (e) {
                // 在这里处理你的业务逻辑
                dd.biz.navigation.close({
                    onSuccess: function (result) {
                    },
                    onFail: function (err) {
                    }
                })
                //backbutton事件的默认行为是回退历史记录，如果你想阻止默认的回退行为，那么可以通过preventDefault()实现
            });

            dd.biz.navigation.setLeft({
                show: true,//控制按钮显示， true 显示， false 隐藏， 默认true
                control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
                showIcon: true,//是否显示icon，true 显示， false 不显示，默认true； 注：具体UI以客户端为准
                text: '',//控制显示文本，空字符串表示显示默认文本
                onSuccess: function (result) {
                    dd.biz.navigation.close({
                        onSuccess: function (result) {
                        },
                        onFail: function (err) {
                        }
                    })
                    //如果control为true，则onSuccess将在发生按钮点击事件被回调
                },
                onFail: function (err) {
                }
            });

        })
    }
}
$(function(){
    function onBridgeReady(){
        WeixinJSBridge.call('hideOptionMenu');
    }

    if (typeof WeixinJSBridge == "undefined"){
        if( document.addEventListener ){
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        }else if (document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        }
    }else{
        onBridgeReady();
    }
})