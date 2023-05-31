package jp.ac.osaka_u.ist.sdl.kjuiceapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class JuiceAppMain {
  public static void main(String[] args) {
    SpringApplication.run(JuiceAppMain.class, args);
  }
}
