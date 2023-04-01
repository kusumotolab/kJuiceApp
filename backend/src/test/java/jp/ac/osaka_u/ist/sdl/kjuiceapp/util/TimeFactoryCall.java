package jp.ac.osaka_u.ist.sdl.kjuiceapp.util;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import org.springframework.stereotype.Component;

@Component
public class TimeFactoryCall {

  private TimeFactory clock;

  public TimeFactoryCall(TimeFactory factory) {
    this.clock = factory;
  }

  public String get() {

    LocalDateTime date = clock.now();
    return date.format(DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss"));
  }
}
