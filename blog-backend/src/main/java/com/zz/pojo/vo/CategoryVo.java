package com.zz.pojo.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryVo {

    private Long id;

    // 分类名
    private String name;

    // 父分类id，如果没有父分类为-1
    private Long pid;

    // 描述
    private String description;

}
