package com.zz.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.zz.constant.CommentSortTypeConstant;
import com.zz.constant.CommentTypeConstant;
import com.zz.pojo.Result;
import com.zz.pojo.dto.ArticlePrimaryCommentDto;
import com.zz.pojo.dto.MessageBoardPrimaryCommentDto;
import com.zz.pojo.entity.PrimaryComment;
import com.zz.pojo.vo.ArticlePrimaryCommentVo;
import com.zz.pojo.vo.CommentPageVo;
import com.zz.pojo.vo.MessageBoardPrimaryCommentVo;
import com.zz.pojo.vo.PageVo;
import com.zz.service.PrimaryCommentService;
import com.zz.mapper.PrimaryCommentMapper;
import com.zz.service.SecondaryCommentService;
import com.zz.service.UserService;
import com.zz.utils.BeanCopyUtil;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

/**
* @author tom
* @description 针对表【t_primary_comment(一级评论表)】的数据库操作Service实现
* @createDate 2024-03-30 23:15:13
*/
@Service
public class PrimaryCommentServiceImpl extends ServiceImpl<PrimaryCommentMapper, PrimaryComment>
    implements PrimaryCommentService{

    @Resource
    private UserService userService;

    @Resource
    private SecondaryCommentService secondaryCommentService;

    @Override
    public Long getPrimaryCommentNumByArticleId(Long id) {

        // 根据文章id查询一级评论数量
        LambdaQueryWrapper<PrimaryComment> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(PrimaryComment::getArticleId, id);

        return count(wrapper);
    }

    @Override
    public Long getPrimaryCommentNumByType(String type) {

        // 根据type查询一级评论数量
        LambdaQueryWrapper<PrimaryComment> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(PrimaryComment::getType, type);

        return count(wrapper);
    }

    @Override
    public Result articlePrimaryCommentList(Long articleId, Integer pageNum, Integer pageSize, String sort) {
        LambdaQueryWrapper<PrimaryComment> wrapper = new LambdaQueryWrapper<>();
        // 匹配type
        wrapper.eq(PrimaryComment::getType, CommentTypeConstant.ARTICLE_COMMENT);
        // 匹配articleId
        wrapper.eq(PrimaryComment::getArticleId,articleId);

        // 排序：最新
        wrapper.orderBy(sort.equals(CommentSortTypeConstant.COMMENT_ORDER_BY_LATEST), false, PrimaryComment::getCreateTime);
        // 排序：最早
        wrapper.orderBy(sort.equals(CommentSortTypeConstant.COMMENT_ORDER_BY_EARLIEST), true, PrimaryComment::getCreateTime);

        // 分页查询
        Page<PrimaryComment> page = new Page<>(pageNum,pageSize);
        page(page, wrapper);

        // Bean拷贝
        List<ArticlePrimaryCommentVo> articlePrimaryCommentVos = BeanCopyUtil.copyBeanList(page.getRecords(), ArticlePrimaryCommentVo.class);

        // 遍历vo
        for (ArticlePrimaryCommentVo articlePrimaryCommentVo : articlePrimaryCommentVos) {
            // 根据createBy查询用户的昵称和头像
            String nickName = userService.getById(articlePrimaryCommentVo.getCreateBy()).getNickName();
            String avatar = userService.getById(articlePrimaryCommentVo.getCreateBy()).getAvatar();
            articlePrimaryCommentVo.setNickName(nickName);
            articlePrimaryCommentVo.setAvatar(avatar);

            // 根据一级评论id查询二级评论数量
            Long secondaryCommentNum = secondaryCommentService.getSecondaryCommentNumByPrimaryCommentId(articlePrimaryCommentVo.getId());
            articlePrimaryCommentVo.setSecondaryCommentNum(secondaryCommentNum);
        }

        // 文章的总评论数
        Long count = getPrimaryCommentNumByArticleId(articleId) + secondaryCommentService.getSecondaryCommentNumByArticleId(articleId);

        return Result.success(new CommentPageVo(articlePrimaryCommentVos,page.getTotal(),count));

    }

    @Override
    public Result sendArticlePrimaryComment(ArticlePrimaryCommentDto articlePrimaryCommentDto) {

        // Bean拷贝
        PrimaryComment articlePrimaryComment = BeanCopyUtil.copyBean(articlePrimaryCommentDto, PrimaryComment.class);
        save(articlePrimaryComment);

        return Result.success();

    }

    @Override
    public Result messageBoardPrimaryCommentList(String type, Integer pageNum, Integer pageSize, String sort) {

        LambdaQueryWrapper<PrimaryComment> wrapper = new LambdaQueryWrapper<>();
        // 匹配type
        wrapper.eq(PrimaryComment::getType, CommentTypeConstant.MESSAGE_BOARD_COMMENT);

        // 排序：最新
        wrapper.orderBy(sort.equals(CommentSortTypeConstant.COMMENT_ORDER_BY_LATEST), false, PrimaryComment::getCreateTime);
        // 排序：最早
        wrapper.orderBy(sort.equals(CommentSortTypeConstant.COMMENT_ORDER_BY_EARLIEST), true, PrimaryComment::getCreateTime);

        // 分页查询
        Page<PrimaryComment> page = new Page<>(pageNum,pageSize);
        page(page, wrapper);

        // Bean拷贝
        List<MessageBoardPrimaryCommentVo> messageBoardPrimaryCommentVos = BeanCopyUtil.copyBeanList(page.getRecords(), MessageBoardPrimaryCommentVo.class);

        // 遍历vo
        for (MessageBoardPrimaryCommentVo messageBoardPrimaryCommentVo : messageBoardPrimaryCommentVos) {
            // 根据createBy查询用户的昵称和头像
            String nickName = userService.getById(messageBoardPrimaryCommentVo.getCreateBy()).getNickName();
            String avatar = userService.getById(messageBoardPrimaryCommentVo.getCreateBy()).getAvatar();
            messageBoardPrimaryCommentVo.setNickName(nickName);
            messageBoardPrimaryCommentVo.setAvatar(avatar);

            // 根据一级评论id查询二级评论数量
            Long secondaryCommentNum = secondaryCommentService.getSecondaryCommentNumByPrimaryCommentId(messageBoardPrimaryCommentVo.getId());
            messageBoardPrimaryCommentVo.setSecondaryCommentNum(secondaryCommentNum);
        }

        // 留言板的总评论数
        Long count = getPrimaryCommentNumByType(type) + secondaryCommentService.getSecondaryCommentNumByType(type);

        return Result.success(new CommentPageVo(messageBoardPrimaryCommentVos,page.getTotal(),count));
    }

    @Override
    public Result sendMessageBoardPrimaryComment(MessageBoardPrimaryCommentDto messageBoardPrimaryCommentDto) {

        // Bean拷贝
        PrimaryComment messageBoardPrimaryComment = BeanCopyUtil.copyBean(messageBoardPrimaryCommentDto, PrimaryComment.class);
        save(messageBoardPrimaryComment);

        return Result.success();

    }

}




