package com.zz.mapper;

import com.zz.pojo.entity.Menu;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.zz.pojo.vo.admin.MenuVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
* @author tom
* @description 针对表【t_menu(菜单表)】的数据库操作Mapper
* @createDate 2024-04-22 16:55:21
* @Entity com.zz.pojo.entity.Menu
*/
@Mapper
public interface MenuMapper extends BaseMapper<Menu> {

    List<MenuVo> selectMenusByUserId(Long userId);
}




