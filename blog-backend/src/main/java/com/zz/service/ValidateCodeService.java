package com.zz.service;

import com.zz.pojo.Result;

public interface ValidateCodeService {

    // 获取验证码图片
    Result generateValidateCode(String type);

}