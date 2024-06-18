package com.zz.pojo.dto.admin;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminAddOrPutTagDto {

    /**
     * 标签名
     */
    @NotBlank(message = "标签名不能为空")
    private String name;

    /**
     * 备注
     */
    @NotBlank(message = "标签备注不能为空")
    private String remark;

}
