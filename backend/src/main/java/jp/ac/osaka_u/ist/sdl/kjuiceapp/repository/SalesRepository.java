package jp.ac.osaka_u.ist.sdl.kjuiceapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.SalesEntity;

public interface SalesRepository extends JpaRepository<SalesEntity, Integer> {

  @Query(
      value =
          """
            SELECT
                *
            FROM
                sales
            WHERE
                date = ?2
            AND
                userId = ?1
            ;
            """,
      nativeQuery = true)
  public SalesEntity findByUserIdAndDate(String userId, String date);
}
