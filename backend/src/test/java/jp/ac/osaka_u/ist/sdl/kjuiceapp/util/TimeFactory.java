package jp.ac.osaka_u.ist.sdl.kjuiceapp.util;

import java.time.LocalDateTime;
import org.springframework.stereotype.Component;

@Component
public class TimeFactory {

  public LocalDateTime now() {
    return LocalDateTime.now();
  }
}
