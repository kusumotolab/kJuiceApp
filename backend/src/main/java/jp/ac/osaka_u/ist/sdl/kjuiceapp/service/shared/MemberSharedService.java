package jp.ac.osaka_u.ist.sdl.kjuiceapp.service.shared;

import java.util.List;
import java.util.Optional;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.MemberEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberSharedService {
  @Autowired MemberRepository memberRepository;

  // active = trueの場合，アクティブなメンバーのみを取得
  // active = falseの場合，全メンバーを取得
  public List<MemberEntity> getMembers(Optional<Boolean> active) {
    return active.orElse(false) ? memberRepository.findByActive(true) : memberRepository.findAll();
  }

  // active = trueの場合，アクティブなメンバーのみを取得
  // active = falseの場合，全メンバーを取得
  public List<String> getMemberIds(Optional<Boolean> active) {
    return getMembers(active).stream().map(m -> m.getId()).toList();
  }
}
