package com.zz.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.zz.constant.GenericStatusConstant;
import com.zz.exception.SystemException;
import com.zz.pojo.Result;
import com.zz.pojo.dto.admin.AdminAddOrPutCategoryDto;
import com.zz.pojo.dto.admin.AdminCategoryListDto;
import com.zz.pojo.entity.Category;
import com.zz.pojo.vo.CategoryVo;
import com.zz.pojo.vo.PageVo;
import com.zz.pojo.vo.admin.AdminCategoryVo;
import com.zz.service.CategoryService;
import com.zz.mapper.CategoryMapper;
import com.zz.utils.BeanCopyUtil;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Objects;

/**
* @author tom
* @description 针对表【t_category(分类表)】的数据库操作Service实现
* @createDate 2024-03-13 19:04:47
*/
@Service
public class CategoryServiceImpl extends ServiceImpl<CategoryMapper, Category>
    implements CategoryService{

    @Resource
    private CategoryMapper categoryMapper;

    @Override
    public Result categoryList() {

        // 查询分类表,状态为启用的分类
        LambdaQueryWrapper<Category> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Category::getStatus, GenericStatusConstant.STATUS_ENABLED);
        List<Category> categories = categoryMapper.selectList(wrapper);

        // bean拷贝
        List<CategoryVo> categoryVos = BeanCopyUtil.copyBeanList(categories, CategoryVo.class);

        return Result.success(categoryVos);
    }

    @Override
    public Result<PageVo> adminCategoryList(Integer pageNum, Integer pageSize, AdminCategoryListDto adminCategoryListDto) {

        //分页查询
        LambdaQueryWrapper<Category> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(StringUtils.hasText(adminCategoryListDto.getName()),Category::getName,adminCategoryListDto.getName());
        wrapper.eq(StringUtils.hasText(adminCategoryListDto.getDescription()),Category::getDescription,adminCategoryListDto.getDescription());
        wrapper.eq(StringUtils.hasText(adminCategoryListDto.getStatus()),Category::getStatus,adminCategoryListDto.getStatus());

        Page<Category> page = new Page<>();
        page.setCurrent(pageNum);
        page.setSize(pageSize);
        page(page, wrapper);

        PageVo pageVo = new PageVo(page.getRecords(),page.getTotal());
        return Result.success(pageVo);

    }

    @Override
    public Result adminAddCategory(AdminAddOrPutCategoryDto adminAddOrPutCategoryDto) {

        // 对标签名进行是否存在校验
        if (checkUniqueCategoryName(adminAddOrPutCategoryDto.getName())) {
            throw new SystemException("分类名已存在");
        }

        Category category = BeanCopyUtil.copyBean(adminAddOrPutCategoryDto, Category.class);

        //存入数据库
        save(category);

        return Result.success();

    }

    @Override
    public Result adminDeleteCategory(Long id) {

        removeById(id);

        return Result.success();
    }

    @Override
    public Result adminGetCategoryById(Long id) {

        Category category = getById(id);

        if (Objects.isNull(category)) {
            throw new SystemException("分类不存在");
        }

        AdminCategoryVo adminCategoryVo = BeanCopyUtil.copyBean(category, AdminCategoryVo.class);
        return Result.success(adminCategoryVo);
    }

    @Override
    public Result adminPutCategory(Long id, AdminAddOrPutCategoryDto adminAddOrPutCategoryDto) {

        Category category = getById(id);

        if (Objects.isNull(category)) {
            throw new SystemException("分类不存在");
        }

        category.setName(adminAddOrPutCategoryDto.getName());
        category.setDescription(adminAddOrPutCategoryDto.getDescription());
        category.setStatus(adminAddOrPutCategoryDto.getStatus());
        updateById(category);

        AdminCategoryVo adminCategoryVo = BeanCopyUtil.copyBean(category, AdminCategoryVo.class);
        return Result.success(adminCategoryVo);
    }

    private boolean checkUniqueCategoryName(String categoryName) {

        LambdaQueryWrapper<Category> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Category::getName, categoryName);

        return count(wrapper) > 0;

    }

}




