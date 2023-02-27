package io.github.haur514.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.haur514.entity.ChatEntity;



public interface ChatRepository extends JpaRepository<ChatEntity, Integer>{
    // public List<ChatEntity> findAll();
}
