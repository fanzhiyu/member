package com.member.member.dto;

import com.easy.core.domain.PagingDomain;
import com.member.member.domain.MemberDomain;

/**
 * Created by apple on 18/7/19.
 */
public class MemberDto extends PagingDomain<MemberDomain> {

    private static final String SQL_ID = "com.member.member.dao.MemberDao.";

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
