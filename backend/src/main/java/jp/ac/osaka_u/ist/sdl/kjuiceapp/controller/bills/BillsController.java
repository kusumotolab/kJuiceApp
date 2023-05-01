package jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.bills;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.bills.requestbody.BillPostRequestBody;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.bills.responsebody.BillResponseBody;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.BillEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.BillService;

@RestController
@RequestMapping("/bills")
public class BillsController {

  @Autowired private BillService billService;

  @GetMapping
  public List<BillResponseBody> getBills() {
    List<BillEntity> billEntities = billService.findAllBills();
     return billEntities.stream().map(BillsController::convert).toList();
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public BillResponseBody postMessage(@RequestBody BillPostRequestBody bill) {
    
    return null;
  }

  private static BillResponseBody convert(BillEntity origin) {
    return new BillResponseBody(
        origin.getId(), origin.getIssuerId(),origin.getDate());
  }

}
