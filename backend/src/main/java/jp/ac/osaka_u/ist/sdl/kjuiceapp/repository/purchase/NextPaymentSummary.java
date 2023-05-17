package jp.ac.osaka_u.ist.sdl.kjuiceapp.repository.purchase;

import java.io.Serializable;
import java.math.BigInteger;
import lombok.Data;

@Data
public class NextPaymentSummary implements Serializable {

  private static final long serialVersionUID = 1L;
  private int payment;
  private String memberId;
  private String memberName;

  public NextPaymentSummary(String memberId, String memberName, BigInteger payment) {
    super();
    this.memberId = memberId;
    this.memberName = memberName;
    this.payment = payment.intValue();
  }

  // 引数 : [String member_id, String member_name, BigInteger sum]
  // example : ["h-yosiok", "吉岡", "2000"]
  public NextPaymentSummary(Object[] objects) {
    this((String) objects[0], (String) objects[1], (BigInteger) objects[2]);
  }

  @Override
  public boolean equals(Object obj) {
    if (obj.getClass() != this.getClass()) {
      return false;
    }
    if (!this.memberId.equals(((NextPaymentSummary) obj).getMemberId())
        || this.payment != ((NextPaymentSummary) obj).getPayment()) {
      return false;
    }
    return true;
  }

  @Override
  public int hashCode() {
    return this.memberId.hashCode() + this.payment;
  }
}
