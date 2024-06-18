package com.zz.controller.admin;

import com.zz.pojo.Result;
import com.zz.pojo.dto.admin.AdminAddOrPutTagDto;
import com.zz.pojo.dto.admin.AdminTagListDto;
import com.zz.pojo.vo.PageVo;
import com.zz.service.TagService;
import jakarta.annotation.Resource;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/tag")
public class AdminTagController {
    @Resource
    private TagService tagService;

    @GetMapping
    public Result<PageVo> list(Integer pageNum, Integer pageSize, AdminTagListDto adminTagListDto){
        return tagService.adminTagList(pageNum,pageSize,adminTagListDto);
    }

    @PostMapping("/add")
    public Result add(@Validated @RequestBody AdminAddOrPutTagDto adminAddOrPutTagDto){
        return tagService.adminAddTag(adminAddOrPutTagDto);
    }

    @DeleteMapping("/delete/{id}")
    public Result delete(@PathVariable("id") Long id){
        return tagService.adminDeleteTag(id);
    }

    @GetMapping("/{id}")
    public Result getById(@PathVariable("id") Long id){
        return tagService.adminGetTagById(id);
    }

    @PutMapping("/{id}")
    public Result put(@PathVariable("id") Long id, @Validated @RequestBody AdminAddOrPutTagDto adminAddOrPutTagDto){
        return tagService.adminPutTag(id, adminAddOrPutTagDto);
    }

}