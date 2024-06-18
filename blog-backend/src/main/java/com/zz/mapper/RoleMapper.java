package com.zz.mapper;

import com.zz.pojo.entity.Role;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
* @author tom
* @description 针对表【t_role(角色表)】的数据库操作Mapper
* @createDate 2024-04-22 16:55:04
* @Entity com.zz.pojo.entity.Role
*/
@Mapper
public interface RoleMapper extends BaseMapper<Role> {

    List<String> selectRolesByUserId(Long userId);
}




