package jp.ac.osaka_u.ist.sdl.kjuiceapp.entity;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Table(name = "bill")
public class BillEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Setter(AccessLevel.NONE)
  @Column(name = "bill_id")
  private int billId;

  @Setter(AccessLevel.NONE)
  @NonNull
  @Column(name = "issuer_id")
  private String issuerId;

  @Column(name = "post_date")
  @NonNull
  private LocalDateTime date;

  public BillEntity(String issuerId) {
    this.issuerId = issuerId;
    this.date = LocalDateTime.now();
  }
}
