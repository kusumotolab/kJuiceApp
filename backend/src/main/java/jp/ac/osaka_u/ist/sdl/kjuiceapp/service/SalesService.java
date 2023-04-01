package jp.ac.osaka_u.ist.sdl.kjuiceapp.service;

import java.util.Calendar;
import java.util.Date;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.common.date.ManipulateDate;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.SalesEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.repository.SalesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class SalesService {
  @Autowired SalesRepository salesRepository;

  public String updateSales(String name, Date date, int price) {
    Calendar cal = Calendar.getInstance();
    cal.setTime(date);

    String YYYYMM = ManipulateDate.convertDateToYYYYMM(cal);

    SalesEntity salesEntity = salesRepository.findByUserIdAndDate(name, YYYYMM);
    if (salesEntity == null) {
      salesEntity = new SalesEntity();
      salesEntity.setDate(YYYYMM);
      salesEntity.setUserId(name);
      salesEntity.setSales(price);
    } else {
      salesEntity.setSales(salesEntity.getSales() + price);
    }
    salesRepository.save(salesEntity);

    return "success";
  }
}
