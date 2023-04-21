package jp.ac.osaka_u.ist.sdl.kjuiceapp.repository;

import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.MessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<MessageEntity, Integer> {}
