package jp.ac.osaka_u.ist.sdl.kjuiceapp.service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.BillEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.MemberEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.repository.BillRepository;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.repository.MemberRepository;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.exceptions.NoSuchMemberException;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.util.httprequest.CommunicateSlack;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@Transactional
public class BillService {

  @Autowired private BillRepository billRepository;
  @Autowired private MemberRepository memberRepository;
  @Autowired private PurchaseService purchaseService;
  @Autowired private CommunicateSlack communicateSlack;

  public List<BillEntity> findAllBills() {
    return billRepository.findAll();
  }

  public BillEntity postBill(String issuerId) throws NoSuchMemberException {
    if (!memberRepository.existsById(issuerId)) throw new NoSuchMemberException();
    Optional<MemberEntity> issuerMember = memberRepository.findById(issuerId);
    String issuerName = issuerMember.get().getName();
    LocalDateTime recentIssueBillDateTime = getRecentBillDate();
    LocalDateTime todayDateTime = LocalDateTime.now();
    String message = makeBillMessage(issuerName, recentIssueBillDateTime, todayDateTime);
    try {
      communicateSlack.sendMessage(message);
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    BillEntity newBill = new BillEntity(issuerId);
    return billRepository.save(newBill);
  }

  // 請求書を発行した直近の日付を取得する．
  public LocalDateTime getRecentBillDate() {
    List<BillEntity> billEntities =
        billRepository.findAll().stream()
            .sorted(Comparator.comparing(BillEntity::getDate))
            .collect(Collectors.toList());
    return billEntities.get(billEntities.size() - 1).getDate();
  }

  // slackに送信する文章の文面を作成する．
  public String makeBillMessage(
      String issuerName, LocalDateTime startDateTime, LocalDateTime endDateTime) {
    StringBuilder sb = new StringBuilder();
    sb.append("ジュース会大臣の" + issuerName + "です．\n");
    sb.append("今月分の利用料金が確定しました．\n");

    LinkedHashMap<MemberEntity, Integer> purchasedAmount =
        purchaseService.getPurchasedAmountInSpecificPeriod(startDateTime, endDateTime);

    purchasedAmount.forEach(
        (key, value) -> {
          if (value != 0) {
            sb.append(key.getName() + "様 : " + value + "円\n");
          }
        });

    sb.append("支払いは" + issuerName + "までよろしくお願いいたします．\n");
    return sb.toString();
  }
}
