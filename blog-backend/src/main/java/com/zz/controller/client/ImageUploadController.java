package com.zz.controller.client;

import com.zz.pojo.Result;
import com.zz.service.UploadFileService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/client/image")
public class ImageUploadController {

    @Resource
    private UploadFileService uploadFileService;

    @PostMapping("/upload")
    public Result uploadImage(MultipartFile file) throws Exception {
        return uploadFileService.uploadImage(file);
    }
}
