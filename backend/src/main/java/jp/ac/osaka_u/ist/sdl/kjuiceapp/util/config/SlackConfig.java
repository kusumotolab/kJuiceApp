package jp.ac.osaka_u.ist.sdl.kjuiceapp.util.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "slack")
public class SlackConfig {
  private String token;
  private String channel;
}
