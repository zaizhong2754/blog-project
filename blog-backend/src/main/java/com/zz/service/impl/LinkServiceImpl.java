package com.zz.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.zz.constant.LinkStatusConstant;
import com.zz.constant.UploadFileStatusConstant;
import com.zz.pojo.Result;
import com.zz.pojo.dto.LinkDto;
import com.zz.pojo.entity.Link;
import com.zz.pojo.entity.UploadFile;
import com.zz.pojo.vo.LinkVo;
import com.zz.service.LinkService;
import com.zz.mapper.LinkMapper;
import com.zz.service.UploadFileService;
import com.zz.utils.BeanCopyUtil;
import com.zz.utils.SecurityUtil;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

/**
* @author tom
* @description 针对表【t_link(友链表)】的数据库操作Service实现
* @createDate 2024-03-14 21:10:39
*/
@Service
public class LinkServiceImpl extends ServiceImpl<LinkMapper, Link>
    implements LinkService{

    @Resource
    private UploadFileService uploadFileService;

    @Override
    public Result linkList() {

        // 查询所有审核通过的友链
        LambdaQueryWrapper<Link> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Link::getStatus, LinkStatusConstant.LINK_STATUS_PASS);
        List<Link> links = list(wrapper);

        // Bean拷贝
        List<LinkVo> linkVos = BeanCopyUtil.copyBeanList(links, LinkVo.class);

        return Result.success(linkVos);

    }

    @Override
    public Result sendLink(LinkDto linkDto) {

        Long userId = SecurityUtil.getUserId();
        // 查询当前用户是否提交过友链
        LambdaQueryWrapper<Link> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Link::getCreateBy, userId);
        Link one = getOne(wrapper);
        Link link = BeanCopyUtil.copyBean(linkDto, Link.class);
        if (one != null) {
            // 记录存在，执行覆盖操作
            link.setId(one.getId());
            link.setStatus(LinkStatusConstant.LINK_STATUS_PENDING);

            updateById(link);
        } else {
            // 记录不存在，执行插入操作
            link.setStatus(LinkStatusConstant.LINK_STATUS_PENDING);

            save(link);
        }

        // 提交成功后更改图片链接的状态为正式
        LambdaQueryWrapper<UploadFile> uploadFileWrapper = new LambdaQueryWrapper<>();
        uploadFileWrapper.eq(UploadFile::getUrl, link.getLogo());
        UploadFile uploadFile = uploadFileService.getOne(uploadFileWrapper);
        uploadFile.setStatus(UploadFileStatusConstant.FILE_STATUS_FORMAL);
        uploadFileService.updateById(uploadFile);

        return Result.success();

    }

}




