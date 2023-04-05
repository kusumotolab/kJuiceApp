package jp.ac.osaka_u.ist.sdl.kjuiceapp.controller;

// import static org.mockito.Mockito.when;
// import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
// import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

// import com.fasterxml.jackson.databind.ObjectMapper;
// import java.util.ArrayList;
// import java.util.Arrays;
// import java.util.List;
// import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.item.ItemsController;
// import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.item.responsebody.ItemResponseBody;
// import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.ItemEntity;
// import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.ItemService;
// import org.junit.jupiter.api.Test;
// import org.junit.jupiter.api.extension.ExtendWith;
// import org.mockito.InjectMocks;
// import org.mockito.junit.jupiter.MockitoExtension;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.boot.test.mock.mockito.MockBean;
// import org.springframework.test.web.servlet.MockMvc;

// @SpringBootTest
// @AutoConfigureMockMvc
// @ExtendWith(MockitoExtension.class)
public class ItemsControllerTest {
  // @Autowired private MockMvc mockMvc;

  // @Autowired private ObjectMapper objectMapper;

  // @MockBean private ItemService mockItemService;

  // @InjectMocks private ItemsController itemsController;

  // @Test
  // public void getAllItems() throws Exception {
  //   var items =
  //       new ArrayList<>(
  //           Arrays.asList(
  //               new ItemResponseBody("gogotea", "午後の紅茶", 80, 60, "juice", true, 1),
  //               new ItemResponseBody("cocacola", "コカ・コーラ", 70, 60, "juice", false, 2)));

  //   List<ItemEntity> itemsInternal =
  //       items.stream()
  //           .map(
  //               e -> {
  //                 var temp = new ItemEntity();
  //                 temp.setName(e.id());
  //                 temp.setSellingPrice(e.sellingPrice());
  //                 temp.setCostPrice(e.costPrice());
  //                 temp.setGrouping(e.group());
  //                 temp.setActive(e.isActive());
  //                 temp.setSalesFigure(e.salesCount());
  //                 return temp;
  //               })
  //           .toList();

  //   var expectedJson = objectMapper.writeValueAsString(itemsInternal);

  //   when(mockItemService.getItemList("")).thenReturn(expectedJson);

  //   // TODO ItemEntityを直接返しているので仕様に沿っていない
  //   this.mockMvc
  //       .perform(get("/items"))
  //       .andDo(print())
  //       .andExpect(status().isOk())
  //       .andExpect(content().json(expectedJson, true));
  // }
}
