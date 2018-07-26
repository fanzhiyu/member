package com.member.core.filter;

import com.alibaba.fastjson.JSONObject;
import com.easy.core.constant.Constant;
import com.easy.core.manager.Manager;
import com.easy.core.util.JwtUtil;
import com.easy.core.util.StringUtils;
import com.easy.core.util.UserUtils;
import com.member.core.config.Config;
import com.member.core.contsant.MemberMessage;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Created by apple on 17/10/13.
 */
@Component
public class AppFilter implements Filter {

    private final Logger logger = LoggerFactory.getLogger(AppFilter.class);

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private Config config;

    @Autowired
    private UserUtils userUtils;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException,ServletException {
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token, refreshToken, validToken");
        response.setContentType("application/json; charset=utf-8");
        String uri = request.getRequestURI();
        String contextPath = request.getContextPath();
        String url = uri.replace(contextPath, "");
        String[] filters = StringUtils.split(config.getFilterUrl(),",");
        boolean filter = config.isFilter() ? false : true;
        logger.info("*************************"+filter);
        if(!filter){
            for(String flt : filters){
                if(flt.endsWith("*") && flt.startsWith(flt.replace("*",""))
                        || url.contains(flt) || "/".equals(url)){
                    filter = true;
                    break;
                }
            }
            PrintWriter out = null;
            JSONObject json = new JSONObject();
            if(!filter){
                String token = StringUtils.isNotNull(request.getHeader("token"))?request.getHeader("token"):
                        request.getParameter("token");
                if(StringUtils.isNull(token)){
                    json.put("code", Constant.TOKEN_NULL);
                    json.put("msg", Manager.getMessage(MemberMessage.MEB1007));
                }else{
                    try{
                        Claims claims = jwtUtil.parseJWT(token);
                        if(StringUtils.isNotNull(claims)){
                            filter = true;
                        }
                    }catch (ExpiredJwtException e){
                        String refreshToken = request.getHeader("refreshToken");
                        if(StringUtils.isNotNull(refreshToken)){
                            try {
                                Object userBean = userUtils.getUser(refreshToken);
                                String subject = jwtUtil.generalSubject(userBean);
                                String refToken = jwtUtil.createJWT(Constant.JWT_ID, subject);
                                String refresh = jwtUtil.createJWT(Constant.JWT_ID,subject, Constant.JWT_REFRESH_TTL);
                                json.put("token",refToken);
                                json.put("refreshToken",refresh);
                                logger.info("***************>> token refresh");
                            } catch (Exception e1) {
                                e1.printStackTrace();
                            }
                        }
                        json.put("code", Constant.TOKEN_INVALID);
                        json.put("msg", Manager.getMessage(MemberMessage.MEB1003));
                    } catch (MalformedJwtException e){
                        json.put("code", Constant.TOKEN_ERROR);
                        json.put("msg", Manager.getMessage(MemberMessage.MEB1003));
                    }
                }

                if(json.size() > 0){
                    out = response.getWriter();
                    out.append(json.toString());
                    out.close();
                }
            }
        }
        if(filter){
            filterChain.doFilter(request, response);
        }
    }

    @Override
    public void destroy() {

    }
}
