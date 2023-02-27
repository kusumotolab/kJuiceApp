package io.github.haur514.history.selling.monthly;

import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;

import io.github.haur514.common.date.ManipulateDate;
import io.github.haur514.history.HistoryList;

public class SellingOfAPersonWithinHalfYear {

    // ある個人"name"の売り上げを，
    // {YYYYMM : ¥amount} で記録
    String memberName;
    Map<String, Integer> sellingOfAPersonWithinHalfYear = new HashMap<>();

    HistoryList historyList;

    public SellingOfAPersonWithinHalfYear(HistoryList historyList,String memberName){
        this.historyList = historyList;
        this.memberName = memberName;        
        setSellingOfEachPersonWithinHalfYear();
    }

    
    public void setSellingOfEachPersonWithinHalfYear(){
        initSellingHistoryOfEachMonth(sellingOfAPersonWithinHalfYear);
        HistoryList historyListOfMemberWithinHalfYear = 
        historyList.getHistoryListOfMemberWithinHalfYear(memberName);

        historyListOfMemberWithinHalfYear
                .getHistoryList()
                .stream()
                .forEach((historyEntity) -> {
                    Calendar cal = Calendar.getInstance();
                    cal.setTime(historyEntity.getDate());

                    // YYYY/MM形式で日付を取得
                    String dateYYYYMM = ManipulateDate.convertDateToYYYYMM(cal);
                    sellingOfAPersonWithinHalfYear.put(dateYYYYMM,
                            sellingOfAPersonWithinHalfYear.getOrDefault(dateYYYYMM, 0) + historyEntity.getPrice());
                });
    }

    // 過去6ヶ月分の料金をJson形式で返す
    public String getSellingOfEachPersonWithinHalfYearAsJson(){
        return new Gson().toJson(this.sellingOfAPersonWithinHalfYear);
    }


    // を初期化する
    private void initSellingHistoryOfEachMonth(Map<String, Integer> sellingHistoryOfEachMonth) {
        for (String YYYYMM : ManipulateDate.getMonthWithinHalfYearAsStringYYYYMM(Calendar.getInstance())) {
            sellingHistoryOfEachMonth.put(YYYYMM, 0);
        }
    }
}
