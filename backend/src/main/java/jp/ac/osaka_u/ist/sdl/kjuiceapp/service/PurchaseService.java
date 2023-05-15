package jp.ac.osaka_u.ist.sdl.kjuiceapp.service;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import javax.persistence.EntityManager;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.ItemEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.MemberEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.PurchaseEntity;
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

  public LinkedHashMap<MemberEntity, Integer> getPurchasedAmountInSpecificPeriod(
      LocalDateTime startDateTime, LocalDateTime endDateTime) {
    List<MemberEntity> allMemberEntities = memberRepository.findAll();
    LinkedHashMap<MemberEntity, Integer> purchasedAmountOfMember =
        new LinkedHashMap<MemberEntity, Integer>();
    for (MemberEntity memberEntity : allMemberEntities) {
      purchasedAmountOfMember.put(
          memberEntity,
          getPurchasedAmountOfMemberInSpecificPeriod(
              memberEntity.getId(), startDateTime, endDateTime));
    }
    purchasedAmountOfMember.entrySet().stream()
        .sorted(Map.Entry.<MemberEntity, Integer>comparingByValue())
        .collect(
            Collectors.toMap(
                Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e1, LinkedHashMap::new));

    return purchasedAmountOfMember;
  }

  private int getPurchasedAmountOfMemberInSpecificPeriod(
      String memberId, LocalDateTime startDateTime, LocalDateTime endDateTime) {
    return this.getPurchasesByMember(memberId).stream()
        .filter(purchase -> purchase.getDate().isAfter(startDateTime))
        .filter(purchase -> purchase.getDate().isBefore(endDateTime))
        .mapToInt(purchase -> purchase.getPrice())
        .sum();
  }
}
