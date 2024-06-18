package com.zz.filter;

import com.alibaba.fastjson2.JSON;
import com.zz.config.redis.RedisCache;
import com.zz.config.security.UserDetailsImpl;
import com.zz.constant.JwtClaimsConstant;
import com.zz.constant.TerminalTypeConstant;
import com.zz.pojo.Result;
import com.zz.properties.JwtProperties;
import com.zz.utils.JwtUtil;
import com.zz.utils.WebUtil;
import io.jsonwebtoken.Claims;
import jakarta.annotation.Resource;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Objects;

// Admin端的Jwt过滤器
@Component
@Slf4j
public class JwtAuthenticationAdminTokenFilter extends OncePerRequestFilter {

    @Resource
    private RedisCache redisCache;

    @Resource
    private JwtProperties jwtProperties;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        //获取请求头中的token
        String token = request.getHeader(jwtProperties.getAdminTokenName());
        if(!StringUtils.hasText(token)){
            //说明该接口不需要登录  直接放行
            filterChain.doFilter(request, response);
            return;
        }
        //解析获取userid
        Claims claims = null;
        try {
            claims = JwtUtil.parseJWT(jwtProperties.getAdminSecretKey(),token);
            log.info(jwtProperties.getAdminSecretKey());
            log.info(token);
            log.info(claims.toString());
            log.info(claims.get(JwtClaimsConstant.ADMIN_USER_ID).toString());
        } catch (Exception e) {
            e.printStackTrace();
            //token超时  token非法
            //响应告诉前端需要重新登录
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // http状态码401
            Result result = Result.error("需要登录后操作");
            WebUtil.renderString(response, JSON.toJSONString(result));
            return;
        }
        String userId = claims.get(JwtClaimsConstant.ADMIN_USER_ID).toString();
        //从redis中获取用户信息
        UserDetailsImpl userDetails = redisCache.getCacheObject(TerminalTypeConstant.ADMIN+":"+userId);

        //如果获取不到
        if(Objects.isNull(userDetails)){
            //说明登录过期  提示重新登录
            log.error("需要登录后操作");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // http状态码401
            Result result = Result.error("需要登录后操作");
            WebUtil.renderString(response, JSON.toJSONString(result));
            return;
        }
        // 否则，将authenticationToRedis中的信息存入SecurityContextHolder
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                null);
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);

        filterChain.doFilter(request, response);

    }

}
