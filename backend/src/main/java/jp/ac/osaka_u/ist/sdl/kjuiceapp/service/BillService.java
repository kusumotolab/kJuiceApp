package jp.ac.osaka_u.ist.sdl.kjuiceapp.service;

import java.net.ConnectException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.BillEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.MemberEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.repository.BillRepository;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.repository.MemberRepository;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.repository.PurchaseRepository;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.exceptions.NoSuchMemberException;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.util.httprequest.CommunicateSlack;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class BillService {

  @Autowired private BillRepository billRepository;
  @Autowired private PurchaseRepository purchaseRepository;
  @Autowired private MemberRepository memberRepository;
  @Autowired private CommunicateSlack communicateSlack;

  public List<BillEntity> findAllBills() {
    return billRepository.findAll();
  }

  public BillEntity postBill(String issuerId) throws NoSuchMemberException, ConnectException {
    MemberEntity issuerMember =
        memberRepository.findById(issuerId).orElseThrow(NoSuchMemberException::new);
    String issuerName = issuerMember.getName();
    String message = makeBillMessage(issuerName);
    try {
      communicateSlack.sendMessage(message);
    } catch (Exception e) {
      throw new ConnectException();
    }

    BillEntity newBill = new BillEntity(issuerId);
    return billRepository.save(newBill);
  }

  // 請求書を発行した直近の日付を取得する．
  public LocalDateTime getRecentBillDate() {
    return billRepository.findFirstByOrderByDateDesc().getDate();
  }

  // slackに送信する文章の文面を作成する．
  public String makeBillMessage(String issuerName) {
    StringBuilder sb = new StringBuilder();
    sb.append("ジュース会大臣の" + issuerName + "です．\n");
    sb.append("今月分の利用料金が確定しました．\n");

    Map<String, Integer> nextPaymentSummary = purchaseRepository.getPaymentSummary();
    nextPaymentSummary.forEach(
        (key, value) -> {
          String memberName =
              memberRepository
                  .findById(key)
                  .orElseThrow(() -> new NoSuchElementException())
                  .getName();
          sb.append(memberName + "様 : " + value + "円\n");
        });

    sb.append("支払いは" + issuerName + "までよろしくお願いいたします．\n");
    return sb.toString();
  }
}
