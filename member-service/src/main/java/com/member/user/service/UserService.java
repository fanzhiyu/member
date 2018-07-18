package com.member.user.service;

import com.easy.core.exception.MessageException;
import com.member.user.model.UserModel;

/**
 * Created by apple on 17/12/19.
 */
public interface UserService {

    /**
     * 签订token
     * @param userModel
     * @return
     * @throws MessageException
     */
    public UserModel signToken(UserModel userModel) throws MessageException;
}
