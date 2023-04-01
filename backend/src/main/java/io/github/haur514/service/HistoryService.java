package io.github.haur514.service;

import io.github.haur514.entity.HistoryEntity;
import io.github.haur514.entity.MemberEntity;
import io.github.haur514.repository.HistoryRepository;
import io.github.haur514.repository.MemberRepository;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class HistoryService {
  @Autowired HistoryRepository historyRepository;

  @Autowired MemberRepository memberRepository;

  public List<HistoryEntity> findAllHistory() {
    return historyRepository.findAll();
  }

  public List<HistoryEntity> findByName(String name) {
    return historyRepository.findByName(name);
  }

  public String removeHistory(int id, String name) {
    try {
      HistoryEntity historyEntityFoundById = historyRepository.getReferenceById(id);
      if (historyEntityFoundById.getName().equals(name)) {
        historyRepository.deleteById(id);
        return "success";
      } else {
        return "false";
      }
    } catch (Exception e) {
      return "failed";
    }
  }

  public String insertHistory(String name, String item, int price) {
    HistoryEntity historyEntity = new HistoryEntity();
    historyEntity.setName(name);
    historyEntity.setItem(item);
    historyEntity.setPrice(price);
    historyEntity.setDate(new java.sql.Date(new java.util.Date().getTime()));
    historyRepository.save(historyEntity);
    return "success";
  }

  public boolean isRegistered(int id, String name) {
    try {
      HistoryEntity historyEntityFoundById = historyRepository.getReferenceById(id);
      if (historyEntityFoundById.getName().equals(name)) {
        return true;
      }
      return false;
    } catch (Exception e) {
      return false;
    }
  }

  // ある月の利用金額を，構成員ごとに取得する
  public Map<String, Integer> getBillingAmountOfAMonth(Date date) {
    Map<String, Integer> ret = new HashMap<>();

    Date day = getFirstDate(date);
    for (MemberEntity memberEntity : memberRepository.findAll()) {
      String userId = memberEntity.getName();
      Integer amount =
          historyRepository.getBillingAmountAllMember(userId, day, getNextFirstDate(day));
      if (amount == null) {
        amount = 0;
      }

      ret.put(userId, (int) amount);
    }

    return ret;
  }

  // ある構成員が過去6ヶ月に利用した金額を返す
  public Map<Date, Integer> getBillingAmountOfAMember(String userId) {
    Map<Date, Integer> ret = new HashMap<>();

    List<Date> lastSixMonth = getLastSixMonth();
    for (int i = 0; i < lastSixMonth.size(); i++) {
      Date day = lastSixMonth.get(i);

      Integer amount =
          historyRepository.getBillingAmountAllMember(userId, day, getNextFirstDate(day));
      if (amount == null) {
        amount = 0;
      }

      ret.put(day, (int) amount);
    }

    return ret;
    // return ret;
  }

  // 現在の月から6ヶ月前までの月をリスト形式で返す関数
  public List<Date> getLastSixMonth() {
    Calendar calendar = Calendar.getInstance();
    List<Date> ret = new ArrayList<>();

    for (int i = 0; i < 6; i++) {
      ret.add(getFirstDate(calendar.getTime()));
      calendar.add(Calendar.MONTH, -1);
    }

    ret = ret.stream().sorted(Comparator.comparing(Date::getTime)).collect(Collectors.toList());
    return ret;
  }

  // 引数に与えられた月の翌月の月初日を返す
  public Date getNextFirstDate(Date date) {
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
  public Date getFirstDate(Date date) {

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
}
