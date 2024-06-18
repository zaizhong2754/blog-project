package com.zz.config.mybatis;

import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
import com.zz.utils.SecurityUtil;
import org.apache.ibatis.reflection.MetaObject;
import org.springframework.stereotype.Component;

import java.util.Date;

// MybatisPlus字段自动填充
@Component
public class MetaObjectHandlerImpl implements MetaObjectHandler {
    @Override
    public void insertFill(MetaObject metaObject) {
        Long userId = null;
        try {
            userId = SecurityUtil.getUserId();
        } catch (Exception e) {
            // e.printStackTrace();
            userId = 1L; // 获取不到userId，表示是注册，创建用户默认为管理员
        }
        this.setFieldValByName("createTime", new Date(), metaObject);
        this.setFieldValByName("createBy",userId , metaObject);
        this.setFieldValByName("updateTime", new Date(), metaObject);
        this.setFieldValByName("updateBy", userId, metaObject);
    }

    @Override
    public void updateFill(MetaObject metaObject) {
        this.setFieldValByName("updateTime", new Date(), metaObject);
        this.setFieldValByName("updateBy", SecurityUtil.getUserId(), metaObject);
    }
}
