package com.zz.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.zz.constant.ArticleStatusConstant;
import com.zz.pojo.Result;
import com.zz.pojo.entity.Article;
import com.zz.pojo.entity.Category;
import com.zz.pojo.entity.Tag;
import com.zz.pojo.vo.*;
import com.zz.service.*;
import com.zz.mapper.ArticleMapper;
import com.zz.utils.BeanCopyUtil;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
* @author tom
* @description 针对表【t_article(文章表)】的数据库操作Service实现
* @createDate 2024-03-13 18:32:41
*/
@Service
public class ArticleServiceImpl extends ServiceImpl<ArticleMapper, Article>
    implements ArticleService{

    @Resource
    private CategoryService categoryService;

    @Resource
    private TagService tagService;

    @Resource
    private PrimaryCommentService primaryCommentService;

    @Resource
    private SecondaryCommentService secondaryCommentService;

    @Override
    public Result popularArticleList() {
        // 查询热门文章 封装成ResponseResult返回
        LambdaQueryWrapper<Article> wrapper = new LambdaQueryWrapper<>();
        // 必须是正式文章
        wrapper.eq(Article::getStatus, ArticleStatusConstant.ARTICLE_STATUS_NORMAL);
        // 按照浏览量进行排序
        wrapper.orderByDesc(Article::getViewCount);
        // 最多只查询5条
        Page<Article> page = new Page(1,5);
        page(page,wrapper);

        List<Article> articles = page.getRecords();
        //bean拷贝
        List<PopularArticleVo> articleVos = BeanCopyUtil.copyBeanList(articles, PopularArticleVo.class);

        return Result.success(articleVos);
    }

    @Override
    public Result articleList(Integer pageNum, Integer pageSize, Long categoryId, Long tagId) {

        // 查询条件
        LambdaQueryWrapper<Article> wrapper = new LambdaQueryWrapper<>();
        // 如果 有categoryId 就要 查询时要和传入的相同
        wrapper.eq(Objects.nonNull(categoryId)&&categoryId>0 ,Article::getCategoryId,categoryId);

        // 如果 有tagId 就要 查询时要和传入的相同
        if (Objects.nonNull(tagId)&&tagId>0) {
            wrapper.inSql(Article::getId, "select article_id from t_article_tag where tag_id="+tagId);
        }



        // 状态是正式发布的
        wrapper.eq(Article::getStatus,ArticleStatusConstant.ARTICLE_STATUS_NORMAL);
        // 对isTop进行降序
        wrapper.orderByDesc(Article::getIsTop);

        // 分页查询
        Page<Article> page = new Page<>(pageNum,pageSize);
        page(page,wrapper);
        List<Article> articles = page.getRecords();

        // 查询categoryName
        articles.stream()
                .map(article -> {
                    article.setCategoryName(categoryService.getById(article.getCategoryId()).getName());
                    return article;
                })
                .collect(Collectors.toList());

        // bean拷贝
        List<ArticleListVo> articleVos = BeanCopyUtil.copyBeanList(page.getRecords(), ArticleListVo.class);

        // 遍历vo, 设置文章评论数
        for (ArticleListVo articleListVo : articleVos) {
            Long count = primaryCommentService.getPrimaryCommentNumByArticleId(articleListVo.getId())
                    +secondaryCommentService.getSecondaryCommentNumByArticleId(articleListVo.getId());
            articleListVo.setCommentCount(count);
        }

        // 封装查询结果
        PageVo pageVo = new PageVo(articleVos,page.getTotal());

        return Result.success(pageVo);
    }

    @Override
    public Result articleDetail(Long id) {

        // 根据id查询文章
        Article article = getById(id);
        // 转换成VO
        ArticleDetailVo articleDetailVo = BeanCopyUtil.copyBean(article, ArticleDetailVo.class);
        // 根据分类id查询分类名
        Long categoryId = articleDetailVo.getCategoryId();
        Category category = categoryService.getById(categoryId);
        if(category!=null){
            articleDetailVo.setCategoryName(category.getName());
        }

        // 根据id查询标签
        LambdaQueryWrapper<Tag> wrapper = new LambdaQueryWrapper<>();
        wrapper.inSql(Tag::getId, "select tag_id from t_article_tag where article_id=" + id);

        wrapper.select(Tag::getId,Tag::getName);
        List<Tag> tagList = tagService.list(wrapper);

        // bean拷贝
        List<TagVo> tagVos = BeanCopyUtil.copyBeanList(tagList, TagVo.class);
        articleDetailVo.setTags(tagVos);

        // 设置文章评论数
        Long count = primaryCommentService.getPrimaryCommentNumByArticleId(articleDetailVo.getId())
                +secondaryCommentService.getSecondaryCommentNumByArticleId(articleDetailVo.getId());
        articleDetailVo.setCommentCount(count);

        return Result.success(articleDetailVo);
    }
}




