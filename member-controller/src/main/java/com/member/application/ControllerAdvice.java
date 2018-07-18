package com.member.application;

import com.easy.core.constant.Constant;
import com.easy.core.exception.MessageException;
import com.easy.core.manager.Manager;
import com.easy.core.util.ResponseUtil;
import com.member.core.contant.MemberMessage;
import io.jsonwebtoken.ExpiredJwtException;
import org.omg.CORBA.SystemException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.BadSqlGrammarException;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * Created by apple on 17/8/31.
 */
@org.springframework.web.bind.annotation.ControllerAdvice
public class ControllerAdvice {
    private static final Logger logger = LoggerFactory.getLogger(ControllerAdvice.class);
    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<Object> errorHandler(Exception ex) {
        ex.printStackTrace();
        logger.error(ex.getMessage());
        return ResponseUtil.exception(Manager.getMessage(MemberMessage.PK1002));
    }

    /**
     * 拦截捕捉自定义异常 MyException.class
     * @param e
     * @return
     */
    @ExceptionHandler(value = SystemException.class)
    public ResponseEntity<Object> systemException(SystemException e) {
        e.printStackTrace();
        logger.error(e.getMessage());
        return ResponseUtil.exception(e.getMessage());
    }

    /**
     * token 过期
     * @return
     */
    @ExceptionHandler(value = ExpiredJwtException.class)
    public ResponseEntity<Object>  expiredJwtException(){
        return ResponseUtil.customSuccess(Constant.TOKEN_INVALID, Manager.getMessage(MemberMessage.PK1003));
    }

    /**
     * 后天验证
     * @param e
     * @return
     */
    @ExceptionHandler(value = MessageException.class)
    public ResponseEntity<Object>  messageException(MessageException e){
        return ResponseUtil.customError(Constant.ERROR_CODE,e.getMessage());
    }

    /**
     * sql错误
     * @param e
     * @return
     */
    @ExceptionHandler(value = BadSqlGrammarException.class)
    public ResponseEntity<Object> mySQLSyntaxErrorException(BadSqlGrammarException e){
        e.printStackTrace();
        logger.error(e.getMessage());
        return ResponseUtil.customError(Constant.SYS_ERROR_CODE, Manager.getMessage(MemberMessage.PK1004));
    }
}