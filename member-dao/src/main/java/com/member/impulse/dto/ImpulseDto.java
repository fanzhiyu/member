package com.member.impulse.dto;

import com.easy.core.domain.PagingDomain;
import com.member.impulse.domain.ImpulseDomain;

/**
 * Created by apple on 18/7/19.
 */
public class ImpulseDto extends PagingDomain<ImpulseDomain>{

    private static final String SQL_ID = "com.member.impulse.dao.ImpulseDao.";

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
