package com.member.user.service.impl;


import com.alibaba.fastjson.JSONObject;
import com.easy.core.bean.UserBean;
import com.easy.core.constant.Constant;
import com.easy.core.exception.MessageException;
import com.easy.core.manager.Manager;
import com.easy.core.util.*;
import com.member.core.contsant.MemberConstant;
import com.member.core.contsant.MemberMessage;
import com.member.member.dao.MemberDao;
import com.member.member.domain.MemberDomain;
import com.member.member.model.MemberModel;
import com.member.user.dao.UserDao;
import com.member.user.domain.UserDomain;
import com.member.user.model.SaveUserModel;
import com.member.user.model.TokenModel;
import com.member.user.model.UserModel;
import com.member.user.model.ValidateModel;
import com.member.user.service.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import sun.misc.BASE64Encoder;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import java.awt.image.BufferedImage;
import java.awt.image.RenderedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by apple on 17/12/19.
 */
@Service("userService")
public class UserServiceImpl implements UserService {

    private final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private UserDao userDao;

    @Autowired
    private MemberDao memberDao;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserUtils userUtils;

    /**
     * 签订token
     * @param userModel
     * @return
     * @throws MessageException
     */
    @Override
    public TokenModel login(UserModel userModel) throws MessageException {
        checkValidateCode(userModel);
        UserDomain userDomain = new UserDomain();
        userDomain.setUserName(userModel.getUsername());
        userDomain.setUserPassword(EncryptionUtils.md5Encode(userModel.getPassword()));
        UserDomain resultUserDomain = userDao.findCondition(userDomain);
        UserBean userBean = new UserBean();
        List<String> ruleIds = new ArrayList<String>();
        if(StringUtils.isNull(resultUserDomain)){
            MemberDomain memberDomain = new MemberDomain();
            memberDomain.setMemberTel(userModel.getUsername());
            memberDomain.setMemberPassword(EncryptionUtils.md5Encode(userModel.getPassword()));
            MemberDomain resultMemberDomain = memberDao.findCondition(memberDomain);
            if(StringUtils.isNull(resultMemberDomain)){
                throw new MessageException(Manager.getMessage(MemberMessage.MEB1012));
            }
            userBean.setUserCode(resultMemberDomain.getMemberId());
            userBean.setUsername(resultMemberDomain.getMemberName());
            userBean.setUserMobile(resultMemberDomain.getMemberTel());
            ruleIds.add(MemberConstant.ROLE_MEMBER);
            userBean.setRoleIds(ruleIds);
        }else{
            userBean.setUsername(resultUserDomain.getUserName());
            userBean.setUserMobile(resultUserDomain.getUserTel());
            userBean.setUserCode(resultUserDomain.getUserId());
            ruleIds.add(MemberConstant.ROLE_ADMIN);
            userBean.setRoleIds(ruleIds);
        }
        TokenModel tokenModel = null;
        try {
            String subject = jwtUtil.generalSubject(userBean);
            String token = jwtUtil.createJWT(Constant.JWT_ID, subject);
            String refreshToken = jwtUtil.createJWT(Constant.JWT_ID, subject, Constant.JWT_REFRESH_TTL);
            tokenModel = new TokenModel();
            tokenModel.setToken(token);
            tokenModel.setRefreshToken(refreshToken);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return tokenModel;
    }

    /**
     * 保存
     * @param saveUserModel
     * @throws MessageException
     */
    @Override
    public void saveUser(SaveUserModel saveUserModel) throws MessageException {
        UserBean userBean = userUtils.getUser();
        UserDomain userDomain = new UserDomain();
        userDomain.setUserName(saveUserModel.getUsername());
        userDomain.setUserPassword(saveUserModel.getPassword());
        userDomain.setUserEmail(saveUserModel.getEmail());
        userDomain.setUserTel(saveUserModel.getTel());
        userDomain.setUserHeader(saveUserModel.getHeaderImg());
        userDomain.setCreater(userBean.getUserCode());
        userDomain.setCreateTime(DateUtils.getSystemDate());
        if(StringUtils.isNotNull(saveUserModel.getUserId())){
            userDomain.setUserId(saveUserModel.getUserId());
            userDomain.setUpdater(userBean.getUserCode());
            userDomain.setUpdateTime(DateUtils.getSystemDate());
            userDao.update(userDomain);
        }else{
            userDao.insert(userDomain);
        }
    }

    /**
     * 查找用户信息
     * @return
     * @throws MessageException
     */
    @Override
    public UserModel searchUser() throws MessageException {
        UserBean userBean = userUtils.getUser();
        UserDomain userDomain = new UserDomain();
        userDomain.setUserId(userBean.getUserCode());
        UserDomain resultUserDomain = userDao.findCondition(userDomain);
        UserModel userModel = new UserModel();
        if(StringUtils.isNull(resultUserDomain)){
            MemberDomain memberDomain = new MemberDomain();
            memberDomain.setMemberId(userBean.getUserCode());
            MemberDomain resultMemberDomain = memberDao.findCondition(memberDomain);
            if(StringUtils.isNull(resultMemberDomain)){
                throw new MessageException(Manager.getMessage(MemberMessage.MEB1013));
            }
            userModel.setId(resultMemberDomain.getMemberId());
            userModel.setHeaderImg(resultMemberDomain.getMemberHeader());
            userModel.setMobile(resultMemberDomain.getMemberTel());
            userModel.setRoleId(MemberConstant.ROLE_MEMBER);
            userModel.setUsername(resultMemberDomain.getMemberName());
            userModel.setAge(resultMemberDomain.getMemberAge());
            userModel.setSex(resultMemberDomain.getMemberSex());
            userModel.setEmail(resultMemberDomain.getMemberEmail());
            userModel.setAmount(StringUtils.isNull(resultMemberDomain.getMemberAmount()) ? "0.00" :
                    String.valueOf(resultMemberDomain.getMemberAmount()));
            userModel.setBirthday(DateUtils.DateToStringFormat(resultMemberDomain.getMemberBirthday(),DateUtils.YYYY_MM_DD));
            return userModel;
        }
        userModel.setHeaderImg(resultUserDomain.getUserHeader());
        userModel.setMobile(resultUserDomain.getUserTel());
        userModel.setUsername(resultUserDomain.getUserName());
        userModel.setEmail(resultUserDomain.getUserEmail());
        userModel.setRoleId(MemberConstant.ROLE_ADMIN);
        userModel.setId(resultUserDomain.getUserId());
        return userModel;
    }

    /**
     * 获取验证码
     * @return
     * @throws MessageException
     */
    @Override
    public ValidateModel validate() throws MessageException {
        Map<String,Object> map = CodeUtils.generateCodeAndPic();
        BufferedImage img = (BufferedImage)map.get("codePic");
        JSONObject jsonObject = new JSONObject();
        String code = map.get("code").toString();
        ValidateModel model = new ValidateModel();
        try {
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            ImageIO.write(img, "jpg", outputStream);
            BASE64Encoder encoder = new BASE64Encoder();
            String base64Img = encoder.encode(outputStream.toByteArray());
            jsonObject.put("validToken",code);
            String subject = jwtUtil.generalSubject(jsonObject);
            String token = jwtUtil.createJWT(Constant.JWT_ID,subject,Constant.JWT_TTL);
            model.setCodeImg(base64Img);
            model.setValidateToken(token);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return model;
    }

    /**
     * 验证码
     * @param userModel
     * @throws MessageException
     */
    private void checkValidateCode(UserModel userModel) throws MessageException{
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String validToken = StringUtils.isNotNull(request.getHeader("validToken"))?request.getHeader("validToken"):request.getParameter("validToken");
        try {
            Claims claims = jwtUtil.parseJWT(validToken);
            String json = claims.getSubject();
            JSONObject res = JSONObject.parseObject(json);
            JSONObject map = JSONObject.parseObject(res.getString("map"));
            String token = map.getString("validToken");
            if(StringUtils.isNull(token)){
                throw new MessageException(Manager.getMessage(MemberMessage.MEB1009));
            }
            if(!StringUtils.isEquals(userModel.getValicode().toLowerCase(),token.toLowerCase())){
                throw new MessageException(Manager.getMessage(MemberMessage.MEB1008));
            }
        }catch (ExpiredJwtException e){
            throw new MessageException(Manager.getMessage(MemberMessage.MEB1010));
        }
    }

}
