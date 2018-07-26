package com.member.impulse.service;

import com.easy.core.exception.MessageException;
import com.member.impulse.model.ImpulseModel;
import com.member.impulse.model.ImpulsePager;

/**
 * Created by apple on 18/7/24.
 */
public interface ImpulseService {

    /**
     * 查找充值记录列表
     * @param impulsePager
     * @return
     * @throws MessageException
     */
    public ImpulsePager searchImpulsePager(ImpulsePager impulsePager) throws MessageException;

    /**
     * 添加充值记录
     * @param impulseModel
     * @throws MessageException
     */
    public void addImpulse(ImpulseModel impulseModel) throws MessageException;
}
