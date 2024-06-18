package com.zz.service;

import com.zz.pojo.Result;
import com.zz.pojo.entity.UploadFile;
import com.baomidou.mybatisplus.extension.service.IService;
import org.springframework.web.multipart.MultipartFile;

/**
* @author tom
* @description 针对表【t_upload_file(文件上传记录表)】的数据库操作Service
* @createDate 2024-04-13 23:45:51
*/
public interface UploadFileService extends IService<UploadFile> {

    Result uploadImage(MultipartFile file) throws Exception;
}
