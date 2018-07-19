package com.member.member.dao.impl;

import com.easy.core.repository.service.impl.BaseRepositoryPagingServiceImpl;
import com.member.member.dao.MemberDao;
import com.member.member.domain.MemberDomain;
import org.springframework.stereotype.Repository;

/**
 * Created by apple on 18/7/19.
 */
@Repository("memberDao")
public class MemberDaoImpl extends BaseRepositoryPagingServiceImpl<MemberDomain> implements MemberDao{
}
