package com.member.user.service.impl;


import com.easy.core.exception.MessageException;
import com.member.user.dao.UserDao;
import com.member.user.model.UserModel;
import com.member.user.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by apple on 17/12/19.
 */
@Service("userService")
public class UserServiceImpl implements UserService {

    private final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private UserDao userDao;

    /**
     * 签订token
     * @param userModel
     * @return
     * @throws MessageException
     */
    @Override
    public UserModel signToken(UserModel userModel) throws MessageException {
        return null;
    }
}
