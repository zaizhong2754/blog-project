package com.zz.pojo.entity;

import com.baomidou.mybatisplus.annotation.*;

import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * 分类表
 * @TableName t_category
 */
@TableName(value ="t_category")
@Data
public class Category implements Serializable {
    /**
     * 
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 分类名
     */
    @TableField(value = "name")
    private String name;

    /**
     * 父分类id，如果没有父分类为-1
     */
    @TableField(value = "pid")
    private Long pid;

    /**
     * 描述
     */
    @TableField(value = "description")
    private String description;

    /**
     * 状态0:正常,1禁用
     */
    @TableField(value = "status")
    private String status;

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