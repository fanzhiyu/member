package com.member.rule.controller;

import com.easy.core.exception.MessageException;
import com.easy.core.util.ResponseUtil;
import com.member.rule.model.RuleModel;
import com.member.rule.model.RulePager;
import com.member.rule.model.SaveRuleModel;
import com.member.rule.service.RuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by apple on 18/7/19.
 */
@RequestMapping("rule")
@RestController
public class RuleController {

    @Autowired
    private RuleService ruleService;

    /**
     * 获取规则列表
     * @param rulePager
     * @return
     * @throws MessageException
     */
    @RequestMapping(value = "/getRulePager", method = RequestMethod.GET)
    public ResponseEntity getRulePager(@ModelAttribute RulePager rulePager) throws MessageException{
        RulePager result = ruleService.searchRulePager(rulePager);
        return ResponseUtil.pageSuccess(result.getCount(),result.getResultList());
    }

    /**
     * 查找规则详细
     * @param ruleModel
     * @return
     * @throws MessageException
     */
    @RequestMapping(value = "/getRuleDetails", method = RequestMethod.GET)
    public ResponseEntity getRuleDetails(@ModelAttribute RuleModel ruleModel) throws MessageException{
        RuleModel result = ruleService.searchRuleDetails(ruleModel);
        return ResponseUtil.success(result);
    }

    /**
     * 保存规则
     * @param saveRuleModel
     * @return
     * @throws MessageException
     */
    @RequestMapping(value = "/saveRule", method = RequestMethod.POST)
    public ResponseEntity saveRule(@ModelAttribute SaveRuleModel saveRuleModel) throws MessageException{
        ruleService.saveRule(saveRuleModel);
        return ResponseUtil.success();
    }

    /**
     * 删除规则
     * @return
     * @throws MessageException
     */
    @RequestMapping(value = "/removeRule", method = RequestMethod.POST)
    public ResponseEntity removeRule(RuleModel ruleModel) throws MessageException{
        ruleService.deleteRule(ruleModel);
        return ResponseUtil.success();
    }

    /**
     * 启用规则
     * @param saveRuleModel
     * @return
     * @throws MessageException
     */
    @RequestMapping(value = "/enableRule", method = RequestMethod.POST)
    public ResponseEntity enableRule(SaveRuleModel saveRuleModel) throws MessageException{
        ruleService.enableRule(saveRuleModel);
        return ResponseUtil.success();
    }
}
