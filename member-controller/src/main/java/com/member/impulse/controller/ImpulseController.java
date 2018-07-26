package com.member.impulse.controller;

import com.easy.core.exception.MessageException;
import com.easy.core.util.ResponseUtil;
import com.member.impulse.model.ImpulseModel;
import com.member.impulse.model.ImpulsePager;
import com.member.impulse.service.ImpulseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by apple on 18/7/24.
 */
@RestController
@RequestMapping("/impulse")
public class ImpulseController {

    @Autowired
    private ImpulseService impulseService;

    /**
     * 获取充值记录列表
     * @param impulsePager
     * @return
     */
    @RequestMapping(value = "/getImpulsePager", method = RequestMethod.GET)
    public ResponseEntity getImpulsePager(@ModelAttribute ImpulsePager impulsePager) throws MessageException{
        ImpulsePager result = impulseService.searchImpulsePager(impulsePager);
        return ResponseUtil.pageSuccess(result.getCount(),result.getResultList());
    }
}
