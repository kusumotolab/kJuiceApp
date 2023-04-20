package io.db;

import com.github.springtestdbunit.DbUnitTestExecutionListener;
import com.github.springtestdbunit.annotation.DbUnitConfiguration;
import io.github.haur514.repository.MemberRepository;
import org.dbunit.IDatabaseTester;
import org.dbunit.database.IDatabaseConnection;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.test.context.transaction.TransactionalTestExecutionListener;

@SpringBootTest(
    classes = {MemberRepository.class},
    webEnvironment = SpringBootTest.WebEnvironment.NONE)
@DbUnitConfiguration(dataSetLoader = CsvDataSetLoader.class)
@TestExecutionListeners({
  DependencyInjectionTestExecutionListener.class,
  TransactionalTestExecutionListener.class,
  DbUnitTestExecutionListener.class
})
public class HistoryDataBaseTest {
  // TODO
  // データベースのmockがうまくいかない
  static IDatabaseTester databaseTester;
  static IDatabaseConnection connection;
}
