package com.member.user.controller;

import com.easy.core.exception.MessageException;
import com.easy.core.util.ResponseUtil;
import com.member.user.model.SaveUserModel;
import com.member.user.model.TokenModel;
import com.member.user.model.UserModel;
import com.member.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by apple on 17/12/19.
 */
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * 登陆
     * @return
     * @throws MessageException
     */
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public ResponseEntity login(@ModelAttribute UserModel userModel) throws MessageException{
        TokenModel result = userService.login(userModel);
        return ResponseUtil.success(result);
    }

    /**
     * 保存用户
     * @param saveUserModel
     * @return
     * @throws MessageException
     */
    @RequestMapping(value = "/saveUser", method = RequestMethod.POST)
    public ResponseEntity saveUser(@ModelAttribute SaveUserModel saveUserModel) throws MessageException{
        userService.saveUser(saveUserModel);
        return ResponseUtil.success();
    }
}
