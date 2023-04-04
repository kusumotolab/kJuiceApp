package jp.ac.osaka_u.ist.sdl.kjuiceapp.service;

import java.util.List;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.MessageEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.repository.MessageRepository;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.exceptions.NoSuchMessageException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MessageService {
  @Autowired MessageRepository messageRepository;

  public List<MessageEntity> findAllMessage() {
    return messageRepository.findAll();
  }

  public void deleteMessage(int id) throws NoSuchMessageException {
    if (messageRepository.existsById(id)) {
      throw new NoSuchMessageException();
    }
    messageRepository.deleteById(id);
    return;
  }

  public MessageEntity postMessage(String message) {
    MessageEntity newMessage = new MessageEntity(message);
    return messageRepository.save(newMessage);
  }
}
