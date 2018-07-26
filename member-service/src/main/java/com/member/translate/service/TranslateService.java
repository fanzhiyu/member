package com.member.translate.service;

import com.easy.core.exception.MessageException;
import com.member.translate.model.TranslateModel;
import com.member.translate.model.TranslatePager;

/**
 * Created by apple on 18/7/19.
 */
public interface TranslateService {

    /**
     * 提交
     * @param translateModel
     * @throws MessageException
     */
    public String submit(TranslateModel translateModel) throws MessageException;

    /**
     * 查找翻译历史
     * @param translatePager
     * @return
     * @throws MessageException
     */
    public TranslatePager searchTranslatePager(TranslatePager translatePager) throws MessageException;
}
