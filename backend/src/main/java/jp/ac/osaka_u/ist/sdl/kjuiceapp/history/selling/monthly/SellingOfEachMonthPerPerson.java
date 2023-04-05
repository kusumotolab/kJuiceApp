package jp.ac.osaka_u.ist.sdl.kjuiceapp.history.selling.monthly;

// import com.google.gson.Gson;
// import java.util.Calendar;
// import java.util.Collections;
// import java.util.HashMap;
// import java.util.List;
// import java.util.Map;
// import jp.ac.osaka_u.ist.sdl.kjuiceapp.common.date.ManipulateDate;
// import jp.ac.osaka_u.ist.sdl.kjuiceapp.history.HistoryList;
// import jp.ac.osaka_u.ist.sdl.kjuiceapp.member.MemberList;

// 指定した月に各構成員が利用した金額を取得する
public class SellingOfEachMonthPerPerson {

  // Map<String, Integer> sellingOfEachMonthPerPerson = new HashMap<>();

  // SellingOfEachMonthPerPerson(HistoryList historyList, MemberList memberList, Calendar cal) {
  //   initSellingOfEachMonthPerPerson(memberList);
  //   setSellingOfEachMonthPerPerson(historyList, cal);
  // }

  // // 顧客の利用金額を0で初期化
  // private void initSellingOfEachMonthPerPerson(MemberList memberList) {
  //   MemberList activeMemberList = memberList.getActiveMember();
  //   List<String> memberNameList = activeMemberList.getMemberNameList();
  //   for (String memberName : memberNameList) {
  //     sellingOfEachMonthPerPerson.put(memberName, 0);
  //   }
  // }

  // private void setSellingOfEachMonthPerPerson(HistoryList historyList, Calendar cal) {

  //   String targetMonth = ManipulateDate.convertDateToYYYYMM(cal);
  //   int YYYY = ManipulateDate.convertYYYYMMtoInteger(targetMonth).get("year");
  //   int MM = ManipulateDate.convertYYYYMMtoInteger(targetMonth).get("month");

  //   for (String userId : sellingOfEachMonthPerPerson.keySet()) {
  //     HistoryList historyListOfSpecifiedMonthAndPerson =
  //         historyList.getHistoryListOfSpecifiedMonthAndPerson(YYYY, MM, userId);
  //     sellingOfEachMonthPerPerson.put(
  //         userId, historyListOfSpecifiedMonthAndPerson.getAmountPrice());
  //   }
  // }

  // public Map<String, Integer> getSellingOfEachMonthPerPerson() {
  //   return Collections.unmodifiableMap(sellingOfEachMonthPerPerson);
  // }

  // public String getAsJson() {
  //   return new Gson().toJson(this.sellingOfEachMonthPerPerson);
  // }
}
