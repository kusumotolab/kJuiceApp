package jp.ac.osaka_u.ist.sdl.kjuiceapp.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.ItemEntity;

public interface ItemRepository extends JpaRepository<ItemEntity, Integer> {
  public List<ItemEntity> findByGrouping(String grouping);

  public void deleteByName(String name);

  public ItemEntity findByName(String name);
}
