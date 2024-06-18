package com.zz.mapper;

import com.zz.pojo.entity.Category;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
* @author tom
* @description 针对表【t_category(分类表)】的数据库操作Mapper
* @createDate 2024-03-13 19:04:47
* @Entity com.zz.pojo.entity.Category
*/
@Mapper
public interface CategoryMapper extends BaseMapper<Category> {

}




