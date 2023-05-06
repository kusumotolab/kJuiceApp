package jp.ac.osaka_u.ist.sdl.kjuiceapp.service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.ItemEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.MemberEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.PurchaseEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.repository.ItemRepository;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.repository.MemberRepository;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.repository.PurchaseRepository;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.exceptions.NoSuchItemException;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.exceptions.NoSuchMemberException;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.exceptions.NoSuchPurchaseException;

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

  public HashMap<MemberEntity,Integer> getPurchasedAmountInSpecificPeriod(LocalDateTime startDateTime,LocalDateTime endDateTime){
    List<MemberEntity> allMemberEntities = memberRepository.findAll();
    HashMap<MemberEntity,Integer> purchasedAmountOfMember = new HashMap<MemberEntity,Integer>();
    for(MemberEntity memberEntity : allMemberEntities){
      purchasedAmountOfMember.put(memberEntity,getPurchasedAmountOfMemberInSpecificPeriod(memberEntity.getId(),startDateTime,endDateTime));
    }
    return purchasedAmountOfMember;
  }
  
  private int getPurchasedAmountOfMemberInSpecificPeriod(String memberId,LocalDateTime startDateTime,LocalDateTime endDateTime){
    int ret = 0;
    for(PurchaseEntity purchase : this.getPurchasesByMember(memberId)){
      if(purchase.getDate().isBefore(startDateTime) || purchase.getDate().isAfter(endDateTime)){
        continue;
      }
      ret += purchase.getPrice();
    }
    return ret;
  }
}
