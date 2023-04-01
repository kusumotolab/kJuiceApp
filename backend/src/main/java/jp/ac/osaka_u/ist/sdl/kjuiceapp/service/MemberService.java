package jp.ac.osaka_u.ist.sdl.kjuiceapp.service;

import com.google.gson.Gson;
import java.util.List;
import java.util.stream.Collectors;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.common.ManipulateMemberList;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.MemberEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.MemberImageEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.repository.MemberImageRepository;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional
public class MemberService {
  @Autowired MemberRepository memberRepository;

  @Autowired MemberImageRepository memberImageRepository;

  public List<MemberEntity> findAll() {
    return memberRepository.findAll();
  }

  public String findMembers(String name, String attribute) {
    List<MemberEntity> memberEntityList = findMembersByAttribute(attribute);
    if (!name.equals("")) {
      memberEntityList =
          memberEntityList.stream()
              .filter(x -> x.getName().equals(name))
              .collect(Collectors.toList());
    }
    return new Gson().toJson(memberEntityList);
  }

  public List<MemberEntity> findMembersByAttribute(String attribute) {
    if (attribute.equals("")) {
      return memberRepository.findAll();
    } else {
      return memberRepository.findByAttribute(attribute);
    }
  }

  public MemberEntity findByName(String name) {
    return memberRepository.findByName(name);
  }

  public String deleteMember(String name) {
    try {
      if (memberRepository.findByName(name) == null) {
        return "failed";
      } else {
        memberRepository.deleteByName(name);
        return "success";
      }
    } catch (Exception e) {
      return "failed";
    }
  }

  // 既に登録積みのユーザかチェック
  public boolean isRegistered(String name) {
    if (memberRepository.findByName(name) == null) {
      return false;
    }
    return true;
  }

  public String updateMember(
      String name, String displayName, String unpayedAmount, String attribute) {
    if (memberRepository.findByName(name) == null) {
      return "failed";
    }
    MemberEntity memberEntity = memberRepository.findByName(name);
    String tmp_displayName = displayName.equals("") ? memberEntity.getDisplayName() : displayName;
    int tmp_unpayedAmount =
        unpayedAmount.equals("")
            ? memberEntity.getUmpayedAmount()
            : Integer.parseInt(unpayedAmount);
    String tmp_attribute = attribute.equals("") ? memberEntity.getAttribute() : attribute;
    memberEntity.setDisplayName(tmp_displayName);
    memberEntity.setUmpayedAmount(tmp_unpayedAmount);
    memberEntity.setAttribute(tmp_attribute);
    memberRepository.save(memberEntity);
    return "success";
  }

  public String addMember(String name, String displayName, String attribute) {
    // 既に登録済みかチェック
    if (!(memberRepository.findByName(name) == null)) {
      return "failed";
    }
    MemberEntity memberEntity = new MemberEntity();
    memberEntity.setName(name);
    memberEntity.setDisplayName(displayName);
    memberEntity.setUmpayedAmount(0);
    memberEntity.setAttribute(attribute);
    memberRepository.save(memberEntity);
    return "success";
  }

  public String setUnpayedAmount(String name, int unpayedamount) {
    if (memberRepository.findByName(name) == null) {
      return "failed";
    }
    MemberEntity memberEntity = memberRepository.findByName(name);
    memberEntity.setUmpayedAmount(unpayedamount);
    memberRepository.save(memberEntity);
    return "success";
  }

  public String getMemberRanking() {
    List<MemberEntity> memberEntityList = memberRepository.findAll();
    return new ManipulateMemberList().getMembersRanking(memberEntityList);
  }

  public String getMemberWithUnpayedAmount() {
    List<MemberEntity> memberEntityList = memberRepository.findAll();
    List<MemberEntity> memberWithUnpayedAmount =
        memberEntityList.stream()
            .filter(x -> x.getUmpayedAmount() > 0)
            .collect(Collectors.toList());
    return new Gson().toJson(memberWithUnpayedAmount);
  }

  // 商品が購入された時のmemberServiceの動作
  public boolean purchased(String name, int price) {
    MemberEntity memberEntity = memberRepository.findByName(name);
    if (memberEntity == null) {
      return false;
    }
    memberEntity.setUmpayedAmount(memberEntity.getUmpayedAmount() + price);
    memberRepository.save(memberEntity);
    return true;
  }

  // 商品がキャンセルされた時のmemberServiceの動作
  public boolean recalled(String name, int price) {
    MemberEntity memberEntity = memberRepository.findByName(name);
    if (memberEntity == null) {
      return false;
    }
    memberEntity.setUmpayedAmount(memberEntity.getUmpayedAmount() - price);
    memberRepository.save(memberEntity);
    return true;
  }

  // ユーザのアイコンをデータベースに保存する．成功したらtrue, 失敗したらfalseを返す．
  public boolean storeUserIcon(MultipartFile file, String userId) {
    try {
      MemberImageEntity memberImageEntity = new MemberImageEntity();
      memberImageEntity.setData(file.getBytes());
      memberImageEntity.setName(userId);
      memberImageEntity.setType(file.getContentType());
      memberImageRepository.save(memberImageEntity);
    } catch (Exception e) {
      return false;
    }
    return true;
  }
}
