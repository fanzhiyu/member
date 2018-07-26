package com.member.rule.model;

/**
 * Created by apple on 18/7/19.
 */
public class SaveRuleModel {

    private String ruleId;
    private String ruleName;
    private String ruleAmount;
    private String ruleNumber;
    private String ruleStatus;

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

    public String getRuleNumber() {
        return ruleNumber;
    }

    public void setRuleNumber(String ruleNumber) {
        this.ruleNumber = ruleNumber;
    }

    public String getRuleStatus() {
        return ruleStatus;
    }

    public void setRuleStatus(String ruleStatus) {
        this.ruleStatus = ruleStatus;
    }
}
