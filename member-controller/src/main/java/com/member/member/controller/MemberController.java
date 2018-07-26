package com.member.member.controller;

import com.easy.core.exception.MessageException;
import com.easy.core.util.ResponseUtil;
import com.member.member.domain.MemberDomain;
import com.member.member.model.MemberModel;
import com.member.member.model.MemberPager;
import com.member.member.model.SaveMemberModel;
import com.member.member.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by apple on 18/7/19.
 */
@RequestMapping("/member")
@RestController
public class MemberController {

    @Autowired
    private MemberService memberService;

    /**
     * 查找会员列表
     * @param memberPager
     * @return
     * @throws MessageException
     */
    @RequestMapping(value = "/getMemberPager", method = RequestMethod.GET)
    public ResponseEntity getMemberPager(@ModelAttribute MemberPager memberPager) throws MessageException{
        MemberPager result = memberService.searchMemberPager(memberPager);
        return ResponseUtil.pageSuccess(result.getCount(),result.getResultList());
    }

    /**
     * 添加会员
     * @param saveMemberModel
     * @return
     * @throws MessageException
     */
    @RequestMapping(value = "/saveMember", method = RequestMethod.POST)
    public ResponseEntity saveMember(@ModelAttribute SaveMemberModel saveMemberModel) throws MessageException{
        memberService.saveMember(saveMemberModel);
        return ResponseUtil.success();
    }

    /**
     * 查找会员详细
     * @param memberModel
     * @return
     * @throws MessageException
     */
    @RequestMapping(value = "/getMemberDetails", method = RequestMethod.GET)
    public ResponseEntity getMemberDetails(@ModelAttribute MemberModel memberModel) throws MessageException{
        MemberModel result = memberService.searchMemberDetails(memberModel);
        return ResponseUtil.success(result);
    }

    /**
     * 删除会员
     * @param memberModel
     * @return
     * @throws MessageException
     */
    @RequestMapping(value = "/removeMember", method = RequestMethod.POST)
    public ResponseEntity removeMember(@ModelAttribute MemberModel memberModel) throws MessageException{
        memberService.deleteMember(memberModel);
        return ResponseUtil.success();
    }

    /**
     * 会员充值
     * @param memberModel
     * @return
     * @throws MessageException
     */
    @RequestMapping(value = "/rechargeMember", method = RequestMethod.POST)
    public ResponseEntity rechargeMember(@ModelAttribute MemberModel memberModel) throws MessageException{
        memberService.rechargeMember(memberModel);
        return ResponseUtil.success();
    }
}
