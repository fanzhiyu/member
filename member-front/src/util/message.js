/**
 * Created by apple on 18/1/19.
 */
'use strict';

export const COMMON = COMMON || {};

COMMON.CONST = {
  CK_TYPE_NULL : 'ckNull',
  CK_TYPE_TEL : 'ckTel',
  CK_TYPE_EMAIL : 'ckEmail',
  CK_TYPE_NUMBER : 'ckNumber',
  CK_TYPE_IDEN : 'ckIden',
  EMPTY : '',
  REG_TEL : /^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/,
  REG_EMAIL : /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/,
  REG_NUMBER : /^[0-9]*$/,
  REG_IDEN :  /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
}

// 配置信息
COMMON.CONFIG = {
  localServiceRoot : process.env.BASE_API
}

// message信息
COMMON.MESSAGE = {
  MSG1001 : '{0}不能为空',
  MSG1002 : '{0}长度不能大于{1}位',
  MSG1003 : '{0}长度不能小于{1}位',
  MSG1004 : '{0}不正确',
  MSG1005 : '{0}必须是数字',
  MSG1006 : '{0}不是正确的邮箱格式',
}
