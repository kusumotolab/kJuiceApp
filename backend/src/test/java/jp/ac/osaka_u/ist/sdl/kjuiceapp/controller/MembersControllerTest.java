package jp.ac.osaka_u.ist.sdl.kjuiceapp.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.member.MembersController;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.member.requestbody.MemberAddRequestBody;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.member.responcebody.MemberResponceBody;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.MemberEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.MemberService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(MockitoExtension.class)
public class MembersControllerTest {
  @Autowired private MockMvc mockMvc;

  @Autowired private ObjectMapper objectMapper;

  @MockBean private MemberService mockMemberService;

  @InjectMocks private MembersController membersController;

  @Test
  public void getAllMembers() throws Exception {
    var members =
        new ArrayList<>(
            Arrays.asList(
                new MemberResponceBody("h-takesg", "竹重", 1, "m1", true),
                new MemberResponceBody("h-yosiok", "吉岡", 0, "m1", true)));

    List<MemberEntity> membersInternal =
        members.stream()
            .map(
                e -> {
                  var temp = new MemberEntity();
                  temp.setName(e.id());
                  temp.setDisplayName(e.name());
                  temp.setUmpayedAmount(e.unpaidAmount());
                  temp.setAttribute(e.attiribute());
                  temp.setActive(e.active());
                  return temp;
                })
            .toList();

    when(mockMemberService.findAll()).thenReturn(membersInternal);

    var expectedJson = objectMapper.writeValueAsString(members);

    this.mockMvc
        .perform(get("/members"))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().json(expectedJson, true));
  }

  @Test
  public void getMembersByAttribute() throws Exception {
    // TODO
  }

  @Test
  public void getActiveMember() throws Exception {
    // TODO
  }

  @Test
  public void postMember() throws Exception {
    var sampleMember = new MemberResponceBody("h-takesg", "竹重", 0, "m1", false);

    // リクエストボディを生成
    var requestMember = new MemberAddRequestBody();
    requestMember.name = sampleMember.id();
    requestMember.displayName = sampleMember.name();
    requestMember.attribute = sampleMember.attiribute();
    var requestBody = objectMapper.writeValueAsString(requestMember);

    // モック用新メンバーインスタンスを生成
    var newMember = new MemberEntity();
    newMember.setName(sampleMember.id());
    newMember.setDisplayName(sampleMember.name());
    newMember.setUmpayedAmount(0);
    newMember.setAttribute(sampleMember.attiribute());
    newMember.setActive(sampleMember.active());

    var expectedJson = objectMapper.writeValueAsString(sampleMember);

    when(mockMemberService.addMember(
            sampleMember.id(), sampleMember.name(), sampleMember.attiribute()))
        .thenReturn("success");
    when(mockMemberService.findByName(sampleMember.id())).thenReturn(newMember);

    this.mockMvc
        .perform(
            post("/members").contentType(MediaType.APPLICATION_JSON_VALUE).content(requestBody))
        .andDo(print())
        .andExpect(status().isCreated())
        .andExpect(content().json(expectedJson, true));
  }

  @Test
  public void postInvalidMember() throws Exception {
    // TODO
  }

  @Test
  public void postDupulicateMember() throws Exception {
    var sampleMember = new MemberResponceBody("h-takesg", "竹重", 0, "m1", false);

    // リクエストボディを生成
    var requestMember = new MemberAddRequestBody();
    requestMember.name = sampleMember.id();
    requestMember.displayName = sampleMember.name();
    requestMember.attribute = sampleMember.attiribute();
    var requestBody = objectMapper.writeValueAsString(requestMember);

    when(mockMemberService.addMember(
            sampleMember.id(), sampleMember.name(), sampleMember.attiribute()))
        .thenReturn("failed");

    this.mockMvc
        .perform(
            post("/members").contentType(MediaType.APPLICATION_JSON_VALUE).content(requestBody))
        .andDo(print())
        .andExpect(status().isConflict());
  }

  @Test
  public void patchMember() throws Exception {
    // TODO
  }

  @Test
  public void deleteMember() throws Exception {
    var sampleMember = new MemberResponceBody("h-takesg", "竹重", 0, "m1", false);

    when(mockMemberService.deleteMember(sampleMember.id())).thenReturn("success");

    this.mockMvc
        .perform(delete("/members/" + sampleMember.id()))
        .andDo(print())
        .andExpect(status().isNoContent());
  }

  @Test
  public void deleteNotRegisteredMember() throws Exception {
    var sampleMember = new MemberResponceBody("h-takesg", "竹重", 0, "m1", false);

    when(mockMemberService.deleteMember(sampleMember.id())).thenReturn("failed");

    this.mockMvc
        .perform(delete("/members/" + sampleMember.id()))
        .andDo(print())
        .andExpect(status().isNotFound());
  }

  @Test
  public void getMemberImage() throws Exception {
    // TODO
  }

  @Test
  public void getMemberNoImage() throws Exception {
    var sampleMember = new MemberResponceBody("h-takesg", "竹重", 0, "m1", false);

    when(mockMemberService.isRegistered(sampleMember.id())).thenReturn(true);
    when(mockMemberService.getMemberIcon(sampleMember.id())).thenReturn(Optional.empty());

    this.mockMvc
        .perform(get("/members/" + sampleMember.id() + "/image"))
        .andDo(print())
        .andExpect(status().isNoContent());
  }

  @Test
  public void getNotRegisteredMemberImage() throws Exception {
    var sampleMember = new MemberResponceBody("h-takesg", "竹重", 0, "m1", false);

    when(mockMemberService.isRegistered(sampleMember.id())).thenReturn(false);

    this.mockMvc
        .perform(get("/members/" + sampleMember.id() + "/image"))
        .andDo(print())
        .andExpect(status().isNotFound());
  }

  @Test
  public void setMemberImage() throws Exception {
    // TODO
  }

  @Test
  public void setNotRegisteredMemberImage() throws Exception {
    // TODO
  }
}
