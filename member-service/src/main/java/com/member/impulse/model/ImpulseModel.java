package com.member.impulse.model;

/**
 * Created by apple on 18/7/24.
 */
public class ImpulseModel {

    private String memberId;
    private String impulseAmount;
    private String payType;
    private String impulseType;

    public String getMemberId() {
        return memberId;
    }

    public void setMemberId(String memberId) {
        this.memberId = memberId;
    }

    public String getImpulseAmount() {
        return impulseAmount;
    }

    public void setImpulseAmount(String impulseAmount) {
        this.impulseAmount = impulseAmount;
    }

    public String getPayType() {
        return payType;
    }

    public void setPayType(String payType) {
        this.payType = payType;
    }

    public String getImpulseType() {
        return impulseType;
    }

    public void setImpulseType(String impulseType) {
        this.impulseType = impulseType;
    }
}
