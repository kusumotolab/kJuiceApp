package jp.ac.osaka_u.ist.sdl.kjuiceapp.util.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "slack")
public record SlackConfig(String token, String channel) {}
