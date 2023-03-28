package io.github.haur514.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.github.haur514.entity.MemberEntity;
import io.github.haur514.service.MemberService;

@RestController
public class SlackController {
    
    @Autowired
    MemberService memberService;

    @GetMapping("/slack")
    public String getSlackData(
        @RequestParam("admin") String adminName,
        @RequestParam("month") int month
    ){
        List<MemberEntity> memberEntities 
            = memberService.findAll().stream()
                .filter((memberEntity) -> memberEntity.isActive())
                .collect(Collectors.toList());
        return makeInvoice(memberEntities,adminName,month);
    }

    private String makeInvoice(List<MemberEntity> memberEntities, String adminName, int month){
        StringBuffer sb = new StringBuffer();
        sb.append("楠本研究室の皆様\n");
        sb.append("食品会・ジュース会大臣の"+adminName+"です．\n");
        sb.append(Integer.toString(month)+"月分の代金は以下のようになっております．\n");
        for(MemberEntity memberEntity : memberEntities){
            sb.append(memberEntity.getDisplayName());
            // slackに送る方のデータなので様としています．
            sb.append("様"); 
            sb.append("  ");
            sb.append(memberEntity.getUmpayedAmount());
            sb.append("円");
            sb.append("\n");
        }
        sb.append("つきましては"+adminName+"までお支払いをお願いいたします．\n");
        sb.append("何かご不明な点等ございましたら"+adminName+"までご連絡ください．\n");
        return sb.toString();
    }
}
