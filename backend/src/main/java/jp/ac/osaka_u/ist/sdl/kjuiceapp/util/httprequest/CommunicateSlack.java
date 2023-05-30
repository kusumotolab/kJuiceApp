package jp.ac.osaka_u.ist.sdl.kjuiceapp.util.httprequest;

import com.slack.api.Slack;
import com.slack.api.methods.MethodsClient;
import com.slack.api.methods.SlackApiException;
import com.slack.api.methods.request.chat.ChatPostMessageRequest;
import java.io.IOException;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.util.config.SlackConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CommunicateSlack {

  @Autowired private SlackConfig slackConfig;

  public void sendMessage(String message) throws SlackApiException, IOException {

    Slack slack = Slack.getInstance();
    MethodsClient methods = slack.methods(slackConfig.token());

    ChatPostMessageRequest request =
        ChatPostMessageRequest.builder().channel(slackConfig.channel()).text(message).build();

    methods.chatPostMessage(request);
  }
}
