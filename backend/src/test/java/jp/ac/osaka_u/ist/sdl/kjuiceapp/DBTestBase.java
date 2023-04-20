package jp.ac.osaka_u.ist.sdl.kjuiceapp;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.utility.DockerImageName;

@SpringBootTest
public abstract class DBTestBase {
  static final DockerImageName IMAGE_NAME = DockerImageName.parse("postgres").withTag("15-alpine");

  static final PostgreSQLContainer<?> DB_CONTAINER =
      new PostgreSQLContainer<>(IMAGE_NAME).withUsername("admin").withPassword("password");

  static {
    DB_CONTAINER.start();
  }

  @DynamicPropertySource
  static void registerProperties(DynamicPropertyRegistry registry) {
    registry.add("spring.datasource.url", DB_CONTAINER::getJdbcUrl);
    registry.add("spring.datasource.username", DB_CONTAINER::getUsername);
    registry.add("spring.datasource.password", DB_CONTAINER::getPassword);
  }
}
