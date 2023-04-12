package jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.member;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.member.requestbody.MemberAddRequestBody;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.member.requestbody.MemberUpdateRequestBody;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.member.responsebody.MemberResponseBody;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.MemberEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.MemberImageEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.MemberService;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.exceptions.DuplicateIdException;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.exceptions.NoSuchMemberException;
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
import org.springframework.web.bind.annotation.RequestParam;
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
  public List<MemberResponseBody> getMembers(
      @RequestParam(required = false) Optional<String> attribute,
      @RequestParam(required = false) Optional<Boolean> active) {
    // TODO isActive
    List<MemberEntity> result;
    if (attribute.isPresent()) {
      result = memberService.getMembersByAttribute(attribute.get());
    } else {
      result = memberService.getAllMember();
    }
    return result.stream().map(MembersController::convert).toList();
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public MemberResponseBody addMember(@RequestBody MemberAddRequestBody member) {
    MemberEntity result;
    try {
      result = memberService.addMember(member.id(), member.name(), member.attribute());
    } catch (DuplicateIdException e) {
      throw new ResponseStatusException(HttpStatus.CONFLICT);
    }
    return convert(result);
  }

  @PatchMapping("{id}")
  public MemberResponseBody updateMember(
      @PathVariable String id, @RequestBody MemberUpdateRequestBody member) {
    try {
      return convert(
          memberService.updateMember(
              id,
              member.name().orElse(null),
              member.attribute().orElse(null),
              member.active().orElse(null)));
    } catch (NoSuchMemberException e) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }
  }

  @DeleteMapping("{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteMember(@PathVariable String id) {
    try {
      memberService.deleteMember(id);
    } catch (NoSuchMemberException e) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }
  }

  @GetMapping("{id}/image")
  public ResponseEntity<InputStreamResource> getMemberImage(@PathVariable String id) {
    Optional<MemberImageEntity> image;
    try {
      image = memberService.getMemberIcon(id);
    } catch (NoSuchMemberException e) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }
    if (image.isPresent()) {
      return ResponseEntity.ok()
          .contentType(new MediaType(image.get().getMediaType()))
          .body(new InputStreamResource(new ByteArrayInputStream(image.get().getImage())));
    } else {
      return ResponseEntity.noContent().build();
    }
  }

  @PutMapping("{id}/image")
  public void setMemberImage(@PathVariable String id, @RequestPart MultipartFile image) {
    try {
      memberService.storeMemberIcon(id, image.getContentType(), image.getBytes());
    } catch (NoSuchMemberException e) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    } catch (IOException e) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return;
  }

  private static MemberResponseBody convert(MemberEntity origin) {
    return new MemberResponseBody(
        origin.getId(), origin.getName(), origin.getAttribute(), origin.isActive());
  }
}
