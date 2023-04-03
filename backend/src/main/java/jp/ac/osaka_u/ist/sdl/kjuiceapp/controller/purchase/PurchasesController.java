package jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.purchase;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.purchase.requestbody.PurchaseData;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.purchase.responsebody.PurchaseResponseBody;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.HistoryEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.HistoryService;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.PurchaseService;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.exceptions.IllegalHistoryException;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.exceptions.IllegalItemException;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.exceptions.IllegalMemberException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/purchases")
public class PurchasesController {
  @Autowired private HistoryService historyService;
  @Autowired private PurchaseService purchaseService;

  private DateTimeFormatter dateFormatter = DateTimeFormatter.ISO_OFFSET_DATE_TIME;

  @GetMapping
  public List<PurchaseResponseBody> getPurchases(
      @RequestParam(required = false) Optional<String> userId) {
    List<HistoryEntity> histories;
    if (userId.isPresent()) {
      histories = historyService.findByName(userId.get());
    } else {
      histories = historyService.findAllHistory();
    }
    return histories.stream()
        .map(
            e ->
                new PurchaseResponseBody(
                    e.getId(),
                    e.getName(),
                    e.getName(),
                    e.getItem(),
                    e.getItem(),
                    e.getPrice(),
                    dateFormatter.format(e.getDate().toInstant())))
        .toList();
    // 404
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public PurchaseResponseBody makePurchase(@RequestBody PurchaseData order) {
    try {
      HistoryEntity result = purchaseService.makePurchase(order.name, order.item);
      return new PurchaseResponseBody(
          result.getId(),
          result.getName(),
          result.getName(),
          result.getItem(),
          result.getItem(),
          result.getPrice(),
          dateFormatter.format(result.getDate().toInstant()));
    } catch (IllegalMemberException e) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
      // TODO エラー詳細をレスポンスボディに記載
    } catch (IllegalItemException e) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
      // TODO エラー詳細をレスポンスボディに記載
    }
  }

  @DeleteMapping("{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deletePurchase(@PathVariable String id) {
    try {
      purchaseService.deletePurchase(Integer.parseInt(id));
      return;
    } catch (IllegalHistoryException e) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }
  }
}
