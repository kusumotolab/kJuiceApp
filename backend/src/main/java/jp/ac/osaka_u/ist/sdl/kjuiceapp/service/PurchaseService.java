package jp.ac.osaka_u.ist.sdl.kjuiceapp.service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import javax.persistence.EntityManager;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.ItemEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.PurchaseEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.repository.BillRepository;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.repository.ItemRepository;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.repository.MemberRepository;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.repository.PurchaseRepository;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.exceptions.NoSuchItemException;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.exceptions.NoSuchMemberException;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.exceptions.NoSuchPurchaseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PurchaseService {
  @Autowired private MemberRepository memberRepository;
  @Autowired private ItemRepository itemRepository;
  @Autowired private PurchaseRepository purchaseRepository;
  @Autowired private EntityManager entityManager;
  @Autowired private BillRepository billRepository;

  public List<PurchaseEntity> getAllPurchases() {
    return purchaseRepository.findAll();
  }

  public List<PurchaseEntity> getPurchasesByMember(String memberId) {
    return purchaseRepository.findByMemberId(memberId);
  }

  public PurchaseEntity makePurchase(String memberId, String itemId)
      throws NoSuchMemberException, NoSuchItemException {
    if (!memberRepository.existsById(memberId)) throw new NoSuchMemberException();
    ItemEntity item = itemRepository.findById(itemId).orElseThrow(NoSuchItemException::new);

    var newPurchase = new PurchaseEntity(memberId, itemId, item.getSellingPrice());
    var savedPurchase = purchaseRepository.save(newPurchase);
    entityManager.refresh(savedPurchase);
    return savedPurchase;
  }

  public void deletePurchase(int historyId) throws NoSuchPurchaseException {
    if (!purchaseRepository.existsById(historyId)) throw new NoSuchPurchaseException();

    purchaseRepository.deleteById(historyId);
    return;
  }

  // 直近の請求書発行日以降にユーザが利用した金額の合計を取得する．
  public int getPurchasedAmountByMemberAfterLastBillDate(String memberId) {
    return purchaseRepository.findByMemberIdAndDateAfter(memberId, getRecentBillDate()).stream()
        .mapToInt(e -> e.getPrice())
        .sum();
  }

  public HashMap<String, Integer> getPaymentSummaryOrderedByPayment() {
    return purchaseRepository.getPaymentSummary().entrySet().stream()
        .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
        .collect(
            Collectors.toMap(
                Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e1, LinkedHashMap::new));
  }

  // 請求書を発行した直近の日付を取得する．BillServiceから呼び出すと循環参照となり，うまく動作しないため新たに用意．
  private LocalDateTime getRecentBillDate() {
    return billRepository
        .findFirstByOrderByDateDesc()
        .map((e) -> e.getDate())
        .orElse(LocalDateTime.MIN);
  }
}
