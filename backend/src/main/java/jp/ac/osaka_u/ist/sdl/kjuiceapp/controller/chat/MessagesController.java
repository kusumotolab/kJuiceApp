package jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.chat;

import java.time.format.DateTimeFormatter;
import java.util.List;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.chat.requestbody.MessagesPostRequestBody;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.chat.responsebody.MessagesResponseBody;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.ChatEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/messages")
public class MessagesController {
  @Autowired private ChatService chatService;

  @GetMapping
  public List<MessagesResponseBody> getMessages() {
    var messagesInternal = chatService.findAllChat();

    var dateFormatter = DateTimeFormatter.ISO_OFFSET_DATE_TIME;

    return messagesInternal.stream()
        .map(
            e ->
                new MessagesResponseBody(
                    e.getId(), e.getMessage(), dateFormatter.format(e.getDate().toInstant())))
        .toList();
  }

  @PostMapping
  public MessagesResponseBody postMessage(@RequestBody MessagesPostRequestBody message) {
    // TODO 文字数制限
    ChatEntity result = chatService.insertChat(message.message());

    var dateFormatter = DateTimeFormatter.ISO_OFFSET_DATE_TIME;

    return new MessagesResponseBody(
        result.getId(), result.getMessage(), dateFormatter.format(result.getDate().toInstant()));
  }

  @DeleteMapping("{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteMessage(@PathVariable int id) {
    String result = chatService.removeChat(id);

    if (result == "failed") {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    return;
  }
}
