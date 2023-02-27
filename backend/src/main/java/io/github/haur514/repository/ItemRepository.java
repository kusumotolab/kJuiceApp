package io.github.haur514.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.haur514.entity.ItemEntity;

public interface ItemRepository extends JpaRepository<ItemEntity, Integer>{
    public List<ItemEntity> findByGrouping(String grouping);
    public void deleteByName(String name);
    public ItemEntity findByName(String name);
}
