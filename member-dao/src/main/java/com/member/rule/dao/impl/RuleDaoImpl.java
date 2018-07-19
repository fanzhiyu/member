package com.member.rule.dao.impl;

import com.easy.core.repository.service.impl.BaseRepositoryServiceImpl;
import com.member.rule.dao.RuleDao;
import com.member.rule.domain.RuleDomain;
import org.springframework.stereotype.Repository;

/**
 * Created by apple on 18/7/19.
 */
@Repository("ruleDao")
public class RuleDaoImpl extends BaseRepositoryServiceImpl<RuleDomain> implements RuleDao{
}
