package com.member.translate.controller;

import com.easy.core.exception.MessageException;
import com.easy.core.util.ResponseUtil;
import com.member.translate.model.TranslateModel;
import com.member.translate.model.TranslatePager;
import com.member.translate.service.TranslateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by apple on 18/7/25.
 */
@RestController
@RequestMapping("/translate")
public class TranslateController {

    @Autowired
    private TranslateService translateService;

    /**
     * 翻译
     * @param translateModel
     * @return
     * @throws MessageException
     */
    @RequestMapping(value = "/submit", method = RequestMethod.POST)
    public ResponseEntity submit(@ModelAttribute TranslateModel translateModel) throws MessageException{
        Object result = translateService.submit(translateModel);
        return ResponseUtil.success(result);
    }

    /**
     * 查找翻译历史
     * @param translatePager
     * @return
     * @throws MessageException
     */
    @RequestMapping(value = "/getConsumePager", method = RequestMethod.GET)
    public ResponseEntity getConsumePager(@ModelAttribute TranslatePager translatePager) throws MessageException{
        TranslatePager result = translateService.searchTranslatePager(translatePager);
        return ResponseUtil.pageSuccess(result.getCount(),result.getResultList());
    }
}
