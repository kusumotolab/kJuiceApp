package jp.ac.osaka_u.ist.sdl.kjuiceapp.entity;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "history")
public class HistoryEntity {

  public HistoryEntity() {}

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private int id;

  @Column(name = "name")
  private String name;

  @Column(name = "item")
  private String item;

  @Column(name = "price")
  private int price;

  @Column(name = "date")
  private Date date;
}
