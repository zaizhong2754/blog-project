package com.zz.pojo.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ValidateCodeVo {

    /**
     * 验证码的key
     */
    private String codeKey;

    /**
     * 图片验证码对应的字符串数据
     */
    private String codeValue;

}
