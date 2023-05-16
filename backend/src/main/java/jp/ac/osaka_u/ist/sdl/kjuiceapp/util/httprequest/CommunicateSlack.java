package jp.ac.osaka_u.ist.sdl.kjuiceapp.util.httprequest;

import com.squareup.okhttp.MediaType;
import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.RequestBody;
import com.squareup.okhttp.Response;
import java.io.IOException;
import java.net.URLEncoder;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.util.config.SlackConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CommunicateSlack {

  @Autowired private SlackConfig slackConfig;

  public void sendMessage(String message) throws IOException {
    String postData =
        "token="
            + slackConfig.getToken()
            + "&channel="
            + slackConfig.getChannel()
            + "&text="
            + URLEncoder.encode(message, "UTF-8");

    OkHttpClient client = new OkHttpClient();
    MediaType MIMEType = MediaType.parse("application/x-www-form-urlencoded;charset=utf-8");
    RequestBody requestBody = RequestBody.create(MIMEType, postData);
    Request request =
        new Request.Builder()
            .url("https://slack.com/api/chat.postMessage")
            .post(requestBody)
            .build();
    Response response = client.newCall(request).execute();
    System.out.println(response);
  }
}
