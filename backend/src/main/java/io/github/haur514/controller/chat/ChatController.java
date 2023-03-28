package io.github.haur514.controller.chat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

import io.github.haur514.service.ChatService;

@RestController
public class ChatController {

    @Autowired
    ChatService chatService;

    @PostMapping
    @RequestMapping("/chat/add")
    public String insertHistory(
        @RequestParam("message") String message
    ){
        chatService.insertChat(message);
        return "success";
    }

    @PostMapping
    @RequestMapping("/chat/delete")
    public String cancelHistory(@RequestParam("id") String id){
        return chatService.removeChat(Integer.parseInt(id));
    }


     @RequestMapping("/chat")
     public String getChat(){
        return new Gson().toJson(chatService.findAllChat());
     }
}
