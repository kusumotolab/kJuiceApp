package jp.ac.osaka_u.ist.sdl.kjuiceapp.repository;

import java.util.List;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<MemberEntity, String> {
  public List<MemberEntity> findByAttribute(String attribute);

  public List<MemberEntity> findByActive(boolean active);
}
