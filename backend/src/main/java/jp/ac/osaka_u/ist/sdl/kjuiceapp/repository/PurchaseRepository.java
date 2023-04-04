package jp.ac.osaka_u.ist.sdl.kjuiceapp.repository;

import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.PurchaseEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseRepository extends JpaRepository<PurchaseEntity, Integer> {}
