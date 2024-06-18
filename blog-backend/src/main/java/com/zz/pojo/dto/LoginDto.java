package com.zz.pojo.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginDto {

    // 用户名
    @NotBlank(message = "用户名不能为空")
    private String userName;

    // 密码
    @NotBlank(message = "密码不能为空")
    private String password;

    // 提交验证码
    @NotBlank(message = "提交的验证码不能为空")
    private String captcha;

    // 验证码key
    @NotBlank(message = "验证码key不能为空")
    private String codeKey;
}
