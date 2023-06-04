package jp.ac.osaka_u.ist.sdl.kjuiceapp.service;

import com.slack.api.methods.SlackApiException;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.BillEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.MemberEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.repository.BillRepository;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.repository.MemberRepository;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.exceptions.NoSuchMemberException;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.util.httprequest.CommunicateSlack;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class BillService {

  @Autowired private BillRepository billRepository;
  @Autowired private PurchaseService purchaseService;
  @Autowired private MemberRepository memberRepository;
  @Autowired private CommunicateSlack communicateSlack;

  public List<BillEntity> findAllBills() {
    return billRepository.findAll();
  }

  public BillEntity postBill(String issuerId)
      throws NoSuchMemberException, SlackApiException, IOException {
    MemberEntity issuerMember =
        memberRepository.findById(issuerId).orElseThrow(NoSuchMemberException::new);
    String issuerName = issuerMember.getName();
    String message = makeBillMessage(issuerName);
    communicateSlack.sendMessage(message);
    BillEntity newBill = new BillEntity(issuerId);
    return billRepository.save(newBill);
  }

  // 請求書を発行した直近の日付を取得する．
  public LocalDateTime getRecentBillDate() {
    return billRepository
        .findFirstByOrderByDateDesc()
        .map((e) -> e.getDate())
        .orElse(LocalDateTime.of(1753, 1, 1, 0, 0, 0));
  }

  // slackに送信する文章の文面を作成する．
  public String makeBillMessage(String issuerName) {
    StringBuilder sb = new StringBuilder();
    sb.append("ジュース会大臣の" + issuerName + "です．\n");
    sb.append("今月分の利用料金が確定しました．\n");
    Map<String, Integer> nextPaymentSummary = purchaseService.getPaymentSummaryOrderedByPayment();
    nextPaymentSummary.forEach(
        (key, value) -> {
          String memberName;
          memberName =
              memberRepository.findById(key).orElseThrow(NoSuchElementException::new).getName();
          sb.append(memberName + "様 : " + value + "円\n");
        });

    sb.append("支払いは" + issuerName + "までよろしくお願いいたします．\n");
    return sb.toString();
  }
}
