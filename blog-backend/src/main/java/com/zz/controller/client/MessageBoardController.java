package com.zz.controller.client;

import com.zz.pojo.Result;
import com.zz.pojo.dto.ArticlePrimaryCommentDto;
import com.zz.pojo.dto.ArticleSecondaryCommentDto;
import com.zz.pojo.dto.MessageBoardPrimaryCommentDto;
import com.zz.pojo.dto.MessageBoardSecondaryCommentDto;
import com.zz.service.PrimaryCommentService;
import com.zz.service.SecondaryCommentService;
import jakarta.annotation.Resource;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/client/messageBoard")
public class MessageBoardController {

    @Resource
    private PrimaryCommentService primaryCommentService;

    @Resource
    private SecondaryCommentService secondaryCommentService;

    @GetMapping("/primary")
    public Result primaryCommentList(@RequestParam String type, @RequestParam Integer pageNum, @RequestParam Integer pageSize, @RequestParam String sort){
        return primaryCommentService.messageBoardPrimaryCommentList(type,pageNum,pageSize,sort);
    }

    @GetMapping("/secondary")
    public Result secondaryCommentList(@RequestParam Long primaryCommentId, @RequestParam Integer pageNum, @RequestParam Integer pageSize, @RequestParam String sort){
        return secondaryCommentService.messageBoardSecondaryCommentList(primaryCommentId,pageNum,pageSize,sort);
    }

    @PostMapping("/primary/send")
    public Result primaryCommentList(@Validated @RequestBody MessageBoardPrimaryCommentDto messageBoardPrimaryCommentDto){
        return primaryCommentService.sendMessageBoardPrimaryComment(messageBoardPrimaryCommentDto);
    }

    @PostMapping("/secondary/send")
    public Result secondaryCommentList(@Validated @RequestBody MessageBoardSecondaryCommentDto messageBoardSecondaryCommentDto){
        return secondaryCommentService.sendMessageBoardSecondaryComment(messageBoardSecondaryCommentDto);
    }

}
