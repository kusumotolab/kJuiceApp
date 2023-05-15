package jp.ac.osaka_u.ist.sdl.kjuiceapp.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.LocalDateTime;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.context.ActiveProfiles;

import com.github.database.rider.core.api.dataset.DataSet;
import com.github.database.rider.core.api.dataset.ExpectedDataSet;
import com.github.database.rider.junit5.api.DBRider;

import jp.ac.osaka_u.ist.sdl.kjuiceapp.DBTestBase;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.bills.responsebody.BillResponseBody;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.BillEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.repository.BillRepository;

@DBRider
@DataSet(cleanBefore = true)
@AutoConfigureMockMvc
@ActiveProfiles("test") // To use test db
public class BillsServiceTest extends DBTestBase {
  @Autowired private BillService billService;
  @Autowired private BillRepository billRepository;

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
    LocalDateTime recentBillsDate = billService.getRecentBillDate();
    LocalDateTime expectedRecentBillsDate = LocalDateTime.of(2023,4,4,17,44,59);
    assertEquals(expectedRecentBillsDate,recentBillsDate);

    LocalDateTime startDateTime = LocalDateTime.of(2023,4,3,15,20,10);
		LocalDateTime endDateTime = LocalDateTime.of(2023,4,8,22,50,10);

    String expected = """
        ジュース会大臣の吉岡です．
        今月分の利用料金が確定しました．
        竹重様 : 360円
        吉岡様 : 90円
        石野様 : 20円
        支払いは吉岡までよろしくお願いいたします．
        """;
    String actual = billService.makeBillMessage("吉岡",startDateTime,endDateTime);

    assertEquals(expected,actual);
  }

  @Test
  @DataSet(value = "BillsController/normalPostBill/before.yaml")
  @ExpectedDataSet(value = "BillsController/normalPostBill/expected.yaml")
  void testBillDataRegistration() throws Exception {
    var expectedResponseParams =
        new BillResponseBody(1, "h-yosiok", "will be dynamically generated");

    BillEntity newBill = new BillEntity("h-yosiok");
    BillEntity actual = billRepository.save(newBill);
    assertEquals(expectedResponseParams.issuerId(),actual.getIssuerId());
    assertEquals(expectedResponseParams.billId(),actual.getBillId());
  }
}
