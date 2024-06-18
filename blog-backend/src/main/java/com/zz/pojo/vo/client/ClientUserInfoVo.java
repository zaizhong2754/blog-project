package com.zz.pojo.vo.client;

import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;

@Data
@Accessors(chain = true)
public class ClientUserInfoVo implements Serializable {

    private Long id;

    private String nickName;

    private String avatar;

    private String sex;

    private String email;

}
