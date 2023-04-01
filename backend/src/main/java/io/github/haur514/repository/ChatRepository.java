package io.github.haur514.repository;

import io.github.haur514.entity.ChatEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<ChatEntity, Integer> {
  // public List<ChatEntity> findAll();
}
