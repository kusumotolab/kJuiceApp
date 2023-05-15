package jp.ac.osaka_u.ist.sdl.kjuiceapp.repository;

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
public class PurchaseRepositoryTest extends DBTestBase {

    @Autowired private PurchaseRepository purchaseRepository;

    @Test
    @DataSet(value = "PurchaseRepository/SQLQuery/before.yaml")
    public void testGetPurchasedAmountOfMemberInSpecificPeriod(){
        LocalDateTime startDateTime = LocalDateTime.of(2023, 4, 3, 15, 20, 10);
        LocalDateTime endDateTime = LocalDateTime.of(2023, 4, 8, 22, 50, 10);
        int actual = purchaseRepository.getPurchasedAmountBetweenSpecificPeriodByMemberId("h-takesg",startDateTime,endDateTime);
        assertEquals(360,actual);
    }
}