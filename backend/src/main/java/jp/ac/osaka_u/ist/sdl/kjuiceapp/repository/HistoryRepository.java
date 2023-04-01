package jp.ac.osaka_u.ist.sdl.kjuiceapp.repository;

import java.util.Date;
import java.util.List;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.HistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface HistoryRepository extends JpaRepository<HistoryEntity, Integer> {

  @Query(
      value =
          """
        SELECT
            *
        FROM
            (
                SELECT
                    *
                FROM
                    history
                WHERE
                    name = ?1
                ORDER BY
                    date
                desc limit 30
            ) as A
        ORDER BY date
        ;
    """,
      nativeQuery = true)
  public List<HistoryEntity> findByName(String name);

  @Query(
      value =
          """
            SELECT
                SUM(price)
            FROM
                history
            WHERE
                date
            BETWEEN
                    ?2
                AND
                    ?3
            AND
                name = ?1
            ;
            """,
      nativeQuery = true)
  public Integer getBillingAmountAllMember(String userId, Date date1, Date date2);
}
