package jp.ac.osaka_u.ist.sdl.kjuiceapp.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.database.rider.core.api.dataset.DataSet;
import com.github.database.rider.core.api.dataset.ExpectedDataSet;
import com.github.database.rider.junit5.api.DBRider;
import java.util.List;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.DBTestBase;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.chat.requestbody.MessagePostRequestBody;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.chat.responsebody.MessageResponseBody;
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
public class MessagesControllerTest extends DBTestBase {
  @Autowired private MockMvc mockMvc;
  @Autowired private ObjectMapper objectMapper;

  @Test
  @DataSet(value = "MessagesController/normalGetAllMessages/before.yaml")
  public void normalGetAllMessages() throws Exception {
    var expectedResponseParams =
        List.of(
            new MessageResponseBody(1, "ちはやぶる神代も聞かず龍田川", "2023-04-07T17:44:51"),
            new MessageResponseBody(2, "唐紅に水くくるとは", "2023-04-07T17:44:59"));
    String expectedJson = objectMapper.writeValueAsString(expectedResponseParams);

    this.mockMvc
        .perform(get("/messages"))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().json(expectedJson, true));
  }

  @Test
  @DataSet(value = "MessagesController/normalPostMessage/before.yaml")
  @ExpectedDataSet(value = "MessagesController/normalPostMessage/expected.yaml")
  void normalPostMessage() throws Exception {
    var requestParams = new MessagePostRequestBody("とはってなんですか");
    String requestBody = objectMapper.writeValueAsString(requestParams);

    var expectedResponseParams =
        new MessageResponseBody(3, "とはってなんですか", "will be dynamically generated");

    this.mockMvc
        .perform(post("/messages").contentType(MediaType.APPLICATION_JSON).content(requestBody))
        .andDo(print())
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.id").value(expectedResponseParams.id()))
        .andExpect(jsonPath("$.message").value(expectedResponseParams.message()))
        .andExpect(jsonPath("$.date").exists());
  }

  @Test
  @DataSet(value = "MessagesController/normalDeleteMessage/before.yaml")
  @ExpectedDataSet(value = "MessagesController/normalDeleteMessage/expected.yaml")
  void normalDeleteMessage() throws Exception {
    String targetId = "1";

    this.mockMvc
        .perform(delete("/messages/" + targetId))
        .andDo(print())
        .andExpect(status().isNoContent());
  }
}
