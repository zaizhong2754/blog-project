package com.zz.service;

import com.zz.pojo.Result;
import com.zz.pojo.dto.LinkDto;
import com.zz.pojo.entity.Link;
import com.baomidou.mybatisplus.extension.service.IService;

/**
* @author tom
* @description 针对表【t_link(友链表)】的数据库操作Service
* @createDate 2024-03-14 21:10:39
*/
public interface LinkService extends IService<Link> {

    Result linkList();

    Result sendLink(LinkDto linkDto);
}
