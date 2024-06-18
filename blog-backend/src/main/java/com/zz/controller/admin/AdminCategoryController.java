package com.zz.controller.admin;

import com.zz.pojo.Result;
import com.zz.pojo.dto.admin.AdminAddOrPutCategoryDto;
import com.zz.pojo.dto.admin.AdminCategoryListDto;
import com.zz.pojo.vo.PageVo;
import com.zz.service.CategoryService;
import jakarta.annotation.Resource;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/category")
public class AdminCategoryController {

    @Resource
    private CategoryService categoryService;

    @GetMapping
    public Result<PageVo> list(Integer pageNum, Integer pageSize, AdminCategoryListDto adminCategoryListDto){
        return categoryService.adminCategoryList(pageNum,pageSize,adminCategoryListDto);
    }

    @PostMapping("/add")
    public Result add(@Validated @RequestBody AdminAddOrPutCategoryDto adminAddOrPutCategoryDto){
        return categoryService.adminAddCategory(adminAddOrPutCategoryDto);
    }

    @DeleteMapping("/delete/{id}")
    public Result delete(@PathVariable("id") Long id){
        return categoryService.adminDeleteCategory(id);
    }

    @GetMapping("/{id}")
    public Result getById(@PathVariable("id") Long id){
        return categoryService.adminGetCategoryById(id);
    }

    @PutMapping("/{id}")
    public Result put(@PathVariable("id") Long id, @Validated @RequestBody AdminAddOrPutCategoryDto adminAddOrPutCategoryDto){
        return categoryService.adminPutCategory(id, adminAddOrPutCategoryDto);
    }

}
