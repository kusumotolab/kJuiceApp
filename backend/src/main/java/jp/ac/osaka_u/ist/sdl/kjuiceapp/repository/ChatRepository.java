package jp.ac.osaka_u.ist.sdl.kjuiceapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.ChatEntity;

public interface ChatRepository extends JpaRepository<ChatEntity, Integer> {
  // public List<ChatEntity> findAll();
}
