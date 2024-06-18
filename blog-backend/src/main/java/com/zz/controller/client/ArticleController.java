package com.zz.controller.client;

import com.zz.pojo.Result;
import com.zz.service.ArticleService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/client/article")
public class ArticleController {

    @Resource
    private ArticleService articleService;

    @GetMapping("/popular")
    public Result popularArticleList(){
        return articleService.popularArticleList();
    }

    @GetMapping("/list")
    public Result articleList(@RequestParam Integer pageNum, @RequestParam Integer pageSize, @RequestParam(required = false) Long categoryId, @RequestParam(required = false) Long tagId) {
        return articleService.articleList(pageNum, pageSize, categoryId, tagId);
    }

    @GetMapping("/{id}")
    public Result articleDetail(@PathVariable("id") Long id) {
        return articleService.articleDetail(id);
    }
}
