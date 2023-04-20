package io.github.haur514.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "sales")
public class SalesEntity {

  @Id
  @Column(name = "userid")
  private String userId;

  @Column(name = "date")
  private String date;

  @Column(name = "sales")
  private int sales;
}
