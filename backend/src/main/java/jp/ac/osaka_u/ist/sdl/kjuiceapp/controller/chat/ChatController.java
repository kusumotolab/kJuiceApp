package jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.chat;

import com.google.gson.Gson;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChatController {

  @Autowired ChatService chatService;

  @PostMapping
  @RequestMapping("/chat/add")
  public String insertHistory(@RequestParam("message") String message) {
    chatService.insertChat(message);
    return "success";
  }

  @PostMapping
  @RequestMapping("/chat/delete")
  public String cancelHistory(@RequestParam("id") String id) {
    return chatService.removeChat(Integer.parseInt(id));
  }

  @RequestMapping("/chat")
  public String getChat() {
    return new Gson().toJson(chatService.findAllChat());
  }
}
