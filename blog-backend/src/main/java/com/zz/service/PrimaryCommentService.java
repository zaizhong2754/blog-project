package com.zz.service;

import com.zz.pojo.Result;
import com.zz.pojo.dto.ArticlePrimaryCommentDto;
import com.zz.pojo.dto.MessageBoardPrimaryCommentDto;
import com.zz.pojo.entity.PrimaryComment;
import com.baomidou.mybatisplus.extension.service.IService;

/**
* @author tom
* @description 针对表【t_primary_comment(一级评论表)】的数据库操作Service
* @createDate 2024-03-30 23:15:13
*/
public interface PrimaryCommentService extends IService<PrimaryComment> {

    Long getPrimaryCommentNumByArticleId(Long id);

    Long getPrimaryCommentNumByType(String type);

    Result articlePrimaryCommentList(Long articleId, Integer pageNum, Integer pageSize, String sort);

    Result sendArticlePrimaryComment(ArticlePrimaryCommentDto articlePrimaryCommentDto);

    Result messageBoardPrimaryCommentList(String type, Integer pageNum, Integer pageSize, String sort);

    Result sendMessageBoardPrimaryComment(MessageBoardPrimaryCommentDto messageBoardPrimaryCommentDto);

}
