package com.member.impulse.model;

import com.easy.core.model.PagingModel;

/**
 * Created by apple on 18/7/24.
 */
public class ImpulsePager extends PagingModel<ImpulsePager>{

    private String impulseId;
    private String impulseAmount;
    private String impulseType;
    private String payType;
    private String createTime;
    private String memberName;

    public String getImpulseId() {
        return impulseId;
    }

    public void setImpulseId(String impulseId) {
        this.impulseId = impulseId;
    }

    public String getImpulseAmount() {
        return impulseAmount;
    }

    public void setImpulseAmount(String impulseAmount) {
        this.impulseAmount = impulseAmount;
    }

    public String getImpulseType() {
        return impulseType;
    }

    public void setImpulseType(String impulseType) {
        this.impulseType = impulseType;
    }

    public String getPayType() {
        return payType;
    }

    public void setPayType(String payType) {
        this.payType = payType;
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
}
