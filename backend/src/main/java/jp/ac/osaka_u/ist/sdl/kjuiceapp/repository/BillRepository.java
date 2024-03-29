package jp.ac.osaka_u.ist.sdl.kjuiceapp.repository;

import java.util.List;
import java.util.Optional;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.BillEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BillRepository extends JpaRepository<BillEntity, String> {
  public List<BillEntity> findAll();

  public Optional<BillEntity> findFirstByOrderByDateDesc();
}
