package com.zz.controller.client;

import com.zz.pojo.Result;
import com.zz.pojo.dto.LinkDto;
import com.zz.service.LinkService;
import jakarta.annotation.Resource;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/client/link")
public class LinkController {

    @Resource
    private LinkService linkService;

    @GetMapping("/list")
    public Result linkList() {
        return linkService.linkList();
    }

    @PostMapping("/send")
    public Result sendLink(@Validated @RequestBody LinkDto linkDto) {
        return linkService.sendLink(linkDto);
    }

}
