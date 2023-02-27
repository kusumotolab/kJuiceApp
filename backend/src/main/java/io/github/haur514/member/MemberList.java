package io.github.haur514.member;

import java.util.ArrayList;
import java.util.List;

import io.github.haur514.entity.MemberEntity;

public class MemberList {
    private List<MemberEntity> memberList = new ArrayList<>();

    public MemberList(List<MemberEntity> memberList) {
        this.memberList = memberList;
    }

    public List<String> getMemberNameList() {
        List<String> memberNameList = new ArrayList<>();
        this.memberList
                .stream()
                .forEach((MemberEntity memberEntity) -> {
                    memberNameList.add(memberEntity.getName());
                });
        return memberNameList;
    }

    public MemberList getActiveMember() {
        return (new MemberList(this.memberList
                .stream()
                .filter((MemberEntity memberEntity) -> {
                    return memberEntity.isActive();
                })
                .toList()));
    }
}
