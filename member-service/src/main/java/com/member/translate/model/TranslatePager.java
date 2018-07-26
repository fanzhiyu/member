package com.member.translate.model;

import com.easy.core.model.PagingModel;

/**
 * Created by apple on 18/7/25.
 */
public class TranslatePager extends PagingModel<TranslatePager>{

    private String consumeId;
    private String consumeAmount;
    private String consumeNum;
    private String createTime;
    private String memberName;
    private String startDate;
    private String endDate;

    public String getConsumeId() {
        return consumeId;
    }

    public void setConsumeId(String consumeId) {
        this.consumeId = consumeId;
    }

    public String getConsumeAmount() {
        return consumeAmount;
    }

    public void setConsumeAmount(String consumeAmount) {
        this.consumeAmount = consumeAmount;
    }

    public String getConsumeNum() {
        return consumeNum;
    }

    public void setConsumeNum(String consumeNum) {
        this.consumeNum = consumeNum;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

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
}
