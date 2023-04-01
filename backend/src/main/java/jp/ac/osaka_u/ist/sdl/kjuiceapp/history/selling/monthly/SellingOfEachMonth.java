package jp.ac.osaka_u.ist.sdl.kjuiceapp.history.selling.monthly;

import com.google.gson.Gson;

import jp.ac.osaka_u.ist.sdl.kjuiceapp.common.date.ManipulateDate;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.HistoryEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.history.HistoryList;

import java.util.Calendar;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

public class SellingOfEachMonth {
  LinkedHashMap<String, Integer> sellingAmountOfEachMonth = new LinkedHashMap<>();

  Map<String, Integer> sellingOfMonthPerPerson = new HashMap<>();

  public SellingOfEachMonth(HistoryList historyList) {
    setSellingAmountOfEachMonth(historyList);
  }

  // 各月の売り上げをJson形式で返す
  public String getSellingAmountOfEachMonthAsJson() {
    return new Gson().toJson(sellingAmountOfEachMonth);
  }

  // sellingAmountOfEachMonthに値を入れる
  public void setSellingAmountOfEachMonth(HistoryList historyList) {
    initSellingAmountOfEachMonth(sellingAmountOfEachMonth);

    HistoryList historyListWithinHalfYear = historyList.getHistoryListWithinHalfYear();

    historyListWithinHalfYear.getHistoryList().stream()
        .forEach(
            (HistoryEntity historyEntity) -> {
              Calendar cal = Calendar.getInstance();
              cal.setTime(historyEntity.getDate());
              // YYYY/MM形式で日付を取得
              String dateYYYYMM = ManipulateDate.convertDateToYYYYMM(cal);
              sellingAmountOfEachMonth.put(
                  dateYYYYMM,
                  sellingAmountOfEachMonth.getOrDefault(dateYYYYMM, 0) + historyEntity.getPrice());
            });
  }

  // sellingAmountOfEachMonthを初期化する
  private void initSellingAmountOfEachMonth(Map<String, Integer> sellingHistoryOfEachMonth) {
    for (String YYYYMM :
        ManipulateDate.getMonthWithinHalfYearAsStringYYYYMM(Calendar.getInstance())) {
      sellingHistoryOfEachMonth.put(YYYYMM, 0);
    }
  }
}
