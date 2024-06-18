package com.zz.service;

import com.zz.pojo.Result;
import com.zz.pojo.dto.admin.AdminAddOrPutCategoryDto;
import com.zz.pojo.dto.admin.AdminCategoryListDto;
import com.zz.pojo.entity.Category;
import com.baomidou.mybatisplus.extension.service.IService;
import com.zz.pojo.vo.PageVo;

/**
* @author tom
* @description 针对表【t_category(分类表)】的数据库操作Service
* @createDate 2024-03-13 19:04:47
*/
public interface CategoryService extends IService<Category> {

    Result categoryList();

    Result<PageVo> adminCategoryList(Integer pageNum, Integer pageSize, AdminCategoryListDto adminCategoryListDto);

    Result adminAddCategory(AdminAddOrPutCategoryDto adminAddOrPutCategoryDto);

    Result adminDeleteCategory(Long id);

    Result adminGetCategoryById(Long id);

    Result adminPutCategory(Long id, AdminAddOrPutCategoryDto adminAddOrPutCategoryDto);
}
