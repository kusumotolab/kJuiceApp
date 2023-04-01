package jp.ac.osaka_u.ist.sdl.kjuiceapp.repository;

import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.MemberImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberImageRepository extends JpaRepository<MemberImageEntity, String> {
  public MemberImageEntity findByName(String name);
}
