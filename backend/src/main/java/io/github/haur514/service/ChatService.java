package io.github.haur514.service;

import io.github.haur514.entity.ChatEntity;
import io.github.haur514.repository.ChatRepository;
import java.util.Date;
import java.util.List;
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

  public String insertChat(String message) {
    ChatEntity chatEntity = new ChatEntity();
    chatEntity.setMessage(message);
    chatEntity.setDate(new Date());
    chatRepository.save(chatEntity);
    return "success";
  }
}
