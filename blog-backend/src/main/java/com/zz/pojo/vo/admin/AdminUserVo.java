package com.zz.pojo.vo.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminUserVo {

    private String token;

    private AdminUserInfoVo user;

    private List<String> roles;

    private List<String> permissions;

    private List<MenuVo> menus;

}
