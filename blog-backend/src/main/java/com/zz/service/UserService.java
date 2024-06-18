package com.zz.service;

import com.zz.pojo.Result;
import com.zz.pojo.dto.LoginDto;
import com.zz.pojo.dto.RegisterDto;
import com.zz.pojo.entity.User;
import com.baomidou.mybatisplus.extension.service.IService;

/**
* @author tom
* @description 针对表【t_user(用户表)】的数据库操作Service
* @createDate 2024-03-10 22:47:36
*/
public interface UserService extends IService<User> {

    Result loginToClient(LoginDto loginDto);

    Result logoutFromClient();

    Result loginToAdmin(LoginDto loginDto);

    Result logoutFromAdmin();

    Result register(RegisterDto registerDto);

    Result clientUserInfo();

    Result adminUserInfo();
}
