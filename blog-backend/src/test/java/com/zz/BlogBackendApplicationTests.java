package com.zz;

import io.minio.*;
import io.minio.errors.*;
import io.minio.http.Method;
import io.minio.messages.Bucket;
import io.minio.messages.Item;
import jakarta.annotation.Resource;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.concurrent.TimeUnit;

@SpringBootTest
class BlogBackendApplicationTests {

    @Resource
    private MinioClient minioClient;

    @Test
    void contextLoads() {
    }

    @Test
    // bucketExists() 用于检查指定的存储桶是否存在
    void bucketExists() throws Exception {
        boolean isBucketExists = minioClient.bucketExists(BucketExistsArgs.builder().bucket("myfile").build());
        System.out.println("myfile存储桶是否存在: "+isBucketExists);
    }

    @Test
    // makeBucket() 用于创建一个新的存储桶
    void makeBucket() throws Exception {
        boolean isBucketExists = minioClient.bucketExists(BucketExistsArgs.builder().bucket("myfile").build());
        if (isBucketExists) {
            System.out.println("bucket已存在");
        } else {
            minioClient.makeBucket(MakeBucketArgs.builder().bucket("myfile").build());
        }
    }

    @Test
    // setBucketPolicy() 用于设置一个存储桶中文件的访问策略，例如设置允许公共读
    void setBucketPolicy() throws Exception {
        String policyJsonString = "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Sid\":\"PublicRead\",\"Effect\":\"Allow\",\"Principal\":{\"AWS\":[\"*\"]},\"Action\":[\"s3:GetObject\"],\"Resource\":[\"arn:aws:s3:::myfile/*\"]}]}";
        minioClient.setBucketPolicy(SetBucketPolicyArgs.builder()
                .bucket("myfile")
                .config(policyJsonString)
                .build());
    }

    @Test
    // listBuckets() 用于列出用户有权访问的所有存储桶
    void listBuckets() throws Exception {
        List<Bucket> buckets = minioClient.listBuckets();
        buckets.forEach(bucket->{
            System.out.println(bucket);
        });
    }

    @Test
    // removeBucket() 用于删除一个已存在的存储桶
    void removeBucket() throws Exception {
        minioClient.removeBucket(RemoveBucketArgs.builder().bucket("myfile").build());
    }

    @Test
    // putObject() 用于上传文件到指定的存储桶
    void putObject() throws Exception {
        File file = new File("C:\\Users\\tom\\Desktop\\emoji\\weibo_lovely.png");
        ObjectWriteResponse objectWriteResponse = minioClient.putObject(PutObjectArgs.builder()
                .bucket("myfile")
                .object("test.png")
                .stream(new FileInputStream(file), file.length(), -1)
                .build());
        System.out.println(objectWriteResponse);
    }

    @Test
    // uploadObject() 用于上传文件到指定的存储桶，比putObject()简单
    void uploadObject() throws Exception {
        ObjectWriteResponse objectWriteResponse = minioClient.uploadObject(UploadObjectArgs.builder()
                .bucket("myfile")
                .object("test2.png")
                .filename("C:\\Users\\tom\\Desktop\\emoji\\weibo_lovely.png")
                .build());
        System.out.println(objectWriteResponse);
    }

    @Test
    // statObject() 用于检查指定的文件是否存在
    void statObject() throws Exception {
        StatObjectResponse statObjectResponse = minioClient.statObject(StatObjectArgs.builder()
                .bucket("myfile")
                .object("test.png")
                .build());
        System.out.println("指定文件的信息: "+statObjectResponse);
    }

    @Test
    // getPresignedObjectUrl() 用于生成一个文件的签名URL，以便可以通过HTTP直接访问
    void getPresignedObjectUrl() throws Exception {
        String presignedObjectUrl = minioClient.getPresignedObjectUrl(GetPresignedObjectUrlArgs.builder()
                .bucket("myfile")
                .object("test.png")
                .expiry(3, TimeUnit.MINUTES) // 可选，指定有效期
                .method(Method.GET)
                .build());
        String url = (String) presignedObjectUrl.subSequence(0, presignedObjectUrl.lastIndexOf("?"));
        System.out.println("文件上传后，返回的url路径: " + url);
    }

    @Test
    // getObject() 用于下载文件
    void getObject() throws Exception {
        GetObjectResponse objectResponse = minioClient.getObject(GetObjectArgs.builder()
                .bucket("myfile")
                .object("test.png")
                .build());
        objectResponse.transferTo(new FileOutputStream("C:\\Users\\tom\\Downloads\\test.png"));
    }

    @Test
    // listObjects() 用于列出存储桶下的所有文件
    void listObjects() throws Exception {
        Iterable<Result<Item>> listObjects = minioClient.listObjects(ListObjectsArgs.builder()
                .bucket("myfile")
                .build());
        listObjects.forEach(listObject->{
            try {
                Item item = listObject.get();
                System.out.println(item.objectName());
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        });
    }

    @Test
    // removeObject() 用于删除文件
    void removeObject() throws Exception {
        minioClient.removeObject(RemoveObjectArgs.builder()
                .bucket("myfile")
                .object("test2.png")
                .build());
    }
}
