package com.zz.mapper;

import com.zz.pojo.entity.SecondaryComment;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
* @author tom
* @description 针对表【t_secondary_comment(二级评论表)】的数据库操作Mapper
* @createDate 2024-03-30 23:15:25
* @Entity com.zz.pojo.entity.SecondaryComment
*/
@Mapper
public interface SecondaryCommentMapper extends BaseMapper<SecondaryComment> {

}




