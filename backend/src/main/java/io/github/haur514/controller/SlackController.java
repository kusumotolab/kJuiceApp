package io.github.haur514.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.haur514.entity.MemberEntity;
import io.github.haur514.service.MemberService;

@RestController
public class SlackController {
    
    @Autowired
    MemberService memberService;

    @GetMapping("/slack")
    public String getSlackData(){
        List<MemberEntity> memberEntities 
            = memberService.findAll().stream()
                .filter((memberEntity) -> memberEntity.isActive())
                .collect(Collectors.toList());
        return makeInvoice(memberEntities);
    }

    private String makeInvoice(List<MemberEntity> memberEntities){
        StringBuffer sb = new StringBuffer();
        for(MemberEntity memberEntity : memberEntities){
            sb.append(memberEntity.getDisplayName());
            // slackに送る方のデータなので様としています．
            sb.append("様"); 
            sb.append("  ");
            sb.append(memberEntity.getUmpayedAmount());
            sb.append("円");
            sb.append("\n");
        }
        return sb.toString();
    }
}
