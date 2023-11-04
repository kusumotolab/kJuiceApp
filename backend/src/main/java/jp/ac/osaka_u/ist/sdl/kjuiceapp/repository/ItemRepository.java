package jp.ac.osaka_u.ist.sdl.kjuiceapp.repository;

import java.util.List;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.ItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<ItemEntity, String> {
  public List<ItemEntity> findByCategory(String category);

  public List<ItemEntity> findByActive(boolean active);
}
