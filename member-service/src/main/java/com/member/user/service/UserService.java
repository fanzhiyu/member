package com.member.user.service;

import com.easy.core.bean.UserBean;
import com.easy.core.exception.MessageException;
import com.member.user.model.SaveUserModel;
import com.member.user.model.TokenModel;
import com.member.user.model.UserModel;
import com.member.user.model.ValidateModel;

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

    /**
     * 查找用户信息
     * @return
     * @throws MessageException
     */
    public UserModel searchUser() throws MessageException;

    /**
     * 获取验证码
     * @return
     * @throws MessageException
     */
    public ValidateModel validate() throws MessageException;
}
