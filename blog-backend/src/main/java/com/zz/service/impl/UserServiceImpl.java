package com.zz.service.impl;

import cn.hutool.core.util.StrUtil;
import com.alibaba.fastjson2.JSON;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.zz.config.redis.RedisCache;
import com.zz.config.security.AuthenticationToRedis;
import com.zz.config.security.UserDetailsImpl;
import com.zz.constant.JwtClaimsConstant;
import com.zz.constant.TerminalTypeConstant;
import com.zz.exception.SystemException;
import com.zz.mapper.MenuMapper;
import com.zz.mapper.PermissionMapper;
import com.zz.mapper.RoleMapper;
import com.zz.pojo.Result;
import com.zz.pojo.dto.LoginDto;
import com.zz.pojo.dto.RegisterDto;
import com.zz.pojo.entity.Menu;
import com.zz.pojo.entity.User;
import com.zz.pojo.vo.admin.AdminUserInfoVo;
import com.zz.pojo.vo.admin.AdminUserVo;
import com.zz.pojo.vo.admin.MenuVo;
import com.zz.pojo.vo.client.ClientUserInfoVo;
import com.zz.pojo.vo.client.ClientUserVo;
import com.zz.properties.JwtProperties;
import com.zz.service.UserService;
import com.zz.mapper.UserMapper;
import com.zz.utils.BeanCopyUtil;
import com.zz.utils.JwtUtil;
import com.zz.utils.SecurityUtil;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

/**
* @author tom
* @description 针对表【t_user(用户表)】的数据库操作Service实现
* @createDate 2024-03-10 22:47:36
*/
@Service
@Slf4j
public class UserServiceImpl extends ServiceImpl<UserMapper, User>
    implements UserService{

    @Resource
    private AuthenticationManager authenticationManager;

    @Resource
    private JwtProperties jwtProperties;

    @Resource
    private RedisCache redisCache;

    @Resource
    private PasswordEncoder passwordEncoder;

    @Resource
    private PermissionMapper permissionMapper;

    @Resource
    private RoleMapper roleMapper;

    @Resource
    private MenuMapper menuMapper;

    // 登录
    @Override
    public Result loginToClient(LoginDto loginDto) {

        // 校验验证码是否正确
        String captcha = loginDto.getCaptcha();     // 用户输入的验证码
        String codeKey = loginDto.getCodeKey();     // redis中验证码的数据key

        // 从Redis中获取验证码
        String redisCode = redisCache.getCacheObject("client:validatecode:" + codeKey);
        if(StrUtil.isEmpty(redisCode) || !StrUtil.equalsIgnoreCase(redisCode , captcha)) {
            throw new RuntimeException("验证码错误");
        }

        // 验证通过删除redis中的验证码
        redisCache.deleteObject("client:validatecode:" + codeKey);

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginDto.getUserName(),loginDto.getPassword());
        Authentication authentication = authenticationManager.authenticate(authenticationToken);

        // 判断是否认证通过
        if(Objects.isNull(authentication)){
            throw new RuntimeException("用户名或密码错误");
        }

        // 获取userid
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Long userId = userDetails.getUser().getId();

        // 根据用户id查询角色信息
        List<String> roles = roleMapper.selectRolesByUserId(userId);
        // 根据用户id查询权限信息
        List<String> permissions = permissionMapper.selectPermissionsByUserId(userId);
        userDetails.setRoles(roles);
        userDetails.setPermissions(permissions);

        // 根据用户id查询token
        Map<String, Object> claims = new HashMap<>();
        claims.put(JwtClaimsConstant.CLIENT_USER_ID, userId);
        String jwt = JwtUtil.createJWT(jwtProperties.getClientSecretKey(), jwtProperties.getClientTtl(), claims);

        // 把principal存入redis
        AuthenticationToRedis authenticationToRedis = new AuthenticationToRedis(authentication.getPrincipal(), roles ,permissions);
        redisCache.setCacheObject(TerminalTypeConstant.CLIENT+":"+userId.toString(), userDetails);

        ClientUserInfoVo clientUserInfoVo = BeanCopyUtil.copyBean(userDetails.getUser(), ClientUserInfoVo.class);
        ClientUserVo clientUserVo = new ClientUserVo(jwt, clientUserInfoVo);

        return Result.success(clientUserVo);

    }

    @Override
    public Result loginToAdmin(LoginDto loginDto) {

        // 校验验证码是否正确
        String captcha = loginDto.getCaptcha();     // 用户输入的验证码
        String codeKey = loginDto.getCodeKey();     // redis中验证码的数据key

        // 从Redis中获取验证码
        String redisCode = redisCache.getCacheObject("admin:validatecode:" + codeKey);
        if(StrUtil.isEmpty(redisCode) || !StrUtil.equalsIgnoreCase(redisCode , captcha)) {
            throw new RuntimeException("验证码错误");
        }

        // 验证通过删除redis中的验证码
        redisCache.deleteObject("admin:validatecode:" + codeKey);

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginDto.getUserName(),loginDto.getPassword());
        Authentication authentication = authenticationManager.authenticate(authenticationToken);

        // 判断是否认证通过
        if(Objects.isNull(authentication)){
            throw new RuntimeException("用户名或密码错误");
        }

        // 获取userid
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Long userId = userDetails.getUser().getId();

        // 根据用户id查询角色信息
        List<String> roles = roleMapper.selectRolesByUserId(userId);
        // 根据用户id查询权限信息
        List<String> permissions = permissionMapper.selectPermissionsByUserId(userId);
        // 根据用户id查询菜单信息
        List<MenuVo> menus = menuMapper.selectMenusByUserId(userId);
        userDetails.setRoles(roles);
        userDetails.setPermissions(permissions);

        // 根据用户id查询token
        Map<String, Object> claims = new HashMap<>();
        claims.put(JwtClaimsConstant.ADMIN_USER_ID, userId);
        String jwt = JwtUtil.createJWT(jwtProperties.getAdminSecretKey(), jwtProperties.getAdminTtl(), claims);

        // 把principal存入redis
        AuthenticationToRedis authenticationToRedis = new AuthenticationToRedis(authentication.getPrincipal(), roles ,permissions);
        redisCache.setCacheObject(TerminalTypeConstant.ADMIN+":"+userId.toString(), userDetails);

        // 构建UserVo
        AdminUserInfoVo adminUserInfoVo = BeanCopyUtil.copyBean(userDetails.getUser(), AdminUserInfoVo.class);
        AdminUserVo adminUserVo = new AdminUserVo(jwt, adminUserInfoVo, roles, permissions, menus);

        return Result.success(adminUserVo);

    }

    // 退出
    @Override
    public Result logoutFromClient() {

        // 获取当前用户id
        Long userId = SecurityUtil.getUserId();
        // 删除redis中的用户信息
        redisCache.deleteObject(TerminalTypeConstant.CLIENT+":"+userId);

        return Result.success();

    }

    @Override
    public Result logoutFromAdmin() {

        // 获取当前用户id
        Long userId = SecurityUtil.getUserId();
        // 删除redis中的用户信息
        redisCache.deleteObject(TerminalTypeConstant.ADMIN+":"+userId);

        return Result.success();

    }

    // 注册
    @Override
    public Result register(RegisterDto registerDto) {

        // 对数据进行是否存在的判断
        if(checkUniqueUserName(registerDto.getUserName())){
            throw new SystemException("用户名已存在");
        }
        if(checkUniqueNickName(registerDto.getNickName())){
            throw new SystemException("昵称已存在");
        }

        // 对密码进行加密
        String encodePassword = passwordEncoder.encode(registerDto.getPassword());
        registerDto.setPassword(encodePassword);

        User user = BeanCopyUtil.copyBean(registerDto, User.class);
        log.info(user.toString());

        //存入数据库
        save(user);

        return Result.success();

    }

    private boolean checkUniqueUserName(String userName) {

        LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(User::getUserName, userName);

        return count(wrapper) > 0;
    }

    private boolean checkUniqueNickName(String nickName) {

        LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(User::getNickName, nickName);

        return count(wrapper) > 0;
    }

    // 获取用户信息
    @Override
    public Result clientUserInfo() {

        // 获取当前用户id
        Long userId = SecurityUtil.getUserId();
        // 根据用户id查询用户信息
        User user = getById(userId);
        // 封装成UserInfoVo
        ClientUserInfoVo clientUserInfoVo = BeanCopyUtil.copyBean(user, ClientUserInfoVo.class);

        return Result.success(clientUserInfoVo);

    }

    @Override
    public Result adminUserInfo() {

        UserDetailsImpl userDetails = SecurityUtil.getUserDetails();
        // 获取用户信息，封装成UserInfoVo
        User user = userDetails.getUser();
        AdminUserInfoVo adminUserInfoVo = BeanCopyUtil.copyBean(user, AdminUserInfoVo.class);
        // 获取角色信息
        List<String> roles = userDetails.getRoles();
        // 获取权限信息
        List<String> permissions = userDetails.getPermissions();

        // 获取当前用户id
        Long userId = SecurityUtil.getUserId();
        // 根据用户id查询token
        Map<String, Object> claims = new HashMap<>();
        claims.put(JwtClaimsConstant.ADMIN_USER_ID, userId);
        String jwt = JwtUtil.createJWT(jwtProperties.getAdminSecretKey(), jwtProperties.getAdminTtl(), claims);
        // 根据用户id查询菜单信息
        List<MenuVo> menus = menuMapper.selectMenusByUserId(userId);

        AdminUserVo adminUserVo = new AdminUserVo(jwt, adminUserInfoVo, roles, permissions, menus);

        return Result.success(adminUserVo);

    }

}




