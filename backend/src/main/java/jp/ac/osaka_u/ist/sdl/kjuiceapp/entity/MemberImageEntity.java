package jp.ac.osaka_u.ist.sdl.kjuiceapp.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import lombok.Data;
import org.hibernate.annotations.Type;

@Data
@Entity
@Table(name = "memberimage")
public class MemberImageEntity {

  @Id
  @Column(name = "name")
  private String name;

  @Column(name = "type")
  private String type;

  @Lob
  @Type(type = "org.hibernate.type.BinaryType")
  @Column(name = "data")
  private byte[] data;
}
