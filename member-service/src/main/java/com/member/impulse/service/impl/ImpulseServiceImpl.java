package com.member.impulse.service.impl;

import com.easy.core.bean.UserBean;
import com.easy.core.exception.MessageException;
import com.easy.core.util.DateUtils;
import com.easy.core.util.UserUtils;
import com.member.impulse.dao.ImpulseDao;
import com.member.impulse.domain.ImpulseDomain;
import com.member.impulse.model.ImpulseModel;
import com.member.impulse.model.ImpulsePager;
import com.member.impulse.service.ImpulseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by apple on 18/7/24.
 */
@Service("impulseService")
public class ImpulseServiceImpl implements ImpulseService{

    @Autowired
    private ImpulseDao impulseDao;

    @Autowired
    private UserUtils userUtils;

    /**
     * 查找充值记录列表
     * @param impulsePager
     * @return
     * @throws MessageException
     */
    @Override
    public ImpulsePager searchImpulsePager(ImpulsePager impulsePager) throws MessageException {
        ImpulseDomain impulseDomain = new ImpulseDomain();
        impulseDomain.setPageSize(impulsePager.getPageSize());
        impulseDomain.setPageNo(impulsePager.getPageNo());
        ImpulseDomain resultDomain = impulseDao.findPaging(impulseDomain);
        ImpulsePager model = null;
        List<ImpulsePager> resultList = new ArrayList<ImpulsePager>();
        for(ImpulseDomain domain : resultDomain.getResultList()){
            model = new ImpulsePager();
            model.setImpulseId(domain.getImpulseId());
            model.setImpulseType(domain.getImpulseType());
            model.setImpulseAmount(String.valueOf(domain.getImpulseAmount()));
            model.setPayType(domain.getPayType());
            model.setMemberName(domain.getMemberName());
            model.setCreateTime(DateUtils.DateToStringFormat(domain.getCreateTime(),DateUtils.YYYY_MM_DD_HH_MM_SS));
            resultList.add(model);
        }
        impulsePager.setResultList(resultList);
        impulsePager.setCount(resultDomain.getCount());
        return impulsePager;
    }

    /**
     * 添加充值记录
     * @param impulseModel
     * @throws MessageException
     */
    @Override
    public void addImpulse(ImpulseModel impulseModel) throws MessageException {
        UserBean userBean = userUtils.getUser();
        ImpulseDomain impulseDomain = new ImpulseDomain();
        impulseDomain.setMemberId(impulseModel.getMemberId());
        impulseDomain.setImpulseAmount(new BigDecimal(impulseModel.getImpulseAmount()));
        impulseDomain.setPayType(impulseModel.getPayType());
        impulseDomain.setImpulseType(impulseModel.getImpulseType());
        impulseDomain.setCreater(userBean.getUserCode());
        impulseDomain.setCreateTime(DateUtils.getSystemDate());
        impulseDomain.setUpdater(userBean.getUserCode());
        impulseDomain.setUpdateTime(DateUtils.getSystemDate());
        impulseDao.insert(impulseDomain);
    }
}
