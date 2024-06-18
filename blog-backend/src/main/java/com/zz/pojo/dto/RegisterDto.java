package com.zz.pojo.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterDto {

    // 用户名
    @NotBlank(message = "用户名不能为空")
    private String userName;

    // 昵称
    @NotBlank(message = "昵称不能为空")
    private String nickName;

    // 邮箱
    @NotBlank(message = "邮箱不能为空")
    private String email;

    // 密码
    @NotBlank(message = "密码不能为空")
    private String password;

}
