package com.member.rule.dto;

import com.easy.core.domain.PagingDomain;
import com.member.rule.domain.RuleDomain;

/**
 * Created by apple on 18/7/19.
 */
public class RuleDto extends PagingDomain<RuleDomain> {

    private static final String SQL_ID = "com.member.rule.dao.RuleDao.";

    private String startDate;
    private String endDate;

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    @Override
    public String getSqlId() {
        return SQL_ID;
    }
}
