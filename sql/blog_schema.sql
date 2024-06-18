CREATE DATABASE IF NOT EXISTS `blog_schema` DEFAULT CHARACTER SET utf8mb4;

USE `blog_schema`;

-- 分类表 t_category
DROP TABLE IF EXISTS `t_category`;
CREATE TABLE `t_category` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL COMMENT '分类名',
  `pid` bigint(20) DEFAULT -1 COMMENT '父分类id，如果没有父分类为-1',
  `description` varchar(512) DEFAULT NULL COMMENT '描述',
  `status` char(1) DEFAULT '0' COMMENT '状态0:正常,1禁用',
  `create_by` bigint(20) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_by` bigint(20) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `del_flag` int(1) DEFAULT 0 COMMENT '删除标志（0代表未删除，1代表已删除）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COMMENT='分类表';
INSERT INTO `t_category`(`id`,`name`,`pid`,`description`,`status`,`create_by`,`create_time`,`update_by`,`update_time`,`del_flag`) values 
(1,'java',-1,'wsd','0',NULL,NULL,NULL,NULL,0),
(2,'PHP',-1,'wsd','0',NULL,NULL,NULL,NULL,0);


-- 标签表 t_tag
DROP TABLE IF EXISTS `t_tag`;
CREATE TABLE `t_tag` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL COMMENT '标签名',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  `create_by` bigint(20) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_by` bigint(20) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `del_flag` int(1) DEFAULT 0 COMMENT '删除标志（0代表未删除，1代表已删除）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COMMENT='标签表';
INSERT INTO `t_tag`(`id`,`name`,`remark`,`create_by`,`create_time`,`update_by`,`update_time`,`del_flag`) values 
(1,'Mybatis','weqwe',1,'2022-01-11 09:20:50',1,'2022-01-11 09:20:50',0),
(2,'asdas','weqw',1,'2022-01-11 09:20:55',1,'2022-01-11 09:20:55',1),
(3,'weqw','qweqwe',1,'2022-01-11 09:21:07',1,'2022-01-11 09:21:07',1),
(4,'Java','sdad',1,'2022-01-13 15:22:43',1,'2022-01-13 15:22:43',0),
(5,'WAD','ASDAD',1,'2022-01-13 15:22:47',1,'2022-01-13 15:22:47',0);

-- 文章表 t_article
DROP TABLE IF EXISTS `t_article`;
CREATE TABLE `t_article` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(256) DEFAULT NULL COMMENT '标题',
  `content` longtext DEFAULT NULL COMMENT '文章内容',
  `summary` varchar(1024) DEFAULT NULL COMMENT '文章摘要',
  `category_id` bigint(20) DEFAULT NULL COMMENT '所属分类id',
  `thumbnail` varchar(256) DEFAULT NULL COMMENT '缩略图',
  `is_top` char(1) DEFAULT '0' COMMENT '是否置顶（0否，1是）',
  `status` char(1) DEFAULT '1' COMMENT '状态（0已发布，1草稿）',
  `view_count` bigint(20) DEFAULT 0 COMMENT '访问量',
  `is_comment` char(1) DEFAULT '1' COMMENT '是否允许评论 1是，0否',
  `create_by` bigint(20) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_by` bigint(20) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `del_flag` int(1) DEFAULT 0 COMMENT '删除标志（0代表未删除，1代表已删除）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COMMENT='文章表';
INSERT INTO `t_article`(`id`,`title`,`content`,`summary`,`category_id`,`thumbnail`,`is_top`,`status`,`view_count`,`is_comment`,`create_by`,`create_time`,`update_by`,`update_time`,`del_flag`) values 
(1,'SpringSecurity从入门到精通','## 课程介绍\n![image20211219121555979.png](https://sg-blog-oss.oss-cn-beijing.aliyuncs.com/2022/01/31/e7131718e9e64faeaf3fe16404186eb4.png)\n\n## 0. 简介1\n\n​	**Spring Security** 是 Spring 家族中的一个安全管理框架。相比与另外一个安全框架**Shiro**，它提供了更丰富的功能，社区资源也比Shiro丰富。\n\n​	一般来说中大型的项目都是使用**SpringSecurity** 来做安全框架。小项目有Shiro的比较多，因为相比与SpringSecurity，Shiro的上手更加的简单。\n\n​	 一般Web应用的需要进行**认证**和**授权**。\n\n​		**认证：验证当前访问系统的是不是本系统的用户，并且要确认具体是哪个用户**\n\n​		**授权：经过认证后判断当前用户是否有权限进行某个操作**\n\n​	而认证和授权也是SpringSecurity作为安全框架的核心功能。\n\n\n\n## 1. 快速入门\n\n### 1.1 准备工作\n\n​	我们先要搭建一个简单的SpringBoot工程\n\n① 设置父工程 添加依赖\n\n~~~~\n    <parent>\n        <groupId>org.springframework.boot</groupId>\n        <artifactId>spring-boot-starter-parent</artifactId>\n        <version>2.5.0</version>\n    </parent>\n    <dependencies>\n        <dependency>\n            <groupId>org.springframework.boot</groupId>\n            <artifactId>spring-boot-starter-web</artifactId>\n        </dependency>\n        <dependency>\n            <groupId>org.projectlombok</groupId>\n            <artifactId>lombok</artifactId>\n            <optional>true</optional>\n        </dependency>\n    </dependencies>\n~~~~\n\n② 创建启动类\n\n~~~~\n@SpringBootApplication\npublic class SecurityApplication {\n\n    public static void main(String[] args) {\n        SpringApplication.run(SecurityApplication.class,args);\n    }\n}\n\n~~~~\n\n③ 创建Controller\n\n~~~~java\n\nimport org.springframework.web.bind.annotation.RequestMapping;\nimport org.springframework.web.bind.annotation.RestController;\n\n@RestController\npublic class HelloController {\n\n    @RequestMapping(\"/hello\")\n    public String hello(){\n        return \"hello\";\n    }\n}\n\n~~~~\n\n\n\n### 1.2 引入SpringSecurity\n\n​	在SpringBoot项目中使用SpringSecurity我们只需要引入依赖即可实现入门案例。\n\n~~~~xml\n        <dependency>\n            <groupId>org.springframework.boot</groupId>\n            <artifactId>spring-boot-starter-security</artifactId>\n        </dependency>\n~~~~\n\n​	引入依赖后我们在尝试去访问之前的接口就会自动跳转到一个SpringSecurity的默认登陆页面，默认用户名是user,密码会输出在控制台。\n\n​	必须登陆之后才能对接口进行访问。\n\n\n\n## 2. 认证\n\n### 2.1 登陆校验流程\n![image20211215094003288.png](https://sg-blog-oss.oss-cn-beijing.aliyuncs.com/2022/01/31/414a87eeed344828b5b00ffa80178958.png)','SpringSecurity框架教程-Spring Security+JWT实现项目级前端分离认证授权',1,'https://sg-blog-oss.oss-cn-beijing.aliyuncs.com/2022/01/31/948597e164614902ab1662ba8452e106.png','1','0',105,'0',NULL,'2022-01-23 23:20:11',NULL,NULL,0),
(2,'weq','adadaeqe','adad',2,'https://sg-blog-oss.oss-cn-beijing.aliyuncs.com/2022/01/15/fd2e9460c58a4af3bbeae5d9ed581688.png','1','0',22,'0',NULL,'2022-01-21 14:58:30',NULL,NULL,1),
(3,'dad','asdasda','sadad',1,'https://sg-blog-oss.oss-cn-beijing.aliyuncs.com/2022/01/15/737a0ed0b8ea430d8700a12e76aa1cd1.png','1','0',33,'0',NULL,'2022-01-18 14:58:34',NULL,NULL,1),
(5,'sdad','![Snipaste_20220115_165812.png](https://sg-blog-oss.oss-cn-beijing.aliyuncs.com/2022/01/15/1d9d283f5d874b468078b183e4b98b71.png)\r\n\r\n## sda \r\n\r\n222\r\n### sdasd newnewnew',NULL,2,'','1','0',44,'0',NULL,'2022-01-17 14:58:37',NULL,NULL,0);


-- 文章和标签关联表 t_article_tag
DROP TABLE IF EXISTS `t_article_tag`;
CREATE TABLE `t_article_tag` (
  `article_id` bigint(20) NOT NULL COMMENT '文章id',
  `tag_id` bigint(20) NOT NULL COMMENT '标签id',
  PRIMARY KEY (`article_id`,`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='文章和标签关联表';
INSERT INTO `t_article_tag`(`article_id`,`tag_id`) values 
(1,4),
(2,1),
(2,4),
(3,4),
(3,5);

-- 一级评论表 t_primary_comment
DROP TABLE IF EXISTS `t_primary_comment`;
CREATE TABLE `t_primary_comment` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '一级评论id',
  `type` char(1) DEFAULT '0' COMMENT '评论类型（0代表文章评论，1代表留言评论）',
  `article_id` bigint(20) DEFAULT NULL COMMENT '评论所属的文章id',
  `address` varchar(64) DEFAULT NULL COMMENT 'ip属地',
  `browser` varchar(64) DEFAULT NULL COMMENT '浏览器类型',
  `device` varchar(64) DEFAULT NULL COMMENT '设备（操作系统）类型',
  `content` longtext COMMENT '评论内容',
  `create_by` bigint(20) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_by` bigint(20) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `del_flag` int(1) DEFAULT 0 COMMENT '删除标志（0代表未删除，1代表已删除）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COMMENT='一级评论表';
INSERT INTO `t_primary_comment` (`id`,`type`,`article_id`,`address`,`browser`,`device`,`content`,`create_by`,`create_time`,`update_by`,`update_time`,`del_flag`) values 
(1,'0',1,'江苏','Edge123.0','Windows 10','asS',1,'2022-01-29 07:59:22',1,'2022-01-29 07:59:22',0),
(2,'0',1,'江苏','Edge123.0','Windows 10','[哈哈]SDAS',3,'2022-01-29 08:01:24',3,'2022-01-29 08:01:24',0),
(3,'0',1,'江苏','Edge123.0','Windows 10','是大多数',4,'2022-01-29 16:07:24',4,'2022-01-29 16:07:24',0);

-- 二级评论表 t_secondary_comment
DROP TABLE IF EXISTS `t_secondary_comment`;
CREATE TABLE `t_secondary_comment` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '二级评论id',
  `type` char(1) DEFAULT '0' COMMENT '评论类型（0代表文章评论，1代表留言评论）',
  `article_id` bigint(20) DEFAULT NULL COMMENT '评论所属的文章id',
  `primary_comment_id` bigint(20) DEFAULT NULL COMMENT '所属的一级评论id',
  `reply_type` char(1) DEFAULT '1' COMMENT '评论回复类型（1代表回复一级评论，2代表回复二级评论）',
  `reply_comment_id` bigint(20) DEFAULT NULL COMMENT '回复评论id',
  `reply_user_id` bigint(20) DEFAULT NULL COMMENT '回复评论所属的用户id',
  `address` varchar(64) DEFAULT NULL COMMENT 'ip属地',
  `browser` varchar(64) DEFAULT NULL COMMENT '浏览器类型',
  `device` varchar(64) DEFAULT NULL COMMENT '设备（操作系统）类型',
  `content` longtext COMMENT '评论内容',
  `create_by` bigint(20) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_by` bigint(20) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `del_flag` int(1) DEFAULT 0 COMMENT '删除标志（0代表未删除，1代表已删除）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COMMENT='二级评论表';
INSERT INTO `t_secondary_comment` (`id`,`type`,`article_id`,`primary_comment_id`,`reply_type`,`reply_comment_id`,`reply_user_id`,`address`,`browser`,`device`,`content`,`create_by`,`create_time`,`update_by`,`update_time`,`del_flag`) values 
(1,'0',1,1,'1',1,1,'江苏','Edge123.0','Windows 10','asS',1,'2022-01-29 07:59:22',1,'2022-01-29 07:59:22',0),
(2,'0',1,1,'1',1,1,'江苏','Edge123.0','Windows 10','[哈哈]SDAS',3,'2022-01-29 08:01:24',3,'2022-01-29 08:01:24',0),
(3,'0',1,1,'2',1,1,'江苏','Edge123.0','Windows 10','是大多数',4,'2022-01-29 16:07:24',4,'2022-01-29 16:07:24',0);

-- 友链表 t_link
DROP TABLE IF EXISTS `t_link`;
CREATE TABLE `t_link` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) DEFAULT NULL COMMENT '友链标题',
  `logo` varchar(256) DEFAULT NULL COMMENT '友链logo',
  `description` varchar(512) DEFAULT NULL COMMENT '友链简介',
  `address` varchar(128) DEFAULT NULL COMMENT '网站地址',
  `status` char(1) DEFAULT '2' COMMENT '审核状态 (0代表审核通过，1代表审核未通过，2代表未审核)',
  `create_by` bigint(20) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_by` bigint(20) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `del_flag` int(1) DEFAULT 0 COMMENT '删除标志（0代表未删除，1代表已删除）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COMMENT='友链表';
INSERT INTO `t_link`(`id`,`name`,`logo`,`description`,`address`,`status`,`create_by`,`create_time`,`update_by`,`update_time`,`del_flag`) values 
(1,'sda','https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fn1.itc.cn%2Fimg8%2Fwb%2Frecom%2F2016%2F05%2F10%2F146286696706220328.PNG&refer=http%3A%2F%2Fn1.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1646205529&t=f942665181eb9b0685db7a6f59d59975','sda','https://www.baidu.com','0',1,'2022-01-13 08:25:47',1,'2022-01-13 08:36:14',0),
(2,'sda','https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fn1.itc.cn%2Fimg8%2Fwb%2Frecom%2F2016%2F05%2F10%2F146286696706220328.PNG&refer=http%3A%2F%2Fn1.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1646205529&t=f942665181eb9b0685db7a6f59d59975','dada','https://www.qq.com','0',1,'2022-01-13 09:06:10',1,'2022-01-13 09:07:09',0),
(3,'sa','https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fn1.itc.cn%2Fimg8%2Fwb%2Frecom%2F2016%2F05%2F10%2F146286696706220328.PNG&refer=http%3A%2F%2Fn1.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1646205529&t=f942665181eb9b0685db7a6f59d59975','da','https://www.taobao.com','0',1,'2022-01-13 09:23:01',1,'2022-01-13 09:23:01',0);

-- 文件上传记录表 t_upload_file
DROP TABLE IF EXISTS `t_upload_file`;
CREATE TABLE `t_upload_file` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `file_name` varchar(128) DEFAULT NULL COMMENT '文件名',
  `url` varchar(128) DEFAULT NULL COMMENT '文件地址',
  `bucket_name` varchar(64) DEFAULT NULL COMMENT '存储桶名',
  `status` char(1) DEFAULT '1' COMMENT '文件状态 (0代表正式，1代表临时)',
  `create_by` bigint(20) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_by` bigint(20) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `del_flag` int(1) DEFAULT 0 COMMENT '删除标志（0代表未删除，1代表已删除）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COMMENT='文件上传记录表';

-- 用户表 t_user
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_name` varchar(64) NOT NULL COMMENT '用户名',
  `nick_name` varchar(64) NOT NULL COMMENT '昵称',
  `password` varchar(64) NOT NULL COMMENT '密码',
  `status` char(1) DEFAULT '0' COMMENT '账号状态（0正常 1停用）',
  `email` varchar(64) DEFAULT NULL COMMENT '邮箱',
  `phonenumber` varchar(32) DEFAULT NULL COMMENT '手机号',
  `sex` char(1) DEFAULT NULL COMMENT '用户性别（0男，1女，2未知）',
  `avatar` varchar(128) DEFAULT NULL COMMENT '头像',
  `create_by` bigint(20) DEFAULT NULL COMMENT '创建人的用户id',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_by` bigint(20) DEFAULT NULL COMMENT '更新人',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `del_flag` int(1) DEFAULT 0 COMMENT '删除标志（0代表未删除，1代表已删除）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COMMENT='用户表';
INSERT INTO `t_user`(`id`,`user_name`,`nick_name`,`password`,`status`,`email`,`phonenumber`,`sex`,`avatar`,`create_by`,`create_time`,`update_by`,`update_time`,`del_flag`) values 
(1,'sg','sg333','$2a$10$Jnq31rRkNV3RNzXe0REsEOSKaYK8UgVZZqlNlNXqn.JeVcj2NdeZy','0','23412332@qq.com','18888888888','1','https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F3bf9c263bc0f2ac5c3a7feb9e218d07475573ec8.gi',NULL,'2022-01-05 09:01:56',1,'2022-01-30 15:37:03',0),
(3,'sg3','weqe','$2a$10$ydv3rLkteFnRx9xelQ7elOiVhFvXOooA98xCqk/omh7G94R.K/E3O','0',NULL,NULL,'0',NULL,NULL,'2022-01-05 13:28:43',NULL,'2022-01-05 13:28:43',0),
(4,'sg2','dsadd','$2a$10$kY4T3SN7i4muBccZppd2OOkhxMN6yt8tND1sF89hXOaFylhY2T3he','0','23412332@qq.com','19098790742','0',NULL,NULL,NULL,NULL,NULL,0),
(5,'sg2233','tteqe','$2a$10$kY4T3SN7i4muBccZppd2OOkhxMN6yt8tND1sF89hXOaFylhY2T3he','0',NULL,'18246845873','1',NULL,NULL,'2022-01-06 03:51:13',NULL,'2022-01-06 07:00:50',0),
(6,'sangeng','sangeng','$2a$10$Jnq31rRkNV3RNzXe0REsEOSKaYK8UgVZZqlNlNXqn.JeVcj2NdeZy','0','2312321','17777777777','0',NULL,NULL,'2022-01-16 06:54:26',NULL,'2022-01-16 07:06:34',0);


-- 角色表 t_role
DROP TABLE IF EXISTS `t_role`;
CREATE TABLE `t_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '角色ID',
  `role_name` varchar(32) NOT NULL COMMENT '角色名称',
  `role_key` varchar(64) NOT NULL COMMENT '角色权限字符串',
  `role_sort` int(4) NOT NULL COMMENT '显示顺序',
  `status` char(1) NOT NULL COMMENT '角色状态（0正常 1停用）',
  `remark` varchar(512) DEFAULT NULL COMMENT '备注',
  `create_by` bigint(20) DEFAULT NULL COMMENT '创建者',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_by` bigint(20) DEFAULT NULL COMMENT '更新者',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `del_flag` char(1) DEFAULT 0 COMMENT '删除标志（0代表存在 1代表删除）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COMMENT='角色表';
INSERT INTO `t_role`(`id`,`role_name`,`role_key`,`role_sort`,`status`,`remark`,`create_by`,`create_time`,`update_by`,`update_time`,`del_flag`) values 
(1,'管理员','admin',1,'0','管理员',1,'2021-11-12 10:46:19',1,'2022-01-01 22:32:58',0),
(2,'访客','visitor',2,'0','访客',1,'2021-11-12 10:46:19',1,'2022-01-01 22:32:58',0);

-- 用户和角色关联表 t_user_role
DROP TABLE IF EXISTS `t_user_role`;
CREATE TABLE `t_user_role` (
  `user_id` bigint(20) NOT NULL COMMENT '用户ID',
  `role_id` bigint(20) NOT NULL COMMENT '角色ID',
  PRIMARY KEY (`user_id`,`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户和角色关联表';
INSERT INTO `t_user_role`(`user_id`,`role_id`) values 
(1,1),
(3,2),
(4,2),
(5,2),
(6,2);

-- 菜单表 t_menu
DROP TABLE IF EXISTS `t_menu`;
CREATE TABLE `t_menu` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL COMMENT '菜单名称',
  `pid` bigint(20) DEFAULT -1 COMMENT '父菜单ID',
  `order` int(4) DEFAULT 1 COMMENT '显示顺序',
  `path` varchar(200) DEFAULT NULL COMMENT '路由地址',
  `component` varchar(256) DEFAULT NULL COMMENT '组件路径',
  `is_frame` char(1) DEFAULT '1' COMMENT '是否为外链（0是 1否）',
  `status` char(1) DEFAULT '0' COMMENT '菜单状态（0正常 1停用）',
  `icon` varchar(100) DEFAULT NULL COMMENT '菜单图标',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  `create_by` bigint(20) DEFAULT NULL COMMENT '创建者',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_by` bigint(20) DEFAULT NULL COMMENT '更新者',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `del_flag` int(1) DEFAULT 0 COMMENT '删除标志（0代表存在 1代表删除）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=600 DEFAULT CHARSET=utf8 COMMENT='菜单表';
INSERT INTO `t_menu`
(`id`,`name`,`pid`,`order`,`path`,`component`,`is_frame`,`status`,`icon`,`remark`,`create_by`,`create_time`,`update_by`,`update_time`,`del_flag`) values 
(2,'写博文',-1,2,'write','content/article/write/index','1','0',NULL,NULL,1,'2022-01-08 03:39:58',1,'2022-07-31 22:07:05',0),
(3,'系统管理',-1,3,'system',NULL,'1','0',NULL,NULL,1,'2022-01-08 03:39:58',1,'2022-07-31 22:07:05',0),
(301,'用户管理',3,1,'user','system/user/index','1','0',NULL,NULL,1,'2022-01-08 03:39:58',1,'2022-07-31 22:07:05',0),
(302,'角色管理',3,2,'role','system/role/index','1','0',NULL,NULL,1,'2022-01-08 03:39:58',1,'2022-07-31 22:07:05',0),
(303,'菜单管理',3,3,'menu','system/menu/index','1','0',NULL,NULL,1,'2022-01-08 03:39:58',1,'2022-07-31 22:07:05',0),
(4,'内容管理',-1,4,'content',NULL,'1','0',NULL,NULL,1,'2022-01-08 03:39:58',1,'2022-07-31 22:07:05',0),
(401,'文章管理',4,1,'article','content/article/index','1','0',NULL,NULL,1,'2022-01-08 03:39:58',1,'2022-07-31 22:07:05',0),
(402,'分类管理',4,2,'category','content/category/index','1','0',NULL,NULL,1,'2022-01-08 03:39:58',1,'2022-07-31 22:07:05',0),
(403,'友链管理',4,3,'link','content/link/index','1','0',NULL,NULL,1,'2022-01-08 03:39:58',1,'2022-07-31 22:07:05',0),
(404,'标签管理',4,4,'tag','content/tag/index','1','0',NULL,NULL,1,'2022-01-08 03:39:58',1,'2022-07-31 22:07:05',0);

-- 角色和菜单关联表 t_role_menu
DROP TABLE IF EXISTS `t_role_menu`;
CREATE TABLE `t_role_menu` (
  `role_id` bigint(20) NOT NULL COMMENT '角色ID',
  `menu_id` bigint(20) NOT NULL COMMENT '菜单ID',
  PRIMARY KEY (`role_id`,`menu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色和菜单关联表';
INSERT INTO `t_role_menu`(`role_id`,`menu_id`) values 
(1,2),
(1,3),
(1,301),
(1,302),
(1,303),
(1,4),
(1,401),
(1,402),
(1,403),
(1,404);

-- 权限表 t_permission
DROP TABLE IF EXISTS `t_permission`;
CREATE TABLE `t_permission` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '权限ID',
  `name` varchar(50) NOT NULL COMMENT '权限名称',
  `status` char(1) DEFAULT '0' COMMENT '权限状态（0生效,1未生效）',
  `authority` varchar(100) NOT NULL COMMENT '权限标识',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  `create_by` bigint(20) DEFAULT NULL COMMENT '创建者',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_by` bigint(20) DEFAULT NULL COMMENT '更新者',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `del_flag` int(1) DEFAULT 0 COMMENT '删除标志（0代表存在 1代表删除）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6000 DEFAULT CHARSET=utf8 COMMENT='权限表';
INSERT INTO `t_permission`
(`id`,`name`,`status`,`authority`,`remark`,`create_by`,`create_time`,`update_by`,`update_time`,`del_flag`) values 
(1001,'用户查询','0','system:user:query','用户查询',1,'2021-11-12 10:46:19',1,'2021-11-12 10:46:19',0),
(1002, '用户新增', '0', 'system:user:add', '用户新增', 1, '2021-11-12 10:46:19', 1, '2021-11-12 10:46:19', 0),
(1003, '用户修改', '0', 'system:user:edit', '用户修改', 1, '2021-11-12 10:46:19', 1, '2021-11-12 10:46:19', 0),
(1004, '用户删除', '0', 'system:user:remove', '用户删除', 1, '2021-11-12 10:46:19', 1, '2021-11-12 10:46:19', 0),
(1005, '用户导出', '0', 'system:user:export', '用户导出', 1, '2021-11-12 10:46:19', 1, '2021-11-12 10:46:19', 0),
(1006, '用户导入', '0', 'system:user:import', '用户导入', 1, '2021-11-12 10:46:19', 1, '2021-11-12 10:46:19', 0),
(1007, '重置密码', '0', 'system:user:resetPwd', '重置密码', 1, '2021-11-12 10:46:19', 1, '2021-11-12 10:46:19', 0),
(1008, '角色查询', '0', 'system:role:query', '角色查询', 1, '2021-11-12 10:46:19', 1, '2021-11-12 10:46:19', 0),
(1009, '角色新增', '0', 'system:role:add', '角色新增', 1, '2021-11-12 10:46:19', 1, '2021-11-12 10:46:19',0),
(1010, '角色修改', '0', 'system:role:edit', '角色修改', 1, '2021-11-12 10:46:19', 1, '2021-11-12 10:46:19', 0),
(1011, '角色删除', '0', 'system:role:remove', '角色删除', 1, '2021-11-12 10:46:19', 1, '2021-11-12 10:46:19', 0),
(1012, '角色导出', '0', 'system:role:export', '角色导出', 1, '2021-11-12 10:46:19', 1, '2021-11-12 10:46:19', 0),
(1013, '菜单查询', '0', 'system:menu:query', '菜单查询', 1, '2021-11-12 10:46:19', 1, '2021-11-12 10:46:19', 0),
(1014, '菜单新增', '0', 'system:menu:add', '菜单新增', 1, '2021-11-12 10:46:19', 1, '2021-11-12 10:46:19', 0),
(1015, '菜单修改', '0', 'system:menu:edit', '菜单修改', 1, '2021-11-12 10:46:19', 1, '2021-11-12 10:46:19', 0),
(1016, '菜单删除', '0', 'system:menu:remove', '菜单删除', 1, '2021-11-12 10:46:19', 1, '2021-11-12 10:46:19', 0),
(2024, '友链新增', '0', 'content:link:add', '友链新增', 1, '2021-11-12 10:46:19', 1, '2021-11-12 10:46:19', 0),
(2025, '友链修改', '0', 'content:link:edit', '友链修改', 1, '2021-11-12 10:46:19', 1, '2021-11-12 10:46:19', 0),
(2026, '友链删除', '0', 'content:link:remove', '友链删除', 1, '2021-11-12 10:46:19', 1, '2021-11-12 10:46:19', 0),
(2027, '友链查询', '0', 'content:link:query', '友链查询', 1, '2021-11-12 10:46:19', 1, '2021-11-12 10:46:19', 0),
(2028, '导出分类', '0', 'content:category:export', '导出分类', 1, '2021-11-12 10:46:19', 1, '2021-11-12 10:46:19', 0);

-- 角色和权限关联表 t_role_permission
DROP TABLE IF EXISTS `t_role_permission`;
CREATE TABLE `t_role_permission` (
  `role_id` bigint(20) NOT NULL COMMENT '角色ID',
  `permission_id` bigint(20) NOT NULL COMMENT '权限ID',
  PRIMARY KEY (`role_id`,`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色和权限关联表';
INSERT INTO `t_role_permission`(`role_id`,`permission_id`) values 
(1,1001),
(1,1002),
(1,1003),
(1,1004),
(1,1005),
(1,1006),
(1,1007),
(1,1008),
(1,1009),
(1,1010),
(1,1011),
(1,1012),
(1,1013),
(1,1014),
(1,1015),
(1,1016),
(1,2024),
(1,2025),
(1,2026),
(1,2027),
(1,2028);
