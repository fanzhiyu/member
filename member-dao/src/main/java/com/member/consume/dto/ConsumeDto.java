package com.member.consume.dto;

import com.easy.core.domain.PagingDomain;
import com.member.consume.domain.ConsumeDomain;

/**
 * Created by apple on 18/7/19.
 */
public class ConsumeDto extends PagingDomain<ConsumeDomain>{

    private static final String SQL_ID = "com.member.consume.dao.ConsumeDao.";

    private String memberName;

    private String startDate;
    private String endDate;

    public String getMemberName() {
        return memberName;
    }

    public void setMemberName(String memberName) {
        this.memberName = memberName;
    }

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
