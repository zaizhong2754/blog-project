package com.zz.utils;

import com.zz.config.security.UserDetailsImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@Slf4j
public class SecurityUtil {

    /**
     * 获取Authentication
     */
    public static Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    /**
     * 获取UserDetails
     **/
    public static UserDetailsImpl getUserDetails() {
        return (UserDetailsImpl) getAuthentication().getPrincipal();
    }

    /**
     * 获取UserId
     **/
    public static Long getUserId() {
        return getUserDetails().getUser().getId();
    }

}
