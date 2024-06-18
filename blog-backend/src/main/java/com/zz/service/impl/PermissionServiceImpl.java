package com.zz.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.zz.pojo.entity.Permission;
import com.zz.service.PermissionService;
import com.zz.mapper.PermissionMapper;
import org.springframework.stereotype.Service;

/**
* @author tom
* @description 针对表【t_permission(权限表)】的数据库操作Service实现
* @createDate 2024-04-22 16:55:32
*/
@Service
public class PermissionServiceImpl extends ServiceImpl<PermissionMapper, Permission>
    implements PermissionService{

}




