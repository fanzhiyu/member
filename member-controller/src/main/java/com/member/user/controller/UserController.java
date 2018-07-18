package com.member.user.controller;

import com.easy.core.util.ResponseUtil;
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
     * 测试
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public ResponseEntity test(@ModelAttribute UserModel userModel) throws Exception{
        userService.signToken(userModel);
        return ResponseUtil.success();
    }
}
