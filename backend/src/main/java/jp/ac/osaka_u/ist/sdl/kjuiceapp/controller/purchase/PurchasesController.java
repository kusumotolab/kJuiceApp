package jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.purchase;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.purchase.requestbody.PurchaseRequestBody;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.purchase.responsebody.PurchaseResponseBody;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.PurchaseEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.PurchaseService;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.exceptions.NoSuchItemException;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.exceptions.NoSuchMemberException;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.exceptions.NoSuchPurchaseException;
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
  @Autowired private PurchaseService purchaseService;

  private static DateTimeFormatter dateFormatter = DateTimeFormatter.ISO_OFFSET_DATE_TIME;

  @GetMapping
  public List<PurchaseResponseBody> getPurchases(
      @RequestParam(required = false) Optional<String> memberId) {
    List<PurchaseEntity> histories;
    if (memberId.isPresent()) {
      histories = purchaseService.getPurchasesByMember(memberId.get());
    } else {
      histories = purchaseService.getAllPurchases();
    }
    return histories.stream().map(PurchasesController::convert).toList();
    // 404
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public PurchaseResponseBody makePurchase(@RequestBody PurchaseRequestBody purchase) {
    try {
      return convert(purchaseService.makePurchase(purchase.memberId(), purchase.itemId()));
    } catch (NoSuchMemberException e) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
      // TODO エラー詳細をレスポンスボディに記載
    } catch (NoSuchItemException e) {
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
    } catch (NoSuchPurchaseException e) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }
  }

  private static PurchaseResponseBody convert(PurchaseEntity origin) {
    return new PurchaseResponseBody(
        origin.getPurchaseId(),
        origin.getMemberId(),
        origin.getItemId(),
        origin.getMember().getName(),
        origin.getItem().getName(),
        origin.getPrice(),
        dateFormatter.format(origin.getDate()));
  }
}
