package com.zz.config.security;

import com.zz.utils.SecurityUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.*;

@Service("ps")
public class PermissionService {

    /**
     * 判断当前用户是否具有permission
     */
    public boolean hasPermission(String... args) {
        //如果是管理员,直接返回true
        UserDetailsImpl userDetails = SecurityUtil.getUserDetails();
        if(userDetails.getRoles().contains("admin")) {
            return true;
        }
        // 否则,获取当前登录用户所具有的权限列表,判断是否完全覆盖要判断的权限
        List<String> permissions = userDetails.getPermissions();
        return isContain(permissions, args);
    }

    /**
     * 判断当前用户是否具有role
     */
    public boolean hasRole(String... args) {
        //如果是管理员,直接返回true
        UserDetailsImpl userDetails = SecurityUtil.getUserDetails();
        if(userDetails.getRoles().contains("admin")) {
            return true;
        }
        // 否则,获取当前登录用户所具有的权限列表,判断是否完全覆盖要判断的权限
        List<String> roles = userDetails.getRoles();
        return isContain(roles, args);
    }

    private Boolean isContain(List<String> list, String... args) {
        List<String> argList = new ArrayList<>(Arrays.asList(args));
        List<String> uniqueList = new ArrayList<>(new HashSet<>(argList));
        for (String item : list) {
            if (uniqueList.contains(item)) {
                uniqueList.remove(item);
            }
        }
        return uniqueList.isEmpty();
    }

 }