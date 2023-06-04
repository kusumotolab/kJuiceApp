package jp.ac.osaka_u.ist.sdl.kjuiceapp.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.MemberEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.MemberImageEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.repository.MemberImageRepository;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.repository.MemberRepository;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.repository.PurchaseRepository;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.exceptions.DuplicateIdException;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.exceptions.NoSuchMemberException;

@Service
@Transactional
public class MemberService {
  @Autowired MemberRepository memberRepository;
  @Autowired PurchaseRepository purchaseRepository;
  @Autowired BillService billService;
  @Autowired MemberImageRepository memberImageRepository;

  public List<MemberEntity> getAllMember() {
    return memberRepository.findAll();
  }

  public List<MemberEntity> getMembersByAttribute(String attribute) {
    return memberRepository.findByAttribute(attribute);
  }

  public Optional<MemberEntity> getMember(String id) {
    return memberRepository.findById(id);
  }

  public void deleteMember(String id) throws NoSuchMemberException {
    if (!memberRepository.existsById(id)) {
      throw new NoSuchMemberException();
    }

    memberRepository.deleteById(id);
    return;
  }

  public MemberEntity updateMember(String id, String name, String attribute, Boolean active)
      throws NoSuchMemberException {
    MemberEntity target = memberRepository.findById(id).orElseThrow(NoSuchMemberException::new);

    if (name != null) target.setName(name);
    if (attribute != null) target.setAttribute(attribute);
    if (active != null) target.setActive(active);

    return memberRepository.save(target);
  }

  public MemberEntity addMember(String id, String name, String attribute)
      throws DuplicateIdException {
    if (!id.matches("^[a-z0-9_-]+$")) {
      throw new IllegalArgumentException("Invalid Member ID Specified.");
    }
    if (memberRepository.existsById(id)) {
      throw new DuplicateIdException();
    }

    boolean defaultActive = false;

    MemberEntity memberEntity = new MemberEntity(id, name, attribute, defaultActive);
    return memberRepository.save(memberEntity);
  }

  public void storeMemberIcon(String id, String contentType, byte[] image)
      throws NoSuchMemberException, IOException {
    if (!memberRepository.existsById(id)) {
      throw new NoSuchMemberException();
    }

    Optional<MemberImageEntity> target = memberImageRepository.findById(id);

    MemberImageEntity newMemberImageEntity;
    if (target.isPresent()) {
      newMemberImageEntity = target.get();
      newMemberImageEntity.setImage(contentType, image);
    } else {
      newMemberImageEntity = new MemberImageEntity(id, contentType, image);
    }

    memberImageRepository.save(newMemberImageEntity);
    return;
  }

  // ユーザーのアイコンをデータベースから取得する
  public Optional<MemberImageEntity> getMemberIcon(String id) throws NoSuchMemberException {
    if (!memberRepository.existsById(id)) {
      throw new NoSuchMemberException();
    }
    return memberImageRepository.findById(id);
  }

  public int getNextPaymentByMember(String memberId){
    LocalDateTime recentBillDate = billService.getRecentBillDate();
    return purchaseRepository.findByMemberIdAndDateAfter(
      memberId,recentBillDate).stream()
      .mapToInt(e -> e.getPrice())
      .sum();
  }
}
