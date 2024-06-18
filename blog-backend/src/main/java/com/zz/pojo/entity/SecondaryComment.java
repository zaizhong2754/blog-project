package com.zz.pojo.entity;

import com.baomidou.mybatisplus.annotation.*;

import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * 二级评论表
 * @TableName t_secondary_comment
 */
@TableName(value ="t_secondary_comment")
@Data
public class SecondaryComment implements Serializable {
    /**
     * 二级评论id
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 评论类型（0代表文章评论，1代表留言评论，）
     */
    @TableField(value = "type")
    private String type;

    /**
     * 评论所属的文章id
     */
    @TableField(value = "article_id")
    private Long articleId;

    /**
     * 所属的一级评论id
     */
    @TableField(value = "primary_comment_id")
    private Long primaryCommentId;

    /**
     * 评论回复类型（1代表回复一级评论，2代表回复二级评论）
     */
    @TableField(value = "reply_type")
    private String replyType;

    /**
     * 回复评论id
     */
    @TableField(value = "reply_comment_id")
    private Long replyCommentId;

    /**
     * 回复评论所属的用户id
     */
    @TableField(value = "reply_user_id")
    private Long replyUserId;

    /**
     * ip属地
     */
    @TableField(value = "address")
    private String address;

    /**
     * 浏览器类型
     */
    @TableField(value = "browser")
    private String browser;

    /**
     * 设备（操作系统）类型
     */
    @TableField(value = "device")
    private String device;

    /**
     * 评论内容
     */
    @TableField(value = "content")
    private String content;

    /**
     * 创建人的用户id
     */
    @TableField(value = "create_by", fill = FieldFill.INSERT)
    private Long createBy;

    /**
     * 创建时间
     */
    @TableField(value = "create_time", fill = FieldFill.INSERT)
    private Date createTime;

    /**
     * 更新人
     */
    @TableField(value = "update_by", fill = FieldFill.INSERT_UPDATE)
    private Long updateBy;

    /**
     * 更新时间
     */
    @TableField(value = "update_time", fill = FieldFill.INSERT_UPDATE)
    private Date updateTime;

    /**
     * 删除标志（0代表未删除，1代表已删除）
     */
    @TableField(value = "del_flag")
    private Integer delFlag;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}