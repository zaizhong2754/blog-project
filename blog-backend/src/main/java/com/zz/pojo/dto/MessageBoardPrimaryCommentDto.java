package com.zz.pojo.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageBoardPrimaryCommentDto {

    /**
     * 评论类型（0代表文章评论，1代表留言评论，）
     */
    @NotBlank(message = "type不能为空")
    private String type;

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
