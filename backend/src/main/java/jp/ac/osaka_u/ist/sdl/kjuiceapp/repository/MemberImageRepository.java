package jp.ac.osaka_u.ist.sdl.kjuiceapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.MemberImageEntity;

public interface MemberImageRepository extends JpaRepository<MemberImageEntity, String> {
  public MemberImageEntity findByName(String name);
}
