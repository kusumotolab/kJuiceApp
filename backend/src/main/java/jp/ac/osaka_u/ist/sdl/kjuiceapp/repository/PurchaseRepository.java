package jp.ac.osaka_u.ist.sdl.kjuiceapp.repository;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.PurchaseEntity;

public interface PurchaseRepository extends JpaRepository<PurchaseEntity, Integer> {
  public List<PurchaseEntity> findByMemberId(String memberId);
  
  public List<PurchaseEntity> findByMemberIdAndDateAfter(
      String memberId, LocalDateTime date);

  // 請求書を発行した直近の日時を取得し，それ以降に購入された金額をメンバーごとに集計する．
  @Query(
      value =
          """
        SELECT
          member_id,
          sum
        FROM
          member
        INNER JOIN (
          SELECT
            member_id,
            sum(price)
          FROM
            purchase as p
          WHERE
            p.purchase_date > COALESCE((
              SELECT
                post_date
              FROM
                bill
              ORDER BY
                post_date DESC
              LIMIT
                1
            ),'1753-01-01 00:00:00')
          GROUP BY member_id
        ) as payment
        ON member.id = payment.member_id;
      """,
      nativeQuery = true)
  public List<Object[]> getMonthSummaryAsObjectArray();

  default Map<String, Integer> getPaymentSummary() {
    return getMonthSummaryAsObjectArray().stream()
        .collect(
            Collectors.toMap(
                i -> (String) i[0],
                i -> Integer.parseInt(i[1].toString()),
                (a, b) -> a,
                LinkedHashMap::new));
  }
}
