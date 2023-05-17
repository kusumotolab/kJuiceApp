package jp.ac.osaka_u.ist.sdl.kjuiceapp.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.github.database.rider.core.api.dataset.DataSet;
import com.github.database.rider.junit5.api.DBRider;
import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.DBTestBase;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.repository.purchase.NextPaymentSummary;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.repository.purchase.PurchaseRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.context.ActiveProfiles;

@DBRider
@DataSet(cleanBefore = true)
@AutoConfigureMockMvc
@ActiveProfiles("test") // To use test db
public class PurchaseRepositoryTest extends DBTestBase {

  @Autowired private PurchaseRepository purchaseRepository;

  @Test
  @DataSet(value = "PurchaseRepository/SQLQuery/before.yaml")
  public void testGetPurchasedAmountOfMemberInSpecificPeriod() {
    LocalDateTime startDateTime = LocalDateTime.of(2023, 4, 3, 15, 20, 10);
    LocalDateTime endDateTime = LocalDateTime.of(2023, 4, 8, 22, 50, 10);
    int actual =
        purchaseRepository.findByDateBetween(startDateTime, endDateTime).stream()
            .filter(p -> p.getMemberId().equals("h-takesg"))
            .mapToInt(p -> p.getPrice())
            .sum();
    assertEquals(360, actual);
  }

  @Test
  @DataSet(value = "PurchaseRepository/SQLQuery/before.yaml")
  public void testFindNextPaymentSummaries() {
    List<NextPaymentSummary> actual = purchaseRepository.findNextPaymentSummaries();
    List<NextPaymentSummary> expect = new ArrayList<>();
    expect.add(new NextPaymentSummary("h-yosiok", "吉岡", BigInteger.valueOf(180)));
    expect.add(new NextPaymentSummary("t-ishino", "石野", BigInteger.valueOf(90)));
    assertTrue(actual.equals(expect));
  }
}
