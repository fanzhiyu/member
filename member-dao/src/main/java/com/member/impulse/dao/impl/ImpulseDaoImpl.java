package com.member.impulse.dao.impl;

import com.easy.core.repository.service.impl.BaseRepositoryPagingServiceImpl;
import com.member.impulse.dao.ImpulseDao;
import com.member.impulse.domain.ImpulseDomain;
import org.springframework.stereotype.Repository;

/**
 * Created by apple on 18/7/19.
 */
@Repository("impulseDao")
public class ImpulseDaoImpl extends BaseRepositoryPagingServiceImpl<ImpulseDomain> implements ImpulseDao{
}
