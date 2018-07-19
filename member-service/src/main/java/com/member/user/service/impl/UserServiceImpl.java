package com.member.user.service.impl;


import com.easy.core.bean.UserBean;
import com.easy.core.constant.Constant;
import com.easy.core.exception.MessageException;
import com.easy.core.util.DateUtils;
import com.easy.core.util.JwtUtil;
import com.easy.core.util.StringUtils;
import com.easy.core.util.UserUtils;
import com.member.member.dao.MemberDao;
import com.member.member.domain.MemberDomain;
import com.member.user.dao.UserDao;
import com.member.user.domain.UserDomain;
import com.member.user.model.SaveUserModel;
import com.member.user.model.TokenModel;
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
        UserDomain userDomain = new UserDomain();
        userDomain.setUserName(userModel.getUsername());
        userDomain.setUserPassword(userModel.getPassword());
        UserDomain resultUserDomain = userDao.findCondition(userDomain);
        UserBean userBean = new UserBean();
        if(StringUtils.isNull(resultUserDomain)){
            MemberDomain memberDomain = new MemberDomain();
            memberDomain.setMemberTel(userModel.getPassword());
            memberDomain.setMemberPassword(userModel.getPassword());
            MemberDomain resultMemberDomain = memberDao.findCondition(memberDomain);
            userBean.setUserCode(resultMemberDomain.getMemberId());
            userBean.setUsername(resultMemberDomain.getMemberName());
            userBean.setUserMobile(resultMemberDomain.getMemberTel());
            userBean.setHeaderImg(resultMemberDomain.getMemberHeader());
        }else{
            userBean.setUsername(resultUserDomain.getUserName());
            userBean.setUserMobile(resultUserDomain.getUserTel());
            userBean.setHeaderImg(resultUserDomain.getUserHeader());
            userBean.setUserCode(resultUserDomain.getUserId());
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
            userDomain.setUpdater(userBean.getUserCode());
            userDomain.setUpdateTime(DateUtils.getSystemDate());
            userDao.update(userDomain);
        }else{
            userDao.insert(userDomain);
        }
    }

}
