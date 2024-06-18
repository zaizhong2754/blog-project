package com.zz.mapper;

import com.zz.pojo.entity.Permission;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
* @author tom
* @description 针对表【t_permission(权限表)】的数据库操作Mapper
* @createDate 2024-04-22 16:55:32
* @Entity com.zz.pojo.entity.Permission
*/
@Mapper
public interface PermissionMapper extends BaseMapper<Permission> {

    List<String> selectPermissionsByUserId(Long userId);
}




