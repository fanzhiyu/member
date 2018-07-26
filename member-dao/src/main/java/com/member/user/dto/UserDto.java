package com.member.user.dto;

import com.easy.core.domain.Domain;

/**
 * Created by apple on 18/7/18.
 */
public class UserDto extends Domain {

    private final static String SQL_ID = "com.member.user.dao.UserDao.";

    @Override
    public String getSqlId() {
        return SQL_ID;
    }
}
