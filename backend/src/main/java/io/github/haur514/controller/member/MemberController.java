package io.github.haur514.controller.member;

import java.io.IOException;
import java.util.Base64;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;

import io.github.haur514.controller.member.requestbody.MemberAddRequestBody;
import io.github.haur514.controller.member.requestbody.MemberDeleteBody;
import io.github.haur514.controller.member.requestbody.MemberSetActivityBody;
import io.github.haur514.entity.MemberEntity;
import io.github.haur514.entity.MemberImageEntity;
import io.github.haur514.repository.MemberImageRepository;
import io.github.haur514.repository.MemberRepository;
import io.github.haur514.service.HistoryService;
import io.github.haur514.service.MemberService;

@RestController
@EnableAutoConfiguration
public class MemberController {

    @Autowired
    MemberService memberService;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    MemberImageRepository memberImageRepository;

    @Autowired
    HistoryService historyService;

    @PostMapping("/member/add")
    @ResponseBody
    public String addMember(
            @RequestBody MemberAddRequestBody memberAddRequestBody) {
        return memberService.addMember(
                memberAddRequestBody.name,
                memberAddRequestBody.displayName,
                memberAddRequestBody.attribute);
    }

    @PostMapping
    @RequestMapping("/member/update")
    public String updateMember(
            @RequestParam(name = "name") String name,
            @RequestParam(name = "displayName", defaultValue = "") String displayName,
            @RequestParam(name = "unpayedAmount", defaultValue = "") String unpayedAmount,
            @RequestParam(name = "attribute", defaultValue = "") String attribute) {
        return memberService.updateMember(name, displayName, unpayedAmount, attribute);
    }

    @PostMapping("/member/delete")
    @ResponseBody
    public String deleteMember(
            @RequestBody MemberDeleteBody memberDeleteBody) {
        return memberService.deleteMember(memberDeleteBody.name);
    }

    @RequestMapping("/member")
    public String getActiveMembers(
            @RequestParam(name = "name", defaultValue = "") String name,
            @RequestParam(name = "attribute", defaultValue = "") String attribute) {
        return memberService.findMembers(name, attribute);
    }

    @RequestMapping("/member/ranking")
    public String getMemberRanking() {
        return memberService.getMemberRanking();
    }

    @RequestMapping("/member/unpayed")
    public String getMemberWithUnpayedAmount() {
        return memberService.getMemberWithUnpayedAmount();
    }

    @PostMapping("/member/setactivity")
    @ResponseBody
    public String setMemberActivity(
            @RequestBody MemberSetActivityBody memberSetActivityBody) {
        MemberEntity memberEntity = memberService.findByName(memberSetActivityBody.name);
        memberEntity.setActive(memberSetActivityBody.activity);
        memberRepository.save(memberEntity);
        return "success";
    }

    @PutMapping(value = "/member/image")
    public String uploadMemberImage(
            @RequestPart("image") MultipartFile file,
            @RequestPart("userId") String userId ) throws IOException {
        if (!memberService.storeUserIcon(file,userId)) {
            return "failed";
        }
        return new Gson().toJson(memberService.findAll());
    }

    @RequestMapping("/member/image")
    @ResponseBody
    public String getMemberImage(
        @RequestParam(name="name") String name
    ){
        Optional<MemberImageEntity> memberImageEntity = memberImageRepository.findById(name);
        return memberImageEntity.map((e)->{
            String base64str = Base64.getEncoder().encodeToString(e.getData());
            StringBuilder sb = new StringBuilder();
            sb.append("data:");
            sb.append(e.getType());
            sb.append(";base64,");
            sb.append(base64str);
            return sb.toString();
        }).orElse("");
    }
}