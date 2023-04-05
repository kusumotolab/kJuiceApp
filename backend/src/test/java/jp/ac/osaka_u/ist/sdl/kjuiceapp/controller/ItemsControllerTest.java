package jp.ac.osaka_u.ist.sdl.kjuiceapp.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
@AutoConfigureMockMvc
@ActiveProfiles("test") // To use test db
public class ItemsControllerTest {
  @Autowired private MockMvc mockMvc;

  @Autowired private ObjectMapper objectMapper;

  @Test
  void normalAddItem() throws Exception {
    var requestParams =
        Map.of(
            "id", "gogotea",
            "name", "午後の紅茶",
            "sellingPrice", 80,
            "costPrice", 60,
            "category", "juice");
    String requestBody = objectMapper.writeValueAsString(requestParams);

    var expectedResponseParams =
        Map.of(
            "id",
            "gogotea",
            "name",
            "午後の紅茶",
            "sellingPrice",
            80,
            "costPrice",
            60,
            "category",
            "juice",
            "isActive",
            false);
    String expectedResponseBody = objectMapper.writeValueAsString(expectedResponseParams);

    this.mockMvc
        .perform(post("/items").contentType(MediaType.APPLICATION_JSON).content(requestBody))
        .andDo(print())
        .andExpect(status().isCreated())
        .andExpect(content().json(expectedResponseBody, true));
  }

  @Test
  public void getAllItems() throws Exception {
    var expectedResponseParams =
        List.of(
            Map.of(
                "id",
                "cola",
                "name",
                "コーラ",
                "sellingPrice",
                100,
                "costPrice",
                90,
                "category",
                "juice",
                "isActive",
                true));
    String expectedJson = objectMapper.writeValueAsString(expectedResponseParams);

    this.mockMvc
        .perform(get("/items"))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().json(expectedJson, true));
  }
}
