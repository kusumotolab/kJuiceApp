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
  @Column(name = "name")
  private String name;

  @Column(name = "sellingprice")
  private int sellingPrice;

  @Column(name = "costprice")
  private int costPrice;

  @Column(name = "grouping")
  private String grouping;

  @Column(name = "salesfigure")
  private int salesFigure;

  @Column(name = "active")
  private boolean active;
}
