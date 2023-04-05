package jp.ac.osaka_u.ist.sdl.kjuiceapp.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
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
@Table(name = "item")
public class ItemEntity {
  @Setter(AccessLevel.NONE)
  @NonNull
  @Id
  private String id;

  @NonNull
  @Column(name = "display_name")
  private String name;

  @Column(name = "selling_price")
  private int sellingPrice;

  @Column(name = "cost_price")
  private int costPrice;

  @NonNull private String category;

  private boolean active;
}
