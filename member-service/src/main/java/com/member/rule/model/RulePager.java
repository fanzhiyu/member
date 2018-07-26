package com.member.rule.model;

import com.easy.core.model.PagingModel;

/**
 * Created by apple on 18/7/19.
 */
public class RulePager extends PagingModel<RulePager>{

    private String ruleId;
    private String ruleName;
    private String ruleAmount;
    private String ruleNo;
    private String ruleStatus;
    private String startDate;
    private String endDate;
    private String createTime;

    public String getRuleId() {
        return ruleId;
    }

    public void setRuleId(String ruleId) {
        this.ruleId = ruleId;
    }

    public String getRuleName() {
        return ruleName;
    }

    public void setRuleName(String ruleName) {
        this.ruleName = ruleName;
    }

    public String getRuleAmount() {
        return ruleAmount;
    }

    public void setRuleAmount(String ruleAmount) {
        this.ruleAmount = ruleAmount;
    }

    public String getRuleNo() {
        return ruleNo;
    }

    public void setRuleNo(String ruleNo) {
        this.ruleNo = ruleNo;
    }

    public String getRuleStatus() {
        return ruleStatus;
    }

    public void setRuleStatus(String ruleStatus) {
        this.ruleStatus = ruleStatus;
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

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }
}
