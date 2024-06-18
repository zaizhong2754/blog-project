package com.zz.config.security;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.zz.mapper.PermissionMapper;
import com.zz.mapper.RoleMapper;
import com.zz.mapper.UserMapper;
import com.zz.pojo.entity.User;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Slf4j
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Resource
    private UserMapper userMapper;

    @Resource
    private PermissionMapper permissionMapper;

    @Resource
    private RoleMapper roleMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // 根据用户名查询用户信息
        LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(User::getUserName, username);
        User user = userMapper.selectOne(wrapper);

        // 如果查询不到数据就通过抛出异常来给出提示
        if (Objects.isNull(user)) {
            throw new UsernameNotFoundException("用户名不存在");
        }

        // 根据用户查询角色信息后，添加到 UserDetailsImpl 中
        List<String> roles = roleMapper.selectRolesByUserId(user.getId());

        // 根据用户查询权限信息后，添加到 UserDetailsImpl 中
        List<String> permissions = permissionMapper.selectPermissionsByUserId(user.getId());

        return new UserDetailsImpl(user, roles, permissions);
    }

}
