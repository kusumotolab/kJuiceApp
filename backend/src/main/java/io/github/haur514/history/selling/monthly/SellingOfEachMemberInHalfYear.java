package io.github.haur514.history.selling.monthly;

import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;

import io.github.haur514.common.date.ManipulateDate;
import io.github.haur514.history.HistoryList;
import io.github.haur514.member.MemberList;

/**
 * 半年間における，各顧客のデータを管理するクラス
 * @author h-yosiok
 */


public class SellingOfEachMemberInHalfYear {
    // 年月YYY/MMとSellingOfEachPersonWithinHalfYearを記録
    /*
     * データの保存例
     * {"2022/09":{"m-tanigt":0,"h-watanb":0,"r-takaic":0},
     * "2022/10":{"m-tanigt":0,"h-watanb":0,"r-takaic":0},
     * "2022/11":{"m-tanigt":0,"h-watanb":0,"r-takaic":80}}
     */
    private Map<String, SellingOfEachMonthPerPerson> sellingOfEachMemberInHalfYear = new HashMap<>();

    public SellingOfEachMemberInHalfYear(HistoryList historyList,MemberList memberList){
        setSellingOfAllUser(historyList,memberList, Calendar.getInstance());
    }

    private void setSellingOfAllUser(HistoryList historyList,MemberList memberList,Calendar today){
        List<String> monthsInHalfYear = ManipulateDate.getMonthWithinHalfYearAsStringYYYYMM(today);
        for(String monthAsYYYYMM: monthsInHalfYear){
            int year = ManipulateDate.convertYYYYMMtoInteger(monthAsYYYYMM).get("year");
            int month = ManipulateDate.convertYYYYMMtoInteger(monthAsYYYYMM).get("month");
            Calendar thatday = Calendar.getInstance();
            thatday.set(Calendar.YEAR,year);
            thatday.set(Calendar.MONTH,month);
            this.sellingOfEachMemberInHalfYear.put(
                monthAsYYYYMM,
                new SellingOfEachMonthPerPerson(historyList,memberList,thatday)
            );
        }
    }

    public String getAsJson(){
        Map<String,Map<String, Integer>> ret = new HashMap<>();
        for(String key: sellingOfEachMemberInHalfYear.keySet()){
            ret.put(key,sellingOfEachMemberInHalfYear.get(key).getSellingOfEachMonthPerPerson());
        }
        return new Gson().toJson(ret);
    }
}
