package jp.ac.osaka_u.ist.sdl.kjuiceapp.date;

// import static org.junit.jupiter.api.Assertions.assertEquals;

// import java.lang.reflect.InvocationTargetException;
// import java.util.ArrayList;
// import java.util.Calendar;
// import java.util.Date;
// import java.util.List;
// import jp.ac.osaka_u.ist.sdl.kjuiceapp.common.date.ManipulateDate;
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.springframework.boot.test.context.SpringBootTest;

// @SpringBootTest
public class ManipulateDateTest {

  // public Calendar cal = Calendar.getInstance();

  // // 下処理
  // @BeforeEach
  // public void preprocessTestClass() {
  //   cal.set(Calendar.YEAR, 2023);
  //   cal.set(Calendar.MONTH, 0);
  //   cal.set(Calendar.DATE, 1);
  // }

  // @Test
  // public void testGetMonthWithinHalfYearAsStringYYYYMM()
  //     throws NoSuchMethodException, SecurityException, IllegalAccessException,
  //         IllegalArgumentException, InvocationTargetException {

  //   // 期待値
  //   List<String> expected = new ArrayList<>();
  //   expected.add("2022/08");
  //   expected.add("2022/09");
  //   expected.add("2022/10");
  //   expected.add("2022/11");
  //   expected.add("2022/12");
  //   expected.add("2023/01");

  //   // 実行値
  //   List<String> actual = ManipulateDate.getMonthWithinHalfYearAsStringYYYYMM(cal);

  //   assertEquals(actual, expected);
  // }

  // @Test
  // public void testConvertDateToYYYYMM() {
  //   String expected = "2023/01";

  //   String actual = ManipulateDate.convertDateToYYYYMM(cal);

  //   assertEquals(actual, expected);
  // }

  // @Test
  // public void testGetFirstDate() {
  //   Calendar expected = Calendar.getInstance();
  //   expected.set(Calendar.YEAR, 2023);
  //   expected.set(Calendar.MONTH, 0);
  //   int first = expected.getActualMinimum(Calendar.DATE);
  //   expected.set(Calendar.DATE, first);
  //   expected.set(Calendar.HOUR_OF_DAY, 00);
  //   expected.set(Calendar.MINUTE, 00);
  //   expected.set(Calendar.SECOND, 00);
  //   expected.set(Calendar.MILLISECOND, 000);
  //   Date expectedDate = expected.getTime();

  //   Date actual = ManipulateDate.getFirstDate(cal.getTime());

  //   assertEquals(expectedDate, actual);
  // }
}
