package jp.ac.osaka_u.ist.sdl.kjuiceapp.util.httprequest;

import com.slack.api.Slack;
import com.slack.api.methods.MethodsClient;
import com.slack.api.methods.SlackApiException;
import com.slack.api.methods.request.chat.ChatPostMessageRequest;
import com.slack.api.methods.response.chat.ChatPostMessageResponse;
import java.io.IOException;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.util.config.SlackConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CommunicateSlack {

  @Autowired private SlackConfig slackConfig;

  public void sendMessage(String message) throws SlackApiException, IOException {

    Slack slack = Slack.getInstance();
    MethodsClient methods = slack.methods(slackConfig.getToken());

    ChatPostMessageRequest request =
        ChatPostMessageRequest.builder().channel(slackConfig.getChannel()).text(message).build();

    ChatPostMessageResponse response = methods.chatPostMessage(request);
  }
}
