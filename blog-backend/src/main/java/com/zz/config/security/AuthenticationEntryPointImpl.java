package com.zz.config.security;

import com.alibaba.fastjson2.JSON;
import com.zz.pojo.Result;
import com.zz.utils.WebUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import java.io.IOException;

// 认证失败处理
@Slf4j
public class AuthenticationEntryPointImpl implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        authException.printStackTrace();
        Result result = null;
        if(authException instanceof BadCredentialsException){
            log.error(authException.getLocalizedMessage());
            result = Result.error(authException.getLocalizedMessage());
        } else if(authException instanceof InsufficientAuthenticationException) {
            log.error("需要登录后操作");
            log.error(authException.getLocalizedMessage());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // http状态码401
            result = Result.error("需要登录后操作");
        } else {
            log.error("认证或授权失败");
            log.error(authException.getLocalizedMessage());
            result = Result.error("认证或授权失败");
        }
        //响应给前端
        WebUtil.renderString(response, JSON.toJSONString(result));
    }
}
