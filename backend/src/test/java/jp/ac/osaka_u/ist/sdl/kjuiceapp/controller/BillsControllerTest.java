package jp.ac.osaka_u.ist.sdl.kjuiceapp.controller;

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
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.bills.requestbody.BillPostRequestBody;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.bills.responsebody.BillResponseBody;
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
public class BillsControllerTest extends DBTestBase {
  @Autowired private MockMvc mockMvc;
  @Autowired private ObjectMapper objectMapper;

  @Test
  @DataSet(value = "BillsController/normalGetAllBills/before.yaml")
  public void normalGetAllBills() throws Exception {
    var expectedResponseParams =
        List.of(
            new BillResponseBody(1, "h-yosiok", "2023-04-07T17:44:51"),
            new BillResponseBody(2, "h-takesg", "2023-04-07T17:44:59"));
    String expectedJson = objectMapper.writeValueAsString(expectedResponseParams);

    this.mockMvc
        .perform(get("/bills"))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().json(expectedJson, true));
  }

  @Test
  @DataSet(value = "BillsController/normalPostBill/before.yaml")
  @ExpectedDataSet(value = "BillsController/normalPostBill/expected.yaml")
  void normalPostBill() throws Exception {
    var requestParams = new BillPostRequestBody("h-yosiok");
    String requestBody = objectMapper.writeValueAsString(requestParams);

    var expectedResponseParams =
        new BillResponseBody(1, "h-yosiok", "will be dynamically generated");

    this.mockMvc
        .perform(post("/bills").contentType(MediaType.APPLICATION_JSON).content(requestBody))
        .andDo(print())
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.id").value(expectedResponseParams.id()))
        .andExpect(jsonPath("$.issuerId").value(expectedResponseParams.issuerId()))
        .andExpect(jsonPath("$.date").exists());
  }
}
