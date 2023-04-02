package jp.ac.osaka_u.ist.sdl.kjuiceapp.service;

import java.util.Date;
import java.util.List;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.ChatEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ChatService {
  @Autowired ChatRepository chatRepository;

  public List<ChatEntity> findAllChat() {
    return chatRepository.findAll();
  }

  public String removeChat(int id) {
    try {
      // ChatEntity chatEntityFoundById = chatRepository.getReferenceById(id);
      chatRepository.deleteById(id);
      return "success";
    } catch (Exception e) {
      return "failed";
    }
  }

  public ChatEntity insertChat(String message) {
    ChatEntity chatEntity = new ChatEntity();
    chatEntity.setMessage(message);
    chatEntity.setDate(new Date());
    return chatRepository.save(chatEntity);
  }
}
