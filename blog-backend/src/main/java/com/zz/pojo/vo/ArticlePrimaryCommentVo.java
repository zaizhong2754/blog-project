package com.zz.pojo.vo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArticlePrimaryCommentVo {

    /**
     * 一级评论id
     */
    private Long id;

    /**
     * 评论所属的文章id
     */
    private Long articleId;

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

    /**
     * 二级评论数
     */
    private Long secondaryCommentNum;

}
