package jp.ac.osaka_u.ist.sdl.kjuiceapp.history;

// import java.util.Calendar;
// import java.util.Collections;
// import java.util.List;
// import jp.ac.osaka_u.ist.sdl.kjuiceapp.common.date.ManipulateDate;
// import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.HistoryEntity;

public class HistoryList {
  // final List<HistoryEntity> historyList;

  // public HistoryList(List<HistoryEntity> historyEntity) {
  //   this.historyList = historyEntity;
  // }

  // public List<HistoryEntity> getHistoryList() {
  //   return Collections.unmodifiableList(this.historyList);
  // }

  // // 年，月を指定すると，その月のHistoryListを返す．
  // public HistoryList getHistoryListOfSpecifiedMonth(int year, int month) {
  //   return (new HistoryList(
  //       this.historyList.stream()
  //           .filter(
  //               (HistoryEntity historyEntity) -> {
  //                 Calendar cal = Calendar.getInstance();
  //                 cal.setTime(historyEntity.getDate());

  //                 Calendar selectedCal = Calendar.getInstance();
  //                 selectedCal.set(Calendar.YEAR, year);
  //                 selectedCal.set(Calendar.MONTH, month - 1);
  //                 return ManipulateDate.isSameMonth(cal, selectedCal);
  //               })
  //           .toList()));
  // }

  // // 年，月，顧客を指定すると，対象となるHistoryListを返す．
  // public HistoryList getHistoryListOfSpecifiedMonthAndPerson(int year, int month, String userId)
  // {
  //   return this.getHistoryListOfSpecifiedMonth(year, month).getHistoryListOfMember(userId);
  // }

  // // 半年以内のリストを取得
  // public HistoryList getHistoryListWithinHalfYear() {
  //   return (new HistoryList(
  //       this.historyList.stream()
  //           .filter(
  //               (HistoryEntity historyEntity) -> {
  //                 Calendar cal = Calendar.getInstance();
  //                 cal.setTime(historyEntity.getDate());
  //                 return ManipulateDate.isWithinHalfOfYear(cal, Calendar.getInstance());
  //               })
  //           .toList()));
  // }

  // // あるメンバーのリストを取得
  // public HistoryList getHistoryListOfMember(String memberName) {
  //   return (new HistoryList(
  //       this.historyList.stream()
  //           .filter(
  //               (HistoryEntity historyEntity) -> {
  //                 return historyEntity.getName().equals(memberName);
  //               })
  //           .toList()));
  // }

  // // あるメンバーの半年以内の購入金額を取得
  // public HistoryList getHistoryListOfMemberWithinHalfYear(String memberName) {
  //   return (getHistoryListOfMember(memberName).getHistoryListWithinHalfYear());
  // }

  // // リスト内の全顧客が利用した金額を返す
  // public int getAmountPrice() {
  //   return this.historyList.stream().mapToInt(i -> i.getPrice()).sum();
  // }
}
