package jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.member;

import com.google.gson.Gson;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.member.requestbody.MemberAddRequestBody;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.member.requestbody.MemberDeleteBody;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.member.requestbody.MemberSetActivityBody;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.MemberEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.MemberImageEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.repository.MemberImageRepository;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.repository.MemberRepository;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.HistoryService;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.MemberService;
import java.io.IOException;
import java.util.Base64;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class MemberController {

  @Autowired MemberService memberService;

  @Autowired MemberRepository memberRepository;

  @Autowired MemberImageRepository memberImageRepository;

  @Autowired HistoryService historyService;

  @PostMapping("/member/add")
  public String addMember(@RequestBody MemberAddRequestBody memberAddRequestBody) {
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
  public String deleteMember(@RequestBody MemberDeleteBody memberDeleteBody) {
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
  public String setMemberActivity(@RequestBody MemberSetActivityBody memberSetActivityBody) {
    MemberEntity memberEntity = memberService.findByName(memberSetActivityBody.name);
    memberEntity.setActive(memberSetActivityBody.activity);
    memberRepository.save(memberEntity);
    return "success";
  }

  @PutMapping(value = "/member/image")
  public String uploadMemberImage(
      @RequestPart("image") MultipartFile file, @RequestPart("userId") String userId)
      throws IOException {
    if (!memberService.storeUserIcon(file, userId)) {
      return "failed";
    }
    return new Gson().toJson(memberService.findAll());
  }

  @GetMapping("/member/image")
  public String getMemberImage(@RequestParam(name = "name") String name) {
    Optional<MemberImageEntity> memberImageEntity = memberImageRepository.findById(name);
    return memberImageEntity
        .map(
            (e) -> {
              String base64str = Base64.getEncoder().encodeToString(e.getData());
              StringBuilder sb = new StringBuilder();
              sb.append("data:");
              sb.append(e.getType());
              sb.append(";base64,");
              sb.append(base64str);
              return sb.toString();
            })
        .orElse("");
  }
}
