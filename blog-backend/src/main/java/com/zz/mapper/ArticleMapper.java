package com.zz.mapper;

import com.zz.pojo.entity.Article;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
* @author tom
* @description 针对表【t_article(文章表)】的数据库操作Mapper
* @createDate 2024-03-13 18:32:41
* @Entity com.zz.pojo.entity.Article
*/
@Mapper
public interface ArticleMapper extends BaseMapper<Article> {

}




