package jp.ac.osaka_u.ist.sdl.kjuiceapp.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.PurchaseEntity;

public interface PurchaseRepository extends JpaRepository<PurchaseEntity, Integer> {
  public List<PurchaseEntity> findByMemberId(String memberId);

  @Query(value = """
    SELECT 
      COALESCE(SUM(price),0)
    FROM purchase as p 
      where 
        p.purchase_date <= :end_date_time 
      and 
        p.purchase_date > :start_date_time
      and
        p.member_id = :member_id    
    """
    ,nativeQuery = true)
  public int getPurchasedAmountBetweenSpecificPeriodByMemberId(@Param("member_id") String memberId,@Param("start_date_time") LocalDateTime startDateTime,@Param("end_date_time") LocalDateTime endDateTime);
}
