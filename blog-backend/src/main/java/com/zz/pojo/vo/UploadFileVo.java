package com.zz.pojo.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UploadFileVo {

    private Long id;

    /**
     * 文件名
     */
    private String fileName;

    /**
     * 文件地址
     */
    private String url;

    /**
     * 存储桶名
     */
    private String bucketName;

    /**
     * 文件状态 (0代表正式，1代表临时)
     */
    private String status;

}
