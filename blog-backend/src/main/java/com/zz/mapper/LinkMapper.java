package com.zz.mapper;

import com.zz.pojo.entity.Link;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
* @author tom
* @description 针对表【t_link(友链表)】的数据库操作Mapper
* @createDate 2024-03-14 21:10:39
* @Entity com.zz.pojo.entity.Link
*/
@Mapper
public interface LinkMapper extends BaseMapper<Link> {

}




