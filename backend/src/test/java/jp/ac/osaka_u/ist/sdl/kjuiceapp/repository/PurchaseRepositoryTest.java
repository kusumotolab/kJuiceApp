package jp.ac.osaka_u.ist.sdl.kjuiceapp.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.github.database.rider.core.api.dataset.DataSet;
import com.github.database.rider.junit5.api.DBRider;
import java.util.Map;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.DBTestBase;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.context.ActiveProfiles;

@DBRider
@AutoConfigureMockMvc
@ActiveProfiles("test") // To use test db
public class PurchaseRepositoryTest extends DBTestBase {

  @Autowired private PurchaseRepository purchaseRepository;

  @Test
  @DataSet(value = "PurchaseRepository/SQLQuery/before.yaml")
  public void testGetPaymentSummary() {
    Map<String, Integer> actual = purchaseRepository.getPaymentSummary();
    Map<String, Integer> expect =
        Map.of(
            "h-yosiok", 180,
            "t-ishino", 90);
    assertEquals(expect, actual);
  }
}
