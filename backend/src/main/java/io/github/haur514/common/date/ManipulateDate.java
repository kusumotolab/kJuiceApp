package io.github.haur514.common.date;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class ManipulateDate {
  // 現在の月から6ヶ月前までの月をリスト形式で返す関数
  public static List<Date> getLastSixMonth(Date today) {

    Calendar calendar = Calendar.getInstance();
    List<Date> ret = new ArrayList<>();

    for (int i = 0; i < 6; i++) {
      ret.add(getFirstDate(calendar.getTime()));
      calendar.add(Calendar.MONTH, -1);
    }

    ret = ret.stream().sorted(Comparator.comparing(Date::getTime)).collect(Collectors.toList());
    return ret;
  }

  // 二つのCalendarが同じ年の同じ月かどうか判定する
  public static boolean isSameMonth(Calendar cal1, Calendar cal2) {
    if (cal1.get(Calendar.YEAR) == cal2.get(Calendar.YEAR)
        && cal1.get(Calendar.MONTH) == cal2.get(Calendar.MONTH)) {
      return true;
    }
    return false;
  }

  // 現在の時刻から半年以内の月をYYYY/MMの形で6つ列挙する
  public static List<String> getMonthWithinHalfYearAsStringYYYYMM(Calendar cal) {
    List<String> ret = new ArrayList<>();
    for (int i = 0; i < 6; i++) {
      ret.add(ManipulateDate.convertDateToYYYYMM(cal));
      cal.add(Calendar.MONTH, -1);
    }
    Collections.reverse(ret);
    return ret;
  }

  // 引数に与えられた月の翌月の月初日を返す
  public static Date getNextFirstDate(Date date) {
    if (date == null) {
      return null;
    }
    Calendar calendar = Calendar.getInstance();
    calendar.setTime(date);
    calendar.add(Calendar.MONTH, 1);
    int first = calendar.getActualMinimum(Calendar.DATE);
    calendar.set(Calendar.DATE, first);

    calendar.set(Calendar.HOUR_OF_DAY, 00);
    calendar.set(Calendar.MINUTE, 00);
    calendar.set(Calendar.SECOND, 00);
    calendar.set(Calendar.MILLISECOND, 000);

    Date ret = new Date();
    ret = calendar.getTime();

    return ret;
  }

  // 月初日を返す
  public static Date getFirstDate(Date date) {

    if (date == null) return null;

    Calendar calendar = Calendar.getInstance();
    calendar.setTime(date);
    int first = calendar.getActualMinimum(Calendar.DATE);
    calendar.set(Calendar.DATE, first);

    calendar.set(Calendar.HOUR_OF_DAY, 00);
    calendar.set(Calendar.MINUTE, 00);
    calendar.set(Calendar.SECOND, 00);
    calendar.set(Calendar.MILLISECOND, 000);

    Date ret = new Date();
    ret = calendar.getTime();

    return ret;
  }

  // ある日付をYYYYMM形式の文字列で返す
  public static String convertDateToYYYYMM(Calendar cal) {
    int year = cal.get(Calendar.YEAR);
    int month = cal.get(Calendar.MONTH);
    String formatYearStr = String.format("%04d", year);
    String formatMonthStr = String.format("%02d", month + 1);
    return formatYearStr + "/" + formatMonthStr;
  }

  // ある日付anotherdayが現在todayから半年以内かを判定する
  public static boolean isWithinHalfOfYear(Calendar anotherday, Calendar today) {
    if (today.get(Calendar.YEAR) == anotherday.get(Calendar.YEAR)) {
      if (today.get(Calendar.MONTH) - anotherday.get(Calendar.MONTH) < 6) {
        return true;
      }
    } else if (today.get(Calendar.YEAR) - anotherday.get(Calendar.YEAR) == 1) {
      if (today.get(Calendar.MONTH) - 6 + 12 < anotherday.get(Calendar.MONTH)) {
        return true;
      }
    }
    return false;
  }

  /** "YYYY/MM"から，YYYYとMMをそれぞれ抽出し，int配列として返す． int[0] : YYYY int[1] : MMMM */
  public static Map<String, Integer> convertYYYYMMtoInteger(String YYYYMM) {
    String[] tmp = YYYYMM.split("/");
    Map<String, Integer> ret = new HashMap<>();
    ret.put("year", Integer.parseInt(tmp[0]));
    ret.put("month", Integer.parseInt(tmp[1]));
    return ret;
  }
}
