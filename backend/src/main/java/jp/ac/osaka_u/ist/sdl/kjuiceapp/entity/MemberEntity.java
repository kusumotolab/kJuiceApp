package jp.ac.osaka_u.ist.sdl.kjuiceapp.entity;

import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;

@Data
@Entity
@NoArgsConstructor(access = AccessLevel.PRIVATE) // for JPA
@Table(name = "member")
public class MemberEntity {
  @NonNull
  @Setter(AccessLevel.NONE)
  @Id
  private String id;

  @NonNull
  @Column(name = "display_name")
  private String name;

  @NonNull private String attribute;

  private boolean active;

  @OneToMany
  @JoinColumn(
      name = "member_id",
      referencedColumnName = "id",
      insertable = false,
      updatable = false)
  private List<PurchaseEntity> purchases;

  public MemberEntity(String id, String name, String attribute, boolean active) {
    this.id = id;
    this.name = name;
    this.attribute = attribute;
    this.active = active;
  }
}
