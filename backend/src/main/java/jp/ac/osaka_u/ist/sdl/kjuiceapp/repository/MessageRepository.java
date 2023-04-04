package jp.ac.osaka_u.ist.sdl.kjuiceapp.repository;

import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.MessageEntity;
import org.springframework.data.repository.CrudRepository;

public interface MessageRepository extends CrudRepository<MessageEntity, Integer> {}
