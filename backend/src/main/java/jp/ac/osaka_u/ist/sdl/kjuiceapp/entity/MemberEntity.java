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
}
