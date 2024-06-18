package com.zz.mapper;

import com.zz.pojo.entity.Tag;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
* @author tom
* @description 针对表【t_tag(标签表)】的数据库操作Mapper
* @createDate 2024-03-24 14:59:39
* @Entity com.zz.pojo.entity.Tag
*/
@Mapper
public interface TagMapper extends BaseMapper<Tag> {

}




