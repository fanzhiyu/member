package com.member.consume.dao.impl;

import com.easy.core.repository.service.impl.BaseRepositoryPagingServiceImpl;
import com.member.consume.dao.ConsumeDao;
import com.member.consume.domain.ConsumeDomain;
import org.springframework.stereotype.Repository;

/**
 * Created by apple on 18/7/19.
 */
@Repository("consumeDao")
public class ConsumenDaoImpl extends BaseRepositoryPagingServiceImpl<ConsumeDomain> implements ConsumeDao {
}
