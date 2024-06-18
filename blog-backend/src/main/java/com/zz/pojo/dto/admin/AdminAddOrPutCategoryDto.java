package com.zz.pojo.dto.admin;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminAddOrPutCategoryDto {

    /**
     * 分类名
     */
    @NotBlank(message = "分类名不能为空")
    private String name;

    /**
     * 描述
     */
    @NotBlank(message = "分类描述不能为空")
    private String description;

    /**
     * 状态0:正常,1禁用
     */
    @NotBlank(message = "分类状态不能为空")
    private String status;

}
