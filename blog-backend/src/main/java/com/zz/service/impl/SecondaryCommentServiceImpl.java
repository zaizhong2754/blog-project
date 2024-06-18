package com.zz.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.zz.constant.CommentSortTypeConstant;
import com.zz.pojo.Result;
import com.zz.pojo.dto.ArticleSecondaryCommentDto;
import com.zz.pojo.dto.MessageBoardSecondaryCommentDto;
import com.zz.pojo.entity.SecondaryComment;
import com.zz.pojo.vo.ArticleSecondaryCommentVo;
import com.zz.pojo.vo.MessageBoardSecondaryCommentVo;
import com.zz.pojo.vo.PageVo;
import com.zz.service.SecondaryCommentService;
import com.zz.mapper.SecondaryCommentMapper;
import com.zz.service.UserService;
import com.zz.utils.BeanCopyUtil;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

/**
* @author tom
* @description 针对表【t_secondary_comment(二级评论表)】的数据库操作Service实现
* @createDate 2024-03-30 23:15:25
*/
@Service
public class SecondaryCommentServiceImpl extends ServiceImpl<SecondaryCommentMapper, SecondaryComment>
    implements SecondaryCommentService{

    @Resource
    private UserService userService;

    @Override
    public Long getSecondaryCommentNumByArticleId(Long id) {

        // 根据文章id查询二级评论数量
        LambdaQueryWrapper<SecondaryComment> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(SecondaryComment::getArticleId,id);

        return count(wrapper);
    }

    @Override
    public Long getSecondaryCommentNumByType(String type) {

        // 根据type查询二级评论数量
        LambdaQueryWrapper<SecondaryComment> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(SecondaryComment::getType,type);

        return count(wrapper);
    }

    @Override
    public Long getSecondaryCommentNumByPrimaryCommentId(Long id) {
        // 根据一级评论id查询二级评论数量
        LambdaQueryWrapper<SecondaryComment> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(SecondaryComment::getPrimaryCommentId,id);

        return count(wrapper);
    }

    @Override
    public Result articleSecondaryCommentList(Long primaryCommentId, Integer pageNum, Integer pageSize, String sort) {
        LambdaQueryWrapper<SecondaryComment> wrapper = new LambdaQueryWrapper<>();
        // 匹配primaryCommentId
        wrapper.eq(SecondaryComment::getPrimaryCommentId,primaryCommentId);

        // 排序：最新
        wrapper.orderBy(sort.equals(CommentSortTypeConstant.COMMENT_ORDER_BY_LATEST), false, SecondaryComment::getCreateTime);
        // 排序：最早
        wrapper.orderBy(sort.equals(CommentSortTypeConstant.COMMENT_ORDER_BY_EARLIEST), true, SecondaryComment::getCreateTime);

        // 分页查询
        Page<SecondaryComment> page = new Page<>(pageNum,pageSize);
        page(page, wrapper);

        // Bean拷贝
        List<ArticleSecondaryCommentVo> articleSecondaryCommentVos = BeanCopyUtil.copyBeanList(page.getRecords(), ArticleSecondaryCommentVo.class);

        // 遍历vo
        for (ArticleSecondaryCommentVo articleSecondaryCommentVo : articleSecondaryCommentVos) {
            // 根据createBy查询用户的昵称和头像
            String nickName = userService.getById(articleSecondaryCommentVo.getCreateBy()).getNickName();
            String avatar = userService.getById(articleSecondaryCommentVo.getCreateBy()).getAvatar();
            articleSecondaryCommentVo.setNickName(nickName);
            articleSecondaryCommentVo.setAvatar(avatar);

            // 根据回复评论所属的用户id replyUserId 查询回复评论所属的用户昵称 replyUserNickName
            String replyUserNickName = userService.getById(articleSecondaryCommentVo.getReplyUserId()).getNickName();
            articleSecondaryCommentVo.setReplyUserNickName(replyUserNickName);

        }

        return Result.success(new PageVo(articleSecondaryCommentVos,page.getTotal()));

    }

    @Override
    public Result sendArticleSecondaryComment(ArticleSecondaryCommentDto articleSecondaryCommentDto) {

        // Bean拷贝
        SecondaryComment articleSecondaryComment = BeanCopyUtil.copyBean(articleSecondaryCommentDto, SecondaryComment.class);
        save(articleSecondaryComment);

        return Result.success();

    }

    @Override
    public Result messageBoardSecondaryCommentList(Long primaryCommentId, Integer pageNum, Integer pageSize, String sort) {
        LambdaQueryWrapper<SecondaryComment> wrapper = new LambdaQueryWrapper<>();
        // 匹配primaryCommentId
        wrapper.eq(SecondaryComment::getPrimaryCommentId,primaryCommentId);

        // 排序：最新
        wrapper.orderBy(sort.equals(CommentSortTypeConstant.COMMENT_ORDER_BY_LATEST), false, SecondaryComment::getCreateTime);
        // 排序：最早
        wrapper.orderBy(sort.equals(CommentSortTypeConstant.COMMENT_ORDER_BY_EARLIEST), true, SecondaryComment::getCreateTime);

        // 分页查询
        Page<SecondaryComment> page = new Page<>(pageNum,pageSize);
        page(page, wrapper);

        // Bean拷贝
        List<MessageBoardSecondaryCommentVo> messageBoardSecondaryCommentVos = BeanCopyUtil.copyBeanList(page.getRecords(), MessageBoardSecondaryCommentVo.class);

        // 遍历vo
        for (MessageBoardSecondaryCommentVo messageBoardSecondaryCommentVo : messageBoardSecondaryCommentVos) {
            // 根据createBy查询用户的昵称和头像
            String nickName = userService.getById(messageBoardSecondaryCommentVo.getCreateBy()).getNickName();
            String avatar = userService.getById(messageBoardSecondaryCommentVo.getCreateBy()).getAvatar();
            messageBoardSecondaryCommentVo.setNickName(nickName);
            messageBoardSecondaryCommentVo.setAvatar(avatar);

            // 根据回复评论所属的用户id replyUserId 查询回复评论所属的用户昵称 replyUserNickName
            String replyUserNickName = userService.getById(messageBoardSecondaryCommentVo.getReplyUserId()).getNickName();
            messageBoardSecondaryCommentVo.setReplyUserNickName(replyUserNickName);

        }

        return Result.success(new PageVo(messageBoardSecondaryCommentVos,page.getTotal()));

    }

    @Override
    public Result sendMessageBoardSecondaryComment(MessageBoardSecondaryCommentDto messageBoardSecondaryCommentDto) {

        // Bean拷贝
        SecondaryComment messageBoardSecondaryComment = BeanCopyUtil.copyBean(messageBoardSecondaryCommentDto, SecondaryComment.class);
        save(messageBoardSecondaryComment);

        return Result.success();

    }
}




