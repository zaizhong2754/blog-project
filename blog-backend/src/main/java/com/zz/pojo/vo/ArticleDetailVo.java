package com.zz.pojo.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArticleDetailVo {

    private Long id;

    // 标题
    private String title;

    // 文章内容
    private String content;

    // 文章摘要
    private String summary;

    // 所属分类id
    private Long categoryId;

    // 所属分类名
    private String categoryName;

    // 缩略图
    private String thumbnail;

    // 是否置顶（0否，1是）
    private String isTop;

    // 评论量
    private Long commentCount;

    private Date createTime;

    private List<TagVo> tags;
}
