package com.zz.controller.admin;

import com.zz.pojo.Result;
import com.zz.pojo.dto.LoginDto;
import com.zz.pojo.dto.RegisterDto;
import com.zz.service.UserService;
import com.zz.service.ValidateCodeService;
import jakarta.annotation.Resource;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/user")
public class AdminUserController {

    @Resource
    private UserService userService;

    @Resource
    private ValidateCodeService validateCodeService;

    @PostMapping("/login")
    public Result login(@Validated @RequestBody LoginDto loginDto) {
        return userService.loginToAdmin(loginDto);
    }

    @PostMapping("/logout")
    public Result logout() {
        return userService.logoutFromAdmin();
    }

    @PostMapping("/register")
    public Result register(@Validated @RequestBody RegisterDto registerDto){
        return userService.register(registerDto);
    }

    @GetMapping("/validate")
    public Result getValidateCode(){
        String type = "admin";
        return validateCodeService.generateValidateCode(type);
    }

    @GetMapping("/info")
    public Result userInfo(){
        return userService.adminUserInfo();
    }

}
