package com.member.member.service;

import com.easy.core.exception.MessageException;
import com.member.member.model.MemberModel;
import com.member.member.model.MemberPager;
import com.member.member.model.SaveMemberModel;

/**
 * Created by apple on 18/7/19.
 */
public interface MemberService {

    /**
     * 查找会员列表分页
     * @param memberPager
     * @return
     * @throws MessageException
     */
    public MemberPager searchMemberPager(MemberPager memberPager) throws MessageException;

    /**
     * 查找详细
     * @param memberModel
     * @return
     * @throws MessageException
     */
    public MemberModel searchMemberDetails(MemberModel memberModel) throws MessageException;

    /**
     * 保存会员
     * @param saveMemberModel
     * @throws MessageException
     */
    public void saveMember(SaveMemberModel saveMemberModel) throws MessageException;

    /**
     * 删除会员
     * @param memberModel
     * @throws MessageException
     */
    public void deleteMember(MemberModel memberModel) throws MessageException;
}
