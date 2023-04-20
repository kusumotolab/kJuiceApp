package io.github.haur514.repository;

import io.github.haur514.entity.MemberEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MemberRepository extends JpaRepository<MemberEntity, Integer> {

  @Query(
      value =
          """
        SELECT
            *
        FROM
            member
        WHERE
            name = ?1
        ;
    """,
      nativeQuery = true)
  public MemberEntity findByName(String name);

  public List<MemberEntity> findByAttribute(String attribute);

  public void deleteByName(String name);
}
