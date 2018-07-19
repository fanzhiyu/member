package com.member.impulse.dto;

import com.easy.core.domain.PagingDomain;
import com.member.impulse.domain.ImpulseDomain;

/**
 * Created by apple on 18/7/19.
 */
public class ImpulseDto extends PagingDomain<ImpulseDomain>{

    private static final String SQL_ID = "com.member.impulse.dao.ImpulseDao.";

    @Override
    public String getSqlId() {
        return SQL_ID;
    }
}
