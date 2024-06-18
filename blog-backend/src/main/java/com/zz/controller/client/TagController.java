package com.zz.controller.client;

import com.zz.pojo.Result;
import com.zz.service.TagService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/client/tag")
public class TagController {

    @Resource
    private TagService tagService;

    @GetMapping("/list")
    public Result list(){
        return tagService.tagList();
    }

}