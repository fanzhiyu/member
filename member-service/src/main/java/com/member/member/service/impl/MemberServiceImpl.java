package com.member.member.service.impl;

import com.easy.core.bean.UserBean;
import com.easy.core.exception.MessageException;
import com.easy.core.manager.Manager;
import com.easy.core.util.DateUtils;
import com.easy.core.util.StringUtils;
import com.easy.core.util.UserUtils;
import com.member.core.contant.MemberMessage;
import com.member.member.dao.MemberDao;
import com.member.member.domain.MemberDomain;
import com.member.member.model.MemberModel;
import com.member.member.model.MemberPager;
import com.member.member.model.SaveMemberModel;
import com.member.member.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by apple on 18/7/19.
 */
@Service("memberService")
public class MemberServiceImpl implements MemberService {

    @Autowired
    private MemberDao memberDao;

    @Autowired
    private UserUtils userUtils;

    /**
     * 查找会员列表分页
     * @param memberPager
     * @return
     * @throws MessageException
     */
    @Override
    public MemberPager searchMemberPager(MemberPager memberPager) throws MessageException {
        MemberDomain memberDomain = new MemberDomain();
        memberDomain.setPageSize(memberPager.getPageSize());
        memberDomain.setPageNo(memberPager.getPageNo());
        memberDomain.setMemberTel(memberPager.getMemberTel());
        memberDomain.setMemberEmail(memberPager.getMemberEmail());
        memberDomain.setMemberName(memberPager.getMemberName());
        memberDomain.setStartDate(memberPager.getStartDate());
        memberDomain.setEndDate(memberPager.getEndDate());
        MemberDomain resultDomain = memberDao.findPaging(memberDomain);
        List<MemberPager> resultList = new ArrayList<>();
        MemberPager model = null;
        for(MemberDomain domain : resultDomain.getResultList()){
            model = new MemberPager();
            model.setMemberId(domain.getMemberId());
            model.setMemberName(domain.getMemberName());
            model.setMemberTel(domain.getMemberTel());
            model.setMemberEmail(domain.getMemberEmail());
            model.setMemberAge(domain.getMemberAge());
            model.setMemberSex(domain.getMemberSex());
            model.setMemberBirthday(DateUtils.DateToStringFormat(domain.getMemberBirthday(),DateUtils.YYYY_MM_DD));
            model.setCreateTime(DateUtils.DateToStringFormat(domain.getCreateTime(),DateUtils.YYYY_MM_DD_HH_MM_SS));
            resultList.add(model);
        }
        memberPager.setResultList(resultList);
        memberPager.setCount(resultDomain.getCount());
        return memberPager;
    }

    /**
     * 查找详细
     * @param memberModel
     * @return
     * @throws MessageException
     */
    @Override
    public MemberModel searchMemberDetails(MemberModel memberModel) throws MessageException {
        checkMemberId(memberModel);
        MemberDomain memberDomain = new MemberDomain();
        memberDomain.setMemberId(memberModel.getMemberId());
        MemberDomain result = memberDao.findCondition(memberDomain);
        MemberModel model = null;
        if(StringUtils.isNotNull(result)){
            model = setMemberModel(result);
        }
        return model;
    }

    /**
     * 保存会员
     * @param saveMemberModel
     * @throws MessageException
     */
    @Override
    public void saveMember(SaveMemberModel saveMemberModel) throws MessageException {
        UserBean userBean = userUtils.getUser();
        MemberDomain memberDomain = new MemberDomain();
        memberDomain.setMemberId(saveMemberModel.getMemberId());
        memberDomain.setMemberSex(saveMemberModel.getMemberSex());
        memberDomain.setMemberName(saveMemberModel.getMemberName());
        memberDomain.setMemberAge(saveMemberModel.getMemberAge());
        memberDomain.setMemberEmail(saveMemberModel.getMemberEmail());
        memberDomain.setMemberBirthday(DateUtils.StringToDateFormat(saveMemberModel.getMemberBirthday(),DateUtils.YYYY_MM_DD));
        memberDomain.setCreater(userBean.getUserCode());
        memberDomain.setCreateTime(DateUtils.getSystemDate());
        if(StringUtils.isNull(saveMemberModel.getMemberId())){
            memberDomain.setMemberId(saveMemberModel.getMemberId());
            memberDomain.setUpdater(userBean.getUserCode());
            memberDomain.setUpdateTime(DateUtils.getSystemDate());
            memberDao.update(memberDomain);
        }else{
            memberDomain.setRuleNumber(DateUtils.getYYmm());
            memberDao.insert(memberDomain);
        }
    }

    /**
     * 删除会员
     * @param memberModel
     * @throws MessageException
     */
    @Override
    public void deleteMember(MemberModel memberModel) throws MessageException {
        checkMemberId(memberModel);
        MemberDomain memberDomain = new MemberDomain();
        memberDomain.setMemberId(memberModel.getMemberId());
        memberDao.delete(memberDomain);
    }

    /**
     * 验证会员编号
     * @param memberModel
     * @throws MessageException
     */
    private void checkMemberId(MemberModel memberModel) throws MessageException{
        if(StringUtils.isNull(memberModel.getMemberId())){
            throw new MessageException(Manager.getMessage(Manager.getMessage(MemberMessage.MEB1005)));
        }
    }

    /**
     * 设置会员对象
     * @param memberDomain
     * @return
     */
    private MemberModel setMemberModel(MemberDomain memberDomain){
        MemberModel model = new MemberModel();
        model.setMemberId(memberDomain.getMemberId());
        model.setMemberName(memberDomain.getMemberName());
        model.setMemberTel(memberDomain.getMemberTel());
        model.setMemberEmail(memberDomain.getMemberEmail());
        model.setMemberAge(memberDomain.getMemberAge());
        model.setMemberSex(memberDomain.getMemberSex());
        model.setMemberBirthday(DateUtils.DateToStringFormat(memberDomain.getMemberBirthday(),DateUtils.YYYY_MM_DD));
        return model;
    }
}
