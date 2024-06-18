package com.zz.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.zz.pojo.entity.Role;
import com.zz.service.RoleService;
import com.zz.mapper.RoleMapper;
import org.springframework.stereotype.Service;

/**
* @author tom
* @description 针对表【t_role(角色表)】的数据库操作Service实现
* @createDate 2024-04-22 16:55:04
*/
@Service
public class RoleServiceImpl extends ServiceImpl<RoleMapper, Role>
    implements RoleService{

}




