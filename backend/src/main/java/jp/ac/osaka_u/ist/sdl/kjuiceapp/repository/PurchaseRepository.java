package jp.ac.osaka_u.ist.sdl.kjuiceapp.repository;

import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.PurchaseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PurchaseRepository extends JpaRepository<PurchaseEntity, Integer> {
  public List<PurchaseEntity> findByMemberId(String memberId);

  public List<PurchaseEntity> findByDateBetween(
      LocalDateTime startDateTime, LocalDateTime endDateTime);

  public List<PurchaseEntity> findByMemberIdAndDateBetween(
      String memberId, LocalDateTime startDate, LocalDateTime endDateTime);

  default HashMap<String, Integer> getPurchaseAmountPerMemberInSpecificDate(
      LocalDateTime startDateTime, LocalDateTime endDateTime) {
    List<PurchaseEntity> purchasesByDateBetween = findByDateBetween(startDateTime, endDateTime);
    Map<String, List<PurchaseEntity>> groupByMemberId =
        purchasesByDateBetween.stream().collect(Collectors.groupingBy(PurchaseEntity::getMemberId));
    Map<String, Integer> purchaseAmountByMember =
        groupByMemberId.entrySet().stream()
            .collect(
                Collectors.toMap(
                    Map.Entry::getKey,
                    e -> {
                      return e.getValue().stream().mapToInt(p -> p.getPrice()).sum();
                    }));
    return purchaseAmountByMember.entrySet().stream()
        .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
        .collect(
            Collectors.toMap(
                Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e1, LinkedHashMap::new));
  }

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
        ON member.id = payment.member_id
        ORDER BY sum DESC;
      """,
      nativeQuery = true)
  public List<Object[]> getMonthSummaryAsObjectArray();

  default Map<String, Integer> getPaymentSummary() {
    return getMonthSummaryAsObjectArray().stream()
        .collect(
            Collectors.toMap(
                i -> (String) i[0],
                i -> (new BigInteger(i[1].toString())).intValue(),
                (a, b) -> a,
                LinkedHashMap::new));
  }
}
