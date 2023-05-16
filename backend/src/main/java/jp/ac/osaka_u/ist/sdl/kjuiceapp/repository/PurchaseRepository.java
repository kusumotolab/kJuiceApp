package jp.ac.osaka_u.ist.sdl.kjuiceapp.repository;

import java.time.LocalDateTime;
import java.util.List;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.PurchaseEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseRepository extends JpaRepository<PurchaseEntity, Integer> {
  public List<PurchaseEntity> findByMemberId(String memberId);

  public List<PurchaseEntity> findByDateBetween(
      LocalDateTime startDateTime, LocalDateTime endDateTime);
}
