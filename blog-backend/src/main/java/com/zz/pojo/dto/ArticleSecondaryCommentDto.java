package com.zz.pojo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArticleSecondaryCommentDto {

    /**
     * 评论所属的文章id
     */
    @NotNull(message = "articleId不能为空")
    private Long articleId;

    /**
     * 所属的一级评论id
     */
    @NotNull(message = "所属的一级评论id不能为空")
    private Long primaryCommentId;

    /**
     * 评论回复类型（1代表回复一级评论，2代表回复二级评论）
     */
    @NotBlank(message = "评论回复类型不能为空")
    private String replyType;

    /**
     * 回复评论id
     */
    @NotNull(message = "回复评论id不能为空")
    private Long replyCommentId;

    /**
     * 回复评论所属的用户id
     */
    @NotNull(message = "回复评论所属的用户id不能为空")
    private Long replyUserId;

    /**
     * ip属地
     */
    private String address;

    /**
     * 浏览器类型
     */
    private String browser;

    /**
     * 设备（操作系统）类型
     */
    private String device;

    /**
     * 评论内容
     */
    @NotBlank(message = "评论内容不能为空")
    private String content;

}
