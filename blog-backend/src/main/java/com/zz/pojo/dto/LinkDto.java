package com.zz.pojo.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LinkDto {

    @NotBlank(message = "名字不能为空")
    private String name;

    @NotBlank(message = "logo不能为空")
    private String logo;

    @NotBlank(message = "简介不能为空")
    private String description;

    @NotBlank(message = "链接不能为空")
    private String address;

    private String status;

}
