package jp.ac.osaka_u.ist.sdl.kjuiceapp.service;

import java.util.Date;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.HistoryEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.ItemEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.MemberEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.repository.HistoryRepository;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.repository.ItemRepository;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.repository.MemberRepository;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.exceptions.IllegalHistoryException;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.exceptions.IllegalItemException;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.exceptions.IllegalMemberException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PurchaseService {
  @Autowired private MemberRepository memberRepository;
  @Autowired private ItemRepository itemRepository;
  @Autowired private HistoryRepository historyRepository;
  @Autowired private SalesService salesService;
  @Autowired private HistoryService historyService;
  @Autowired private ItemService itemService;
  @Autowired private MemberService memberService;

  public HistoryEntity makePurchase(String memberId, String itemId)
      throws IllegalMemberException, IllegalItemException {
    MemberEntity member = memberRepository.findByName(memberId);
    ItemEntity item = itemRepository.findByName(itemId);

    // id存在確認
    if (member == null) throw new IllegalMemberException();
    if (item == null) throw new IllegalItemException();

    // historyservice.inserthistory
    HistoryEntity historyEntity = new HistoryEntity();
    historyEntity.setName(memberId);
    historyEntity.setItem(itemId);
    historyEntity.setPrice(item.getSellingPrice());
    historyEntity.setDate(new Date());
    historyRepository.save(historyEntity);

    // itemservice.purchased
    ItemEntity updatedItem = new ItemEntity();
    updatedItem.setName(item.getName());
    updatedItem.setSellingPrice(item.getSellingPrice());
    updatedItem.setCostPrice(item.getCostPrice());
    updatedItem.setGrouping(item.getGrouping());
    updatedItem.setSalesFigure(item.getSalesFigure() + 1);
    updatedItem.setActive(item.isActive());
    itemRepository.save(updatedItem);

    // memberservice.purchased
    MemberEntity updatedMember = new MemberEntity();
    updatedMember.setName(member.getName());
    updatedMember.setDisplayName(member.getDisplayName());
    updatedMember.setAttribute(member.getAttribute());
    updatedMember.setUmpayedAmount(member.getUmpayedAmount() + item.getSellingPrice());
    updatedMember.setActive(member.isActive());
    memberRepository.save(updatedMember);

    // salesservice.updatesales
    // TODO remove
    salesService.updateSales(memberId, new Date(), item.getSellingPrice());

    return historyEntity;
  }

  public void deletePurchase(int historyId) throws IllegalHistoryException {
    HistoryEntity target =
        historyRepository.findById(historyId).orElseThrow(IllegalHistoryException::new);
    historyService.removeHistory(historyId, target.getName());
    // TODO remove
    itemService.recalled(target.getItem());
    memberService.recalled(target.getName(), target.getPrice());
  }
}
