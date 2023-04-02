package jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.member;

import java.io.ByteArrayInputStream;
import java.util.List;
import java.util.Optional;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.member.requestbody.MemberAddRequestBody;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.member.requestbody.MemberUpdateRequestBody;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.member.responcebody.MemberResponceBody;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.MemberImageEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/members")
public class MembersController {
  @Autowired private MemberService memberService;

  @GetMapping
  public List<MemberResponceBody> getMembers() {
    // TODO パラメータによるフィルタリング
    var members = memberService.findAll();
    var resMembers =
        members.stream()
            .map(
                e ->
                    new MemberResponceBody(
                        e.getName(),
                        e.getDisplayName(),
                        e.getUmpayedAmount(),
                        e.getAttribute(),
                        e.isActive()))
            .toList();
    return resMembers;
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public MemberResponceBody addMember(@RequestBody MemberAddRequestBody member) {
    // TODO パラメータバリデーション
    var result = memberService.addMember(member.name, member.displayName, member.attribute);

    // addMemberが失敗したらID衝突と判断する
    if (result == "failed") {
      throw new ResponseStatusException(HttpStatus.CONFLICT);
    }

    var newMember = memberService.findByName(member.name);
    return new MemberResponceBody(
        newMember.getName(),
        newMember.getDisplayName(),
        newMember.getUmpayedAmount(),
        newMember.getAttribute(),
        newMember.isActive());
  }

  @PatchMapping("{id}")
  public MemberResponceBody updateMember(
      @PathVariable String id, @RequestBody MemberUpdateRequestBody member) {
    // TODO
    return new MemberResponceBody(null, null, 0, null, false);
  }

  @DeleteMapping("{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteMember(@PathVariable String id) {
    String result = memberService.deleteMember(id);

    if (result == "failed") {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    return;
  }

  @GetMapping("{id}/image")
  public ResponseEntity<InputStreamResource> getMemberImage(@PathVariable String id) {
    if (!memberService.isRegistered(id)) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    Optional<MemberImageEntity> image = memberService.getMemberIcon(id);
    if (image.isPresent()) {
      return ResponseEntity.ok()
          .contentType(new MediaType(image.get().getType()))
          .body(new InputStreamResource(new ByteArrayInputStream(image.get().getData())));
    } else {
      return ResponseEntity.noContent().build();
    }
  }

  @PutMapping("{id}/image")
  public void setMemberImage(@PathVariable String id, @RequestPart MultipartFile image) {
    if (!memberService.isRegistered(id)) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    if (!memberService.storeUserIcon(image, id)) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return;
  }
}
