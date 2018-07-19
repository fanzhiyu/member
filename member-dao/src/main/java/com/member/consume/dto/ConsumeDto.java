package com.member.consume.dto;

import com.easy.core.domain.PagingDomain;
import com.member.consume.domain.ConsumeDomain;

/**
 * Created by apple on 18/7/19.
 */
public class ConsumeDto extends PagingDomain<ConsumeDomain>{

    private static final String SQL_ID = "com.member.consume.dao.ConsumeDao.";

    @Override
    public String getSqlId() {
        return SQL_ID;
    }
}
