package com.zz.mapper;

import com.zz.pojo.entity.User;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
* @author tom
* @description 针对表【t_user(用户表)】的数据库操作Mapper
* @createDate 2024-03-10 22:47:36
* @Entity com.zz.pojo.entity.User
*/
@Mapper
public interface UserMapper extends BaseMapper<User> {

}




