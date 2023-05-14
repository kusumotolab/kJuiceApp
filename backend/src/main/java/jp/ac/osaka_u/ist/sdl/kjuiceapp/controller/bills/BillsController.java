package jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.bills;

import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.bills.requestbody.BillPostRequestBody;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.bills.responsebody.BillResponseBody;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.BillEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.BillService;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.exceptions.NoSuchMemberException;

@RestController
@RequestMapping("/bills")
public class BillsController {

  @Autowired private BillService billService;
  private static DateTimeFormatter dateFormatter = DateTimeFormatter.ISO_DATE_TIME;

  @GetMapping
  public List<BillResponseBody> getBills() {
    List<BillEntity> billEntities = billService.findAllBills();
    return billEntities.stream().map(BillsController::convert).toList();
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public BillResponseBody postBill(@RequestBody BillPostRequestBody bill){
    try {
      BillEntity result = billService.postBill(bill.issuerId());
      return BillsController.convert(result);
    } catch (NoSuchMemberException e) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }
  }

  private static BillResponseBody convert(BillEntity origin) {
    return new BillResponseBody(
        origin.getBillId(), origin.getIssuerId(), dateFormatter.format(origin.getDate()));
  }
}
