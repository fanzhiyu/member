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
var KISBPM = KISBPM || {};

KISBPM.URL = {

    getModel: function(modelId) {
        return ACTIVITI.CONFIG.contextRoot +  '/'+ modelId + '/json';
    },

    getStencilSet: function() {
        return ACTIVITI.CONFIG.contextRoot + '/editor/stencilset';
    },

    putModel: function(modelId) {
        return ACTIVITI.CONFIG.contextRoot +  '/'+  modelId + '/save';
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
        return KISBPM.URL.paramJson(cs3);
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
};
