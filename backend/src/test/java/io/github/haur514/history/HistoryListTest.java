package io.github.haur514.history;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import io.github.haur514.entity.HistoryEntity;

@SpringBootTest
public class HistoryListTest {

    List<HistoryEntity> historyEntityList;
    HistoryList historyList;
    
    @BeforeEach
    public void preprocess(){
        historyEntityList = new ArrayList<>();

        HistoryEntity historyEntity = new HistoryEntity();
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.YEAR,2022);
        cal.set(Calendar.MONTH,Calendar.OCTOBER);
        historyEntity.setName("h-yosiok");
        historyEntity.setId(1);
        historyEntity.setDate(cal.getTime());
        historyEntity.setPrice(100);
        historyEntity.setItem("CocaCola");
        historyEntityList.add(historyEntity);

        historyEntity = new HistoryEntity();
        cal.set(Calendar.YEAR,2020);
        cal.set(Calendar.MONTH,Calendar.OCTOBER);
        historyEntity.setName("h-yosiok");
        historyEntity.setId(2);
        historyEntity.setDate(cal.getTime());
        historyEntity.setPrice(100);
        historyEntity.setItem("CocaCola");
        historyEntityList.add(historyEntity);

        cal.set(Calendar.YEAR,2020);
        cal.set(Calendar.MONTH,Calendar.OCTOBER);
        historyEntity = new HistoryEntity();
        historyEntity.setName("hoge");
        historyEntity.setId(3);
        historyEntity.setDate(cal.getTime());
        historyEntity.setPrice(100);
        historyEntity.setItem("CocaCola");
        historyEntityList.add(historyEntity);

        cal.set(Calendar.YEAR,2020);
        cal.set(Calendar.MONTH,Calendar.OCTOBER);
        historyEntity = new HistoryEntity();
        historyEntity.setName("hoge");
        historyEntity.setId(4);
        historyEntity.setDate(cal.getTime());
        historyEntity.setPrice(100);
        historyEntity.setItem("CocaCola");
        historyEntityList.add(historyEntity);

        historyList = new HistoryList(historyEntityList);
    }

    @Test
    public void testGetAmountPrice(){
        assertEquals(historyList.getAmountPrice(),400);
        assertEquals(historyList.getHistoryListOfMember("h-yosiok").getAmountPrice(),200);
    }

    @Test
    public void testGetHistoryListOfSpecifiedMonth(){

        List<HistoryEntity> expectList = historyEntityList.subList(1,4);

        HistoryList actual = historyList.getHistoryListOfSpecifiedMonth(2020, 10);
        
        assertEquals(expectList,actual.getHistoryList());
    }
}       
