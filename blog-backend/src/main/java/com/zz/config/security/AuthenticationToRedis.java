package com.zz.config.security;

import com.zz.pojo.vo.admin.AdminUserInfoVo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationToRedis {

    private Object principal;

    private List<String> roles;

    private List<String> permissions;

}
