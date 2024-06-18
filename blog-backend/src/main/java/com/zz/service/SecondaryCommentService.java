package com.zz.service;

import com.zz.pojo.Result;
import com.zz.pojo.dto.ArticleSecondaryCommentDto;
import com.zz.pojo.dto.MessageBoardSecondaryCommentDto;
import com.zz.pojo.entity.SecondaryComment;
import com.baomidou.mybatisplus.extension.service.IService;

/**
* @author tom
* @description 针对表【t_secondary_comment(二级评论表)】的数据库操作Service
* @createDate 2024-03-30 23:15:25
*/
public interface SecondaryCommentService extends IService<SecondaryComment> {

    Long getSecondaryCommentNumByArticleId(Long id);

    Long getSecondaryCommentNumByType(String type);

    Long getSecondaryCommentNumByPrimaryCommentId(Long id);

    Result articleSecondaryCommentList(Long primaryCommentId, Integer pageNum, Integer pageSize, String sort);

    Result sendArticleSecondaryComment(ArticleSecondaryCommentDto articleSecondaryCommentDto);

    Result messageBoardSecondaryCommentList(Long primaryCommentId, Integer pageNum, Integer pageSize, String sort);

    Result sendMessageBoardSecondaryComment(MessageBoardSecondaryCommentDto messageBoardSecondaryCommentDto);

}
