package com.zz.controller.admin;

import com.zz.pojo.Result;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/hello")
public class HelloController {

    @GetMapping
    @PreAuthorize("@ps.hasPermission('system:user:query','system:user:add') and @ps.hasRole('admin1')")
    public Result hello() {
        System.out.println("hello");
        return Result.success("hello");
    }

}
