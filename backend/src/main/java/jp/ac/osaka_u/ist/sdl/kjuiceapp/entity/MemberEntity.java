package jp.ac.osaka_u.ist.sdl.kjuiceapp.entity;

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
  private String id;

  @Column(name = "display_name")
  private String name;

  private String attribute;

  private boolean active;
}
