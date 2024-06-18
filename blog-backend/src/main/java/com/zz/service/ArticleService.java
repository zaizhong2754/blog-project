package com.zz.service;

import com.zz.pojo.Result;
import com.zz.pojo.entity.Article;
import com.baomidou.mybatisplus.extension.service.IService;

/**
* @author tom
* @description 针对表【t_article(文章表)】的数据库操作Service
* @createDate 2024-03-13 18:32:41
*/
public interface ArticleService extends IService<Article> {

    Result popularArticleList();

    Result articleList(Integer pageNum, Integer pageSize, Long categoryId, Long tagId);

    Result articleDetail(Long id);
}
