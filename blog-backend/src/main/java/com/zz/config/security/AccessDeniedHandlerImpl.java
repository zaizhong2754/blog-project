package com.zz.config.security;

import com.alibaba.fastjson2.JSON;
import com.zz.pojo.Result;
import com.zz.utils.WebUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Slf4j
public class AccessDeniedHandlerImpl implements AccessDeniedHandler {
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        accessDeniedException.printStackTrace();
        log.error("无权限操作");
        response.setStatus(HttpServletResponse.SC_FORBIDDEN); // http状态码403
        Result result = Result.error("无权限操作");
        //响应给前端
        WebUtil.renderString(response, JSON.toJSONString(result));
    }
}
