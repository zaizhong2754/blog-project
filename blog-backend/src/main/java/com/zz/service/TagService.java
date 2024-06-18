package com.zz.service;

import com.zz.pojo.Result;
import com.zz.pojo.dto.admin.AdminAddOrPutTagDto;
import com.zz.pojo.dto.admin.AdminTagListDto;
import com.zz.pojo.entity.Tag;
import com.baomidou.mybatisplus.extension.service.IService;
import com.zz.pojo.vo.PageVo;

/**
* @author tom
* @description 针对表【t_tag(标签表)】的数据库操作Service
* @createDate 2024-03-24 14:59:40
*/
public interface TagService extends IService<Tag> {

    Result tagList();

    Result<PageVo> adminTagList(Integer pageNum, Integer pageSize, AdminTagListDto adminTagListDto);

    Result adminAddTag(AdminAddOrPutTagDto adminAddOrPutTagDto);

    Result adminDeleteTag(Long id);

    Result adminGetTagById(Long id);

    Result adminPutTag(Long id, AdminAddOrPutTagDto adminAddOrPutTagDto);
}
