package com.zz.pojo.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageBoardSecondaryCommentVo {

    /**
     * 二级评论id
     */
    private Long id;

    /**
     * 评论类型（0代表文章评论，1代表留言评论，）
     */
    private String type;

    /**
     * 评论回复类型（1代表回复一级评论，2代表回复二级评论）
     */
    private String replyType;

    /**
     * 回复评论id
     */
    private Long replyCommentId;

    /**
     * 回复评论所属的用户id
     */
    private Long replyUserId;

    /**
     * 回复评论所属的用户昵称
     */
    private String replyUserNickName;

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
    private String content;

    /**
     * 用户id
     */
    private Long createBy;

    /**
     * 用户昵称
     */
    private String nickName;

    /**
     * 用户头像
     */
    private String avatar;

    /**
     * 创建时间
     */
    private Date createTime;

}
