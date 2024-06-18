package com.zz.config.security;

import com.zz.filter.JwtAuthenticationAdminTokenFilter;
import com.zz.filter.JwtAuthenticationClientTokenFilter;
import jakarta.annotation.Resource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.access.expression.method.DefaultMethodSecurityExpressionHandler;
import org.springframework.security.access.expression.method.MethodSecurityExpressionHandler;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity // 开启SpringSecurity的自定义配置(在SpringBoot项目中可以省略此注解)
@EnableMethodSecurity
public class WebSecurityConfig {

    @Resource
    private JwtAuthenticationClientTokenFilter jwtAuthenticationClientTokenFilter;

    @Resource
    private JwtAuthenticationAdminTokenFilter jwtAuthenticationAdminTokenFilter;

    // bcrypt算法加密器，用来对密码进行哈希
    @Bean
    public PasswordEncoder passwordEncoder() {
        // BCryptPasswordEncoder参数：strength加密强度，默认值是10，最小值是4，最大值是31，值越大运算速度越慢
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        // 将Client端和Admin端的Jwt过滤器添加到SpringSecurity的过滤器链中
        http.addFilterBefore(jwtAuthenticationClientTokenFilter, UsernamePasswordAuthenticationFilter.class);
        http.addFilterBefore(jwtAuthenticationAdminTokenFilter, UsernamePasswordAuthenticationFilter.class);

        // 关闭csrf攻击防御
        http.csrf(csrf -> csrf.disable());

        // 不通过session获取SecurityContext
        http.sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        // 开启授权保护
        http.authorizeHttpRequests(
                authorize -> authorize
                        .requestMatchers("/client/user/login").anonymous() // anonymous允许匿名访问登录接口
                        .requestMatchers("/client/user/logout").authenticated() // 访问注销接口需要认证
                        .requestMatchers("/client/user/info").authenticated() // 访问用户信息接口需要认证
                        .requestMatchers("/client/articleComment/primary/send").authenticated() // 发送文章的一级评论接口需要认证
                        .requestMatchers("/client/articleComment/secondary/send").authenticated() // 发送文章的二级评论接口需要认证
                        .requestMatchers("/client/messageBoard/primary/send").authenticated() // 发送留言的一级评论接口需要认证
                        .requestMatchers("/client/messageBoard/secondary/send").authenticated() // 发送留言的二级评论接口需要认证
                        .requestMatchers("/client/image/upload").authenticated() // 图片上传接口需要认证
                        .requestMatchers("/client/link/send").authenticated() // 友链提交接口需要认证
                        .requestMatchers("/admin/user/login").anonymous() // anonymous允许匿名访问登录接口
                        .requestMatchers("/admin/user/logout").authenticated() // 访问注销接口需要认证
                        .requestMatchers("/admin/user/info").authenticated() // 访问用户信息接口需要认证
                        .requestMatchers("/admin/tag/add").authenticated() // 新增标签接口需要认证
                        .requestMatchers("/admin/tag/delete/{id}").authenticated() // 删除标签接口需要认证
                        .requestMatchers(HttpMethod.GET,"/admin/tag/{id}").authenticated() // 查询标签接口需要认证
                        .requestMatchers(HttpMethod.PUT,"/admin/tag/{id}").authenticated() // 修改标签接口需要认证
                        .requestMatchers("/admin/category/add").authenticated() // 新增分类接口需要认证
                        .requestMatchers("/admin/category/delete/{id}").authenticated() // 删除分类接口需要认证
                        .requestMatchers(HttpMethod.GET,"/admin/category/{id}").authenticated() // 查询分类接口需要认证
                        .requestMatchers(HttpMethod.PUT,"/admin/category/{id}").authenticated() // 修改分类接口需要认证
                        .anyRequest().permitAll() // 其它接口都关闭授权保护，放行
        );

        // 关闭默认的注销页
        http.logout(logout->logout.disable());

        // 异常处理器
        http.exceptionHandling(exception -> {
            // 认证失败处理
            exception.authenticationEntryPoint(new AuthenticationEntryPointImpl());
            // 授权失败处理
            exception.accessDeniedHandler(new AccessDeniedHandlerImpl());
        });

        return http.build();
    }

    // 登录时需要调用AuthenticationManager.authenticate执行一次校验
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

}