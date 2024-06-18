package com.zz.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "custom.minio")
@Data
public class MinioProperties {

    // minio相关配置
    private String endpoint;
    private String accessKey;
    private String secretKey;

}
