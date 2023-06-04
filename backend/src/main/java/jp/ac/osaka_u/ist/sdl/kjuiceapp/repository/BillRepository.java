package jp.ac.osaka_u.ist.sdl.kjuiceapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.BillEntity;

public interface BillRepository extends JpaRepository<BillEntity, String> {
  public List<BillEntity> findAll();

  public Optional<BillEntity> findFirstByOrderByDateDesc();
}
