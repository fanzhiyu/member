package com.member.user.service;

import com.easy.core.exception.MessageException;
import com.member.user.model.SaveUserModel;
import com.member.user.model.TokenModel;
import com.member.user.model.UserModel;

/**
 * Created by apple on 17/12/19.
 */
public interface UserService {

    /**
     * 登陆
     * @param userModel
     * @return
     * @throws MessageException
     */
    public TokenModel login(UserModel userModel) throws MessageException;


    /**
     * 保存
     * @param saveUserModel
     * @throws MessageException
     */
    public void saveUser(SaveUserModel saveUserModel) throws MessageException;
}
