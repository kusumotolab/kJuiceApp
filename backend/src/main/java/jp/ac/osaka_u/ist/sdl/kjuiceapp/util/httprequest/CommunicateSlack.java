package jp.ac.osaka_u.ist.sdl.kjuiceapp.util.httprequest;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.util.config.SlackConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CommunicateSlack {

  @Autowired private SlackConfig slackConfig;

  public void sendMessage(String message) throws Exception {
    URL url;
    url = new URL("https://slack.com/api/chat.postMessage");

    String postData =
        "token="
            + slackConfig.getToken()
            + "&channel="
            + slackConfig.getChannel()
            + "&text="
            + URLEncoder.encode(message, "UTF-8");

    URLConnection conn;
    conn = url.openConnection();
    conn.setDoOutput(true);
    conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
    conn.setRequestProperty("Content-Length", Integer.toString(postData.length()));

    DataOutputStream dos = new DataOutputStream(conn.getOutputStream());
    dos.writeBytes(postData);

    BufferedReader bf = new BufferedReader(new InputStreamReader(conn.getInputStream()));
    String line;
    while ((line = bf.readLine()) != null) {
      System.out.println(line);
    }
  }
}
