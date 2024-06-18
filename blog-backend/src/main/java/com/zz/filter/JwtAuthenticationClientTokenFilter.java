package com.zz.filter;

import com.alibaba.fastjson2.JSON;
import com.zz.config.redis.RedisCache;
import com.zz.config.security.AuthenticationToRedis;
import com.zz.config.security.UserDetailsImpl;
import com.zz.constant.JwtClaimsConstant;
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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Objects;

// Client端的Jwt过滤器
@Component
@Slf4j
public class JwtAuthenticationClientTokenFilter extends OncePerRequestFilter {

    @Resource
    private RedisCache redisCache;

    @Resource
    private JwtProperties jwtProperties;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        //获取请求头中的token
        String token = request.getHeader(jwtProperties.getClientTokenName());
        if(!StringUtils.hasText(token)){
            //说明该接口不需要登录  直接放行
            filterChain.doFilter(request, response);
            return;
        }
        //解析获取userid
        Claims claims = null;
        try {
            claims = JwtUtil.parseJWT(jwtProperties.getClientSecretKey(),token);
            log.info(jwtProperties.getClientSecretKey());
            log.info(token);
            log.info(claims.toString());
            log.info(claims.get(JwtClaimsConstant.CLIENT_USER_ID).toString());
        } catch (Exception e) {
            e.printStackTrace();
            //token超时  token非法
            //响应告诉前端需要重新登录
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // http状态码401
            Result result = Result.error("需要登录后操作");
            WebUtil.renderString(response, JSON.toJSONString(result));
            return;
        }
        String userId = claims.get(JwtClaimsConstant.CLIENT_USER_ID).toString();

        UserDetailsImpl userDetails  = redisCache.getCacheObject("client:" + userId);
        // 如果从redis中获取不到principal
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
