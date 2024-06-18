package com.zz.pojo.vo.admin;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class AdminUserInfoVo {

    private Long id;

    private String nickName;

    private String avatar;

    private String sex;

    private String email;

}
