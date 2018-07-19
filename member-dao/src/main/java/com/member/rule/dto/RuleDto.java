package com.member.rule.dto;

import com.easy.core.domain.Domain;

/**
 * Created by apple on 18/7/19.
 */
public class RuleDto extends Domain {

    private static final String SQL_ID = "com.member.rule.dao.RuleDao.";

    @Override
    public String getSqlId() {
        return SQL_ID;
    }
}
