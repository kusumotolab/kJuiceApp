package jp.ac.osaka_u.ist.sdl.kjuiceapp.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.stats.item.responsebody.ItemStatResponseBody;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.stats.member.responsebody.MemberStatResponseBody;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.stats.member.responsebody.StatisticsOnMemberPurchase;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.ItemEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.MemberEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.PurchaseEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.repository.PurchaseRepository;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.shared.ItemSharedService;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.shared.MemberSharedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class StatService {
  @Autowired private PurchaseRepository purchaseRepository;
  @Autowired private MemberSharedService memberSharedService;
  @Autowired private ItemSharedService itemSharedService;

  // 特定の期間における商品毎の売上を取得する．
  // activeがtrueの場合，アクティブな商品毎の売上を取得する．
  // activeがfalseの場合，非アクティブな商品も含む商品毎の売上を取得する．
  public List<ItemStatResponseBody> getSalesStatsOnItem(
      Optional<Boolean> active, LocalDateTime start, LocalDateTime end) {
    List<ItemStatResponseBody> itemStats = new ArrayList<>();
    List<ItemEntity> items = itemSharedService.getMembers(active);

    for (ItemEntity item : items) {
      itemStats.add(getSalesStatsForEachItem(item, start, end));
    }

    return itemStats;
  }

  private ItemStatResponseBody getSalesStatsForEachItem(
      ItemEntity item, LocalDateTime start, LocalDateTime end) {
    String itemId = item.getId();
    int sales =
        purchaseRepository.findByItemIdAndDateBetween(itemId, start, end).stream()
            .mapToInt(p -> p.getPrice())
            .sum();
    return new ItemStatResponseBody(itemId, sales);
  }

  // 特定の期間における以下の要素を取得する．
  // totalAmount: 総売上
  // totalCount: 購入された商品点数の合計
  // statistics: {各メンバーが購入した商品の合計金額と点数}
  public MemberStatResponseBody getPurchasesStatsOnMember(
      Optional<Boolean> active, LocalDateTime start, LocalDateTime end) {
    final int totalAmount = getTotalPurchaseAmountByDateBetween(active, start, end);
    final int totalCount = getTotalPurchaseCountByDateBetween(active, start, end);
    final List<StatisticsOnMemberPurchase> statistics = getSalesStatsOnMember(active, start, end);

    return new MemberStatResponseBody(totalAmount, totalCount, statistics);
  }

  // 特定の期間における商品の総売上を取得する．
  // activeがtrueの場合，アクティブなメンバー全員における総売上を取得する．
  // activeがfalseの場合，非アクティブなメンバーも含むメンバー全員における総売上を取得する．
  private int getTotalPurchaseAmountByDateBetween(
      Optional<Boolean> active, LocalDateTime start, LocalDateTime end) {
    final List<String> memberIds = memberSharedService.getMemberIds(active);

    final List<PurchaseEntity> purchases =
        purchaseRepository.findByDateBetween(start, end).stream()
            .filter(p -> memberIds.contains(p.getMemberId()))
            .toList();

    final int amount = purchases.stream().mapToInt(p -> p.getPrice()).sum();

    return amount;
  }

  // 特定の期間における商品の売上数量の合計を取得する．
  // activeがtrueの場合，アクティブなメンバー全員における売上数量の合計を取得する．
  // activeがfalseの場合，非アクティブなメンバーも含むメンバー全員における売上数量を取得する．
  private int getTotalPurchaseCountByDateBetween(
      Optional<Boolean> active, LocalDateTime start, LocalDateTime end) {
    final List<String> memberIds = memberSharedService.getMemberIds(active);

    final List<PurchaseEntity> purchases =
        purchaseRepository.findByDateBetween(start, end).stream()
            .filter(p -> memberIds.contains(p.getMemberId()))
            .toList();

    return purchases.size();
  }

  // 指定した期間におけるメンバー毎の売上金額と売上数量をリスト形式で返す
  private List<StatisticsOnMemberPurchase> getSalesStatsOnMember(
      Optional<Boolean> active, LocalDateTime start, LocalDateTime end) {
    final List<StatisticsOnMemberPurchase> statistics = new ArrayList<>();
    final List<MemberEntity> members = memberSharedService.getMembers(active);
    for (MemberEntity member : members) {
      statistics.add(getSalesStatsForEachMember(member, start, end));
    }
    return statistics;
  }

  private StatisticsOnMemberPurchase getSalesStatsForEachMember(
      MemberEntity member, LocalDateTime start, LocalDateTime end) {
    final String memberId = member.getId();

    final List<PurchaseEntity> purchases =
        purchaseRepository.findByMemberIdAndDateBetween(memberId, start, end);
    final int sales = purchases.stream().mapToInt(p -> p.getPrice()).sum();
    final int count = purchases.size();
    return new StatisticsOnMemberPurchase(memberId, sales, count);
  }
}
