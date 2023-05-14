package jp.ac.osaka_u.ist.sdl.kjuiceapp.util.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
@PropertySource("classpath:private.properties")
@ConfigurationProperties(prefix = "slack")
public class SlackConfig {
    private String token;
    private String channel;
}
