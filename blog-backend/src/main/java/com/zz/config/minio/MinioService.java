package com.zz.config.minio;

import io.minio.*;
import io.minio.http.Method;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
public class MinioService {

    @Resource
    private MinioClient minioClient;

    // makeBucket() 用于创建一个新的存储桶
    public String makeBucket(String bucketName) throws Exception {
        boolean isBucketExists = minioClient.bucketExists(BucketExistsArgs.builder().bucket(bucketName).build());
        if (isBucketExists) {
            log.info("bucket已存在");
        } else {
            minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucketName).build());
            setBucketPolicy(bucketName);
        }
        return bucketName;
    }

    // setBucketPolicy() 用于设置一个存储桶中文件的访问策略，例如设置允许公共读
    public void setBucketPolicy(String bucketName) throws Exception {
        String policyJsonString = "{\"Version\":\"2012-10-17\"," +
                "\"Statement\":[{\"Sid\":\"PublicRead\",\"Effect\":\"Allow\",\"Principal\":{\"AWS\":[\"*\"]},\"Action\":[\"s3:GetObject\"],\"Resource\":[\"arn:aws:s3:::"
                + bucketName +"/*\"]}]}";
        minioClient.setBucketPolicy(SetBucketPolicyArgs.builder()
                .bucket(bucketName)
                .config(policyJsonString)
                .build());
    }

    // putObject() 用于上传文件到指定的存储桶
    public String putObject(String bucketName, MultipartFile file) throws Exception {
        String originName = file.getOriginalFilename();
        String ex = (String) originName.subSequence(originName.lastIndexOf(".")+1,
                originName.length());
        String fileName = UUID.randomUUID().toString().replaceAll("-", "") + "." + ex;

        ObjectWriteResponse objectWriteResponse = minioClient.putObject(PutObjectArgs.builder()
                .bucket(bucketName)
                .object(fileName)
                .stream(file.getInputStream(), file.getSize(), -1)
                .build());
        log.info(String.valueOf(objectWriteResponse));
        return fileName;
    }

    // getPresignedObjectUrl() 用于生成一个文件的签名URL，以便可以通过HTTP直接访问
    public String getPresignedObjectUrl(String bucketName, String fileName) throws Exception {
        String presignedObjectUrl = minioClient.getPresignedObjectUrl(GetPresignedObjectUrlArgs.builder()
                .bucket(bucketName)
                .object(fileName)
                .method(Method.GET)
                .build());
        String url = (String) presignedObjectUrl.subSequence(0, presignedObjectUrl.lastIndexOf("?"));
        log.info("文件上传后，返回的url路径: {}", url);
        return url;
    }

    // removeObject() 用于删除文件
    public void removeObject(String bucketName, String fileName) throws Exception {
        minioClient.removeObject(RemoveObjectArgs.builder()
                .bucket(bucketName)
                .object(fileName)
                .build());
    }
}
