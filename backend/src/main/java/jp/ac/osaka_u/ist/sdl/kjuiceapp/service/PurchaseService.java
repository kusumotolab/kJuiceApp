package jp.ac.osaka_u.ist.sdl.kjuiceapp.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.persistence.EntityManager;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.stats.item.responsebody.ItemStatResponseBody;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.stats.member.responsebody.MemberStatResponseBody;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.stats.member.responsebody.StatisticsOnMemberPurchase;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.ItemEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.MemberEntity;
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
    final LocalDateTime oldestDay = LocalDateTime.of(0, 1, 1, 0, 0, 0);
    return billRepository.findFirstByOrderByDateDesc().map((e) -> e.getDate()).orElse(oldestDay);
  }

  // 特定の期間における商品の売上を個々に取得する．
  public List<ItemStatResponseBody> getSalesStatsOnItem(
      Optional<Boolean> active, LocalDateTime start, LocalDateTime end) {
    List<ItemStatResponseBody> itemStats = new ArrayList<>();
    List<ItemEntity> items =
        itemRepository.findAll().stream()
            // activeがtrueな場合にはactiveな要素だけ抽出
            // activeが指定されていない場合にはすべての要素を返す
            .filter(l -> l.isActive() || !active.orElse(false))
            .toList();

    for (ItemEntity item : items) {
      String itemId = item.getId();
      int sales =
          purchaseRepository.findByItemIdAndDateBetween(itemId, start, end).stream()
              .mapToInt(p -> p.getPrice())
              .sum();
      itemStats.add(new ItemStatResponseBody(itemId, sales));
    }

    return itemStats;
  }

  // 特定の期間における以下の要素を取得する．
  // totalAmount: 購入された金額の合計
  // totalCount: 購入された商品点数の合計
  // statistics: {各メンバーが購入した商品の合計金額と点数}
  public MemberStatResponseBody getPurchasesStatsOnMember(
      Optional<Boolean> active, LocalDateTime start, LocalDateTime end) {
    final int totalAmount = getTotalPurchaseAmountByDateBetween(active, start, end);
    final int totalCount = getTotalPurchaseCountByDateBetween(active, start, end);
    final List<StatisticsOnMemberPurchase> statistics =
        getStatisticsOnMemberPurchase(active, start, end);

    return new MemberStatResponseBody(totalAmount, totalCount, statistics);
  }

  // 特定の期間におけるメンバーの購入金額合計を取得する．
  private int getTotalPurchaseAmountByDateBetween(
      Optional<Boolean> active, LocalDateTime start, LocalDateTime end) {
    final List<String> memberIds =
        memberRepository.findAll().stream()
            // activeがtrueな場合にはactiveな要素だけ抽出
            // activeが指定されていない場合にはすべての要素を返す
            .filter(m -> m.isActive() || !active.orElse(false))
            .map(m -> m.getId())
            .toList();

    final List<PurchaseEntity> purchases =
        purchaseRepository.findByDateBetween(start, end).stream()
            .filter(p -> memberIds.contains(p.getMemberId()))
            .toList();

    final int amount = purchases.stream().mapToInt(p -> p.getPrice()).sum();

    return amount;
  }

  // 特定の期間におけるメンバーの購入点数合計を取得する．
  private int getTotalPurchaseCountByDateBetween(
      Optional<Boolean> active, LocalDateTime start, LocalDateTime end) {
    final List<String> memberIds =
        memberRepository.findAll().stream()
            // activeがtrueな場合にはactiveな要素だけ抽出
            // activeが指定されていない場合にはすべての要素を返す
            .filter(m -> m.isActive() || !active.orElse(false))
            .map(m -> m.getId())
            .toList();

    final List<PurchaseEntity> purchases =
        purchaseRepository.findByDateBetween(start, end).stream()
            .filter(p -> memberIds.contains(p.getMemberId()))
            .toList();

    return purchases.size();
  }

  // 各メンバーが購入した商品の合計金額と点数をリスト形式で返す
  private List<StatisticsOnMemberPurchase> getStatisticsOnMemberPurchase(
      Optional<Boolean> active, LocalDateTime start, LocalDateTime end) {
    final List<StatisticsOnMemberPurchase> statistics = new ArrayList<>();
    final List<MemberEntity> members =
        memberRepository.findAll().stream()
            // activeがtrueな場合にはactiveな要素だけ抽出
            // activeが指定されていない場合にはすべての要素を返す
            .filter(m -> m.isActive() || !active.orElse(false))
            .toList();

    for (MemberEntity member : members) {
      final String memberId = member.getId();

      final List<PurchaseEntity> purchases =
          purchaseRepository.findByMemberIdAndDateBetween(memberId, start, end);
      final int sales = purchases.stream().mapToInt(p -> p.getPrice()).sum();
      final int count = purchases.size();
      statistics.add(new StatisticsOnMemberPurchase(memberId, sales, count));
    }
    return statistics;
  }
}
