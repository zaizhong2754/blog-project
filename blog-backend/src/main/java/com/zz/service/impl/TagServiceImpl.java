package com.zz.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.zz.exception.SystemException;
import com.zz.pojo.Result;
import com.zz.pojo.dto.admin.AdminAddOrPutTagDto;
import com.zz.pojo.dto.admin.AdminTagListDto;
import com.zz.pojo.entity.Tag;
import com.zz.pojo.vo.PageVo;
import com.zz.pojo.vo.TagVo;
import com.zz.pojo.vo.admin.AdminTagVo;
import com.zz.service.TagService;
import com.zz.mapper.TagMapper;
import com.zz.utils.BeanCopyUtil;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Objects;

/**
* @author tom
* @description 针对表【t_tag(标签表)】的数据库操作Service实现
* @createDate 2024-03-24 14:59:40
*/
@Service
public class TagServiceImpl extends ServiceImpl<TagMapper, Tag>
    implements TagService{

    @Override
    public Result tagList() {
        LambdaQueryWrapper<Tag> wrapper = new LambdaQueryWrapper<>();
        wrapper.select(Tag::getId,Tag::getName);
        List<Tag> list = list(wrapper);

        // bean拷贝
        List<TagVo> tagVos = BeanCopyUtil.copyBeanList(list, TagVo.class);
        return Result.success(tagVos);
    }

    @Override
    public Result<PageVo> adminTagList(Integer pageNum, Integer pageSize, AdminTagListDto adminTagListDto) {

        //分页查询
        LambdaQueryWrapper<Tag> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(StringUtils.hasText(adminTagListDto.getName()),Tag::getName,adminTagListDto.getName());
        wrapper.eq(StringUtils.hasText(adminTagListDto.getRemark()),Tag::getRemark,adminTagListDto.getRemark());

        Page<Tag> page = new Page<>();
        page.setCurrent(pageNum);
        page.setSize(pageSize);
        page(page, wrapper);

        PageVo pageVo = new PageVo(page.getRecords(),page.getTotal());
        return Result.success(pageVo);

    }

    @Override
    public Result adminAddTag(AdminAddOrPutTagDto adminAddOrPutTagDto) {

        // 对标签名进行是否存在校验
        if (checkUniqueTagName(adminAddOrPutTagDto.getName())) {
            throw new SystemException("标签名已存在");
        }

        Tag tag = BeanCopyUtil.copyBean(adminAddOrPutTagDto, Tag.class);

        //存入数据库
        save(tag);

        return Result.success();

    }

    @Override
    public Result adminDeleteTag(Long id) {

        removeById(id);

        return Result.success();
    }

    @Override
    public Result adminGetTagById(Long id) {

        Tag tag = getById(id);

        if (Objects.isNull(tag)) {
            throw new SystemException("标签不存在");
        }

        AdminTagVo adminTagVo = BeanCopyUtil.copyBean(tag, AdminTagVo.class);
        return Result.success(adminTagVo);
    }

    @Override
    public Result adminPutTag(Long id, AdminAddOrPutTagDto adminAddOrPutTagDto) {

        Tag tag = getById(id);

        if (Objects.isNull(tag)) {
            throw new SystemException("标签不存在");
        }

        tag.setName(adminAddOrPutTagDto.getName());
        tag.setRemark(adminAddOrPutTagDto.getRemark());
        updateById(tag);

        AdminTagVo adminTagVo = BeanCopyUtil.copyBean(tag, AdminTagVo.class);
        return Result.success(adminTagVo);
    }

    private boolean checkUniqueTagName(String tagName) {

        LambdaQueryWrapper<Tag> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Tag::getName, tagName);

        return count(wrapper) > 0;

    }

}




