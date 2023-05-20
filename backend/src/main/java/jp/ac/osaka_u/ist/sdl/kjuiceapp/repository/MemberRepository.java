package jp.ac.osaka_u.ist.sdl.kjuiceapp.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<MemberEntity, String> {
  public List<MemberEntity> findByAttribute(String attribute);

  default int getPurchaseAmountInSpecificPeriod(
      String memberId, LocalDateTime startDateTime, LocalDateTime endDateTime) {
    MemberEntity member = findById(memberId).orElseThrow(() -> new NoSuchElementException());
    return member.getPurchases().stream()
        .filter(p -> p.getDate().isAfter(startDateTime) && p.getDate().isBefore(endDateTime))
        .mapToInt(p -> p.getPrice())
        .sum();
  }
}
