package jp.ac.osaka_u.ist.sdl.kjuiceapp.entity;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;

@Entity
@Data
@NoArgsConstructor(access = AccessLevel.PRIVATE) // for JPA
@Table(name = "purchase")
public class PurchaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Setter(AccessLevel.NONE)
  @Column(name = "purchase_id")
  private int purchaseId;

  @NonNull
  @Column(name = "member_id")
  private String memberId;

  @ManyToOne
  @JoinColumn(name = "member_id", referencedColumnName = "id", insertable = false, updatable = false)
  private MemberEntity member;

  @NonNull
  @Column(name = "item_id")
  private String itemId;

  @ManyToOne
  @JoinColumn(name = "item_id", referencedColumnName = "id", insertable = false, updatable = false)
  private ItemEntity item;

  private int price;

  @NonNull
  @Column(name = "purchase_date")
  private LocalDateTime date;

  public PurchaseEntity(String memberId, String itemId, int price) {
    this.memberId = memberId;
    this.itemId = itemId;
    this.price = price;
    this.date = LocalDateTime.now();
  }
}
