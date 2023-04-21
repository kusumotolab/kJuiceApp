package jp.ac.osaka_u.ist.sdl.kjuiceapp.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.database.rider.core.api.dataset.DataSet;
import com.github.database.rider.core.api.dataset.ExpectedDataSet;
import com.github.database.rider.junit5.api.DBRider;
import java.util.List;
import java.util.Optional;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.DBTestBase;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.item.requestbody.ItemAddRequestBody;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.item.requestbody.ItemUpdateRequestBody;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.item.responsebody.ItemResponseBody;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

@DBRider
@DataSet(cleanBefore = true)
@AutoConfigureMockMvc
@ActiveProfiles("test") // To use test db
public class ItemsControllerTest extends DBTestBase {
  @Autowired private MockMvc mockMvc;
  @Autowired private ObjectMapper objectMapper;

  @Test
  @DataSet(value = "ItemsController/normalGetAllItems/before.yaml")
  public void normalGetAllItems() throws Exception {
    var expectedResponseParams =
        List.of(new ItemResponseBody("cola", "コーラ", 100, 90, "juice", true));
    String expectedJson = objectMapper.writeValueAsString(expectedResponseParams);

    this.mockMvc
        .perform(get("/items"))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().json(expectedJson, true));
  }

  @Test
  @ExpectedDataSet(value = "ItemsController/normalAddItem/expected.yaml")
  void normalAddItem() throws Exception {
    var requestParams = new ItemAddRequestBody("gogotea", "午後の紅茶", 80, 60, "juice");
    String requestBody = objectMapper.writeValueAsString(requestParams);

    var expectedResponseParams = new ItemResponseBody("gogotea", "午後の紅茶", 80, 60, "juice", false);
    String expectedResponseBody = objectMapper.writeValueAsString(expectedResponseParams);

    this.mockMvc
        .perform(post("/items").contentType(MediaType.APPLICATION_JSON).content(requestBody))
        .andDo(print())
        .andExpect(status().isCreated())
        .andExpect(content().json(expectedResponseBody, true));
  }

  @Test
  @DataSet(value = "ItemsController/normalUpdateItem/before.yaml")
  @ExpectedDataSet(value = "ItemsController/normalUpdateItem/expected.yaml")
  void normalUpdateItem() throws Exception {
    String targetId = "cola";

    var requestParams =
        new ItemUpdateRequestBody(
            Optional.of("コカ・コーラ"),
            Optional.of(10),
            Optional.empty(),
            Optional.empty(),
            Optional.of(false));
    String requestBody = objectMapper.writeValueAsString(requestParams);

    var expectedResponseParams = new ItemResponseBody("cola", "コカ・コーラ", 10, 90, "juice", false);
    String expectedResponseBody = objectMapper.writeValueAsString(expectedResponseParams);

    this.mockMvc
        .perform(
            patch("/items/" + targetId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().json(expectedResponseBody, true));
  }

  @Test
  @DataSet(value = "ItemsController/normalDeleteItem/before.yaml")
  @ExpectedDataSet(value = "ItemsController/normalDeleteItem/expected.yaml")
  void normalDeleteItem() throws Exception {
    String targetId = "cola";

    this.mockMvc
        .perform(delete("/items/" + targetId))
        .andDo(print())
        .andExpect(status().isNoContent());
  }
}
