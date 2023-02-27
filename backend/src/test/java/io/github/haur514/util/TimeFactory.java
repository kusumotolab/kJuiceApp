package io.github.haur514.util;

import java.time.LocalDateTime;

import org.springframework.stereotype.Component;

@Component
public class TimeFactory {

    public LocalDateTime now() {
        return LocalDateTime.now();
    }

}