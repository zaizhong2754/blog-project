package com.zz.controller.client;

import com.zz.pojo.Result;
import com.zz.pojo.dto.ArticlePrimaryCommentDto;
import com.zz.pojo.dto.ArticleSecondaryCommentDto;
import com.zz.service.PrimaryCommentService;
import com.zz.service.SecondaryCommentService;
import jakarta.annotation.Resource;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/client/articleComment")
public class ArticleCommentController {

    @Resource
    private PrimaryCommentService primaryCommentService;

    @Resource
    private SecondaryCommentService secondaryCommentService;

    @GetMapping("/primary")
    public Result primaryCommentList(@RequestParam Long articleId, @RequestParam Integer pageNum, @RequestParam Integer pageSize, @RequestParam String sort){
        return primaryCommentService.articlePrimaryCommentList(articleId,pageNum,pageSize,sort);
    }

    @GetMapping("/secondary")
    public Result secondaryCommentList(@RequestParam Long primaryCommentId, @RequestParam Integer pageNum, @RequestParam Integer pageSize, @RequestParam String sort){
        return secondaryCommentService.articleSecondaryCommentList(primaryCommentId,pageNum,pageSize,sort);
    }

    @PostMapping("/primary/send")
    public Result primaryCommentList(@Validated @RequestBody ArticlePrimaryCommentDto articlePrimaryCommentDto){
        return primaryCommentService.sendArticlePrimaryComment(articlePrimaryCommentDto);
    }

    @PostMapping("/secondary/send")
    public Result secondaryCommentList(@Validated @RequestBody ArticleSecondaryCommentDto articleSecondaryCommentDto){
        return secondaryCommentService.sendArticleSecondaryComment(articleSecondaryCommentDto);
    }

}
