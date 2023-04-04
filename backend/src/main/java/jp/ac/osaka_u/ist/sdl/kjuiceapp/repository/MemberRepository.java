package jp.ac.osaka_u.ist.sdl.kjuiceapp.repository;

import java.util.List;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.MemberEntity;
import org.springframework.data.repository.CrudRepository;

public interface MemberRepository extends CrudRepository<MemberEntity, String> {
  public List<MemberEntity> findByAttribute(String attribute);
}
