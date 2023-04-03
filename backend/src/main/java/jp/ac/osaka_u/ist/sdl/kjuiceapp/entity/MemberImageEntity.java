package jp.ac.osaka_u.ist.sdl.kjuiceapp.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import lombok.Data;
import org.springframework.http.MediaType;

@Entity
@Data
@Table(name = "member_image")
public class MemberImageEntity {
  @Id
  @Column(name = "member_id")
  private String memberId;

  @Column(name = "media_type")
  private MediaType mediaType;

  @Lob
  private byte[] image;
}
