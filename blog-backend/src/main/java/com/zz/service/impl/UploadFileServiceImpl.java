package com.zz.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.zz.config.minio.MinioService;
import com.zz.constant.UploadFileStatusConstant;
import com.zz.pojo.Result;
import com.zz.pojo.entity.UploadFile;
import com.zz.pojo.vo.UploadFileVo;
import com.zz.service.UploadFileService;
import com.zz.mapper.UploadFileMapper;
import com.zz.utils.BeanCopyUtil;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
* @author tom
* @description 针对表【t_upload_file(文件上传记录表)】的数据库操作Service实现
* @createDate 2024-04-13 23:45:51
*/
@Service
public class UploadFileServiceImpl extends ServiceImpl<UploadFileMapper, UploadFile>
    implements UploadFileService{

    @Resource
    private MinioService minioService;

    @Override
    public Result uploadImage(MultipartFile file) throws Exception {

        if (file.isEmpty()) {
            return Result.error("图片不能为空");
        }
        String allowType = "gif,jpg,bmp,png,jpeg";
        String originName = file.getOriginalFilename();

        String ex = (String) originName.subSequence(originName.lastIndexOf(".")+1,
                originName.length());
        if(allowType.indexOf(ex.toLowerCase())<0){
            return Result.error("图片格式必须为gif,jpg,bmp,png,jpeg");
        }

        String bucketName = minioService.makeBucket("blog");
        String fileName = minioService.putObject(bucketName, file);
        String url = minioService.getPresignedObjectUrl(bucketName, fileName);

        UploadFile uploadFile = new UploadFile();
        uploadFile.setFileName(fileName);
        uploadFile.setUrl(url);
        uploadFile.setBucketName(bucketName);
        uploadFile.setStatus(UploadFileStatusConstant.ARTICLE_STATUS_TEMP);

        save(uploadFile);

        // bean拷贝
        UploadFileVo uploadFileVo = BeanCopyUtil.copyBean(uploadFile, UploadFileVo.class);

        return Result.success(uploadFileVo);
    }
}




