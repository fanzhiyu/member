package com.member.rule.service.impl;

import com.easy.core.bean.UserBean;
import com.easy.core.exception.MessageException;
import com.easy.core.manager.Manager;
import com.easy.core.util.DateUtils;
import com.easy.core.util.StringUtils;
import com.easy.core.util.UserUtils;
import com.member.core.contsant.MemberConstant;
import com.member.core.contsant.MemberMessage;
import com.member.rule.dao.RuleDao;
import com.member.rule.domain.RuleDomain;
import com.member.rule.model.RuleModel;
import com.member.rule.model.RulePager;
import com.member.rule.model.SaveRuleModel;
import com.member.rule.service.RuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by apple on 18/7/19.
 */
@Service("ruleService")
public class RuleServiceImpl implements RuleService {

    @Autowired
    private RuleDao ruleDao;

    @Autowired
    private UserUtils userUtils;

    /**
     * 查找规则列表
     * @param rulePager
     * @return
     * @throws MessageException
     */
    @Override
    public RulePager searchRulePager(RulePager rulePager) throws MessageException {
        RuleDomain ruleDomain = new RuleDomain();
        ruleDomain.setPageSize(rulePager.getPageSize());
        ruleDomain.setPageNo(rulePager.getPageNo());
        ruleDomain.setRuleName(rulePager.getRuleName());
        ruleDomain.setStartDate(rulePager.getStartDate());
        ruleDomain.setEndDate(rulePager.getEndDate());
        RuleDomain result = ruleDao.findPaging(ruleDomain);
        List<RulePager> resultList = new ArrayList<>();
        RulePager model = null;
        for(RuleDomain domain : result.getResultList()){
            model = new RulePager();
            model.setRuleId(domain.getRuleId());
            model.setRuleName(domain.getRuleName());
            model.setRuleAmount(String.valueOf(domain.getRuleAmount()));
            model.setRuleStatus(domain.getRuleStatus());
            model.setRuleNo(domain.getRuleNumber());
            model.setCreateTime(DateUtils.DateToStringFormat(domain.getCreateTime(),DateUtils.YYYY_MM_DD_HH_MM_SS));
            resultList.add(model);
        }
        rulePager.setCount(result.getCount());
        rulePager.setResultList(resultList);
        return rulePager;
    }

    /**
     * 查找规则详细
     * @param ruleModel
     * @return
     * @throws MessageException
     */
    @Override
    public RuleModel searchRuleDetails(RuleModel ruleModel) throws MessageException {
        checkRuleId(ruleModel);
        RuleDomain ruleDomain = new RuleDomain();
        ruleDomain.setRuleId(ruleModel.getRuleId());
        RuleDomain result = ruleDao.findCondition(ruleDomain);
        RuleModel model = null;
        if(StringUtils.isNotNull(result)){
            model = new RuleModel();
            model.setRuleName(result.getRuleName());
            model.setRuleNo(result.getRuleNumber());
            model.setRuleId(result.getRuleId());
            model.setRuleAmount(String.valueOf(result.getRuleAmount()));
        }
        return model;
    }

    /**
     * 保存规则
     * @param saveRuleModel
     * @throws MessageException
     */
    @Override
    public void saveRule(SaveRuleModel saveRuleModel) throws MessageException {
        UserBean userBean = userUtils.getUser();
        RuleDomain ruleDomain = new RuleDomain();
        ruleDomain.setRuleName(saveRuleModel.getRuleName());
        ruleDomain.setRuleAmount(new BigDecimal(saveRuleModel.getRuleAmount()));
        ruleDomain.setRuleNumber(saveRuleModel.getRuleNumber());
        ruleDomain.setCreater(userBean.getUserCode());
        ruleDomain.setCreateTime(DateUtils.getSystemDate());
        if(StringUtils.isNotNull(saveRuleModel.getRuleId())){
            ruleDomain.setUpdater(userBean.getUserCode());
            ruleDomain.setUpdateTime(DateUtils.getSystemDate());
            ruleDomain.setRuleId(saveRuleModel.getRuleId());
            ruleDao.update(ruleDomain);
        }else{
            ruleDomain.setRuleStatus(MemberConstant.RULE_DISABLE_STATUS);
            ruleDao.insert(ruleDomain);
        }
    }

    /**
     * 删除规则
     * @param ruleModel
     * @throws MessageException
     */
    @Override
    public void deleteRule(RuleModel ruleModel) throws MessageException {
        checkRuleId(ruleModel);
        RuleDomain ruleDomain = new RuleDomain();
        ruleDomain.setRuleId(ruleModel.getRuleId());
        ruleDao.delete(ruleDomain);
    }

    /**
     * 查找启用的规则
     * @return
     * @throws MessageException
     */
    @Override
    public RuleModel searchEnableRule() throws MessageException {
        RuleDomain ruleDomain = new RuleDomain();
        ruleDomain.setRuleStatus(MemberConstant.ENABLE);
        RuleDomain result = ruleDao.findCondition(ruleDomain);
        RuleModel ruleModel = null;
        if(StringUtils.isNotNull(result)){
            ruleModel = new RuleModel();
            ruleModel.setRuleName(result.getRuleName());
            ruleModel.setRuleAmount(String.valueOf(result.getRuleAmount()));
            ruleModel.setRuleNo(result.getRuleNumber());
            ruleModel.setRuleId(result.getRuleId());
        }
        return ruleModel;
    }

    /**
     * 启用规则
     * @param saveRuleModel
     * @throws MessageException
     */
    @Override
    public void enableRule(SaveRuleModel saveRuleModel) throws MessageException {
        checkRuleId(saveRuleModel);
        RuleDomain ruleDomain = new RuleDomain();
        ruleDomain.setRuleStatus(MemberConstant.RULE_DISABLE_STATUS);
        ruleDao.update(ruleDomain);
        ruleDomain.setRuleId(saveRuleModel.getRuleId());
        ruleDomain.setRuleStatus(MemberConstant.RULE_ENABLE_STATUS);
        ruleDao.update(ruleDomain);
    }

    /**
     * 验证规则id
     * @param ruleModel
     * @throws MessageException
     */
    private void checkRuleId(RuleModel ruleModel) throws MessageException{
        if(StringUtils.isNull(ruleModel.getRuleId())){
            throw new MessageException(Manager.getMessage(MemberMessage.MEB1001,Manager.getMessage(MemberMessage.MEB1006)));
        }
    }

    /**
     * 验证规则id
     * @param saveRuleModel
     * @throws MessageException
     */
    private void checkRuleId(SaveRuleModel saveRuleModel) throws MessageException{
        if(StringUtils.isNull(saveRuleModel.getRuleId())){
            throw new MessageException(Manager.getMessage(MemberMessage.MEB1001,Manager.getMessage(MemberMessage.MEB1006)));
        }
    }
}
