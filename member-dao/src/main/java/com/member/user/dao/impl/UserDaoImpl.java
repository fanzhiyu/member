package com.member.user.dao.impl;

import com.easy.core.repository.service.impl.BaseRepositoryServiceImpl;
import com.member.user.dao.UserDao;
import com.member.user.domain.UserDomain;
import org.springframework.stereotype.Repository;

/**
 * Created by apple on 18/7/18.
 */
@Repository("userDao")
public class UserDaoImpl extends BaseRepositoryServiceImpl<UserDomain> implements UserDao{
}
