package com.zz.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.zz.pojo.entity.Menu;
import com.zz.service.MenuService;
import com.zz.mapper.MenuMapper;
import org.springframework.stereotype.Service;

/**
* @author tom
* @description 针对表【t_menu(菜单表)】的数据库操作Service实现
* @createDate 2024-04-22 16:55:21
*/
@Service
public class MenuServiceImpl extends ServiceImpl<MenuMapper, Menu>
    implements MenuService{

}




