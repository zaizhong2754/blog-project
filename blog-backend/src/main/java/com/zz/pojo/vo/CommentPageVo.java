package com.zz.pojo.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentPageVo {

    private List rows;

    private Long total;

    private Long CommentCount;

}
