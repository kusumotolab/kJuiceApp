package jp.ac.osaka_u.ist.sdl.kjuiceapp.member;

import java.util.ArrayList;
import java.util.List;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.MemberEntity;

public class MemberList {
  private List<MemberEntity> memberList = new ArrayList<>();

  public MemberList(List<MemberEntity> memberList) {
    this.memberList = memberList;
  }

  public List<String> getMemberNameList() {
    List<String> memberNameList = new ArrayList<>();
    this.memberList.stream()
        .forEach(
            (MemberEntity memberEntity) -> {
              memberNameList.add(memberEntity.getName());
            });
    return memberNameList;
  }

  public MemberList getActiveMember() {
    return (new MemberList(
        this.memberList.stream()
            .filter(
                (MemberEntity memberEntity) -> {
                  return memberEntity.isActive();
                })
            .toList()));
  }
}
