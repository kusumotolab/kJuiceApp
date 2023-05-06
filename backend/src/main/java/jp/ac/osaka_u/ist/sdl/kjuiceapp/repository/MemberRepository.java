package jp.ac.osaka_u.ist.sdl.kjuiceapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.MemberEntity;

public interface MemberRepository extends JpaRepository<MemberEntity, String> {
  public List<MemberEntity> findByAttribute(String attribute);
}
