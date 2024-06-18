package com.zz.mapper;

import com.zz.pojo.entity.UploadFile;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
* @author tom
* @description 针对表【t_upload_file(文件上传记录表)】的数据库操作Mapper
* @createDate 2024-04-13 23:45:51
* @Entity com.zz.pojo.entity.UploadFile
*/
@Mapper
public interface UploadFileMapper extends BaseMapper<UploadFile> {

}




