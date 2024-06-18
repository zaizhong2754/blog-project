package com.zz.pojo.vo.client;

import com.zz.pojo.vo.client.ClientUserInfoVo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClientUserVo {

    private String token;

    private ClientUserInfoVo userInfo;

}
