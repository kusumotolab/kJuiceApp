package jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.chat;

import java.time.format.DateTimeFormatter;
import java.util.List;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.chat.requestbody.MessagesPostRequestBody;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.chat.responsebody.MessagesResponseBody;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.MessageEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.MessageService;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.exceptions.NoSuchMessageException;
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
  @Autowired private MessageService messageService;

  private static DateTimeFormatter dateFormatter = DateTimeFormatter.ISO_OFFSET_DATE_TIME;

  @GetMapping
  public List<MessagesResponseBody> getMessages() {
    List<MessageEntity> messagesInternal = messageService.findAllMessage();

    return messagesInternal.stream().map(MessagesController::convert).toList();
  }

  @PostMapping
  public MessagesResponseBody postMessage(@RequestBody MessagesPostRequestBody message) {
    // TODO 文字数制限
    MessageEntity result = messageService.postMessage(message.message());
    return MessagesController.convert(result);
  }

  @DeleteMapping("{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteMessage(@PathVariable int id) {
    try {
      messageService.deleteMessage(id);
    } catch (NoSuchMessageException e) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }
    return;
  }

  private static MessagesResponseBody convert(MessageEntity origin) {
    return new MessagesResponseBody(
        origin.getId(), origin.getMessage(), dateFormatter.format(origin.getDate()));
  }
}
