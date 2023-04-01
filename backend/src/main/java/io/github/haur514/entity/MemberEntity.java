package io.github.haur514.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "member")
public class MemberEntity {

  @Id
  @Column(name = "name")
  private String name;

  @Column(name = "displayname")
  private String displayName;

  @Column(name = "unpayedamount")
  private int umpayedAmount;

  @Column(name = "attribute")
  private String attribute;

  @Column(name = "active")
  private boolean active;
}
