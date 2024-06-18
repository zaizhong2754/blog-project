package com.zz.mapper;

import com.zz.pojo.entity.PrimaryComment;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
* @author tom
* @description 针对表【t_primary_comment(一级评论表)】的数据库操作Mapper
* @createDate 2024-03-30 23:15:13
* @Entity com.zz.pojo.entity.PrimaryComment
*/
@Mapper
public interface PrimaryCommentMapper extends BaseMapper<PrimaryComment> {

}




