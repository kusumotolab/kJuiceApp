package jp.ac.osaka_u.ist.sdl.kjuiceapp.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.LocalDateTime;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.context.ActiveProfiles;

import com.github.database.rider.core.api.dataset.DataSet;
import com.github.database.rider.junit5.api.DBRider;

import jp.ac.osaka_u.ist.sdl.kjuiceapp.DBTestBase;

@DBRider
@DataSet(cleanBefore = true)
@AutoConfigureMockMvc
@ActiveProfiles("test") // To use test db
public class BillsServiceTest extends DBTestBase {
  @Autowired private BillService billService;

  @Test
  @DataSet(value = "BillsController/normalGetAllBills/before.yaml")
  public void normalGetAllBills() throws Exception {
    var expectedValue =
        "2023-04-07T17:44:51";
    assertEquals(billService.getRecentBillDate().toString(),expectedValue);
  }

  @Test
  @DataSet(value = "BillService/makeInvoiceMessage/before.yaml")
  public void testMakeInvoiceMessage(){
    LocalDateTime startDateTime = LocalDateTime.of(2023,4,7,15,20,10);
		LocalDateTime endDateTime = LocalDateTime.of(2023,4,8,18,50,10);

    String expected = """
        ジュース会大臣の吉岡です．
        今月分の利用料金が確定しました．
        竹重様 : 90円
        支払いは吉岡までよろしくお願いいたします．
        """;
    String actual = billService.makeBillMessage("吉岡",startDateTime,endDateTime);

    assertEquals(expected,actual);
  }
}
