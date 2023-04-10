package jp.ac.osaka_u.ist.sdl.kjuiceapp.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.database.rider.core.api.dataset.DataSet;
import com.github.database.rider.core.api.dataset.ExpectedDataSet;
import com.github.database.rider.junit5.api.DBRider;

import java.util.List;

import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.purchase.requestbody.PurchaseAddRequestBody;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.purchase.responsebody.PurchaseResponseBody;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.utility.DockerImageName;

@SpringBootTest
@DBRider
@Testcontainers
@AutoConfigureMockMvc
@ActiveProfiles("test") // To use test db
public class PurchasesControllerTest {
  static final DockerImageName POSTGRES_IMAGE_NAME = DockerImageName.parse("postgres").withTag("15-alpine");

  @Container
  static final PostgreSQLContainer<?> POSTGRES_CONTAINER = new PostgreSQLContainer<>(POSTGRES_IMAGE_NAME)
    .withUsername("admin")
    .withPassword("password");

  @DynamicPropertySource
  static void registerProperties(DynamicPropertyRegistry registry) {
    registry.add("spring.datasource.url", POSTGRES_CONTAINER::getJdbcUrl);
    registry.add("spring.datasource.username", POSTGRES_CONTAINER::getUsername);
    registry.add("spring.datasource.password", POSTGRES_CONTAINER::getPassword);
  }

  @Autowired private MockMvc mockMvc;
  @Autowired private ObjectMapper objectMapper;

  @Test
  @DataSet(value = "PurchasesController/normalGetAllPurchases/before.yaml")
  public void normalGetAllPurchases() throws Exception {
    var expectedResponseParams =
        List.of(new PurchaseResponseBody(1, "h-takesg", "竹重", "cola", "コーラ", 90, "2023-04-07T17:44:51"));
    String expectedJson = objectMapper.writeValueAsString(expectedResponseParams);

    this.mockMvc
        .perform(get("/purchases"))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().json(expectedJson, true));
  }

  @Test
  @DataSet(value = "PurchasesController/normalAddPurchase/before.yaml")
  @ExpectedDataSet(value = "PurchasesController/normalAddPurchase/expected.yaml")
  void normalAddPurchase() throws Exception {
    var requestParams = new PurchaseAddRequestBody("h-takesg", "cola");
    String requestBody = objectMapper.writeValueAsString(requestParams);

    var expectedResponseParams = new PurchaseResponseBody(1, "h-takesg", "竹重", "cola", "コーラ", 90, "will be dynamically generated");

    this.mockMvc
        .perform(post("/purchases").contentType(MediaType.APPLICATION_JSON).content(requestBody))
        .andDo(print())
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.historyId").value(expectedResponseParams.historyId()))
        .andExpect(jsonPath("$.userId").value(expectedResponseParams.userId()))
        .andExpect(jsonPath("$.userName").value(expectedResponseParams.userName()))
        .andExpect(jsonPath("$.itemId").value(expectedResponseParams.itemId()))
        .andExpect(jsonPath("$.itemName").value(expectedResponseParams.itemName()))
        .andExpect(jsonPath("$.itemPrice").value(expectedResponseParams.price()))
        .andExpect(jsonPath("$.date").exists());
  }

//   @Test
//   @DataSet(value = "PurchasesController/normalDeletePurchase/before.yaml")
//   @ExpectedDataSet(value = "PurchasesController/normalDeletePurchase/expected.yaml")
//   void normalDeletePurchase() throws Exception {
//     String targetId = "cola";

//     this.mockMvc
//       .perform(delete("/purchases/" + targetId))
//       .andDo(print())
//       .andExpect(status().isNoContent());
//   }
}
