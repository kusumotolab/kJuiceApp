package jp.ac.osaka_u.ist.sdl.kjuiceapp.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.database.rider.core.api.dataset.DataSet;
import com.github.database.rider.core.api.dataset.ExpectedDataSet;
import com.github.database.rider.junit5.api.DBRider;

import jp.ac.osaka_u.ist.sdl.kjuiceapp.DBTestBase;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.member.requestbody.MemberAddRequestBody;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.member.requestbody.MemberUpdateRequestBody;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.member.responsebody.MemberResponseBody;

@DBRider
@DataSet(cleanBefore = true)
@AutoConfigureMockMvc
@ActiveProfiles("test") // To use test db
public class MembersControllerTest extends DBTestBase {
  @Autowired private MockMvc mockMvc;
  @Autowired private ObjectMapper objectMapper;

  @Test
  @DataSet(value = "MembersController/normalGetAllMembers/before.yaml")
  public void normalGetAllMembers() throws Exception {
    var expectedResponseParams = List.of(new MemberResponseBody("h-takesg", "竹重", "m1", true));
    String expectedJson = objectMapper.writeValueAsString(expectedResponseParams);

    this.mockMvc
        .perform(get("/members"))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().json(expectedJson, true));
  }

  @Test
  @ExpectedDataSet(value = "MembersController/normalAddMember/expected.yaml")
  void normalAddMember() throws Exception {
    var requestParams = new MemberAddRequestBody("h-takesg", "竹重", "m1");
    String requestBody = objectMapper.writeValueAsString(requestParams);

    var expectedResponseParams = new MemberResponseBody("h-takesg", "竹重", "m1", false);
    String expectedResponseBody = objectMapper.writeValueAsString(expectedResponseParams);

    this.mockMvc
        .perform(post("/members").contentType(MediaType.APPLICATION_JSON).content(requestBody))
        .andDo(print())
        .andExpect(status().isCreated())
        .andExpect(content().json(expectedResponseBody, true));
  }

  @Test
  @DataSet(value = "MembersController/normalUpdateMember/before.yaml")
  @ExpectedDataSet(value = "MembersController/normalUpdateMember/expected.yaml")
  void normalUpdateMember() throws Exception {
    String targetId = "h-takesg";

    var requestParams =
        new MemberUpdateRequestBody(Optional.empty(), Optional.of("m2"), Optional.of(false));
    String requestBody = objectMapper.writeValueAsString(requestParams);

    var expectedResponseParams = new MemberResponseBody("h-takesg", "竹重", "m2", false);
    String expectedResponseBody = objectMapper.writeValueAsString(expectedResponseParams);

    this.mockMvc
        .perform(
            patch("/members/" + targetId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().json(expectedResponseBody, true));
  }

  @Test
  @DataSet(value = "MembersController/normalDeleteMember/before.yaml")
  @ExpectedDataSet(value = "MembersController/normalDeleteMember/expected.yaml")
  void normalDeleteMember() throws Exception {
    String targetId = "h-takesg";

    this.mockMvc
        .perform(delete("/members/" + targetId))
        .andDo(print())
        .andExpect(status().isNoContent());
  }

  // TODO GET /members/{memberId}/image

  // TODO PUT /members/{memberId}/image
}
