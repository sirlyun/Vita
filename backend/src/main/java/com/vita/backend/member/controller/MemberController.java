package com.vita.backend.member.controller;

import com.vita.backend.member.service.MemberServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberServiceImpl memberServiceImpl;

    @GetMapping("/login")
    public String login() {
        return "redirect:oauth2/authorization/google";
    }

}
