package com.zz.pojo.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminTagListDto {

    /**
     * 标签名
     */
    private String name;

    /**
     * 备注
     */
    private String remark;

}
