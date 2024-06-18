package com.zz.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "custom.jwt")
@Data
public class JwtProperties {

    // 用户端生成jwt令牌相关配置
    private String clientSecretKey;
    private long clientTtl;
    private String clientTokenName;

    // 管理端生成jwt令牌相关配置
    private String adminSecretKey;
    private long adminTtl;
    private String adminTokenName;

}
