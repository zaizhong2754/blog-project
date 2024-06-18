package com.zz.service.impl;

import cn.hutool.captcha.CaptchaUtil;
import cn.hutool.captcha.CircleCaptcha;
import com.zz.config.redis.RedisCache;
import com.zz.pojo.Result;
import com.zz.pojo.vo.ValidateCodeVo;
import com.zz.service.ValidateCodeService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
public class ValidateCodeServiceImpl implements ValidateCodeService {

    @Resource
    private RedisCache redisCache;

    @Override
    public Result generateValidateCode(String type) {

        // 使用hutool工具包中的工具类生成图片验证码
        //参数：宽  高  验证码位数 干扰线数量
        CircleCaptcha circleCaptcha = CaptchaUtil.createCircleCaptcha(150, 48, 4, 20);
        String codeValue = circleCaptcha.getCode();//4位验证码值
        String imageBase64 = circleCaptcha.getImageBase64();//返回图片验证码base64编码

        // 生成uuid作为图片验证码的key
        String codeKey = UUID.randomUUID().toString().replace("-", "");

        // 将验证码存储到Redis中，缓存时间5分钟
        redisCache.setCacheObject(type + ":validatecode:" + codeKey , codeValue, 5, TimeUnit.MINUTES);

        // 构建响应结果数据
        ValidateCodeVo validateCodeVo = new ValidateCodeVo() ;
        validateCodeVo.setCodeKey(codeKey);
        validateCodeVo.setCodeValue("data:image/png;base64," + imageBase64);

        return Result.success(validateCodeVo);
    }

}
