package jp.ac.osaka_u.ist.sdl.kjuiceapp.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "item")
public class ItemEntity {
  @Id
  private String id;

  @Column(name = "display_name")
  private String name;

  @Column(name = "selling_price")
  private int sellingPrice;

  @Column(name = "cost_price")
  private int costPrice;

  private String group;

  private boolean active;
}
