package com.member.rule.service;

import com.easy.core.exception.MessageException;
import com.member.rule.model.RuleModel;
import com.member.rule.model.RulePager;
import com.member.rule.model.SaveRuleModel;

/**
 * Created by apple on 18/7/19.
 */
public interface RuleService {

    /**
     * 查找规则列表
     * @param rulePager
     * @return
     * @throws MessageException
     */
    public RulePager searchRulePager(RulePager rulePager) throws MessageException;

    /**
     * 查找规则详细
     * @param ruleModel
     * @return
     * @throws MessageException
     */
    public RuleModel searchRuleDetails(RuleModel ruleModel) throws MessageException;

    /**
     * 保存规则
     * @param saveRuleModel
     * @throws MessageException
     */
    public void saveRule(SaveRuleModel saveRuleModel) throws MessageException;

    /**
     * 删除规则
     * @param ruleModel
     * @throws MessageException
     */
    public void deleteRule(RuleModel ruleModel) throws MessageException;

    /**
     * 查找启用的规则
     * @return
     * @throws MessageException
     */
    public RuleModel searchEnableRule() throws MessageException;

    /**
     * 启用规则
     * @param saveRuleModel
     * @throws MessageException
     */
    public void enableRule(SaveRuleModel saveRuleModel) throws MessageException;
}
